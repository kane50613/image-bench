import nstr from "nstr";
import { useCallback, useEffect, useState } from "react";

export function useImage(
  provider: string,
  variant: string,
  width: number,
  height: number,
) {
  const [image, setImage] = useState<{
    url: string | null;
    duration: string | null;
    stale: boolean;
  }>({
    url: null,
    duration: null,
    stale: true,
  });

  const imageUrl = createImageUrl(provider, variant, width, height);
  const invalidate = useCallback(() => {
    setImage((prev) => ({
      ...prev,
      stale: true,
    }));
  }, []);

  useEffect(() => {
    if (!image.stale) return;

    if (image.url) {
      URL.revokeObjectURL(image.url);
    }

    const start = performance.now();

    fetch(imageUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const end = performance.now();

        setImage({
          url: URL.createObjectURL(blob),
          duration: nstr(end - start),
          stale: false,
        });
      });
  }, [imageUrl, image]);

  return {
    src: image.url,
    duration: image.duration,
    invalidate,
  };
}

function createImageUrl(
  provider: string,
  variant: string,
  width: number,
  height: number,
) {
  return `/render?provider=${provider}&variant=${variant}&width=${width}&height=${height}`;
}
