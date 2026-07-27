import * as React from "react";
import { cn } from "@/lib/utils";

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string | any;
  alt?: string;
  fill?: boolean;
  unoptimized?: boolean;
  sizes?: string;
}

export function Image({ src, alt = "", fill, unoptimized, sizes, className, ...props }: ImageProps) {
  const imgSrc = typeof src === "object" && src !== null ? src.src || src : src;
  return (
    <img
      src={imgSrc}
      alt={alt}
      className={cn(fill && "w-full h-full object-cover", className)}
      {...props}
    />
  );
}

export default Image;
