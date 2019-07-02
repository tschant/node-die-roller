#!/usr/bin/env node
const meow = require('meow');
const chalk = require('chalk');
const { parseDice } = require('./src/parse-dice');
const { rollTheDice } = require('./src/roll-the-dice');
const { rollTheDicePlot } = require('./src/roll-the-dice.freq');
const { genNewCharStatBlock } = require('./src/gen-new-char-stat-block');
const { characterStats, characterSaves } = require('./src/google-sheets/character-stats');
// eslint-disable-next-line no-console
const log = console.log;

const cli = meow(`
    Usage
       $ roll-d <input>

    Options
       --gwf, -g  great weapon fighter
       --halfling, -h  halfling roll attack/ability/save
       --crit, -c  critical, roll 2* number of dice
       --critDoulbe  critical, double the result
       --adv, -a  has advantage
       --dis, -d  has disadvantage
       --newChar, -n  generate a new stat block for character

    Examples
       $ roll-d.js 1d6
       ${chalk.underline('Result: ' + chalk.yellow('4'))}
       $ roll-d.js 1d20 -a
       ${chalk.underline('Result: ' + chalk.yellow('16'))}
       $ roll-d.js 1d10 + 6
       ${chalk.underline('Result: ' + chalk.yellow('8'))}
       $ roll-d.js -n
       ${chalk.underline('Result: ' + chalk.yellow('17,13,16,13,14,9'))}

    ${chalk.bold('These require a google.config.json within google-sheets and a copy of ' + chalk.underline('https://docs.google.com/spreadsheets/d/1qw3DMBK4OgF0jai8GDRtKKXZ8oZmzwwO8phXRD5nC1k/edit#gid=1538485300'))}
       $ roll-d.js cha save
       ${chalk.underline('Result: ' + chalk.yellow('20'))}
       $ roll-d.js str check
       ${chalk.underline('Result: ' + chalk.yellow('17'))}
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
		const isSave = /save/.test(cli.input);
		if (isSave) {
			characterSaves().then(stats => {
				const ability = /str|dex|con|int|wis|cha/.exec(cli.input);
				const { mod } = stats[ability[0]];
				roll(`1d20${mod}`, cli.flags);
			});
		} else {
			// Assume ability check
			characterStats().then(stats => {
				const ability = /str|dex|con|int|wis|cha/.exec(cli.input);
				const {mod} = stats[ability[0]];
				roll(`1d20${mod}`, cli.flags);
			});
		}
	}
} else if (cli.flags.newChar) {
	log(chalk.bold.underline(`Result:${chalk.reset.bold.yellow(' ' + genNewCharStatBlock(cli.flags))}`));
} else {
	cli.showHelp();
}
