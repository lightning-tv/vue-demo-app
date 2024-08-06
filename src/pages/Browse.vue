<script setup lang="ts">
import browseProvider from "../api/providers/browse";
import { useInfiniteScroll } from "../components/utils/useInfiniteScroll";
import ContentBlock from "../components/ContentBlock.vue";
import Row from "@lightningtv/vue/Row.vue";
import Column from "@lightningtv/vue/Column.vue";
import { ref, watch, watchEffect } from "vue";
import { ElementNode, activeElement } from "@lightningtv/vue";
import { debounce } from "vue-debounce";
import { useRouter } from "vue-router";
import { globalBackground } from "../state";
import * as styles from "../styles.js";

const column = ref(null);
const heroContent = ref({});
const columnY = ref(24);
const test = ref(false);

const props = defineProps(["filter"]);

const itemsContainer = {
  width: 1920,
  height: 800,
  y: 560,
  x: 0,
  zIndex: 2,
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
let pages, page;
watchEffect(() => {
  const result = useInfiniteScroll(browseProvider(props.filter || "all"));
  pages = result.pages;
  page = result.page;
  page.value = 1;
});
</script>

<template>
  <ContentBlock v-show="test" :y="360" :x="162" :content="heroContent" />
  <view clipping="true" :style="itemsContainer">
    <Column
      ref="column"
      v-if="pages.length"
      :x="150"
      :y="columnY"
      scroll="none"
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
          :style="styles.Thumbnail"
          :src="item.src"
          :item="item"
        />
      </Row>
    </Column>
  </view>
</template>
