function searchAllReleases(releases, searchTerm) {
	const searchResults = [];
	for (let release of releases) {
		const matchingCommits = release.commits.filter((commit) => {
			return commit.title.toLowerCase().includes(searchTerm);
		});

		if (matchingCommits.length > 0) {
			searchResults.push({ ...release, commits: matchingCommits });
		}
	}

	for (let releaseResults of searchResults) {
		console.log(
			`v${releaseResults.version} - ${releaseResults.name} (${releaseResults.date})`
		);
		for (let commit of releaseResults.commits) {
			console.log(
				`  - ${commit.title} (${commit.metadata.join(", ")}) - ${
					commit.pr_url
				}`
			);
		}
		console.log("");
	}
}

module.exports = {
	searchAllReleases,
};
