<template>
  <node
    v-bind="props"
    :color="props.backgroundColor"
    :contentColor="props.contentColor"
    :justifyContent="props.justify"
    :itemSpacing="props.contentSpacing"
    :style="[
      props.style,
      styles.Container.tones?.[props.tone ?? styles.tone],
      styles.Container.base,
    ]"
    forwardStates
  >
    <text><slot></slot></text>
  </node>
</template>

<script setup lang="ts">
const props = defineProps({
  backgroundColor: String,
  contentColor: String,
  justify: String,
  contentSpacing: Number,
  style: Object,
  tone: String,
});
const styles = {
  Container: {
    base: {}, // Add your base styles here
    tones: {
      // Add your tone styles here
    },
  },
  tone: "", // Default tone if any
};
</script>
