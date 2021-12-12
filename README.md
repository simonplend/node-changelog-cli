# Node.js Changelog CLI (Experimental)

> Command line tool for viewing and searching through Node.js release changelogs.

⚠️ Note: Highly experimental, expect bugs. See [Current Limitations](#current-limitations) and [TODO](#TODO).

## Usage

Run it directly from GitHub:

```sh
npx github:simonplend/node-changelog-cli <SEARCH_TERM>
```

Or install it globally:

```sh
npm install -g github:simonplend/node-changelog-cli
```

Then you can run it with the command `ncs`.

## Examples

### Search for "randomuuid"

```
$ npx github:simonplend/node-changelog-cli randomuuid

v14.17.0 - Version 14.17.0 'Fermium' (LTS) (2021-05-11)
  - implement randomuuid (James M Snell) (semver-minor, crypto) - https://github.com/nodejs/node/pull/36729
  - mention cryptographic prng in description of randomUUID (Serkan Özel) (doc) - https://github.com/nodejs/node/pull/38074

v15.6.0 - Version 15.6.0 (Current) (2021-01-14)
  - implement randomuuid (James M Snell) (semver-minor, crypto) - https://github.com/nodejs/node/pull/36729
  - improve crypto.randomUUID() text (Rich Trott) (doc) - https://github.com/nodejs/node/pull/36830

v15.12.0 - Version 15.12.0 (Current) (2021-03-17)
  - improve randomUUID performance (Dawid Rusnak) (crypto) - https://github.com/nodejs/node/pull/37243

v16.0.0 - Version 16.0.0 (Current) (2021-04-20)
  - mention cryptographic prng in description of randomUUID (Serkan Özel) (doc) - https://github.com/nodejs/node/pull/38074

v16.7.0 - Version 16.7.0 (Current) (2021-08-17)
  - implement webcrypto.randomUUID (Michaël Zasso) (semver-minor, crypto) - https://github.com/nodejs/node/pull/39648
```

### Search for "json import"

You must quote search terms which contain spaces:

```
$ npx github:simonplend/node-changelog-cli "json import"

v17.1.0 - Version 17.1.0 (Current) (2021-11-09)
  - add support for JSON import assertion (Antoine du Hamel) (semver-minor, esm) - https://github.com/nodejs/node/pull/40250
```

## Current Limitations

- Only searches changelogs for Node.js v10, v11, v12, v13, v14, v15, v16, v17.
- Only returns commits where the search term is an exact match (case insensitive).
- Uses a handful of regular expressions to parse Markdown changelog files. Calibrate your expectations accordingly!

## TODO

- [ ] Bug: Commit parsing fails on some releases
- [ ] Split out author from commit title (format: `Title (Author)`)
- [ ] Stop embedding the changelog files in this package
- [ ] Improve the filtering for unique commit IDs
- [ ] Validate the command line arguments
- [ ] Add colours to the search results

### CLI Ideas

```sh
ncl search --release-line 17 abort

ncl search --release-line 12/14/16 abort

ncl view --release-line 14

ncl view --release 14.13.0
```
