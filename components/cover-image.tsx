import Image from "next/image";

const allowed = new Set([
  "static.wixstatic.com",
  "i.ytimg.com",
  "img.youtube.com",
  "bucket.mlcdn.com",
]);

function hostname(src: string) {
  try {
    return new URL(src).hostname;
  } catch {
    return "";
  }
}

export function CoverImage({
  src,
  alt = "",
  width,
  height,
  className,
  priority = false,
  sizes,
}: {
  src: string
  alt?: string
  width: number
  height: number
  className?: string
  priority?: boolean
  sizes?: string
}) {
  if (src.startsWith("/") || allowed.has(hostname(src))) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        priority={priority}
        sizes={sizes}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={className} />
  );
}
