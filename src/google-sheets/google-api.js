const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { google } = require('googleapis');

// eslint-disable-next-line no-console
const log = console.log;
// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const CREDENTIALS_PATH = path.resolve(__dirname, 'google.config.json');
const TOKEN_PATH = path.resolve(__dirname, 'token.json');

// Load client secrets from a local file.
function fetchCredentialJson() {
	return new Promise((resolve) => {
		fs.readFile(CREDENTIALS_PATH, (err, content) => resolve(content, err));
	});
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials) {
	return new Promise((resolve, reject) => {
		const { client_secret, client_id, redirect_uris } = credentials.installed;
		const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

		// Check if we have previously stored a token.
		fs.readFile(TOKEN_PATH, (err, token) => {
			if (err) {
				return getNewToken(oAuth2Client).then(newOAuth2Client => {
					resolve(newOAuth2Client);
				}, err => {
					reject(err);
				});
			}
			oAuth2Client.setCredentials(JSON.parse(token));
			resolve(oAuth2Client);
		});
	});
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client) {
	const authUrl = oAuth2Client.generateAuthUrl({
		access_type: 'offline',
		scope: SCOPES,
	});
	log('Authorize this app by visiting this url:', authUrl);
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});
	return new Promise((resolve, reject) => {
		rl.question('Enter the code from that page here: ', (code) => {
			rl.close();
			oAuth2Client.getToken(code, (err, token) => {
				if (err) {
					return reject('Error while trying to retrieve access token', err);
				}
				oAuth2Client.setCredentials(token);
				// Store the token to disk for later program executions
				fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
					if (err) {
						return reject(err);
					}
					log('Token stored to', TOKEN_PATH);
				});
				resolve(oAuth2Client);
			});
		});
	});
}

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
function pullStatsFromSheets(auth, sheetId, range) {
	const sheets = google.sheets({ version: 'v4', auth });
	return new Promise((resolve, reject) => {
		sheets.spreadsheets.values.get({
			spreadsheetId: sheetId,
			range,
		}, (err, res) => {
			if (err) {
				return reject('The API returned an error: ' + err);
			}
			resolve(res.data.values);
		});
	});
}

exports.pullStatsFromSheets = pullStatsFromSheets;
exports.fetchCredentialJson = fetchCredentialJson;
exports.authorize = authorize;
