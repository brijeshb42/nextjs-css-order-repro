type StyleObject =
  | React.CSSProperties
  | Record<string, string | number | null | undefined>
  | undefined;

function mergeStyles(a: StyleObject, b: StyleObject): StyleObject {
  if (!a && !b) {
    return undefined;
  }
  if (a && !b) {
    return a;
  }
  if (!a && b) {
    return b;
  }
  return { ...a, ...b };
}

export { mergeStyles };
