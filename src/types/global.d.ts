/// <reference types="nativewind/types" />

declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

// Bypass strict type checking for side-effect imports
declare module 'react-native-url-polyfill/auto';