<template>
  <node
    :debug="true"
    :style="{
      display: 'flex',
      flexDirection: 'row',
      gap: 18,
      width: 1200,
      height: 48,
    }"
  >
    <node :y="-4" src="./assets/stars.png" :width="188" :height="31"></node>
    <node
      :y="-4"
      :flexItem="false"
      :clipping="true"
      :width="(188 * voteAverage!) / 10"
      :height="31"
    >
      <node src="./assets/stars-full.png" :width="188" :height="31"></node>
    </node>
    <text :style="MetaTextStyle">{{ voteCount }} reviews</text>
    <text :style="MetaTextStyle">{{ metaText }}</text>
  </node>
</template>

<script setup lang="ts">
defineProps({
  voteCount: Number,
  voteAverage: Number,
  metaText: String,
});

const MetaTextStyle = {
  fontSize: 24,
  fontFamily: "Roboto",
  fontWeight: 400,
};
</script>
