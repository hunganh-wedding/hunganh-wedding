# Wedding Invitation

Static wedding invitation for GitHub Pages.

## Edit Content

Most invitation content lives in:

```text
statics/js/config.js
```

Edit that file to change names, parents, date/time, addresses, schedule, map links, and music.

The groom father is intentionally empty by default:

```js
father: ""
```

## Music

Place the selected song at:

```text
statics/audio/wedding-song.mp3
```

Or change `music.src` in `statics/js/config.js`.

Browsers may block autoplay with sound. The page still defaults to music-on intent and starts playback after the first visitor interaction when autoplay is blocked.

## Preview

Open `index.html` directly in a browser.

## GitHub Pages

When ready, push this repository to GitHub and configure GitHub Pages to deploy from the `master` branch root. After that, every commit to `master` updates the invitation page.
