# GitHub Pages client review

This is an unofficial concept. The source remains private. **GitHub Pages is a public website even with a private source repository.** The prototype retains a visible unofficial disclaimer and noindex, but these are not access controls.

Publishing Pages from a private repository requires a GitHub plan supporting that feature (normally Pro, Team or Enterprise). Do not change the repository to public just to enable Pages.

## Setup
1. Visit https://github.com/Kenway-Creative/Kenway-Creations/settings/pages
2. Choose **GitHub Actions** under Build and deployment → Source.
3. In Actions, run **Deploy Astro demo to GitHub Pages** or push a new commit to main.
4. After successful deployment, check https://kenway-creative.github.io/Kenway-Creations/

The workflow uses Node 22, npm ci, npm test, then npm run build with `DEPLOY_GITHUB_PAGES=true`. Astro uses `/Kenway-Creations/` only for Pages and `/` for local development. Internal navigation is prefixed using `withBase()`.

Verify all seven pages, mobile navigation and /book/ before showing the client. Bookings are fictional, no information is sent or saved, Toast is not connected, and food/room photo assets and logo remain placeholders. Do not enter real customer information.
