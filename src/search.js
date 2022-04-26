const assert = require("node:assert");

const { searchAllReleases } = require("./lib/search-all-releases.js");
const { getVersionReleases } = require("./lib/get-version-releases.js");

async function search(searchTerm) {
	assert(
		typeof searchTerm === "string" && searchTerm.length > 0,
		"Error: Missing search term. Example: ncl abort"
	);

	searchTerm = searchTerm.toLowerCase();

	const versions = [10, 11, 12, 13, 14, 15, 16, 17];
	const releases = [];
	for (let version of versions) {
		releases.push(...(await getVersionReleases(version)));
	}
	
	searchAllReleases(releases, searchTerm);
}

module.exports = {
	search,
};
