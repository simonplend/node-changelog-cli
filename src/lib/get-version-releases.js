const { readFile } = require("node:fs/promises");
const path = require("node:path");

const cacheDirectoryPath = path.join(
	process.env.HOME || process.env.USERPROFILE,
	".cache/node-changelog-cli/"
);

async function getVersionReleases(version) {
	const changelog = await readFile(
		path.join(cacheDirectoryPath, `CHANGELOG_V${version}.md`),
		{ encoding: "utf-8" }
	);

	let parsedReleases = changelog.split(/<a id="(.+)"><\/a>/gm);
	parsedReleases.splice(0, 1);

	const releases = [];

	for (let i = 0; i < parsedReleases.length; i += 2) {
		const releaseBody = parsedReleases[i + 1].trim();

		let releaseMetadata =
			/## (?<date>[0-9]{4}-[0-9]{2}-[0-9]{2}), (?<name>[^,]+), (?<releaser>@.+)\n/gm.exec(
				releaseBody
			);
		releaseMetadata = releaseMetadata.groups;

		let releaseCommits = releaseBody.matchAll(
			/\* \\\[\[`(?<commit_id>[a-z0-9]+)`\]\((?<commit_url>[^)]+)\)\] - \*\*(?<metadata>[^:]+)\*\*: (?<title>[^\[]+) \[(?<pr_number>#[^\]]+)\]\((?<pr_url>[^\(]+)\)/gm
		);
		
		releaseCommits = Array.from(releaseCommits).map((commit) => {
			commit.groups.metadata = commit.groups.metadata
				.replace(/\*\*/g, "")
				.replace(/[\\\(\)]/g, "")
				.toLowerCase()
				.split(" ");

			commit.groups.title = commit.groups.title.replace(/\\/g, "");

			return commit.groups;
		});

		releaseCommits = releaseCommits.reduce((acc, x) =>
			acc.concat(acc.find(y => y.commit_id === x.commit_id) ? [] : [x])
		, []);

		const release = {
			version: parsedReleases[i],
			date: releaseMetadata.date,
			name: releaseMetadata.name,
			releaser: releaseMetadata.releaser,
			commits: releaseCommits,
			// releaseNotes: releaseBody,
		};

		releases.push(release);
	}

	return releases.reverse();
}

module.exports = {
	getVersionReleases
};
