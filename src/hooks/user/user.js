import { data } from "react-router";
import { useEventDetailsStore, useUserDetailsStore } from "../../stores";
import { useAdminControls } from "../admin/admin";
import { useUserAuthHook } from "../auth/userAuth";
import useDepartmentSelector from "../inputs/deptselector";
import useYearSelector from "../inputs/yearselector";
import { UseStartup } from "../startup/UseStartup";
import { useEffect } from "react";

const useUserDataIO = () => {
    const { setAppStatus } = useEventDetailsStore();
    const { giveRecods } = useAdminControls();

    const {
        userId, userName, department, batch,
        phone, setUserPhone, partnerName, partneremail,
        setUserDepartment, setUserBatch, setPartnerStatus,
        setUserPaernerName, setUserPaernerdp, setUserPaernerId,
        setUserPaernerEmail, setUserReg, setLogin, email,
        setPayStatus, settxn, userType, setuserType, setSuper

    } = useUserDetailsStore();

    const { currentdepartment } = useDepartmentSelector();
    const { year } = useYearSelector();

    const { disableLoadingBar, enableLoadingBar, setAdmins, setInvoice } = useEventDetailsStore();


    const { setUserToLocalStorage, getUserFromLocalStorage } = useUserAuthHook();
    const { getEventData } = UseStartup();

    useEffect(() => {
        if (userType === "root") {
            giveRecods();
        }
    }, [userType]);

    const BACKEND_API = import.meta.env.VITE_BACKEND_API;

    const getFullUserInfo = async () => {

        if (!userId) {
            return
        }

        try {

            const res = await fetch(BACKEND_API + `/user/${userId}`);

            if (res.status == 200) {

                const data = await res.json();

                fetch(data.dp);

                setLogin(data.name, data.email, data.dp, data._id, data.type, data.team_id);

                if (data.batch !== undefined && data.batch !== null) {
                    setUserBatch(data.batch ? data.batch : "");
                }

                if (data.payment_status !== undefined && data.payment_status !== null) {
                    setPayStatus(data.payment_status);
                }

                setUserDepartment(data.dept ? data.dept : '');

                if (data.phone !== undefined && data.phone !== null) {
                    setUserPhone(data.phone);
                }

                if (data.reg_status !== undefined && data.reg_status !== null) {
                    setUserReg(data.reg_status);
                }

                setPartnerStatus(data.partnerId ? true : false);

                if (data.partnerEmail !== undefined && data.partnerEmail !== null) {
                    setUserPaernerEmail(data.partnerEmail);
                }

                if (data.partnerId !== undefined && data.partnerId !== null) {
                    setUserPaernerId(data.partnerId);
                }

                if (data.partnerName !== undefined && data.partnerName !== null) {
                    setUserPaernerName(data.partnerName);
                }

                if (data.txn !== undefined && data.txn !== null) {
                    settxn(data.txn);
                }

                if (data.type !== undefined && data.type !== null) {
                    setuserType(data.type);
                }

                if (data.super !== undefined && data.super !== null) {
                    setSuper(data.super);
                }
                // console.log(data);


                await giveRecods();
                // await getAdminInfo();

                setUserToLocalStorage(data)
            }

            if (res.status == 404) {
                enableLoadingBar();
                localStorage.removeItem('userData')
                window.location.reload();
            }

        } catch (error) {
            console.error("Profile fetch failed:", error);
        }
    }


    const updateUserInfo = async () => {

        if (!userId) {
            return
        }

        setAppStatus("updating...")

        try {

            const payload = {
                "name": userName ?? null,
                "dept": currentdepartment ?? null,
                "batch": year ?? null,
                "phone": phone ?? null,
                "reg_status": userName && currentdepartment && year && phone ? true : false
            }

            const res = await fetch(`${BACKEND_API}/user/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })

            const status = res.status

            if (status === 200 || status === 304) {

                if (status === 200) {
                    setAppStatus("input recorded")
                }

                if (status === 304) {
                    setAppStatus("data matched")
                }

                await getFullUserInfo()
                return
            }

            console.log(status)
            setAppStatus("try again")

        } catch (error) {

            console.error("Profile fetch failed:", error)
            setAppStatus("try again")

        }
    }

    const createPartner = async () => {
        if (!userId) {
            return
        }
        if (partneremail == email) {
            setUserPaernerEmail(null);
            setUserPaernerName(null);
            disableLoadingBar();
            return
        }
        let partneremail_formatted = String(partneremail).toLowerCase()
        // console.log(partneremail_formatted);

        setAppStatus("updating...")
        try {
            const res = await fetch(BACKEND_API + `/user/partner/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        "name": partnerName,
                        "email": partneremail_formatted
                    })
            });

            if (res.status == 201) {
                setAppStatus("Partner pached");
                setPartnerStatus(true);
                getPartnerInfo();
                // getUserFromLocalStorage()


            } else if (res.status == 501) {
                setAppStatus("server busy")
                getFullUserInfo();
                disableLoadingBar()


            } else {
                console.log(res.status);
                setAppStatus("try again")
                disableLoadingBar();
            }
        } catch (error) {
            setAppStatus("try again")
            console.error("Profile fetch failed:", error);
            disableLoadingBar()
        }

    }

    const getPartnerInfo = async () => {
        if (!userId) {
            return
        }
        try {
            const res = await fetch(BACKEND_API + `/user/partner/${partneremail}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (res.status == 200) {
                const data = await res.json();
                // console.log(data);

                setPartnerStatus(data._id ? true : false);
                setUserPaernerEmail(data.email ? data.email : '');
                setUserPaernerId(data._id ? data._id : '');
                setUserPaernerName(data.name ? data.name : '');
                setUserPaernerdp(data.dp ? data.dp : '');


                disableLoadingBar()

            } else if (res.status == 304) {
                setAppStatus("server busy")
                getFullUserInfo();
                disableLoadingBar()

            } else {
                console.log(res.status);
                setAppStatus("try again")
                disableLoadingBar()
            }
        } catch (error) {
            setAppStatus("try again")
            console.error("Profile fetch failed:", error);
            disableLoadingBar()
        }

    }

    const syncPartnerInfo = async () => {
        if (!userId) {
            return
        }
        setAppStatus("scan...")
        try {
            const res = await fetch(BACKEND_API + `/user/partner/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (res.status == 200) {
                // setPartnerStatus(true);
                await getPartnerInfo()
                await getFullUserInfo();
                getUserFromLocalStorage();
                // disableLoadingBar()
                setAppStatus("Partner scanned");

            } else if (res.status == 304) {
                setAppStatus("server busy")
                getFullUserInfo();
                disableLoadingBar()

            } else {
                console.log(res.status);
                setAppStatus("try again")
                disableLoadingBar()
            }
        } catch (error) {
            setAppStatus("try again")
            console.error("Profile fetch failed:", error);
            disableLoadingBar()
        }

    }

    const removePartnerInfo = async () => {
        if (!userId) {
            return
        }

        if (!partneremail) {
            window.location.reload()
        }
        setAppStatus("scan...")
        try {

            const res = await fetch(BACKEND_API + `/user/partner/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (res.status == 204) {
                setPartnerStatus(false);
                setUserPaernerEmail('');
                setUserPaernerName('');
                setUserPaernerId('');
                // setPartnerStatus(true);
                // getPartnerInfo();
                // getUserFromLocalStorage();
                let data = await JSON.parse(localStorage.getItem("userData"));
                data.partnerEmail = ''
                data.partnerName = ''
                data.partnerId = ''
                localStorage.setItem('userData', JSON.stringify(data))
                getFullUserInfo();

                disableLoadingBar();
                setAppStatus("Partner killed");


            } else if (res.status == 501) {
                setAppStatus("server busy")
                getFullUserInfo();
                disableLoadingBar()

            } else {
                console.log(res.status);
                setAppStatus("try again")
                disableLoadingBar()
            }
        } catch (error) {
            setAppStatus("try again")
            console.error("Profile fetch failed:", error);
            disableLoadingBar()
        }

    }


    const createSchedule = async (title, time) => {
        if (userType != 'root') {
            return
        }
        if (!title || !time) {
            console.log('cancel for value');

            return
        }
        setAppStatus("creating...")
        enableLoadingBar();
        try {

            const res = await fetch(BACKEND_API + `/event/schedule`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        "title": title,
                        "time": time
                    })
            });

            if (res.status == 201) {
                await getEventData();
                setAppStatus("Created!");
                disableLoadingBar()


            } else if (res.status == 501) {
                setAppStatus("server busy")
                disableLoadingBar()

            } else {
                console.log(res.status);
                setAppStatus("try again")
                disableLoadingBar()
            }
        } catch (error) {
            setAppStatus("try again")
            console.error("Profile fetch failed:", error);
            disableLoadingBar()
        }


    }


    const updateSchedule = async (title, time, sch_id) => {
        if (userType != 'root') {
            return
        }
        if (!title || !time) {
            console.log('cancel for value');

            return
        }
        setAppStatus("updating...")
        enableLoadingBar();
        try {

            const res = await fetch(BACKEND_API + `/event/schedule/${sch_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        "title": title,
                        "time": time
                    })
            });

            if (res.status == 200) {
                await getEventData();
                setAppStatus("updated!");
                disableLoadingBar()


            } else if (res.status == 501) {
                setAppStatus("server busy")
                disableLoadingBar()

            } else {
                console.log(res.status);
                setAppStatus("try again")
                disableLoadingBar()
            }
        } catch (error) {
            setAppStatus("try again")
            console.error("Profile fetch failed:", error);
            disableLoadingBar()
        }


    }


    const deleteSchedule = async (sch_id) => {
        if (userType != 'root') {
            return
        }
        if (!sch_id) {
            console.log('cancel for value');

            return
        }
        setAppStatus("deleting...")
        enableLoadingBar();
        try {

            const res = await fetch(BACKEND_API + `/event/schedule/${sch_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (res.status == 204) {
                await getEventData();
                setAppStatus("deleted!");
                disableLoadingBar()


            } else if (res.status == 501) {
                setAppStatus("server busy")
                disableLoadingBar()

            } else {
                console.log(res.status);
                setAppStatus("try again")
                disableLoadingBar()
            }
        } catch (error) {
            setAppStatus("try again")
            console.error("Profile fetch failed:", error);
            disableLoadingBar()
        }


    }


    // rule
    const createRule = async (title) => {
        if (userType != 'root') {
            return
        }
        if (!title) {
            console.log('cancel for value');

            return
        }
        setAppStatus("creating...")
        enableLoadingBar();
        try {

            const res = await fetch(BACKEND_API + `/event/rule`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        "title": title,
                        "description": ""
                    })
            });

            if (res.status == 201) {
                await getEventData();
                setAppStatus("Created!");
                disableLoadingBar()


            } else if (res.status == 501) {
                setAppStatus("server busy")
                disableLoadingBar()

            } else {
                console.log(res.status);
                setAppStatus("try again")
                disableLoadingBar()
            }
        } catch (error) {
            setAppStatus("try again")
            console.error("Profile fetch failed:", error);
            disableLoadingBar()
        }


    }


    const updateRule = async (title, rule_id) => {
        if (userType != 'root') {
            return
        }
        if (!title) {
            console.log('cancel for value');

            return
        }
        setAppStatus("updating...")
        enableLoadingBar();
        try {

            const res = await fetch(BACKEND_API + `/event/rule/${rule_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        "title": title,
                        "description": ""
                    })
            });

            if (res.status == 200) {
                await getEventData();
                setAppStatus("updated!");
                disableLoadingBar()


            } else if (res.status == 501) {
                setAppStatus("server busy")
                disableLoadingBar()

            } else {
                console.log(res.status);
                setAppStatus("try again")
                disableLoadingBar()
            }
        } catch (error) {
            setAppStatus("try again")
            console.error("Profile fetch failed:", error);
            disableLoadingBar()
        }


    }


    const deleteRule = async (rule_id) => {
        if (userType != 'root') {
            return
        }
        if (!rule_id) {
            console.log('cancel for value');
            return
        }
        setAppStatus("deleting...")
        enableLoadingBar();
        try {

            const res = await fetch(BACKEND_API + `/event/rule/${rule_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (res.status == 204) {
                await getEventData();
                setAppStatus("deleted!");
                disableLoadingBar()


            } else if (res.status == 501) {
                setAppStatus("server busy")
                disableLoadingBar()

            } else {
                console.log(res.status);
                setAppStatus("try again")
                disableLoadingBar()
            }
        } catch (error) {
            setAppStatus("try again")
            console.error("Profile fetch failed:", error);
            disableLoadingBar()
        }
    }

    // organizer 


    const createOrganizer = async (name, role, dp = null) => {
        if (userType != 'root') {
            return
        }

        if (dp == '') {
            dp = null
        }

        setAppStatus("creating...")
        enableLoadingBar();
        try {

            const res = await fetch(BACKEND_API + `/event/organizer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        "name": name,
                        "role": role,
                        "dp": dp
                    })
            });

            if (res.status == 201) {
                await getEventData();
                setAppStatus("Created!");
                disableLoadingBar()


            } else if (res.status == 501) {
                setAppStatus("server busy")
                disableLoadingBar()

            } else {
                console.log(res.status);
                setAppStatus("try again")
                disableLoadingBar()
            }
        } catch (error) {
            setAppStatus("try again")
            console.error("Profile fetch failed:", error);
            disableLoadingBar()
        }


    }


    const updateOrganizer = async (name, id, dp, role) => {
        if (userType != 'root') {
            return
        }

        setAppStatus("updating...")
        enableLoadingBar();
        try {

            const res = await fetch(BACKEND_API + `/event/organizer/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        "name": name,
                        "role": role,
                        "dp": dp
                    })
            });

            if (res.status == 200) {
                await getEventData();
                setAppStatus("updated!");
                disableLoadingBar()


            } else if (res.status == 501) {
                setAppStatus("server busy")
                disableLoadingBar()

            } else {
                console.log(res.status);
                setAppStatus("try again")
                disableLoadingBar()
            }
        } catch (error) {
            setAppStatus("try again")
            console.error("Profile fetch failed:", error);
            disableLoadingBar()
        }


    }


    const deleteOrganizer = async (id) => {
        if (userType != 'root') {
            return
        }
        setAppStatus("deleting...")
        enableLoadingBar();
        try {

            const res = await fetch(BACKEND_API + `/event/organizer/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (res.status == 204) {
                await getEventData();
                setAppStatus("deleted!");
                disableLoadingBar()


            } else if (res.status == 501) {
                setAppStatus("server busy")
                disableLoadingBar()

            } else {
                console.log(res.status);
                setAppStatus("try again")
                disableLoadingBar()
            }
        } catch (error) {
            setAppStatus("try again")
            console.error("Profile fetch failed:", error);
            disableLoadingBar()
        }
    }


    // admin user 

    const getAdminInfo = async () => {
        if (userType != 'root') {
            return
        }
        setAppStatus("initiating...")
        // enableLoadingBar();
        try {
            const res = await fetch(BACKEND_API + `/root/admins/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (res.status == 200) {
                const data = await res.json();
                setAdmins(data)
                // disableLoadingBar()
            } else if (res.status == 501) {
                setAppStatus("server busy")
                disableLoadingBar()

            } else {
                console.log(res.status);
                setAppStatus("try again")
                disableLoadingBar()
            }
        } catch (error) {
            setAppStatus("try again")
            console.error("Profile fetch failed:", error);
            disableLoadingBar()
        }
    }


    const updateAdminInfo = async (id, params) => {
        if (userType != 'root') {
            return
        }

        setAppStatus("updating...")
        // enableLoadingBar();
        try {

            const res = await fetch(BACKEND_API + `/root/admins/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        "target": id,
                        "param": params
                    })
            });

            if (res.status == 200) {
                // await getEventData();
                await getAdminInfo();
                setAppStatus("updated!");
                // disableLoadingBar()


            } else if (res.status == 501) {
                setAppStatus("server busy")
                disableLoadingBar()

            } else {
                console.log(res.status);
                setAppStatus("try again")
                disableLoadingBar()
            }
        } catch (error) {
            setAppStatus("try again")
            console.error("Profile fetch failed:", error);
            disableLoadingBar()
        }


    }


    // csv data downloading 

    const downloadRegCsv = async () => {
        if (userType != 'root') {
            return
        }

        setAppStatus('downloading...');
        enableLoadingBar();

        try {
            // 1. Fetch the data from your FastAPI backend
            const response = await fetch(BACKEND_API + `/root/reg/${userId}`); // Update with your actual API URL

            if (!response.ok) {
                throw new Error('Download failed from server');
            }

            // 2. Wait for the entire file to arrive and convert to Blob
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            // 3. Generate the timestamp for the filename (dd-mm-yy-hh-mm-ss)
            const now = new Date();
            const dd = String(now.getDate()).padStart(2, '0');
            const mm = String(now.getMonth() + 1).padStart(2, '0');
            const yy = String(now.getFullYear()).slice(-2);
            const hh = String(now.getHours()).padStart(2, '0');
            const min = String(now.getMinutes()).padStart(2, '0');
            const ss = String(now.getSeconds()).padStart(2, '0');
            const formattedDate = `${dd}-${mm}-${yy}-${hh}-${min}-${ss}`;

            // 4. Create the hidden link and trigger download
            const link = document.createElement('a');
            link.href = url;
            link.download = `innovatearena_registrations_${formattedDate}.csv`;
            document.body.appendChild(link);
            link.click();

            // 5. Clean up memory
            link.remove();
            window.URL.revokeObjectURL(url);

            setAppStatus('success!');
            disableLoadingBar();

        } catch (error) {
            console.error('Error downloading:', error);
            setAppStatus('SERVER BUSY');
            disableLoadingBar();
        }
    };

    return {
        getFullUserInfo, deleteSchedule,
        updateUserInfo, updateSchedule,
        createPartner, createSchedule,
        syncPartnerInfo, removePartnerInfo,
        createRule, updateRule, deleteRule,
        createOrganizer, updateOrganizer,
        deleteOrganizer, getAdminInfo,
        updateAdminInfo, downloadRegCsv
    }


}

export {
    useUserDataIO,

}