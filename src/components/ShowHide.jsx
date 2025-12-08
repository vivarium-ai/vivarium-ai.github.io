// src/components/ShowHide.jsx
import { onMount, onCleanup } from "solid-js";

/**
 * Props:
 * - targetId: ID of the element to show/hide (e.g. menu or panel)
 * - toggleId: ID of the clickable control element (e.g. button)
 * - showIconId: ID of icon shown when target is HIDDEN
 * - hideIconId: ID of icon shown when target is VISIBLE
 * - initialOpen (optional): boolean to force initial open state
 */
export default function ShowHide(props) {
  onMount(() => {
    const target = document.getElementById(props.targetId);
    const toggle = document.getElementById(props.toggleId);
    const showIcon = props.showIconId
      ? document.getElementById(props.showIconId)
      : null;
    const hideIcon = props.hideIconId
      ? document.getElementById(props.hideIconId)
      : null;

    if (!target || !toggle) {
      console.warn(
        "[ShowHide] Missing target or toggle element for IDs:",
        props.targetId,
        props.toggleId
      );
      return;
    }

    if (toggle.dataset.showhideWired === "1") {
      return;
    }
    toggle.dataset.showhideWired = "1";

    let open =
      typeof props.initialOpen === "boolean"
        ? props.initialOpen
        : !target.classList.contains("hidden");

    const update = () => {
      if (open) {
        target.classList.remove("hidden");
        toggle.setAttribute("aria-expanded", "true");
        if (showIcon) showIcon.classList.add("hidden");
        if (hideIcon) hideIcon.classList.remove("hidden");
      } else {
        target.classList.add("hidden");
        toggle.setAttribute("aria-expanded", "false");
        if (showIcon) showIcon.classList.remove("hidden");
        if (hideIcon) hideIcon.classList.add("hidden");
      }
    };

    const handler = () => {
      open = !open;
      update();
    };

    toggle.addEventListener("click", handler);
    update();

    onCleanup(() => {
      toggle.removeEventListener("click", handler);
    });
  });

  // Pure behavior, no DOM from here.
  return null;
}
