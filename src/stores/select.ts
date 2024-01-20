import { MeasureOnSuccessCallback } from 'react-native';
import { atom } from 'nanostores';

type ParametersMeasureOnSuccessCallback = Parameters<MeasureOnSuccessCallback>;

type ButtonPosition = {
    width: ParametersMeasureOnSuccessCallback[2];
    height: ParametersMeasureOnSuccessCallback[3];
    x: ParametersMeasureOnSuccessCallback[4];
    y: ParametersMeasureOnSuccessCallback[5];
}

export const modalVisible = atom(false);

export function setModalVisible(value: boolean) {
    modalVisible.set(value);
}

export const selectedValue = atom("Choose the option");

export function setSelectedValue(value: string) {
    selectedValue.set(value);
}

export const buttonPosition = atom<ButtonPosition>({} as ButtonPosition);

export function setButtonPosition(position: ButtonPosition) {
    buttonPosition.set(position);
}