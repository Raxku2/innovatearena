import { useState } from "react";
import { useEventDetailsStore, useUserDetailsStore } from "../../stores"
// import { useUserDataIO } from "../user/user";
import useDepartmentSelector from "../inputs/deptselector";
import useYearSelector from "../inputs/yearselector";


const useUserAuthHook = () => {
    const { enableLoadingBar, disableLoadingBar } = useEventDetailsStore();
    const { setLogin,
        setUserPhone, setUserDepartment, setUserBatch,
        setUserPaernerEmail, setUserReg, setUserPaernerName,
        setUserPaernerId, setPartnerStatus, setPayStatus, settxn
    } = useUserDetailsStore();

    const { currentdepartment } = useDepartmentSelector();
    const { year } = useYearSelector();

    const getUserFromLocalStorage = async () => {
        try {
            const datainstorage = localStorage.getItem('userData');

            const data = datainstorage ? await JSON.parse(datainstorage) : null;
            if (data) {

                // console.log(data);
                setLogin(data.name ? data.name : '', data.email ? data.email : '', data.dp ? data.dp : '', data._id ? data._id : '', data.type ? data.type : '', data.team_id ? data.team_id : '');
                data.dept && setUserDepartment(data.dept);
                data.reg_status && setUserReg(data.reg_status);
                setPartnerStatus(data.partnerId ? true : false);
                data.payment_status && setPayStatus(data.payment_status);
                data.partnerEmail && setUserPaernerEmail(data.partnerEmail);
                data.txn && settxn(data.txn);
                data.partnerId && setUserPaernerId(data.partnerId);
                data.partnerName && setUserPaernerName(data.partnerName);
                data.batch && setUserBatch(data.batch);
                data.phone && setUserPhone(data.phone);
                // console.log(data);


            } else {
                // return
            }
            disableLoadingBar();

        } catch (error) {
            console.log(error);
            disableLoadingBar()

        }
    };

    const setUserToLocalStorage = (data) => {
        try {
            localStorage.setItem('userData', JSON.stringify(data));

        } catch (error) {
            console.log(error);
            disableLoadingBar()

        }
    }



    const removeUser = () => {
        localStorage.removeItem("userData")
    }

    return {
        getUserFromLocalStorage,
        setUserToLocalStorage, removeUser
    }
}

export {
    useUserAuthHook
}