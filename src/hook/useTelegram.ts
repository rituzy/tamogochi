import { useEffect, useState } from "react"

const testUser = {
    id: 1234,
    first_name: "Zafod",
    last_name: "Bibblebrox",
    username: "zbibblebrox",
    language_code: "ru",
    photo_url: "",
    is_premium: false,
};

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
                    setUser(testUser as WebAppUser);
                }
            } else {
                setWebApp(null);
            }

            setLoading(false);

        }
        initUser();
        
    }, []);

    return {webApp, isTelegram, user, loading};

}