<template>
  <view
    :flexItem="false"
    :width="300"
    :height="150"
    :x="30"
    :y="15"
    :zIndex="105"
  >
    <text :x="80" :fontSize="28" fontFamily="Roboto">Built With:</text>
    <view :y="22" src="./assets/vue.png" :width="80" :height="80" />
    <view :x="0" :y="120" src="./assets/tmdb.png" :width="80" :height="41" />
    <text
      :x="90"
      :y="110"
      contain="width"
      :width="160"
      :fontSize="12"
      :color="0xf6f6f644"
    >
      This product uses the TMDB API but is not endorsed or certified by TMDB.
    </text>
  </view>
  <Column
    v-bind="$attrs"
    ref="column"
    :onFocus="onFocus"
    :onBlur="onBlur"
    :style="styles.Column"
    scroll="none"
  >
    <NavButton icon="trending" @enter="handleNavigate('/browse/all')">
      Trending
    </NavButton>
    <NavButton icon="movie" @enter="handleNavigate('/browse/movie')">
      Movies
    </NavButton>
    <NavButton icon="tv" @enter="handleNavigate('/browse/tv')">TV</NavButton>
    <NavButton icon="experiment" @enter="handleNavigate('/examples')">
      Examples
    </NavButton>
  </Column>
  <view skipFocus ref="backdrop" :style="styles.Gradient"></view>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import NavButton from "./NavButton.vue";
import Column from "./Column.vue";
import styles from "./NavDrawer.styles";

const props = defineProps({
  focusPage: Function,
});

const backdrop = ref(null);
const router = useRouter();
const route = useRoute();

function onFocus() {
  backdrop.value.states.add("focus");
  this.children.forEach((c) => c.states?.add("active"));
  this.children.selected.setFocus();
}

function onBlur() {
  backdrop.value.states.remove("focus");
  this.selected = 0;
  this.children.forEach((c) => c.states?.remove("active"));
}

function handleNavigate(page) {
  if (route.path === page) {
    return props.focusPage();
  }
  router.push(page);
}
</script>
