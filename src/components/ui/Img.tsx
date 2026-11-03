import Image, { type ImageProps } from "next/image";
import { blurData } from "@/lib/blur-data";

type ImgProps = Omit<ImageProps, "src" | "placeholder" | "blurDataURL"> & { src: string };

/** next/image with a tiny blurred preview (from `npm run blur`), so photos fade in instead of flashing. */
export function Img({ src, alt, ...rest }: ImgProps) {
  const blur = blurData[src];
  return <Image src={src} alt={alt} placeholder={blur ? "blur" : "empty"} blurDataURL={blur} {...rest} />;
}
