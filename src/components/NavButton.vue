<template>
  <view :style="navButtonStyles" v-bind="props" forwardStates="true">
    <view :y="-16">
      <Icon :scale="0.5" :name="props.icon" />
    </view>
    <text :style="textStyle"><slot /></text>
  </view>
</template>

<script setup lang="ts">
import Icon from "./Icon.vue";

const props = defineProps(["icon"]);

const navButtonStyles = {
  zIndex: 102,
  height: 70,
  width: 100,
  borderRadius: 8,
  focus: {
    color: "#424242",
  },
  active: {
    width: 328,
    height: 70,
  },
} as const;

const textStyle = {
  fontSize: 38,
  x: 116,
  y: 18,
  height: 50,
  alpha: 0,
  active: {
    alpha: 1,
  },
};
</script>
