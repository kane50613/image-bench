import prettyBytes from "pretty-bytes";
import { useCallback, useEffect, useRef, useState } from "react";

interface ImageData {
  src: string;
  duration: string;
  filesize: string;
}

export function useImage(
  provider: string,
  template: string,
  width: number,
  height: number,
): ImageData | null {
  const [image, setImage] = useState<ImageData | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const imageUrl = useCallback(
    () =>
      new URLSearchParams({
        provider,
        template,
        width: String(width),
        height: String(height),
      }).toString(),
    [provider, template, width, height],
  );

  useEffect(() => {
    (async () => {
      abortControllerRef.current = new AbortController();

      const queryString = imageUrl();

      const res = await fetch(`/render?${queryString}`, {
        signal: abortControllerRef.current?.signal,
      });

      abortControllerRef.current = null;

      if (!res.ok) {
        throw new Error(`Failed to fetch image: ${res.status}`);
      }

      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);

      setImage({
        src: objectUrl,
        duration: res.headers.get("X-Duration") ?? "-",
        filesize: prettyBytes(blob.size),
      });
    })();

    return () => {
      abortControllerRef.current?.abort(
        "The image fetching is aborted by the user",
      );
      // Cleanup previous blob URL
      setImage((prevImage) => {
        if (prevImage?.src) {
          URL.revokeObjectURL(prevImage.src);
        }

        return null;
      });
    };
  }, [imageUrl]);

  return image;
}
