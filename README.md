# Jack, personal site

A minimal, refined-light personal website (adapted from the andyzeng.github.io layout).
Static HTML/CSS, no build step.

```
index.html                                  Home: about, links, writings list
style.css                                   Shared styles (refined-light theme)
assets/headshot.svg                         Placeholder headshot, replace with your photo
posts/how-to-train-computer-vision.html     First blog post
```

## Preview locally

Open `index.html` in a browser, or run a tiny server:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Replace the placeholder headshot

Drop your photo into `assets/` (e.g. `headshot.jpg`), then in **index.html** and
**posts/…html** change `assets/headshot.svg` to `assets/headshot.jpg`.

## Deploy to GitHub Pages

Run these from your own terminal (your `gh` CLI is already authenticated):

```bash
# Option A: user site, served at https://haitzupp.github.io  (cleanest URL)
gh repo create HaitzuPP.github.io --public --source . --push

# Option B: project site, served at https://haitzupp.github.io/<name>
gh repo create <name> --public --source . --push
```

Then enable Pages (Settings > Pages > Source: main / root), or:

```bash
gh api -X POST repos/HaitzuPP/HaitzuPP.github.io/pages -f 'source[branch]=main' -f 'source[path]=/'
```

## Add a new post later

1. Copy `posts/how-to-train-computer-vision.html` to a new file in `posts/`.
2. Edit the title, date, standfirst, and body.
3. Add a matching `<li>` to the Writings list in `index.html`.
