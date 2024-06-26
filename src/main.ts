import { createApp, Config } from '@lightningtv/vue';
import App from './App.vue';
import coreExtensionModuleUrl from './AppCoreExtensions.js?importChunkUrl';
import router from './router';

const logFps = false;
Config.debug = true;
Config.animationsEnabled = true;
Config.fontSettings.fontFamily = 'Roboto';
Config.fontSettings.color = 0xf6f6f6ff;
Config.fontSettings.fontSize = 32;
Config.rendererOptions = {
  coreExtensionModule: coreExtensionModuleUrl,
  fpsUpdateInterval: logFps ? 200 : 0,
  enableInspector: true,
  // deviceLogicalPixelRatio: 1
};

createApp(App).then(({app, rootNode}) => {
  app.use(router);
  app.mount(rootNode);
});