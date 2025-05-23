/**
 * Based on Radix Themes
 * @source https://github.com/radix-ui/themes
 */

const fs = require("fs");
const path = require("path");
const postcss = require("postcss");

// List of class names that can be made responsive
const UTILITY_RESPONSIVE_CLASS_NAMES = {
  // Utilities
  "align-content": "ac",
  "align-items": "ai",
  "align-self": "as",
  bottom: "b",
  "column-gap": "cg",
  display: "d",
  "flex-basis": "fb",
  "flex-direction": "fd",
  "flex-grow": "fg",
  "flex-shrink": "fs",
  "flex-wrap": "fw",
  gap: "g",
  "grid-column-end": "gce",
  "grid-column-start": "gcs",
  "grid-row-end": "gre",
  "grid-row-start": "grs",
  "grid-template-columns": "gtc",
  "grid-template-rows": "gtr",
  height: "h",
  inset: "i",
  "justify-content": "jc",
  left: "l",
  "margin-bottom": "mb",
  "margin-left": "ml",
  "margin-right": "mr",
  "margin-top": "mt",
  "margin-x": "mx",
  "margin-y": "my",
  margin: "m",
  "max-height": "max-h",
  "max-width": "max-w",
  "min-height": "min-h",
  "min-width": "min-w",
  "overflow-x": "ox",
  "overflow-y": "oy",
  overflow: "o",
  "padding-bottom": "pb",
  "padding-left": "pl",
  "padding-right": "pr",
  "padding-top": "pt",
  "padding-x": "px",
  "padding-y": "py",
  padding: "p",
  position: "pos",
  right: "r",
  "row-gap": "rg",
  "text-align": "ta",
  "text-wrap": "tw",
  top: "t",
  width: "w",
};

const COMPONENT_PROPS_RESPONSIVE_CLASS_NAMES = {
  // Component props
  size: "size",
};

// Build a list of breakpoints from "@custom media" rules in "breakpoints.css"
const breakpointsFile = path.resolve(
  path.join(__dirname, "packages", "test-package", "src", "styles", "breakpoints.css"),
);
const breakpointsCss = fs.readFileSync(breakpointsFile, "utf-8");
const breakpoints = postcss
  .parse(breakpointsCss)
  .nodes.map((node) => {
    if (node.type === "atrule" && node.name === "custom-media") {
      const [, name, params] = node.params.match(/--(\w+)\s+(.+)/);
      return { name, params };
    }

    return null;
  })
  .filter(Boolean);

const cache = new WeakMap();

module.exports = () => ({
  postcssPlugin: "postcss-breakpoints",
  Rule(rule) {
    if (rule.parent.name === "breakpoints") {
      const breakpointsRule = rule.parent;

      // when we first meet a given @breakpoints at-rule
      if (!cache.has(breakpointsRule)) {
        // create the final media rules for this @breakpoints at-rule
        const medias = breakpoints.reduce((breakpointsMedias, breakpoint) => {
          breakpointsMedias[breakpoint.name] = new postcss.AtRule({
            name: "media",
            params: breakpoint.params,
          });
          return breakpointsMedias;
        }, {});

        // add an entry to the cache
        cache.set(breakpointsRule, medias);

        // add final media rules after the @breakpoints at-rule
        const mediaRules = Object.values(medias).reverse();
        mediaRules.forEach((media) => {
          breakpointsRule.after(media);
        });
      }

      // move the rule itself before @breakpoints at-rule
      breakpointsRule.before(rule);

      // save clone of the rule before we modify it
      const originalRule = rule.clone();
      // clean up the extra indentation
      rule.selector = rule.selector.replace(/\n\s\s/g, "\n");
      rule.cleanRaws();

      // add breakpoint-level rules
      breakpoints.forEach((breakpoint) => {
        const clone = originalRule.clone();
        addPrefix(clone, breakpoint.name);
        cache.get(breakpointsRule)[breakpoint.name].append(clone);
      });

      // remove @breakpoints at-rule and clear cache if it has no rules
      if (breakpointsRule.nodes.length === 0) {
        breakpointsRule.remove();
        cache.delete(breakpointsRule);
      }
    }
  },
});

module.exports.postcss = true;

function addPrefix(node, prefix) {
  if (node.type === "atrule") {
    node.each((child) => addPrefix(child, prefix));
  }

  // Check for rules that use compound props on a component:
  // - a component name (prefixed with "joy-" and pascal cased)
  // - followed by 2 or more prop selectors (lowercase, numbers, -)
  //
  // e.g. ".joy-Button.size-2.color-gray"
  if (/\.joy-(?:[A-Z][a-z]+)+(?:\.[a-z0-9-]+){2,}/.test(node.selector)) {
    throw new Error(`
      "${node.selector}" looks like it uses compound props on a component.
      "@breakpoints" does not support compound props yet.
    `);
  }

  // Check for responsive utility class names
  // e.g. ".joy-mb-2", ".-joy-mt-2"
  const classNameRegexp = new RegExp(
    `.(-?joy-(?:${Object.values(UTILITY_RESPONSIVE_CLASS_NAMES).join(
      "|",
    )})(?:-[a-z0-9]+)*(?![-a-z0-9]))`,
    "g",
  );

  if (classNameRegexp.test(node.selector)) {
    node.selector = node.selector.replace(classNameRegexp, `.${prefix}\\:$1`);
  }

  // Check for unprefixed responsive component variant class names
  // e.g. ".size-2", '.variant-outline'
  const classNameRegexp2 = new RegExp(
    `.(-?(?:${Object.values(COMPONENT_PROPS_RESPONSIVE_CLASS_NAMES).join(
      "|",
    )})(?:-[a-z0-9]+)*(?![-a-z0-9]))`,
    "g",
  );

  if (classNameRegexp2.test(node.selector)) {
    node.selector = node.selector.replace(classNameRegexp2, `.${prefix}\\:$1`);
  }
}
