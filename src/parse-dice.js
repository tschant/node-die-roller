function parseDice(die = '') {
	const count = die.match(/[+-]?(\d*)(?=d)?/);
	const dice = die.match(/d(\d+)/);
	const modifier = die.match(/([+-])/);
	return {
		count: count && count[1] ? count[1] : '1',
		dice: dice && dice[1],
		modifier: modifier && modifier[1]
	};
}

exports.parseDice = parseDice;
