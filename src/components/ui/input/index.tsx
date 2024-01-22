import {ReactNode} from 'react';
import {TextInput, TextInputProps} from 'react-native';

type InputProps = {children: ReactNode} & TextInputProps;

export function Input({_, ...props}: InputProps) {
  return <TextInput {...props} />;
}
