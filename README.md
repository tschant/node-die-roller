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
   --newChar, -n  generate a new stat block for character
```

## Examples

```
   $ roll-d 1d6
      Result: 4
   $ roll-d 1d20 -a
      Result: 16
   $ roll-d 1d10 + 6
      Result: 8
   $ roll-d -n
      Result: 17,13,16,13,14,9
```