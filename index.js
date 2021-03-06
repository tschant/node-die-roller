#!/usr/bin/env node
const meow = require('meow');
const chalk = require('chalk');
const { stats, abilities } = require('./dnd-5e-info.json');
const { parseDice } = require('./src/parse-dice');
const { rollTheDice } = require('./src/roll-the-dice');
const { rollTheDicePlot } = require('./src/roll-the-dice.freq');
const { genNewCharStatBlock } = require('./src/gen-new-char-stat-block');
const {
	characterStats,
	characterSaves,
	characterSkillStats,
	characterInitiative
} = require('./src/google-sheets/character-stats');
// eslint-disable-next-line no-console
const log = console.log;
// eslint-disable-next-line no-console
const debugLog = toOutput => console.debug(chalk.dim(toOutput));

const cli = meow(`
    Usage
       $ ./index.js <input>

    Options
       --gwf, -g  great weapon fighter
       --halfling, -h  halfling roll attack/ability/save
       --crit, -c  critical, roll 2* number of dice
       --critDoulbe  critical, double the result
       --adv, -a  has advantage
       --dis, -d  has disadvantage
       --newChar, -n  generate a new stat block for character

    Examples
       $ ./index.js 1d6
       ${chalk.underline('Result: ' + chalk.yellow('4'))}
       $ ./index.js 1d20 -a
       ${chalk.underline('Result: ' + chalk.yellow('16'))}
       $ ./index.js 1d10 + 6
       ${chalk.underline('Result: ' + chalk.yellow('8'))}
       $ ./index.js -n
       ${chalk.underline('Result: ' + chalk.yellow('17,13,16,13,14,9'))}

    ${chalk.bold('These require a google.config.json within ./src/google-sheets/ and a copy of ' + chalk.underline('https://docs.google.com/spreadsheets/d/1qw3DMBK4OgF0jai8GDRtKKXZ8oZmzwwO8phXRD5nC1k/edit#gid=1538485300'))}
       Initiative:
          $ ./index.js init
       Saves: ${stats.join(', ')}
          $ ./index.js str save
       Checks: ${stats.join(', ')}
       Checks: ${abilities.join(', ')}
          $ ./index.js str check
          $ ./index.js perception
`, {
	flags: {
		gwf: {
			type: 'boolean',
			alias: 'g'
		},
		halfling: {
			type: 'boolean',
			alias: 'h'
		},
		crit: {
			type: 'boolean',
			alias: 'c'
		},
		critDouble: {
			type: 'boolean'
		},
		adv: {
			type: 'boolean',
			alias: 'a'
		},
		dis: {
			type: 'boolean',
			alias: 'd'
		},
		newChar: {
			type: 'boolean',
			alias: 'n'
		},
		debug: {
			type: 'boolean'
		},
		plot: {
			type: 'boolean'
		}
	}
});

function plotRoll(input, flags) {
	input
		.split(/([+-]?\d*d\d+)/g)
		.filter(Boolean)
		.map(die => parseDice(die))
		.forEach(die => {
			rollTheDicePlot(die, flags);
		});
}

function roll(input, flags) {
	const final = input
		.split(/([+-]?\d*d\d+)/g)
		.filter(Boolean)
		.map(die => parseDice(die))
		.map(die => {
			let result = rollTheDice(die, flags);
			return die.modifier === '-' ? -1 * result : result;
		})
		.reduce((total, value) => total + value, 0);
	log(chalk.bold.underline(`Result:${chalk.reset.bold.yellow(' ' + final)}`));
}

if (cli.input.length) {
	if (/([+-]?\d*d\d+)/g.test(cli.input)) {
		const input = cli.input.join('').replace(/\s/, '');
		if (cli.flags.plot) {
			plotRoll(input, cli.flags);
		} else {
			roll(input, cli.flags);
		}
	} else {
		// These require access to a google sheet
		if (/save/.test(cli.input)) {
			characterSaves().then(stats => {
				const ability = /str|dex|con|int|wis|cha/.exec(cli.input);
				const { mod } = stats[ability[0]];

				const input = `1d20${mod}`;
				cli.flags.debug && debugLog(chalk.bold(`>>> Rolling: ${input}`));
				roll(input, cli.flags);
			});
		} else if (/init/.test(cli.input)) {
			characterInitiative().then(init => {
				const input = `1d20${init}`;
				cli.flags.debug && debugLog(chalk.bold(`>>> Rolling: ${input}`));
				roll(input, cli.flags);
			});
		} else {
			const stat = new RegExp(stats.join('|')).exec(cli.input);
			const ability = new RegExp(abilities.join('|')).exec(cli.input);
			if (stat || ability) {
				Promise.all([
					characterSkillStats(),
					characterStats()
				]).then(([charAbilities, charStats]) => {
					let mod = stat ? charStats[stat[0]].mod : charAbilities[ability[0]].mod;

					const input = `1d20${mod}`;
					cli.flags.debug && debugLog(chalk.bold(`>>> Rolling: ${input}`));
					roll(input, cli.flags);
				});
			}
		}
	}
} else if (cli.flags.newChar) {
	log(chalk.bold.underline(`Result:${chalk.reset.bold.yellow(' ' + genNewCharStatBlock(cli.flags))}`));
} else {
	cli.showHelp();
}
