import type { SVGProps } from "react";

/** The logo's mark on its own: the slice tip and the crust "smile". */
export function SliceMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false" {...props}>
      <path
        d="M32 9 20.5 30.5q-1.1 2.1 1.1 1.8l3.4-.7 7-13 7 13 3.4.7q2.2.3 1.1-1.8Z"
        fill="currentColor"
      />
      <path d="M11 38.5q21 8.5 42 0l2.5 2Q54 52 32 54.5 10 52 8.5 40.5Z" fill="currentColor" />
    </svg>
  );
}
