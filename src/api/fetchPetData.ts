import { ROOT_URL } from "./constants.ts";
import { Pet } from "../types/types.ts";

export const fetchPetData = async (user: WebAppUser): Promise<Pet | null> => {
    if (!user || typeof user.id !== "number") {
        console.error("Invalid or missing user in fetchPetData:", user);
        return null;
    }

    try {
        // 1. Отправляем user на /login
        const loginResponse = await fetch(ROOT_URL + "/login", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        });

        if (!loginResponse.ok) {
            console.error("Login request failed with status:", loginResponse.status);
            return null;
        }

        const loginData = await loginResponse.json();
        const userParsed = JSON.parse(loginData.message);

        const userId = userParsed?.id;
        if (!userId) {
            console.error("User ID not found in login response:", userParsed);
            return null;
        }

        // 2. Запрашиваем питомца
        const petResponse = await fetch(`${ROOT_URL}/api/pets/my?userId=${userId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });

        if (!petResponse.ok) {
            console.error("Pet request failed with status:", petResponse.status);
            return null;
        }

        const petDataJson = await petResponse.json();
        const petData = petDataJson.message;

        return petData as Pet;
    } catch (error) {
        console.error("fetchPetData error:", error);
        return null;
    }
};