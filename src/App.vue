<script setup lang="ts">
import NavDrawer from "./components/NavDrawer.vue";
import { useFocusManager } from "./keyhandling";
import { ref, onMounted, watch } from "vue";
import { ElementNode, activeElement } from "@lightningtv/vue";
import { debounce } from "vue-debounce";
import { RouterView } from "vue-router";
import { globalBackground } from "./state";

useFocusManager();
const alpha = 1;
const navDrawer = ref(null);
let active = 0;
const bg1 = ref(null);
const bg2 = ref(null);
const heroContent = ref({});
let lastFocused: ElementNode | undefined;
const bgStyles = {
  alpha,
  color: 0xffffffff,
};
const animationSettings = {
  duration: 550,
  easing: "ease-in-out",
};

function focusNavDrawer() {
  const column = navDrawer.value.$refs.column.$el;
  if (column.states.has("focus")) {
    return false;
  }
  lastFocused = activeElement.value;
  return column.setFocus();
}

function focusLastFocused() {
  const column = navDrawer.value.$refs.column.$el;
  return column.states.has("focus") && lastFocused?.setFocus();
}

watch(globalBackground, (img) => {
  changeBackgrounds(img);
});

function changeBackgrounds(img: string) {
  if (active === 0) {
    bg1.value.src = img;
    active = 1;
    return;
  }

  if (active === 1) {
    bg2.value.src = img;
    active = 2;
    bg2.value.alpha = 0;
    bg2.value.animate({ alpha }, animationSettings).start();
    bg1.value.animate({ alpha: 0 }, animationSettings).start();
    return;
  }

  if (active === 2) {
    bg1.value.src = img;
    active = 1;
    bg1.value.alpha = 0;
    bg1.value.animate({ alpha }, animationSettings).start();
    bg2.value.animate({ alpha: 0 }, animationSettings).start();
  }
}
</script>

<template>
  <node
    ref="{window.APP}"
    :onLast="() => history.back()"
    :onMenu="() => navigate('/')"
    :style="{ width: 1920, height: 1080 }"
    :onBackspace="focusNavDrawer"
    :onLeft="focusNavDrawer"
    :onRight="focusLastFocused"
  >
    <RouterView />
    <NavDrawer ref="navDrawer" :focusPage="() => lastFocused!.setFocus()" />
    <node :width="1920" :height="1080" :zIndex="-5">
      <node ref="bg1" :style="bgStyles" />
      <node ref="bg2" :style="bgStyles" :alpha="0" />
      <node
        src="./assets/hero-mask-inverted.png"
        :color="0x000000ff"
        :width="1920"
        :height="1080"
      />
    </node>
  </node>
</template>
