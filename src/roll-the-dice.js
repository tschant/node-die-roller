const chalk = require('chalk');
const random = require('random');
// eslint-disable-next-line no-console
const debugLog = toOutput => isDebug && console.debug(chalk.dim(toOutput));
let isDebug = false;
const rollADice = (dice) => random.int(1, dice);

function gwfRoll(primary, dice) {
	if (primary <= 2) {
		const secondary = rollADice(dice);
		debugLog(chalk.italic(`re-rolling 1&2's:	${primary} to ${secondary}`));
		return secondary;
	}
	return primary;
}

function rollA20(primaryRoll, additionalRoll, adv, dis, halfling) {
	if (halfling) {
		if (primaryRoll === 1) {
			const reRoll = rollADice(20);
			debugLog(chalk.italic(`re-rolling 1's:	${primaryRoll} to ${reRoll}`));
			primaryRoll = reRoll;
		}
		if (additionalRoll === 1) {
			const reRoll = rollADice(20);
			debugLog(chalk.italic(`re-rolling 1's:	${primaryRoll} to ${reRoll}`));
			additionalRoll = reRoll;
		}
	}
	if (adv) {
		debugLog(`advant: ${primaryRoll}	|	${additionalRoll}	= ${Math.max(primaryRoll, additionalRoll)}`);
		return Math.max(primaryRoll, additionalRoll);
	} else if (dis) {
		debugLog(`disadv: ${primaryRoll}	|	${additionalRoll}	= ${Math.min(primaryRoll, additionalRoll)}`);
		return Math.min(primaryRoll, additionalRoll);
	}
	return primaryRoll;
}

function rollTheDice({ dice, count }, {
	crit = false,
	critDouble = false,
	halfling = false,
	gwf = false,
	adv = false,
	dis = false,
	debug = false
} = {}) {
	isDebug = debug;
	if (dice) {
		debugLog(`###################	${chalk.underline.italic(count + 'd' + dice)}	####################`);
		dice = parseInt(dice, 10);
		if (crit) {
			debugLog(`crit 2*${count} dice`);
			count *= 2;
		}
		let result = [];
		for (let i = 0; i < count; i++) {
			let rollToTake = rollADice(dice);
			if (dice === 20) {
				rollToTake = rollA20(rollToTake, rollADice(dice), adv, dis, halfling);
			} else if (gwf) {
				rollToTake = gwfRoll(rollToTake, dice);
			}
			result = result.concat(rollToTake);
		}
		debugLog(`rolled:	${result}`);
		const total = result.reduce((total, value) => total + value, 0);
		(result.length > 1 || critDouble) && debugLog(`total :	${critDouble ? total * 2 : total}`);
		debugLog('####################################################');
		return critDouble ? 2 * total : total;
	}
	return parseInt(count, 10);
}

exports.rollTheDice = rollTheDice;
