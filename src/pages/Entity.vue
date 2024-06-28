<template>
  <node v-if="data">
    <node :x="170" onUp="entityActions.setFocus" onEscape="onEscape">
      <ContentBlock :y="260" :content="data.heroContent"></ContentBlock>
      <Row
        ref="entityActions"
        :y="500"
        :height="90"
        :width="640"
        :gap="40"
        onDown="columnRef.setFocus"
      >
        <Button :width="300" autofocus="true">Play</Button>
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
          <Text skipFocus="true" :style="RowTitle">Recommendations</Text>
          <TileRow
            onFocus="onRowFocus"
            onEnter="onEnter"
            :items="recommendations"
            :width="1620"
          />
          <Text skipFocus :style="RowTitle">Cast and Crew</Text>
          <TileRow
            onFocus="onRowFocusAnimate"
            onEnter="onEnter"
            :items="credits"
            :width="1620"
          />
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
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { setActiveElement } from "@lightningtv/vue";
import Column from "../components/Column";
import Row from "../components/Row";
import Button from "../components/Button";
import { TileRow } from "../components";
import { setGlobalBackground } from "../state";
import ContentBlock from "../components/ContentBlock";
import styles from "../styles";
import * as provider from "../api/providers/entity";
import { assertTruthy } from "@lightningjs/renderer/utils";
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

const fetchData = async () => {
  data.value = await provider.getInfo({ ...route.params });
  credits.value = await provider.getCredits({ ...route.params });
  recommendations.value = await provider.getRecommendations({
    ...route.params,
  });
};

onMounted(fetchData);

watch(
  data,
  (newData) => {
    setGlobalBackground(newData.backgroundImage);
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

function onEnter() {
  const entity = this.children.find((c) => c.states!.has("focus"));
  assertTruthy(entity && entity.href);
  router.push(entity.href);
}

let columnRef = ref(null);
let backdropRef = ref(null);
let entityActions = ref(null);
</script>
