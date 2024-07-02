<template>
  <node
    v-bind="props"
    :style="[props.style, styles.Container.base]"
    :forwardStates="true"
  >
    <text :style="styles.Text"><slot></slot></text>
  </node>
</template>

<script setup lang="ts">
import theme from "theme";
const props = defineProps({
  style: Object,
});
const styles = {
  Container: {
    base: {
      height: 92,
      display: "flex",
      padding: [50, 30],
      color: 0xffffff1a,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 4,
      contentColor: theme.color.fillNeutral,
      focus: {
        color: 0xffffffff,
      },
    },
  },
  Text: {
    fontSize: 24,
    color: 0xffffffff,
    focus: {
      color: 0x000000ff,
    },
  },
};
</script>
