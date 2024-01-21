import { atom } from 'nanostores';

export const currentDate = atom<Date>(new Date());

export function setCurrentDate(value: Date) {
    currentDate.set(value);
}