import { Vibrant } from "node-vibrant/browser";

export function GetColors(blobURL: string | undefined | null, isDark: boolean) {
  if (blobURL) {
    Vibrant.from(blobURL)
      .getPalette()
      .then((palette) => {
        document.documentElement.style.setProperty(
          "--paletteSelect",
          String(palette.Vibrant?.hex),
        );
        if (isDark) {
          const vibranceDark = palette.DarkVibrant;
          if (vibranceDark) {
            const [r, g, b] = vibranceDark.rgb;
            const darkenPlayer = 0.3;
            const darkenLib = 0.2;
            document.documentElement.style.setProperty(
              "--palettePlayer",
              `rgb(${Math.floor(r * darkenPlayer)}, ${Math.floor(g * darkenPlayer)}, ${Math.floor(b * darkenPlayer)})`,
            );
            document.documentElement.style.setProperty(
              "--paletteLib",
              `rgb(${Math.floor(r * darkenLib)}, ${Math.floor(g * darkenLib)}, ${Math.floor(b * darkenLib)})`,
            );
          }
        } else {
          const hex = palette.LightVibrant?.hex;
          if (hex) {
            document.documentElement.style.setProperty(
              "--palettePlayer",
              hex + "22",
            );
            document.documentElement.style.setProperty(
              "--paletteLib",
              hex + "15",
            );
          }
        }
      });
  } else {
    return;
  }
}
