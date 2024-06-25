<script setup lang="ts">
import browseProvider from "./api/providers/browse";
import ContentBlock from "./components/ContentBlock.vue";
import Row from "./components/Row.vue";
import Column from "./components/Column.vue";
import NavDrawer from "./components/NavDrawer.vue";
import { useFocusManager } from "./keyhandling";
import { ref, onMounted, watch } from "vue";
import { activeElement } from "@lightningtv/vue";
import { debounce } from "vue-debounce";
import { RouterView } from "vue-router";

useFocusManager();
const alpha = ref(1);
const rows = ref([]);
const column = ref(null);
const navDrawer = ref(null);
const globalBackground = ref("");
const heroContent = ref({});
const bgStyles = {
  alpha: alpha.value,
  color: 0xffffffff,
};

const delayedBackgrounds = debounce(
  (img: string) => (globalBackground.value = img),
  400
);
const delayedHero = debounce(
  (content: {}) => (heroContent.value = content || {}),
  200
);

watch(
  () => activeElement.value,
  (elm, prevFocusedElm) => {
    if (elm && elm.item) {
      if (elm.item.backdrop) {
        delayedBackgrounds(elm.item.backdrop);
      }

      if (elm.item.heroContent) {
        delayedHero(elm.item.heroContent);
      }
    }
  }
);
</script>

<template>
  <node :style="{ width: 1920, height: 1080 }">
    <RouterView />
    <NavDrawer
      ref="navDrawer"
      focusPage="lastFocused.setFocus"
      showWidgets="showWidgets()"
    />
    <node :width="1920" :height="1080" :zIndex="-5">
      <node ref="bg1" :src="globalBackground" :style="bgStyles" />
      <node ref="bg2" :style="bgStyles" alpha="0" />
      <node
        src="./assets/hero-mask-inverted.png"
        :color="0x000000ff"
        :width="1920"
        :height="1080"
      />
    </node>
  </node>
</template>
