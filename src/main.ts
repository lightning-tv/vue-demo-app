import { createApp, Config } from 'lightning-vue';
import App from './App.vue';
import coreExtensionModuleUrl from './AppCoreExtensions.js?importChunkUrl';

const logFps = true;
Config.debug = false;
Config.animationsEnabled = true;
Config.fontSettings.fontFamily = 'Ubuntu';
Config.fontSettings.color = 0xf6f6f6ff;
Config.fontSettings.fontSize = 32;
Config.rendererOptions = {
  coreExtensionModule: coreExtensionModuleUrl,
  fpsUpdateInterval: logFps ? 200 : 0,
  enableInspector: true,
  // deviceLogicalPixelRatio: 1
};

createApp(App);
