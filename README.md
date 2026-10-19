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
- GitHub profile stats and repository languages load from the public GitHub API; the contribution calendar uses the public GitHub contributions API. Language bars count original public repositories, and the repo total excludes private repositories.
- LeetCode stats load from a public profile API. If a profile-data API is unavailable, its card reports that state and keeps the profile link available instead of showing fabricated zeroes.