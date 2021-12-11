#! /usr/bin/env node

/**
 * Changelog structure:
 * 
 * release number:
 *   <a id="17.2.0"></a>
 *
 * release date, release name, releaser (GitHub username)
 *   2021-11-30, Version 17.2.0 (Current), @targos
 *
 * notable changes (with list of commits or sometimes descriptive text):
 *   ### Notable Changes
 *
 * commits (with list of commits):
 *   ### Commits
 *   ### Semver-Major Commits
 *   ### Semver-Minor Commits
 *   ### Semver-Patch Commits
 *
 * commit entry:
 *   commit ID, commit URL, metadata, description, committer, PR number, PR URL
 *
 *   * \[[`06916490af`](https://github.com/nodejs/node/commit/06916490af)] - **(SEMVER-MINOR)** **async\_hooks**: expose async\_wrap providers (Rafael Gonzaga) [#40760](https://github.com/nodejs/node/pull/40760)
 */

const { readFile } = require("fs/promises");

async function getVersionReleases(version) {
	const changelog = await readFile(
		`${__dirname}/../changelogs/CHANGELOG_V${version}.md`,
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

async function main() {
	const versions = [12, 13, 14, 15, 16, 17];
	const releases = [];
	for (let version of versions) {
		releases.push(...await getVersionReleases(version));
	}

	const searchTerm = process.argv[2];
	const searchTermLowerCase = searchTerm.toLowerCase();

	const searchResults = [];
	for (let release of releases) {
		const matchingCommits = release.commits.filter(commit => {
			return commit.title.toLowerCase().includes(searchTermLowerCase);
		});

		if (matchingCommits.length > 0) {
			searchResults.push({ ...release, commits: matchingCommits });
		}
	}

	for (let releaseResults of searchResults) {
		console.log(`v${releaseResults.version} - ${releaseResults.name} (${releaseResults.date})`);
		for (let commit of releaseResults.commits) {
			console.log(`  - ${commit.title} (${commit.metadata.join(", ")}) - ${commit.pr_url}`);
		}
		console.log("");
	}
}

main();
