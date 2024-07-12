<template>
  <node
    :onLeft="handleLeft"
    :onRight="handleRight"
    :forwardFocus="onGridFocus"
    :selected="props.selected"
    :onSelectedChanged="selectedChanged"
    :style="[style, props.style]"
  >
    <slot></slot>
  </node>
</template>

<script setup lang="ts">
import { handleNavigation, onGridFocus } from "./utils/handleNavigation";
import { chainFunctions } from "./utils/chainFunctions";
import { withScrolling } from "./utils/withScrolling";

const props = defineProps({
  selected: {
    type: Number,
    default: null,
  },
  scrollIndex: Number,
  onLeft: Function,
  onRight: Function,
  onLayout: Function,
  onSelectedChanged: Function,
  scroll: String,
  style: Object,
});

const handleLeft = chainFunctions(props.onLeft, handleNavigation("left"));
const handleRight = chainFunctions(props.onRight, handleNavigation("right"));
const selectedChanged = chainFunctions(
  props.onSelectedChanged,
  props.scroll !== "none" ? withScrolling(props.x) : undefined
);

const handleLayout = (elm) => {
  const scrollFn = withScrolling(props.x);
  scrollFn.call(elm, elm, elm.children[elm.selected], elm.selected, undefined);
  if (props.onLayout) props.onLayout(elm);
};

const style = {
  display: "flex",
  flexBoundary: "fixed",
  flexDirection: "row",
  gap: 30,
  transition: {
    x: {
      easing: "ease-in-out",
      duration: 250,
    },
  },
};
</script>
