import { useState } from "react";
import { useEventDetailsStore, useUserDetailsStore } from "../../stores"
import { useUserDataIO } from "../user/user";
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
                setLogin(data.name, data.email, data.dp, data._id, data.type, data.team_id);
                setUserDepartment(data.dept);
                setUserReg(data.reg_status);
                setPartnerStatus(data.partnerId ? true : false);
                setPayStatus(data.payment_status);
                setUserPaernerEmail(data.partnerEmail);
                settxn(data.txn);
                setUserPaernerId(data.partnerId);
                setUserPaernerName(data.partnerName);
                setUserBatch(data.batch);
                setUserPhone(data.phone);

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