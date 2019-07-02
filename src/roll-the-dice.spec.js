const test = require('ava');
const {rollTheDice} = require('./roll-the-dice');
const NUMBER_OF_ROLLS = 10000;

function testDiceRoller(numberOfRolls, dice, rollOptions) {
	test(`Check ${numberOfRolls} rolls that d${dice} is within the range${rollOptions ? ', options: ' + JSON.stringify(rollOptions) : ''}`, t => {
		const rollToCount = [...new Array(numberOfRolls)].reduce((mapOfValues, _x, i) => {
			const roll = rollTheDice({ count: 1, dice: dice }, rollOptions || {});
			mapOfValues[roll] = mapOfValues[roll] ? mapOfValues[roll] + 1 : 1;
			return mapOfValues;
		}, {});

		Object.keys(rollToCount)
			.forEach(roll => {
				const rollCount = rollToCount[roll];
				t.true(roll >= 1);
				rollOptions && (rollOptions.crit || rollOptions.critDouble) ? t.true(roll <= dice * 2) : t.true(roll <= dice);
				t.true(rollCount >= 1, 'everything rolled at least once');
			});
	});
}

testDiceRoller(NUMBER_OF_ROLLS, 4);
testDiceRoller(NUMBER_OF_ROLLS, 6);
testDiceRoller(NUMBER_OF_ROLLS, 8);
testDiceRoller(NUMBER_OF_ROLLS, 10);
testDiceRoller(NUMBER_OF_ROLLS, 12);
testDiceRoller(NUMBER_OF_ROLLS, 20);

testDiceRoller(NUMBER_OF_ROLLS, 20, {halfling: true});
testDiceRoller(NUMBER_OF_ROLLS, 20, {adv: true});
testDiceRoller(NUMBER_OF_ROLLS, 20, {dis: true});
testDiceRoller(NUMBER_OF_ROLLS, 6, {gwf: true});
testDiceRoller(NUMBER_OF_ROLLS, 6, {crit: true});
testDiceRoller(NUMBER_OF_ROLLS, 6, {critDouble: true});

test('Check that rolling return the number if there are no dice', t => {
	t.is(rollTheDice({count: 5, dice: null}), 5);
});
test('Passing debug shows the rolls that occured', t => {
	t.truthy(rollTheDice({count: 2, dice: 20}, {debug: true, adv: true}));
});
