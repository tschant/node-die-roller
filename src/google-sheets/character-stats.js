const { fetchCredentialJson, authorize, pullStatsFromSheets } = require("./google-api");

exports.characterStats = async () => {
	let statBlock = {};
	const configString = await fetchCredentialJson();
	// Authorize a client with credentials, then call the Google Sheets API.
	const config = JSON.parse(configString);
	const oAuth2Client = await authorize(config);

	const rows = await pullStatsFromSheets(oAuth2Client, config.sheet_id, 'Front!B9:K15');
	if (rows.length) {
		statBlock = rows.reduce((stats, row) => {
			stats[row[0].toLowerCase()] = {
				raw: row[4].trim(),
				mod: row[7].trim()
			};
			return stats;
		}, {});
	}
	return statBlock;
};

exports.characterSaves = async () => {
	let statBlock = {};
	const configString = await fetchCredentialJson();
	// Authorize a client with credentials, then call the Google Sheets API.
	const config = JSON.parse(configString);
	const oAuth2Client = await authorize(config);

	const rows = await pullStatsFromSheets(oAuth2Client, config.sheet_id, 'Front!N9:T14');
	if (rows.length) {
		statBlock = rows.reduce((stats, row) => {
			stats[row[0].toLowerCase()] = {
				mod: row[4].trim()
			};
			return stats;
		}, {});
	}
	return statBlock;
};