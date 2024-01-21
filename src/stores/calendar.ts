import { atom } from 'nanostores';

export const currentDate = atom<string>(new Date().toISOString());

export function setCurrentDate(value: Date) {
    currentDate.set(value.toISOString());
}