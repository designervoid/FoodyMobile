import React, {useMemo} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

type ButtonVariant = 'default' | 'green';

export interface ButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariant;
  children: React.ReactNode;
  onPress?: () => void;
  style?: object;
  textStyle?: StyleProp<TextStyle>;
}

const styles = StyleSheet.create({
  button: {
    height: 60,
    // paddingHorizontal: 30,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
  },
  buttonText: {
    lineHeight: 56,
    fontSize: 18,
    textTransform: 'uppercase',
    color: '#FFFFFF',
    fontWeight: '600',
  },
  green: {
    backgroundColor: '#3AC2C3',
  },
});

export const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  children,
  onPress,
  style,
  textStyle,
  ...props
}) => {
  const buttonStyle = useMemo(() => {
    return [styles.button, variant === 'green' && styles.green, style];
  }, [variant, style]);
  const buttonTextStyles = useMemo(
    () => [styles.buttonText, textStyle],
    [textStyle],
  );

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress} {...props}>
      <Text style={buttonTextStyles}>{children}</Text>
    </TouchableOpacity>
  );
};
