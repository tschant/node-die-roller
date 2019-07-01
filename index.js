#!/usr/bin/env node
const meow = require('meow');
const chalk = require('chalk');
const { parseDice } = require('./src/parse-dice');
const { rollTheDice } = require('./src/roll-the-dice');
const { rollTheDicePlot } = require('./src/roll-the-dice.freq');
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

    Examples
       $ roll-d.js 1d6
       ${chalk.underline('Result: ' + chalk.yellow('4'))}
       $ roll-d.js 1d20 -a
       ${chalk.underline('Result: ' + chalk.yellow('16'))}
       $ roll-d.js 1d10 + 6
       ${chalk.underline('Result: ' + chalk.yellow('8'))}
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
	if (cli.flags.plot) {
		plotRoll(cli.input.join('').replace(/\s/, ''), cli.flags);
	} else {
		roll(cli.input.join('').replace(/\s/, ''), cli.flags);
	}
} else {
	cli.showHelp();
}
