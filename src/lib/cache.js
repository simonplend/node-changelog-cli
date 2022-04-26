const { readFile } = require("node:fs/promises");
const { createWriteStream } = require("node:fs");
const path = require("node:path");
const stream = require("node:stream");

const cacheDirectoryPath = path.join(
	process.env.HOME || process.env.USERPROFILE,
	".cache/node-changelog-cli/"
);

function getChangelogFilepath(changelogFilename) {
	return path.join(
		cacheDirectoryPath,
		changelogFilename
	);
}

function getChangelogWriteStream(changelogFilename) {
	return stream.Writable.toWeb(createWriteStream(getChangelogFilepath(changelogFilename)));
}

async function getChangelog(changelogFilename) {
	// TODO: Could we just use a sync file read?
	return await readFile(
		getChangelogFilepath(changelogFilename),
		{ encoding: "utf-8" }
	);
}

module.exports = {
	getChangelog,
	getChangelogWriteStream,
};
