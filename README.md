# ISEO

A clean, client-side music player that runs entirely in the browser.

---

## What it does

ISEO lets you load your local music files and play them directly in the browser. Everything runs client-side!

**Rinascita (v2) includes:**

- Single file and multi-folder upload with automatic album detection
- ID3 metadata parsing (title, artist, track number, duration)
- Album cover art display
- Play / pause, skip forward / back, shuffle, and loop
- Seekbar and volume controls
- Search / filter albums

## For the best experience

ISEO works best when your audio files have embedded metadata (ID3 tags). This includes track titles, artist names, track numbers, and album art. Without metadata, ISEO will fall back to using filenames — which works fine, but tagged files will look and sort much better.

Free tools like [MusicBrainz Picard](https://picard.musicbrainz.org/) or [Mp3tag](https://www.mp3tag.de/) make it easy to tag your library.

---

## How to use

1. Clone the repo and run `npm install`
2. Run `npm run dev` to start the local dev server
3. Upload a folder of music and enjoy

---

## Live Demo

Available on Vercel:

---

## Roadmap

| Version | Name      | Status      | Focus                              |
| ------- | --------- | ----------- | ---------------------------------- |
| v1      | Overture  | ✅ Released | Single-track engine, album builder |
| v2      | Rinascita | ✅ Released | React/TSX rewrite, ID3 metadata    |
| v3      | Aria      | Planned     | Lyrics support via LRCLib          |
| v4      | Cadenza   | Planned     | Full feature expansion             |

**Overture (v1)** is preserved at [iseo-legacy](https://github.com/ttakiwaki/iseo-legacy). Future updates will start using this repository.

---

## Stack

**Overture (v1):** Vanilla HTML, CSS, JavaScript

**Rinascita (v2):** React, TypeScript, Vite, music-metadata

---

## License

GPL v3 — free to use, modify, and distribute. Any derivative work must also be open source under the same license.

---

## Special Thanks

[JoshuaPark5678](https://github.com/JoshuaPark5678) — Day one tester

---

_ISEO is an ongoing personal project. Contributions welcome._
