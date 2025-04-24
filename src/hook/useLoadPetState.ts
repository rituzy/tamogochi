import { useState, useEffect } from 'react';
import { useTelegram } from './useTelegram.ts'
import { fetchPetData } from '../api/fetchPetData.ts';
import { Pet } from "../types/types.ts"

export const useLoadPetState = () => {
    const { user } = useTelegram();
    const [petState, setPetState] = useState<Pet | null>(null);
    const [loadingPetState, setLoadingPetState] = useState<boolean>(true);

    useEffect(() => {
        const loadPetState = async () => {
            try {
                if (user) {
                    const result = await fetchPetData(user);
                    setPetState(result as Pet);
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoadingPetState(false);
            }
        };

        loadPetState();
    }, [user]);

    return { petState, loadingPetState };
}