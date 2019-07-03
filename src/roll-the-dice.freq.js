const chalk = require('chalk');
const { rollTheDice } = require('./roll-the-dice');
// eslint-disable-next-line no-console
const log = console.log;

function rollTheDicePlot({dice, count}, flags) {
	const numberOfRolls = parseInt(count, 10);
	const rollToCount = [...new Array(numberOfRolls)].reduce((mapOfValues) => {
		const roll = rollTheDice({ count: 1, dice: dice }, flags);
		mapOfValues[roll] = mapOfValues[roll] ? mapOfValues[roll] + 1 : 1;
		return mapOfValues;
	}, {});

	log(`Plot freq of ${numberOfRolls} rolls for d${dice}`);
	Object.keys(rollToCount)
		.forEach(roll => {
			const rollCount = rollToCount[roll];
			const arrayLength = Math.round((rollCount / numberOfRolls) * 100);
			log(`${roll}:	${chalk.yellow(arrayLength + '%')}	-	${[...new Array(arrayLength)].map(() => '*').join('')}`);
		});
	log('\n');
}

exports.rollTheDicePlot = rollTheDicePlot;
