# Nikhil Kumar

A React/Vite animated portfolio starter based on the supplied resume.

## Run locally

```bash
npm install
npm run dev
```

## Portfolio content

- The resume download is served from `public/Resume_NIKHIL.pdf`. Replace that file when updating the resume.
- Add each project destination in the matching `url` field in `src/main.jsx`.
- The contact form opens the visitor's email app with a prefilled draft; it does not send or store messages on a server.
- Profile statistics load from the public GitHub and LeetCode APIs. If an API is unavailable, its card reports that state instead of showing fabricated zeroes.