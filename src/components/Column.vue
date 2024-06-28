<template>
  <node
    :onUp="handleUp"
    :onDown="handleDown"
    :forwardFocus="onGridFocus"
    :selected="props.selected"
    :selectedChanged="handleSelectedChanged"
    :style="[style, props.style]"
  >
    <slot />
  </node>
</template>

<script setup lang="ts">
import { handleNavigation, onGridFocus } from "./utils/handleNavigation";
import { chainFunctions } from "./utils/chainFunctions";
import { withScrolling } from "./utils/withScrolling";

const props = defineProps({
  selected: {
    type: Number,
    default: 0,
  },
  scrollIndex: Number,
  onUp: Function,
  onDown: Function,
  onLayout: Function,
  onSelectedChanged: Function,
  scroll: String,
  style: Object,
});

const handleUp = chainFunctions(props.onUp, handleNavigation("up"));
const handleDown = chainFunctions(props.onDown, handleNavigation("down"));

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
  flexDirection: "column",
  gap: 30,
  transition: {
    y: {
      easing: "ease-in-out",
      duration: 250,
    },
  },
};
</script>
