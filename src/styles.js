import theme from "theme";

export const Thumbnail = {
  borderRadius: 16,
  width: 185,
  height: 278,
  scale: 1,
  zIndex: 2,
  transition: { scale: { duration: 250, easing: "ease-in-out" } },
  border: { width: 0, color: 0x00000000 },
  focus: { scale: 1.1, border: { color: 0xffffff66, width: 8 } },
};

export const Column = {
  flexBoundary: "contain",
  gap: 64,
  width: theme.layout.screenW - 2 * theme.layout.marginX,
  x: theme.layout.marginX + theme.layout.gutterX,
  y: 48,
  transition: { y: { duration: 250, easing: "ease-in-out" } },
  zIndex: 2,
};
