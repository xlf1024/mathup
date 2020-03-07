const INFIX_MAP = new Map([
  ["^", "sup"],
  ["/", "frac"],
  ["_", "sub"],
  [".^", "over"],
  ["._", "under"],
  [":^", "presup"],
  [":_", "presub"]
]);

export default function(char, input, { start }) {
  if (char === "." || char === ":") {
    const next = input[start + 1];
    const infix = INFIX_MAP.get(`${char}${next}`);

    if (infix) {
      const nextnext = input[start + 2];

      if ((infix === ".^" || infix === ":^") && nextnext === "^") {
        return null;
      }

      if (infix === "._" || infix === ":_") {
        if (
          (nextnext === "_" && input[start + 3] === "|") ||
          (nextnext === "|" && input[start + 3] === "_")
        ) {
          return null;
        }
      }

      return {
        type: "infix",
        value: infix,
        end: start + 2,
      };
    }
  }

  const infix = INFIX_MAP.get(char);

  if (infix) {
    const next = input[start + 1];

    if ((char === "/" && next === "/") || (char === "^" && next === "^")) {
      return null;
    }

    if (char === "_") {
      if (
        (next === "_" && input[start + 2] === "|") ||
        (next === "|" && input[start + 2] === "_")
      ) {
        return null;
      }
    }
    return {
      type: "infix",
      value: infix,
      end: start + 1,
    };
  }

  return null;
}
