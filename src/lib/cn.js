// Joins class names, skipping falsy values: cn("a", cond && "b") → "a b"
export const cn = (...classes) => classes.filter(Boolean).join(" ");
