<template>
  <node v-if="data">
    <node :x="170" onUp="focusEntity" onEscape="onEscape">
      <ContentBlock
        :y="260"
        :title="data.heroContent.title"
        :description="data.heroContent.description"
      ></ContentBlock>
      <Row
        ref="entityActions"
        :y="500"
        :height="90"
        :width="640"
        :gap="40"
        :onDown="focusColumn"
      >
        <Button :width="300" :autofocus="true">Play</Button>
        <Button :width="300">Resume</Button>
      </Row>

      <Column
        ref="columnRef"
        :x="0"
        :y="columnY"
        :style="styles.Column"
        :height="880"
        :zIndex="5"
      >
        <template v-if="recommendations && credits">
          <text skipFocus="true" :style="RowTitle">Recommendations</text>
          <Row
            :onFocus="onRowFocus"
            :onEnter="onEnter"
            :width="1620"
            justifyContent="spaceBetween"
          >
            <node
              v-for="item in recommendations"
              :style="styles.Thumbnail"
              :src="item.src"
              :item="item"
            />
          </Row>
          <text skipFocus :style="RowTitle">Cast and Crew</text>
          <Row :onFocus="onRowFocusAnimate" :onEnter="onEnter" :width="1620">
            <node
              v-for="item in credits"
              :style="styles.Thumbnail"
              :src="item.src"
              :item="item"
              justifyContent="spaceBetween"
            />
          </Row>
        </template>
      </Column>
      <node
        ref="backdropRef"
        :style="Backdrop"
        :transition="{ alpha: true, y: true }"
      />
    </node>
    <node
      :alpha="backdropAlpha"
      :color="'#000000'"
      skipFocus
      :zIndex="200"
      :transition="{ alpha: true }"
    />
  </node>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import Row from "../components/Row.vue";
import Column from "../components/Column.vue";
import ContentBlock from "../components/ContentBlock.vue";
import Button from "../components/Button.vue";
import * as styles from "../styles.js";
import * as provider from "../api/providers/entity";
import { assertTruthy } from "@lightningjs/renderer/utils";
import { globalBackground } from "../state";
import type { Tile } from "../api/formatters/ItemFormatter";

const route = useRoute();
const router = useRouter();
const data = ref(null);
const credits = ref(null);
const recommendations = ref(null);
const backdropAlpha = ref(0);

const RowTitle = {
  height: 60,
  width: 300,
  marginBottom: -40,
  fontSize: 36,
  color: "#f0f0f0",
  zIndex: 2,
};

watchEffect(async () => {
  data.value = await provider.getInfo(route.params);
  credits.value = await provider.getCredits(route.params);
  recommendations.value = await provider.getRecommendations(route.params);
});

watch(
  data,
  (newData) => {
    globalBackground.value = newData?.backgroundImage;
  },
  { immediate: true }
);

const columnY = 640;

const Backdrop = {
  color: "#000000",
  alpha: 0,
  width: 1900,
  height: 890,
  x: -160,
  y: columnY,
  borderRadius: 30,
};

function onRowFocus() {
  this.children.selected?.setFocus();
  columnRef.value.y = columnY;
  backdropRef.value.y = columnY;
  backdropRef.value.alpha = 0;
}

function onRowFocusAnimate() {
  this.children.selected?.setFocus();
  columnRef.value.y = 200;
  backdropRef.value.y = 160;
  backdropRef.value.alpha = 0.9;
}

function focusColumn() {
  columnRef.value.$el.setFocus();
}

function focusEntity() {
  entityActions.value.$el.setFocus();
}

function onEnter() {
  const entity = this.children.find((c) => c.states!.has("focus"));
  assertTruthy(entity && entity.href);
  router.push(entity.href);
}

let columnRef = ref(null);
let backdropRef = ref(null);
let entityActions = ref(null);
</script>
