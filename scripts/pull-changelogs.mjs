#!/usr/bin/env node

import { getChangelogWriteStream } from "../src/lib/cache.js";

const firstVersion = 4;
const lastVersion = 18;

for (let version = firstVersion; version <= lastVersion; version++) {
	const changelogUrl = `https://raw.githubusercontent.com/nodejs/node/master/doc/changelogs/CHANGELOG_V${version}.md`;

	console.log(`Downloading changelog for Node.js v${version}...`);

	const changelogResponse = await fetch(changelogUrl);
	changelogResponse.body.pipeTo(
		getChangelogWriteStream(`CHANGELOG_V${version}.md`)
	);
}

// ----

// TODO: Write a `status.json`
// { cache_last_refreshed: "2022-04-24T17:23:00.000Z", changelogs: [{ version: "X", downloaded: "DATE" }] }
// const statusFilepath = path.join(cacheDirectoryPath, "status.json");

// TODO: Ensure `cacheDirectoryPath` exists
// TODO: Ensure `statusFilepath` exists
// TODO: What about pre V4?
// See: https://github.com/nodejs/node/blob/master/CHANGELOG.md
// TODO: Don't re-download changelogs for unsupported versions of Node.js
