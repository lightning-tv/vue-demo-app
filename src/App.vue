<script setup>
  import browseProvider from "./api/providers/browse";
  import ContentBlock from "./components/ContentBlock.vue";
  import { useFocusManager } from "./keyhandling";
  import { handleNavigation } from "./handleNavigation";

  import { ref, onMounted } from 'vue';

  useFocusManager();
  const alpha = ref(1);
  const rows = ref([]);
  const column = ref(null);
  const bgStyles = {
    alpha: alpha.value,
    color: 0xffffffff,
  };

  const handleRight = handleNavigation('right');
  const handleLeft = handleNavigation('left');
  const handleUp = handleNavigation('up');
  const handleDown = handleNavigation('down');

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

  const DuneDescription = "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.";

  onMounted(() => {
    browseProvider('all')(1).then((data) => {
      rows.value = data;
      setTimeout(() => column.value.children[1].children[1].setFocus(), 100);
    });


  });
</script>


<template>
    <node :style="{width: 1920, height: 1080}">
      <node src="./assets/vue.png" :width="200" :height="200" :x="30" :y="20" />
      <ContentBlock :y="250" :x="150" title="Dune: Part 2" :description="DuneDescription" />
      <node ref="column" :onUp="handleUp" :onDown="handleDown" :x="150" :y="450" :width="1920" :height="1080" display="flex" flexDirection="column">
        <node v-for="row in rows" :onRight="handleRight" :onLeft="handleLeft" display="flex" justifyContent="spaceBetween" :width="1620" :height="300">
          <node v-for="item in row" :style="Thumbnail" :src="item.src" />
        </node>
      </node>
      <node :width="1920" :height="1080" :zIndex="-5">
        <node ref="bg1" src="https://image.tmdb.org/t/p/w1280/87IVlclAfWL6mdicU1DDuxdwXwe.jpg" :style="bgStyles" />
        <node ref="bg2" :style="bgStyles" alpha="0" />
        <node
          src="./assets/hero-mask-inverted.png"
          :color="0x000000ff"
          :width="1920"
          :height="1080"
        />
      </node>
    </node>
</template>
