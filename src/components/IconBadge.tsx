import { JSX } from "solid-js";

export type IconBadgeProps = {
  src: string;
  alt: string;
  href: string;
  size?: number; // px
  class?: string;
  style?: JSX.CSSProperties;
};

/**
 * A circular clickable logo badge.
 * - Accessible: alt text + focus ring
 * - Polished hover/active states
 * - Size controllable via prop
 */
export default function IconBadge(props: IconBadgeProps) {
  const size = () => props.size ?? 64;

  return (
    <a
      href={props.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={props.alt}
      class={[
        "group block rounded-full bg-bg/60 ring-1 ring-fg/10",
        "shadow-sm backdrop-blur-sm",
        "transition-transform duration-200 ease-out",
        "hover:scale-[1.06] hover:ring-fg/25 hover:shadow-md",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70",
        "active:scale-[0.98]",
        props.class ?? "",
      ].join(" ")}
      style={{
        width: `${size()}px`,
        height: `${size()}px`,
        ...props.style,
      }}
    >
      <div class="h-full w-full overflow-hidden rounded-full p-2">
        <img
          src={props.src}
          alt={props.alt}
          loading="lazy"
          class="h-full w-full object-contain transition duration-200 group-hover:brightness-110"
          draggable={false}
        />
      </div>
    </a>
  );
}
