import React from "react";
import {
  Canvas,
  Rect,
  LinearGradient as LinearGradientBase,
  Skia,
  Shader,
  vec
} from "@shopify/react-native-skia";

export function LinearGradient() {
  return (
    <Canvas style={{ flex: 1, height: 1000 }}>
      <Rect x={0} y={0} width={100} height={100}>
        <LinearGradientBase
          start={vec(0, 0)}
          end={vec(256, 256)}
          colors={["blue", "yellow"]}
        />
      </Rect>
    </Canvas>
  );
};