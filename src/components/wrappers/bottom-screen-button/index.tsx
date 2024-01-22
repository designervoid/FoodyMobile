import React from 'react';
import {Dimensions, Platform, StyleSheet} from 'react-native';

import {Button, ButtonProps} from 'components/ui/button';
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context';

interface Props extends ButtonProps {}

export function BottomScreenButton({children, ...otherProps}: Props) {
  const insets = useSafeAreaInsets();
  const styles = stylesDynamic(insets);

  return (
    <Button {...otherProps} style={[styles.button, otherProps?.style]}>
      {children}
    </Button>
  );
}

export const stylesDynamic = ({bottom}: EdgeInsets) =>
  StyleSheet.create({
    container: {
      display: 'flex',
      flex: 1,
      height: Dimensions.get('window').height,
    },
    button: {
      position: 'absolute',
      bottom: Platform.OS === 'ios' ? bottom : 10,
      width: Dimensions.get('window').width - 30 * 2,
    },
  });
