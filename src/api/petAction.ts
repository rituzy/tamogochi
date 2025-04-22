import { ROOT_URL } from "./constants.ts"
import { Pet } from "../types/types.ts"

export const petAction = async (petState: Pet | null, path: string): Promise<Pet | null> => {
    if (!petState || !petState.id) {
        return null;
    }
    const pid = {
        "petId": petState.id,
    };
    const rawResponsePet = await fetch(ROOT_URL + path, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(pid)
    })
        .then(function (response) {
            return response.json();
        });

    const petData = rawResponsePet.pet as Pet;
    console.log("Pet result: ");
    console.log(petData);
    return petData as Pet;
}