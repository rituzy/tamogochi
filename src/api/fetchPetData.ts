import { ROOT_URL } from "./constants.ts"
import { Pet } from "../types/types.ts"

export const fetchPetData = async (user) => {
    const responseJson = await fetch(ROOT_URL + "/login", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    })
        .then(function (response) {
            return response.json();
        })
    const message = responseJson.message;
    const userParsed = JSON.parse(message)
    const userId = userParsed.id;
    if (userId) {
        const rawResponsePet = await fetch(ROOT_URL + "/api/pets/my?userId=" + userId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(function (response) {
                return response.json();
            });

        const petData = rawResponsePet.message;
        console.log('pet content: ');
        console.log(petData);
        return petData as Pet;
    }
}