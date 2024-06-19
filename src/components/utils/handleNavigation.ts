import { ElementNode } from '@lightningtv/vue';

export type KeyHandlerReturn = boolean | void;

export type KeyHandler = (
  this: ElementNode,
  e: KeyboardEvent,
  target: ElementNode,
  handlerElm: ElementNode,
) => KeyHandlerReturn;

export function onGridFocus(this: ElementNode) {
  if (!this || this.selected === undefined || this.children.length === 0)
    return false;
  let child = this.children[this.selected];
  while (child?.skipFocus) {
    this.selected++;
    child = this.children[this.selected];
  }
  if (!(child instanceof ElementNode)) return false;
  child.setFocus();
  return true;
}

export function handleNavigation(
  direction: 'up' | 'right' | 'down' | 'left',
): KeyHandler {
  return function () {
    const numChildren = this.children.length;
    const wrap = this.wrap;
    const lastSelected = this.selected || 0;

    if (numChildren === 0) {
      return false;
    }

    if (direction === 'right' || direction === 'down') {
      do {
        this.selected = ((this.selected || 0) % numChildren) + 1;
        if (this.selected >= numChildren) {
          if (!wrap) {
            this.selected = undefined;
            break;
          }
          this.selected = 0;
        }
      } while (this.children[this.selected]?.skipFocus);
    } else if (direction === 'left' || direction === 'up') {
      do {
        this.selected = ((this.selected || 0) % numChildren) - 1;
        if (this.selected < 0) {
          if (!wrap) {
            this.selected = undefined;
            break;
          }
          this.selected = numChildren - 1;
        }
      } while (this.children[this.selected]?.skipFocus);
    }

    if (this.selected === undefined) {
      this.selected = lastSelected;
      if (this.children[this.selected]?.states!.has('focus')) {
        // This child is already focused, so bubble up to next handler
        return false;
      }
    }
    const active = this.children[this.selected] as ElementNode;
    this.onSelectedChanged &&
      this.onSelectedChanged.call(
        this,
        this,
        active,
        this.selected,
        lastSelected,
      );

    if (this.plinko && lastSelected !== undefined) {
      // Set the next item to have the same selected index
      // so we move up / down directly
      const lastSelectedChild = this.children[lastSelected] as ElementNode;
      const num = lastSelectedChild.selected || 0;
      active.selected =
        num < active.children.length ? num : active.children.length - 1;
    }
    active.setFocus();
    return true;
  };
}
