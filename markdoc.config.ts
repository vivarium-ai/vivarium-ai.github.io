import { defineMarkdocConfig, component } from "@astrojs/markdoc/config";
import { extractMermaidCode, renderMermaidToSvg } from "@/lib/mermaid-processor.ts";
import Markdoc from "@markdoc/markdoc";

const { Tag } = Markdoc;

export default defineMarkdocConfig({
  tags: {
    mermaid: {
      render: "img",
      attributes: {
        src: { type: String },
        alt: { type: String },
        title: { type: String },
      },
      transform(node, config) {
        const attrs = node.transformAttributes(config);
        const title = (attrs.title as string | undefined) ?? "Mermaid diagram";

        const code = extractMermaidCode(node);

        if (!code) {
          return new Tag("span", {}, []);
        }

        const src = renderMermaidToSvg(code);

        return new Tag("img", {
          src,
          alt: title,
          title,
          class: "w-full h-auto border-1 rounded-lg p-2 my-4"
        });
      },
    },
    youtube: {
      render: component('./src/components/YouTube.astro'),
      attributes: {
        id: { type: String, required: true },
        title: { type: String },
      },
    },
    vimeo: {
      render: component('./src/components/Vimeo.astro'),
      attributes: {
        id: { type: String, required: true },
        title: { type: String },
      },
    },
    email_capture: {
      render: component('./src/components/EmailCapture.astro'),
      attributes: {
      },
    },
    content_image: {
      render: component('./src/components/ContentImage.astro'),
      attributes: {
        src: { type: String, required: true },
        title: { type: String },
        title_url: { type: String },
      },
    },
  },
});
