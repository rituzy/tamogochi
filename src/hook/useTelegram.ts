import { useEffect, useState } from "react"

export const useTelegram = () => {
    const [webApp, setWebApp] = useState<WebApp | null>(null);
    const [isTelegram, setIsInTelegram] = useState<boolean>(false);
    const [user, setUser] = useState<WebAppUser>(null);

    useEffect(() => {
        const intiUser = () => {
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
                    setUser(tg.initDataUnsafe.user!);
                } else {
                    setUser({
                        id: 1234,
                        first_name: "Zafod",
                        last_name: "Bibblebrox",
                        username: "zbibblebrox",
                        language_code: "ru"
                    })
                }
            } else {
                setWebApp(null);
            }

        }

        intiUser();
        
    }, []);

    return {user, webApp, isTelegram};

}