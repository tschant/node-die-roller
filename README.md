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
```

## Examples

```
   $ roll-d.js 1d6
      Result: 4
   $ roll-d.js 1d20 -a
      Result: 16
   $ roll-d.js 1d10 + 6
      Result: 8
```