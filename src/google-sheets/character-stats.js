const { fetchCredentialJson, authorize, pullStatsFromSheets } = require('./google-api');

async function characterSkillStats() {
	let statBlock = {};
	const configString = await fetchCredentialJson();
	// Authorize a client with credentials, then call the Google Sheets API.
	const config = JSON.parse(configString);
	const oAuth2Client = await authorize(config);

	const rows = await pullStatsFromSheets(oAuth2Client, config.sheet_id, 'Front!B20:M37');
	if (rows.length) {
		statBlock = rows.reduce((stats, row) => {
			const ability = /^[a-zA-Z]+(?= .*$)/.exec(row[3]);
			stats[ability[0].toLowerCase()] = {
				mod: row[0].trim()
			};
			return stats;
		}, {});
	}
	return statBlock;
}

async function characterStats() {
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
}

async function characterSaves() {
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
}

exports.characterStats = characterStats;
exports.characterSkillStats = characterSkillStats;
exports.characterSaves = characterSaves;
