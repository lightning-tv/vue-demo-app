<script setup lang="ts">
import browseProvider from "../api/providers/browse";
import { useInfiniteScroll } from "../components/utils/useInfiniteScroll";
import ContentBlock from "../components/ContentBlock.vue";
import Row from "../components/Row.vue";
import Column from "../components/Column.vue";
import { ref, watch } from "vue";
import { ElementNode, activeElement } from "@lightningtv/vue";
import { debounce } from "vue-debounce";
import { useRouter } from "vue-router";

const column = ref(null);
const globalBackground = ref("");
const heroContent = ref({});
const columnY = ref(0);

const itemsContainer = {
  width: 1920,
  height: 800,
  y: 560,
  x: 0,
  zIndex: 2,
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

function onRowFocus(this: ElementNode) {
  this.children.selected?.setFocus();
  columnY.value = (this.y || 0) * -1 + 24;
  let numPages = pages.value.length;
  this.parent!.selected = this.parent!.children.indexOf(this);

  if (
    numPages === 0 ||
    (this.parent.selected && this.parent.selected >= numPages - 2)
  ) {
    page.value = page.value + 1;
  }
}

const router = useRouter();
function onEnter(this: ElementNode, event, elm, focusedElm) {
  if (focusedElm.item?.href) {
    router.push(focusedElm.item.href);
  }
}

const { pages, page } = useInfiniteScroll(browseProvider("all"));
page.value = 1;
</script>

<template>
  <ContentBlock
    :y="360"
    :x="162"
    :title="heroContent.title"
    :description="heroContent.description"
  />
  <view clipping="true" :style="itemsContainer">
    <Column
      ref="column"
      v-if="pages.length"
      :x="150"
      :y="columnY"
      :width="1920"
      :height="1080"
      :autofocus="true"
      :plinko="true"
      :onEnter="onEnter"
    >
      <Row
        v-for="row in pages"
        :width="1620"
        :height="300"
        :onFocus="onRowFocus"
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
  </view>
</template>
