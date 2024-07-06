import { createApp, Config } from '@lightningtv/vue';
import App from './App.vue';
import router from './router';
import loadFonts from './loadFonts.js';

const logFps = false;
Config.debug = false;
Config.animationsEnabled = true;
Config.fontSettings.fontFamily = 'Roboto';
Config.fontSettings.color = 0xf6f6f6ff;
Config.fontSettings.fontSize = 32;
Config.rendererOptions = {
  fpsUpdateInterval: logFps ? 200 : 0,
  enableInspector: false,
  numImageWorkers: 0,
  // deviceLogicalPixelRatio: 1
};

const {app, rootNode, renderer} = createApp(App);
app.use(router);
loadFonts(renderer.stage);
app.mount(rootNode);
