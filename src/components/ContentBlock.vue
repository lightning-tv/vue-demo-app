<template>
   <node id="contentBlock" :style="ContentBlockStyle">
    <text :style="HeadlineStyles">{{title}}</text>
    <text :style="DescriptionStyles">{{description}}</text>
  </node>
</template>

<script setup>
defineProps({
  title: String,
  description: String
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
  fontFamily: "Ubuntu",
  fontWeight: 700,
  maxLines: 1,
  width: blockWidth,
  contain: "width",
};

const DescriptionStyles = {
  fontSize: 28,
  fontFamily: "Ubuntu",
  fontWeight: 400,
  lineHeight: 32,
  width: blockWidth,
  maxLines: 3,
  contain: "width",
};
</script>
