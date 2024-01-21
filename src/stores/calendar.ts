import { atom } from 'nanostores';

export const currentDate = atom<null | string>(null);

export function setCurrentDate(value: null | string) {
    currentDate.set(value);
}