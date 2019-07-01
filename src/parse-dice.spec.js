const test = require('ava');
const { parseDice } = require('./parse-dice');

test('passing invalid values doesn\'t blow', t => {
	t.deepEqual(parseDice(), {
		count: '1',
		dice: null,
		modifier: null
	});
	t.deepEqual(parseDice(''), {
		count: '1',
		dice: null,
		modifier: null
	});
	t.deepEqual(parseDice('HURR_DURR'), {
		count: '1',
		dice: null,
		modifier: null
	});
	t.deepEqual(parseDice('!@#%$^'), {
		count: '1',
		dice: null,
		modifier: null
	});
});

test('can parse dice rolls and modifiers', t => {
	t.deepEqual(parseDice('1d6'), {
		count: '1',
		dice: '6',
		modifier: null
	});
	t.deepEqual(parseDice('+10d10'), {
		count: '10',
		dice: '10',
		modifier: '+'
	});
	t.deepEqual(parseDice('-4d4'), {
		count: '4',
		dice: '4',
		modifier: '-'
	});
	t.deepEqual(parseDice('d20'), {
		count: '1',
		dice: '20',
		modifier: null
	});
});
