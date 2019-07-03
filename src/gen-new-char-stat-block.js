const chalk = require('chalk');
const random = require('random');
// eslint-disable-next-line no-console
const debugLog = toOutput => isDebug && console.debug(chalk.dim(toOutput));
let isDebug = false;
const rollADice = (dice) => random.int(1, dice);

const DICE = 6;
const COUNT = 4;
const STATS = require('../dnd-5e-info.json').stats;

function createStatBlock() {
	let result = [];
	for (let i = 0; i < COUNT; i++) {
		result = result.concat(rollADice(DICE));
	}
	const total = result
		.sort()
		.filter((_, i) => i)
		.reduce((total, value) => total + value, 0);
	debugLog(`rolled:	${result}`);
	return total;
}

function genNewCharStatBlock(flags) {
	isDebug = flags.debug;
	return STATS.map(() => {
		return createStatBlock();
	});
}

exports.genNewCharStatBlock = genNewCharStatBlock;
