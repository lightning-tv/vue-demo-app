<template>
  <view
    v-bind="props"
    :texture="sprite[props.name]"
    :width="sprite[props.name].props.width"
    :height="sprite[props.name].props.height"
    :x="(100 - (sprite[props.name].props.width || 0)) / 2"
    :y="(100 - (sprite[props.name].props.height || 0)) / 2"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { renderer } from "@lightningtv/vue";
import type { SpecificTextureRef } from "@lightningjs/renderer";

export interface SpriteDef {
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

function createSpriteMap(src: string, subTextures: SpriteDef[]) {
  const spriteMapTexture = renderer.createTexture("ImageTexture", {
    src,
  });

  return subTextures.reduce<Record<string, SpecificTextureRef<"SubTexture">>>(
    (acc, t) => {
      const { x, y, width, height } = t;
      acc[t.name] = renderer.createTexture("SubTexture", {
        texture: spriteMapTexture,
        x,
        y,
        width,
        height,
      });
      return acc;
    },
    {}
  );
}

const props = defineProps(["name"]);

const basePath = import.meta.env.BASE_URL;
const icons = ref([
  { name: "experiment", width: 81, height: 100, x: 0, y: 0 },
  { name: "trending", width: 100, height: 56, x: 81, y: 0 },
  { name: "tv", width: 100, height: 68, x: 181, y: 0 },
  { name: "movie", width: 94, height: 100, x: 282, y: 0 },
]);

const sprite = createSpriteMap(
  basePath + "assets/icons_white.png",
  icons.value
);
</script>
