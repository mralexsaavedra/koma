import Image from "next/image";

interface ImageWithFallbackProps {
  src?: string | null;
  alt: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  className?: string;
  fallbackText?: string;
  fallbackClassName?: string;
}

export const ImageWithFallback = ({
  src,
  alt,
  priority = false,
  fill = false,
  sizes,
  className,
  fallbackText = "No Image",
  fallbackClassName,
}: ImageWithFallbackProps) => {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill={fill}
        sizes={sizes}
        priority={priority}
        className={className}
      />
    );
  }

  return (
    <div
      className={`flex h-full w-full items-center justify-center bg-gray-200 ${fallbackClassName}`}
    >
      <span className="text-gray-400">{fallbackText}</span>
    </div>
  );
};
