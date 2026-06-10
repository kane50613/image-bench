import prettyBytes from "pretty-bytes";
import { useCallback, useEffect, useRef, useState } from "react";

interface ImageData {
  src: string;
  duration: string;
  filesize: string;
  error: string | null;
}

export function useImage(
  endpoint: string,
  provider: string,
  template: string,
  width: number,
  height: number,
  refreshKey: number = 0,
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
      try {
        abortControllerRef.current = new AbortController();

        const queryString = `${imageUrl()}&_t=${refreshKey}`;

        const res = await fetch(`${endpoint}?${queryString}`, {
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
          error: null,
        });
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        setImage({
          src: "",
          duration: "-",
          filesize: "—",
          error: error instanceof Error ? error.message : "Failed to load",
        });
      }
    })();

    return () => {
      abortControllerRef.current?.abort("The image fetching is aborted by the user");
      // Cleanup previous blob URL
      setImage((prevImage) => {
        if (prevImage?.src) {
          URL.revokeObjectURL(prevImage.src);
        }

        return null;
      });
    };
  }, [endpoint, imageUrl, refreshKey]);

  return image;
}
