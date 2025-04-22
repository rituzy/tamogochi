import { useEffect, useState } from "react"
import {TelegramUser} from "../types/types.ts"

export const useTelegram = () => {
    const [webApp, setWebApp] = useState<WebApp | null>(null);
    const [isTelegram, setIsInTelegram] = useState<boolean>(false);
    const [user, setUser] = useState<WebAppUser | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const initUser = () => {
            setLoading(true);
            const tg = window.Telegram.WebApp;
            if (tg) {
                setWebApp(tg);
                const isValidTelegramData = tg && tg.initDataUnsafe && Object.keys(tg.initDataUnsafe).length > 0 && tg.initDataUnsafe.user;
                if (isValidTelegramData) {
                    setIsInTelegram(true);
                    tg.ready();
                    tg.expand();
                    tg.disableVerticalSwipes();
                    // tg.HapticFeedback();
                    const tgusr = tg.initDataUnsafe.user;
                    setUser(tgusr!);
                } else {
                    setUser(USER_MOCKED as WebAppUser);
                }
            } else {
                setWebApp(null);
            }
            setLoading(false);
        }

        try{
            initUser();
        } catch(e) {
            setLoading(false);
        }

    }, []);

    return { webApp, isTelegram, user, loading };
}

const USER_MOCKED = {
    id: 1234, 
    first_name: "Name_mocked", 
    last_name: "Lastname_mocked", 
    username: "username_mocked", 
    language_code: "ru", 
    photo_url: "photo_url_mocked", 
    is_premium: false
} as TelegramUser;