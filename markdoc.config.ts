import { defineMarkdocConfig, component } from "@astrojs/markdoc/config";

export default defineMarkdocConfig({
  tags: {
    mermaid: {
      // map to an Astro component
      render: component("./src/components/content/Mermaid.astro"),
      // we let authors either do {% mermaid %}...{% /mermaid %} or pass code=""
      attributes: {
        code: { type: String, required: false },
        title: { type: String, required: false },
      },
    },
  },
});
