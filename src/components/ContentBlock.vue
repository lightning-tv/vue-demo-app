<template>
  <node id="contentBlock" :style="ContentBlockStyle">
    <text :style="HeadlineStyles">{{ content.title }}</text>
    <text :style="DescriptionStyles">{{ content.description }}</text>
    <Metadata
      v-if="content && content.voteCount"
      :metaText="content.metaText"
      :badges="content.badges"
      :voteCount="content.voteCount"
      :voteAverage="content.voteAverage"
    />
  </node>
</template>

<script setup lang="ts">
import Metadata from "./Metadata.vue";
defineProps({
  content: Object,
});

const blockWidth = 1200;
const ContentBlockStyle = {
  display: "flex",
  flexDirection: "column",
  flexBoundary: "fixed",
  width: blockWidth,
  height: 220,
  gap: 16,
};

const HeadlineStyles = {
  fontSize: 50,
  fontFamily: "Roboto",
  fontWeight: 700,
  maxLines: 1,
  width: blockWidth,
  contain: "width",
};

const DescriptionStyles = {
  fontSize: 28,
  fontFamily: "Roboto",
  fontWeight: 400,
  lineHeight: 32,
  width: blockWidth,
  maxLines: 3,
  contain: "width",
};
</script>
