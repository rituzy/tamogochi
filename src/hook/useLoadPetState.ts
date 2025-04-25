import { useState, useEffect } from 'react';
import { useTelegram } from './useTelegram.ts';
import { fetchPetData } from '../api/fetchPetData.ts';
import { Pet } from '../types/types.ts';

export const useLoadPetState = () => {
    const { user, loading: loadingUser } = useTelegram();
    const [petState, setPetState] = useState<Pet | null>(null);
    const [loadingPetState, setLoadingPetState] = useState<boolean>(true);

    useEffect(() => {
        if (!user || loadingUser) {
            return;
        }

        const loadPetState = async () => {
            try {
                console.log("Fetching pet data for user:", user);
                const result = await fetchPetData(user);
                console.log("Pet data received:", result);
                setPetState(result as Pet);
            } catch (error) {
                console.error('Error fetching pet data:', error);
            } finally {
                setLoadingPetState(false);
            }
        };

        loadPetState();
    }, [user, loadingUser]);

    return {petState, setPetState, loadingPetState };
};