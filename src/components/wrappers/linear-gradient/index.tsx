import React from 'react';

import {
  Canvas,
  LinearGradient as LinearGradientBase,
  Rect,
  vec,
} from '@shopify/react-native-skia';

export function LinearGradient({percentage = 30}) {
  const fullWidth = 100;
  const gradientWidth = fullWidth;
  const greyOverlayWidth = fullWidth * (1 - percentage / 100);

  return (
    <Canvas style={{height: 8}}>
      <Rect x={0} y={0} width={gradientWidth} height={8}>
        <LinearGradientBase
          start={vec(0, 0)}
          end={vec(fullWidth, 8)}
          colors={['red', 'yellow', 'green']}
        />
      </Rect>
      <Rect
        x={fullWidth - greyOverlayWidth}
        y={0}
        width={greyOverlayWidth}
        height={8}
        color="lightgrey"
      />
    </Canvas>
  );
}
