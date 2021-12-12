# Node.js Changelog Search CLI (Experimental)

> Command line tool for searching through commits in Node.js releases.

⚠️ Warning: This project is experimental and it definitely has a bunch of bugs!

## Usage

```sh
npx github:simonplend/node-changelog-cli <SEARCH_TERM>
```

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

```
$ npx github:simonplend/node-changelog-cli "json import"

v17.1.0 - Version 17.1.0 (Current) (2021-11-09)
  - add support for JSON import assertion (Antoine du Hamel) (semver-minor, esm) - https://github.com/nodejs/node/pull/40250
```

## TODO

- [ ] Find out which releases the commit parsing is failing on
- [ ] Split out author from commit title (format: `Title (Author)`)
- [ ] Stop embedding the changelog files in this package
- [ ] Improve the filtering for unique commit IDs
- [ ] Validate the command line arguments
- [ ] Add colours to the search results

## CLI interface ideas

```sh
ncl search --release-line 17 abort

ncl search --release-line 12/14/16 abort

ncl view --release-line 14

ncl view --release 14.13.0
```
