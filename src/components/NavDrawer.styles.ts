import { hexColor } from "@lightningtv/vue";

export default {
  Column: {
    flexDirection: "column",
    display: "flex",
    width: 140,
    height: 600,
    y: 360,
    gap: 20,
    zIndex: 101,
    transition: {
      x: {
        duration: 250,
        easing: "ease-in-out",
      },
    },
    x: 8,
    focus: {
      width: 500,
      x: 24,
    },
  } as const,
  Gradient: {
    zIndex: 99,
    color: "#000000",
    src: "./assets/sidenav.png",
    alpha: 0,
    width: 1200,
    height: 1080,
    focus: {
      alpha: 1,
    },
    transition: { alpha: true },
  } as const
};
