import { useCallback } from "react";
import { useEventDetailsStore, useUserDetailsStore } from "../../stores";
import { useUserDataIO } from "./user";

const useInnovateArenaPayment = () => {
    const BACKEND_API = import.meta.env.VITE_BACKEND_API;
    const REDION = import.meta.env.VITE_REDION;
    const RAZOR_KEY = import.meta.env.VITE_RAZOR_KEY;

    const { disableLoadingBar, setAppStatus } = useEventDetailsStore();
    const { userId, userName, email, phone, team_id } = useUserDetailsStore();
    const { getFullUserInfo } = useUserDataIO();

    const startRegistrationPayment = useCallback(async () => {
        return

        try {

            // -----------------------------
            // 🔹 STEP 1: Create Order
            // -----------------------------
            const orderResponse = await fetch(
                `${BACKEND_API}/pay/order/${userId}`,  // ❗ removed extra space
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        user_id: userId,
                        team_id: team_id,
                        username: userName
                    })
                }
            );

            const order = await orderResponse.json();

            if (!order.order_id) {
                setAppStatus("Unable to create order. Try again.");
                disableLoadingBar();
                return;
            }

            // -----------------------------
            // 🔹 STEP 2: Razorpay Config
            // -----------------------------
            const options = {
                key: RAZOR_KEY,
                amount: order.amount,
                currency: "INR",
                order_id: order.order_id,

                name: "Rakesh Kundu",
                description: "InnovateArena - Team Registration Fee",

                method: {
                    emi: false,
                    paylater: false
                },

                prefill: {
                    name: userName,
                    email: email,
                    contact: phone
                },

                notes: {
                    team_id: team_id,
                    user_id: userId
                },

                handler: async function (response) {

                    // -----------------------------
                    // 🔹 STEP 3: Verify Payment
                    // -----------------------------
                    const verifyResponse = await fetch(
                        `${BACKEND_API}/pay/verify`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                user_id: userId,
                                team_id: team_id,
                                username: userName,
                                order_id: response.razorpay_order_id,
                                payment_id: response.razorpay_payment_id,
                                signeture: response.razorpay_signature
                            })
                        }
                    );

                    const result = await verifyResponse.json();

                    if (verifyResponse.status === 200) {
                        // alert("Team Registered Successfully 🚀");
                        getFullUserInfo()
                        setAppStatus("You are in");
                        disableLoadingBar();
                        console.log("done");
                    } else {
                        // alert(result.detail || "Payment Verification Failed");
                        setAppStatus("Verification Failed");
                        getFullUserInfo();
                        disableLoadingBar();
                        console.log("fail");

                    }
                },

                theme: {
                    color: "#0f172a"
                }
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();

        } catch (error) {
            console.error("Payment error:", error);
            // alert("Something went wrong. Please try again.");
            getFullUserInfo()
            disableLoadingBar()
            setAppStatus("Payment Error");
        }

    }, [BACKEND_API, RAZOR_KEY, userId, userName, email, phone, team_id]);

    const goForPayment = async () => {
        if (!userId) {
            console.log("no user id");
            return
        }
        try {

            const orderToken = await fetch(`${BACKEND_API}/pay/token/${userId}`,  // ❗ removed extra space
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            console.log(orderToken.status);
            if (orderToken.status == 201) {
                const order = await orderToken.json();
                // console.log(order);
                window.location.href = REDION+'/panoroma/'+order
                // console.log(REDION);
                
                // disableLoadingBar();

            }
        } catch (error) {
            console.log(error);

        }
    }



    return { startRegistrationPayment, goForPayment };
};

export default useInnovateArenaPayment;