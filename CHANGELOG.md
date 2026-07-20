# Changelog

All notable changes to ISEO are documented in this file. Logs will start from Cadenza (Rolling Releases).

Format based on [Keep a Changelog](https://keepachangelog.com/).

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
