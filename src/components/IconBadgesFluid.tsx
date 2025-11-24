import { createEffect, createMemo, createSignal, For, onCleanup, onMount } from "solid-js";
import { Motion } from "solid-motionone";
import { forceSimulation, forceManyBody, forceCenter, forceCollide, forceX, forceY } from "d3-force";
import IconBadge from "./IconBadge";

type Badge = { id: string; src: string; alt: string; href: string };

export default function IconBadgesFluid(props: { badges: Badge[]; height?: number }) {
  let container!: HTMLDivElement;
  const height = () => props.height ?? 220;

  const [bounds, setBounds] = createSignal({ w: 0, h: height() });
  const [hovered, setHovered] = createSignal(false);
  const [tick, setTick] = createSignal(0);

  const [reducedMotion, setReducedMotion] = createSignal(false);

  onMount(() => {
    setReducedMotion(
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false
    );
  });

  const nodes = props.badges.map((b) => ({
    ...b,
    x: 0, y: 0, vx: 0, vy: 0,
    r: 32 + Math.random() * 10,
    homeX: 0, homeY: 0,
  }));

  let sim: any;

  function measureAndHome() {
    const rect = container.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    setBounds({ w, h });

    const cols = Math.max(2, Math.floor(w / 80));
    const xGap = w / cols;
    const rows = Math.ceil(nodes.length / cols);
    const yGap = h / Math.max(1, rows);

    nodes.forEach((n, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      n.homeX = (col + 0.5) * xGap;
      n.homeY = (row + 0.5) * yGap;
      n.x = n.homeX;
      n.y = n.homeY;
    });
  }

  onMount(() => {
    measureAndHome();

    const ro = new ResizeObserver(() => {
      measureAndHome();
      sim?.alpha(1).restart();
    });
    ro.observe(container);
    onCleanup(() => ro.disconnect());

    sim = forceSimulation(nodes)
      .alphaDecay(0.08)
      .velocityDecay(0.35)
      .force("charge", forceManyBody().strength(() => (hovered() ? -140 : -80)))
      .force("collide", forceCollide().radius((d: any) => d.r * 1.05).strength(0.9))
      .force("center", forceCenter(bounds().w / 2, bounds().h / 2))
      .force("homeX", forceX((d: any) => d.homeX).strength(hovered() ? 0.05 : 0.12))
      .force("homeY", forceY((d: any) => d.homeY).strength(hovered() ? 0.05 : 0.12))
      .stop();

    let raf = 0;
    const step = () => {
      sim.tick();
      setTick((t) => t + 1); // trigger Solid update
      raf = requestAnimationFrame(step);
    };
    if (!reducedMotion()) raf = requestAnimationFrame(step);
    onCleanup(() => cancelAnimationFrame(raf));
  });

  createEffect(() => tick()); // depend on ticks so animate props update

  return (
    <div
      ref={container}
      class="relative w-full overflow-hidden rounded-2xl bg-bg/40 ring-1 ring-fg/10 shadow-sm p-4"
      style={{ height: `${height()}px` }}
      onMouseEnter={() => { setHovered(true); sim?.alpha(1).restart(); }}
      onMouseLeave={() => { setHovered(false); sim?.alpha(1).restart(); }}
    >
      <For each={nodes}>
        {(n) => {
          const size = n.r * 2;
          return (
            <Motion.div
              class="absolute will-change-transform"
              animate={{
                transform: `translate(${n.x - n.r}px, ${n.y - n.r}px)`,
              }}
              transition={{
                duration: reducedMotion() ? 0.2 : 0.35,
                easing: "ease-out",
              }}
            >
              <IconBadge src={n.src} alt={n.alt} href={n.href} size={size} />
            </Motion.div>
          );
        }}
      </For>
    </div>
  );
}
