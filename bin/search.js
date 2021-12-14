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

const assert = require("assert");

const { getVersionReleases } = require("../lib/get-version-releases.js");

// async function main(version) {
// 	const releases = await getVersionReleases(version);

// 	console.log(JSON.stringify(releases));
// }

// main(process.argv[2]);

async function searchAllReleases(searchTerm) {
	const versions = [10, 11, 12, 13, 14, 15, 16, 17];
	const releases = [];
	for (let version of versions) {
		releases.push(...await getVersionReleases(version));
	}

	const searchResults = [];
	for (let release of releases) {
		const matchingCommits = release.commits.filter(commit => {
			return commit.title.toLowerCase().includes(searchTerm);
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

let searchTerm = process.argv[2];
assert(typeof searchTerm === "string" && searchTerm.length > 0, "Error: Missing search term. Example: ncl abort");
searchTerm = searchTerm.toLowerCase();

searchAllReleases(searchTerm);
