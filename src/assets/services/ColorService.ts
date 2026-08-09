import { Vibrant } from "node-vibrant/browser";

export function GetColors(blobURL: string | undefined | null) {
  if (blobURL) {
    Vibrant.from(blobURL)
      .getPalette()
      .then((palette) => {
        document.documentElement.style.setProperty(
          "--paletteSelect",
          String(palette.Vibrant?.hex),
        );
      });
  } else {
    return;
  }
}
