# AGENTS.md

## Cursor Cloud specific instructions

This repo is a single static **Jekyll / GitHub Pages** personal website (no backend, no database, no `Gemfile`/`_config.yml`). The only "service" is the Jekyll dev server, which renders the Liquid layouts in `_layouts/` and the pages (e.g. `index.html`).

- Ruby is installed system-wide (via apt) and Jekyll/Bundler are installed as user gems. The user gem `bin` dir is added to `PATH` in `~/.bashrc`, so `jekyll` is available in new login shells. If `jekyll` is not found, run: `export PATH="$(ruby -e 'require \"rubygems\"; puts Gem.user_dir')/bin:$PATH"`.
- Run the dev server: `jekyll serve --host 0.0.0.0 --port 4000`. It serves at `http://localhost:4000/` and auto-regenerates on file changes.
  - The repo has no `_config.yml`; Jekyll runs with defaults and prints `Configuration file: none` — this is expected, not an error.
- Build only: `jekyll build` (output goes to `_site/`; use `--destination <dir>` to write elsewhere).
- There are no automated tests and no lint tooling configured in this repo.
- Note: `_layouts/default.html` references `/css/main.css`, `/css/animate.css` and links to `/about`, `/blog`, `/resume`, none of which exist yet. Those will 404 — this is the repo's current state, not a setup problem.
