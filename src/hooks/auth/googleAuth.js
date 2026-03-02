import { useEffect, useState, useCallback, useRef } from 'react';
import { useEventDetailsStore, useUserDetailsStore } from '../../stores';
import { useUserAuthHook } from './userAuth';

// Shared variable outside the hook to persist across components
let globalTokenClient = null;

const useGoogleAuth = () => {
    const [isLoaded, setIsLoaded] = useState(!!globalTokenClient);
    const { enableLoadingBar, disableLoadingBar, setAppStatus } = useEventDetailsStore();
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const BACKEND_API = import.meta.env.VITE_BACKEND_API;
    const { setLogin } = useUserDetailsStore();
    const { setUserToLocalStorage } = useUserAuthHook();

    const pendingLogin = useRef(false);

    const initializeClient = useCallback(() => {
        if (window.google && !globalTokenClient) {
            const client = window.google.accounts.oauth2.initTokenClient({
                client_id: clientId,
                scope: 'openid profile email',
                callback: async (response) => {
                    if (response.access_token) {
                        await handleSuccess(response.access_token);
                    }
                    disableLoadingBar();
                },
                error_callback: () => disableLoadingBar(),
            });
            globalTokenClient = client;
            setIsLoaded(true);

            // If user clicked while we were initializing, fire it now
            if (pendingLogin.current) {
                client.requestAccessToken();
                pendingLogin.current = false;
            }
        } else if (globalTokenClient) {
            setIsLoaded(true);
        }
    }, [clientId, disableLoadingBar]);

    useEffect(() => {
        // If google is already on the window (from Navbar), init immediately
        if (window.google) {
            initializeClient();
            return;
        }

        // Otherwise, wait for script to load
        const scriptId = 'google-client-script';
        let script = document.getElementById(scriptId);

        if (!script) {
            script = document.createElement('script');
            script.id = scriptId;
            script.src = 'https://accounts.google.com/gsi/client';
            script.async = true;
            script.defer = true;
            document.body.appendChild(script);
        }

        script.addEventListener('load', initializeClient);
        return () => script.removeEventListener('load', initializeClient);
    }, [initializeClient]);

    const handleSuccess = async (accessToken) => {
        try {
            const res = await fetch(BACKEND_API + `/auth/${accessToken}`);
            const data = await res.json();
            console.log("User Authenticated:", data);
            setLogin(data.name, data.email, data.dp, data._id, data.type, data.team_id);
            setUserToLocalStorage(data);
            setAppStatus("AUTHENTICATED");
            // Save to your store here
        } catch (error) {
            console.error("Profile fetch failed:", error);
        }
    };

    const login = useCallback(() => {
        if (globalTokenClient) {
            enableLoadingBar();
            globalTokenClient.requestAccessToken();
        } else {
            console.warn("Google SDK not ready. Queueing login...");
            pendingLogin.current = true;
            enableLoadingBar();
            // If it's not ready, try to re-init just in case
            initializeClient();
        }
    }, [enableLoadingBar, initializeClient]);

    return { login, isLoaded };
};

export default useGoogleAuth;