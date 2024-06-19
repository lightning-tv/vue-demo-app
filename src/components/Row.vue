<script setup>
import { handleNavigation, onGridFocus } from "./utils/handleNavigation";
import { chainFunctions } from "./utils/chainFunctions";
import { withScrolling } from "./utils/withScrolling";

const props = defineProps({
  selected: {
    type: Number,
    default: 0,
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

const handleLayout = (elm) => {
  const scrollFn = withScrolling(props.x);
  scrollFn.call(elm, elm, elm.children[elm.selected], elm.selected, undefined);
  if (props.onLayout) props.onLayout(elm);
};

const handleSelectedChanged = (selectedIndex) => {
  if (props.onSelectedChanged) props.onSelectedChanged(selectedIndex);
  if (props.scroll !== "none") withScrolling(props.x)(selectedIndex);
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

<template>
  <node
    v-bind="props"
    :onLeft="handleLeft"
    :onRight="handleRight"
    :forwardFocus="onGridFocus"
    :selectedChanged="handleSelectedChanged"
    :style="[style, props.style]"
  >
    <slot></slot>
  </node>
</template>
