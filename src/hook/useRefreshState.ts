import { useEffect } from 'react';
import { petAction } from '../api/petAction.ts'
import { Pet } from "../types/types.ts"

export const useRefreshPetState = (petState: Pet | null, setPetState: (pet: Pet) => void) => {
  useEffect(() => {
    if (!petState) return;
    const interval = setInterval(() => {
      petAction(petState, "/api/pets/state").then(data => {
        if (data) {
          setPetState(data as Pet);
        }
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [petState]);
};