import Image from "next/image";
import { getImageUrl } from "@/sanity";

interface SanityImageProps {
  image: {
    asset: {
      _ref: string;
      _type: "reference";
    };
    hotspot?: boolean;
    alt?: string;
    caption?: string;
  };
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export default function SanityImage({
  image,
  width = 600,
  height = 400,
  className = "",
  priority = false,
}: SanityImageProps) {
  if (!image?.asset?._ref) {
    return null;
  }

  const imageUrl = getImageUrl(image, width, height);
  const alt = image.alt || "";

  return (
    <div className={className}>
      <Image
        src={imageUrl}
        alt={alt}
        width={width}
        height={height}
        className="rounded-lg"
        priority={priority}
      />
      {image.caption && (
        <p className="text-sm text-gray-600 mt-2 text-center italic">
          {image.caption}
        </p>
      )}
    </div>
  );
}
