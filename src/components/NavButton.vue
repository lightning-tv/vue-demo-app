<template>
  <view :style="navButtonStyles" v-bind="props" :forwardStates>
    <view :y="-16">
      <Icon :scale="0.5" :name="props.icon" />
    </view>
    <text :style="textStyle"><slot /></text>
  </view>
</template>

<script setup lang="ts">
import { hexColor } from "@lightningtv/vue";
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
  fontSize: "38px",
  x: "116px",
  y: "18px",
  height: "50px",
  alpha: 0,
  active: {
    alpha: 1,
  },
};
</script>
