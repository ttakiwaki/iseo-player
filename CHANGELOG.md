# Changelog

All notable changes to ISEO are documented in this file. Logs will start from Cadenza (Rolling Releases).

Format based on [Keep a Changelog](https://keepachangelog.com/).

## [v4.2.7] — ISEO UI Overhaul

### Fixed

- Songs not starting unless you're in the Playing tab.

### Issues

- iOS safe area handling on ISEO's mobile player UI.
- Not tested on other platforms other than (iPhone 16)

---

## [v4.2.7] — ISEO UI Overhaul

### Fixed

- Songs not moving to the next/previous track while using phone simultaneously.
- iPad not getting the vibrant background

### Issues

- iOS safe area handling on ISEO's mobile player UI.
- Not tested on other platforms other than (iPhone 16)

---

## [v4.2.6] — ISEO UI Overhaul

### Fixed

- Desktop mode also recieving the background color from the tab side which was meant for a mobile only fix.

### Issues

- iOS safe area handling on ISEO's mobile player UI.
- Not tested on other platforms other than (iPhone 16)

---

## [v4.2.4 & v4.2.5] — ISEO UI Overhaul

### ummm i lowk dont even know whats going on anymore... its fixed on production? just to be safe for future documentation, issues will be kept until a definite fix is found.

### Added

- Extra padding for the fix which should help? (padding-top: env(safe-area-inset-top)) should help with iOS safe area handling, and shouldn't affect other platforms, nor if it decides to break again and fallback to the hardset color.

### Issues

- iOS safe area handling on ISEO's mobile player UI.
- Not tested on other platforms other than (iPhone 16)

---

## [v4.2.3] — ISEO UI Overhaul

### Removed

- Volume slider. iOS safari doesn't acknowledge changes to HTML audio element volume.

### Added

- iOS safe area (top) now uses set color var(--tabColor)

### Issues

- iOS safe area handling on ISEO's mobile player UI.
- Not tested on other platforms other than (iPhone 16)

---

## [v4.2.2] — ISEO UI Overhaul

### Added

- Created ISEO mobile player UI, fully responsive and mobile-friendly for PWA use.
- Shuffle now unshuffles the previous album for you if you switch off early without manually stopping it.

### Fixed

- Fixed shuffle bug that wouldn't allow shuffling to work properly.

### Issues

- iOS safe area handling on ISEO's mobile player UI.
- Not tested on other platforms other than (iPhone 16)

---

## [v4.2.1] — ISEO UI Overhaul

### Added

- Offline capabilities through adding vite-pwa-plugin. Add iseo as a pwa app to your desktop to use it offline.

### Fixed

- Lyrics scrolling bug which would shift the entire interact side up along with the lyrics.

### Removed

- "HOLDING" folder (used to hold old iseo's src folder content.)

---

## [v4.2.0] — ISEO UI Overhaul

### Added

- Dedicated tabs for each section of ISEO
- Redone vibrant backdrop, now with blurred album art (very w.i.p. needs more refining)
- Custom scrubbers for volume / song timebar
- Custom Toggle / Input for settings (technical addition)

### Changed

- Entire ISEO user interface ;)
- Vibrant Themes no longer extracts a full color palette from album art (previously via node-vibrant); now only used for select color
- Skip Back now restarts from 0:00 when current time is > 5 seconds instead of skipping whole song
- Replaced the option for exact sidebar width with a collapse option
- ISEO icon no longer is the settings menu (modal). Replaced with dedicated settings tab

### Fixed

- Folder uploads no longer break when `.DS_Store` or other non-audio files are present
- Crash when an album has no tracks (e.g. from junk-only folders)

### Removed

- Option to adjust sidebar width

---

## [v4.1.4] — Discord RPC Connection

### Added

- Shortcut to exit settings menu "x"

### Changed

- Renamed "Make ISEO Yours" category in settings to "Personalize"

### Fixed

- Adjusted description of "Select Color" for a missing space

---

## [v4.1.3] — Discord RPC Connection

### Added

- Re-added select color

### Fixed

- Made iseo_rpc hyperlink anchor element target \_blank instead of \_self
- Several things not falling back to the default iseo color because of unused var(selectColor) before

---

## [v4.1.2] — Discord RPC Connection

### Fixed

- Looping not reseting the Discord Rich Presence back to 0:00 once the song restarts
- More accurate time displayed on the Rich Presence (still not 100% accurate)

---

## [v4.1.1] — Discord RPC Connection

### Fixed

- Welcome screen still having Aria details
- Added more detail to the Discord RPC setting

---

## [v4.1.0] — Discord RPC Connection

### Added

- Discord RPC connection to ISEO (New toggleable setting)
- More details can be found here [iseo-rpc](https://github.com/ttakiwaki/iseo-rpc)

### Changed

- Not using only Lucide Icons anymore. New Discord Icon provided by [Simple Icons](https://simpleicons.org)

---
