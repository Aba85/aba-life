import React, { useEffect } from 'react';
import { View, Platform } from 'react-native';
import * as ScreenCapture from 'expo-screen-capture';

export default function NoScreenshotView({ children }) {
  useEffect(() => {
    if (Platform.OS === 'android') {
      ScreenCapture.preventScreenCaptureAsync();
    }

    return () => {
      if (Platform.OS === 'android') {
        ScreenCapture.allowScreenCaptureAsync();
      }
    };
  }, []);

  return <View style={{ flex: 1 }}>{children}</View>;
}
