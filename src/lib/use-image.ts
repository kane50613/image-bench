import prettyBytes from "pretty-bytes";
import { useEffect, useState } from "react";

export function useImage(
  provider: string,
  template: string,
  width: number,
  height: number,
) {
  const [image, setImage] = useState<{
    src: string;
    duration: string;
    filesize: string;
  } | null>(null);

  const imageUrl = createImageUrl(provider, template, width, height);

  useEffect(() => {
    (async () => {
      const res = await fetch(imageUrl);
      const blob = await res.blob();

      setImage({
        src: URL.createObjectURL(blob),
        duration: res.headers.get("X-Duration") ?? "-",
        filesize: prettyBytes(blob.size),
      });
    })();
  }, [imageUrl]);

  return image;
}

function createImageUrl(
  provider: string,
  template: string,
  width: number,
  height: number,
) {
  return `/render?provider=${provider}&template=${template}&width=${width}&height=${height}`;
}
