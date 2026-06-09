# Changesets

Run `npm run changeset` after a PR that should ship in the next npm release.

Maintainers bump versions with:

```bash
npm run version:release
```

That runs `changeset version`, updates `CHANGELOG.md`, and syncs `registry.json` via `sync:registry`.

Manual `changelog:draft` remains available when not using changesets for a release.
