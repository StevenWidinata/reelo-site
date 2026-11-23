# Reelo website

Download page for [Reelo](https://github.com/OneillAlim/reelo), an Android app that keeps your TikTok streaks alive
every night at 00.00 and counts the reels you watch, with four pixel mascots.

**Live:** https://stevenwidinata.github.io/reelo-site/

![Reelo mascots](img/og.png)

## What's on the page
- **Download button that's always current.** On load the page asks the GitHub API for the latest Reelo release and
  links to its APK. If GitHub can't be reached it falls back to v1.0.
- **Checksum.** Shows the APK's SHA-256 from GitHub, so people can check their download.
- **The four mascots** (Reelo, Popi, Tiko, Telo), drawn by `js/mascots.js`, a direct port of the app's `Sprite.kt`.
  Same pixels as the app. Tap a mascot to change its mood.
- **English / Indonesian** toggle. Light and dark themes follow the phone or computer setting.

## Security
It's a static site with no backend, forms, cookies or third-party scripts. Fonts and images are hosted with the site.
- A Content-Security-Policy only allows this site's own scripts and styles, and only one outside request: the
  version check to `api.github.com`.
- Data from the GitHub API is validated (version format, checksum format) and only inserted as text, never as HTML.
- The download link is only used if it points to `github.com/OneillAlim/reelo/releases/download/…/*.apk` over HTTPS.
- The page refuses to run inside another site's frame (protection against clickjacking).
- Links to other sites open without sending a referrer.

## Run locally
Any static server works, for example:
```
python -m http.server 8000
```
Then open http://localhost:8000.

## Credits
App by Bryan O'Neill Alim and Steven Widinata. Fonts: Jersey 15 and Rubik (SIL Open Font License).
Not affiliated with TikTok, YouTube or Instagram.
