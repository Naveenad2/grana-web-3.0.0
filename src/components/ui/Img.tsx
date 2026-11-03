import Image, { type ImageProps } from "next/image";
import { blurData } from "@/lib/blur-data";

type ImgProps = Omit<ImageProps, "src" | "placeholder" | "blurDataURL"> & {
  src: string;
  /** show the blurred preview while loading (default true); turn off for images decoded ahead of time */
  blur?: boolean;
};

/** next/image with a tiny blurred preview (from `npm run blur`), so photos fade in instead of flashing. */
export function Img({ src, alt, blur = true, ...rest }: ImgProps) {
  const data = blur ? blurData[src] : undefined;
  return <Image src={src} alt={alt} placeholder={data ? "blur" : "empty"} blurDataURL={data} {...rest} />;
}
