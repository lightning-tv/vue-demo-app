<script setup lang="ts">
import browseProvider from "../api/providers/browse";
import ContentBlock from "../components/ContentBlock.vue";
import Row from "../components/Row.vue";
import Column from "../components/Column.vue";
import NavDrawer from "../components/NavDrawer.vue";
import { ref, onMounted, watch } from "vue";
import { activeElement } from "@lightningtv/vue";
import { debounce } from "vue-debounce";

const alpha = ref(1);
const rows = ref([]);
const column = ref(null);
const navDrawer = ref(null);
const globalBackground = ref("");
const heroContent = ref({});
const bgStyles = {
  alpha: alpha.value,
  color: 0xffffffff,
};

const Thumbnail = {
  borderRadius: 16,
  width: 185,
  height: 278,
  scale: 1,
  zIndex: 2,
  transition: { scale: { duration: 250, easing: "ease-in-out" } },
  border: { width: 0, color: 0x00000000 },
  focus: { scale: 1.1, border: { color: 0xffffff66, width: 8 } },
};

const delayedBackgrounds = debounce(
  (img: string) => (globalBackground.value = img),
  400
);
const delayedHero = debounce(
  (content: {}) => (heroContent.value = content || {}),
  200
);

watch(
  () => activeElement.value,
  (elm, prevFocusedElm) => {
    if (elm && elm.item) {
      if (elm.item.backdrop) {
        delayedBackgrounds(elm.item.backdrop);
      }

      if (elm.item.heroContent) {
        delayedHero(elm.item.heroContent);
      }
    }
  }
);
onMounted(() => {
  browseProvider("all")(1).then((data) => {
    rows.value = data;
  });
});
</script>

<template>
  <ContentBlock
    :y="250"
    :x="150"
    :title="heroContent.title"
    :description="heroContent.description"
  />
  <Column
    ref="column"
    v-if="rows.length"
    :x="150"
    :y="450"
    :width="1920"
    :height="1080"
    :autofocus="true"
    :plinko="true"
  >
    <Row
      v-for="row in rows"
      :width="1620"
      :height="300"
      justifyContent="spaceBetween"
    >
      <node
        v-for="item in row"
        :style="Thumbnail"
        :src="item.src"
        :item="item"
      />
    </Row>
  </Column>
</template>
