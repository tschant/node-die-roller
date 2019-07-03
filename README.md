# DnD 5e Dice roller

## Usage

   `$ roll-d <input>`

## Options

```
   --gwf, -g  great weapon fighter
   --halfling, -h  halfling roll attack/ability/save
   --crit, -c  critical, roll 2* number of dice
   --critDoulbe  critical, double the result
   --adv, -a  has advantage
   --dis, -d  has disadvantage
   --newChar, -n  generate a new stat block for character
```

## Examples

```
   $ roll-d 1d6
      Result: 4
   $ roll-d 1d20 -a
      Result: 16
   $ roll-d 1d10 + 6
      Result: 8
   $ roll-d -n
      Result: 17,13,16,13,14,9
```

## Google Sheets based rolls:

These require a google.config.json within ./src/google-sheets and a copy of https://docs.google.com/spreadsheets/d/1qw3DMBK4OgF0jai8GDRtKKXZ8oZmzwwO8phXRD5nC1k/edit#gid=1538485300

```
     Saves: str, dex, con, int, wis, cha
        $ ./index.js str save
     Checks: str, dex, con, int, wis, cha
     Checks: acrobatics, animal, arcana, athletics, deception, history, insight, intimidation, investigation, medicine, nature, perception, performance, persuasion, religion, sleight, stealth, survival
        $ ./index.js str check
        $ ./index.js perception
```

Will need to configure Google Sheets API: [Google API Console](https://console.developers.google.com/apis/dashboard?project=quickstart-1562099832474&authuser=0)

Example `google.config.json` (added `sheet_id` to credentials from API)

```
{
	"sheet_id": "________",
	"installed": {
		"auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
		"auth_uri": "https://accounts.google.com/o/oauth2/auth",
		"client_id": "____.apps.googleusercontent.com",
		"client_secret": "________",
		"project_id": "",
		"redirect_uris": [
			"urn:ietf:wg:oauth:2.0:oob",
			"http://localhost"
		],
		"token_uri": "https://oauth2.googleapis.com/token"
	}
}
```
