'use strict';

module.exports = {
	"parserOptions": {
		ecmaVersion: 2019,
	},
	"env":{
		"commonjs": true,
		"es6": true,
		"node": true
	},
	"extends": "eslint:recommended",
	"rules": {
		"arrow-spacing": [
			2,
			{
				"before": true,
				"after": true
			}
		],
		"block-spacing": [
			2,
			"always"
		],
		"brace-style": [
			2,
			"1tbs",
			{
				"allowSingleLine": true
			}
		],
		"comma-spacing": [
			2,
			{
				"before": false,
				"after": true
			}
		],
		"comma-style": [
			2,
			"last"
		],
		"curly": [
			2,
			"multi-line"
		],
		"dot-location": [
			2,
			"property"
		],
		"eol-last": 1,
		"func-call-spacing": [
			2,
			"never"
		],
		"key-spacing": [
			2,
			{
				"beforeColon": false,
				"afterColon": true
			}
		],
		"keyword-spacing": [
			1,
			{
				"before": true,
				"after": true
			}
		],
		"indent": [
			"error",
			"tab"
		],
		"no-extra-bind": 2,
		"no-extra-boolean-cast": 2,
		"no-extra-parens": [
			2,
			"functions"
		],
		"no-floating-decimal": 1,
		"no-multi-spaces": 2,
		"no-multiple-empty-lines": [
			1,
			{
				"max": 1
			}
		],
		"no-regex-spaces": 2,
		"no-trailing-spaces": 2,
		"no-undef-init": 2,
		"no-unneeded-ternary": [
			2,
			{
				"defaultAssignment": false
			}
		],
		"no-useless-computed-key": 2,
		"no-useless-rename": 2,
		"no-whitespace-before-property": 2,
		"object-property-newline": [
			1,
			{
				"allowMultiplePropertiesPerLine": true
			}
		],
		"quotes": [
			2,
			"single"
		],
		"rest-spread-spacing": [
			2,
			"never"
		],
		"semi": 1,
		"space-in-parens": [
			2,
			"never"
		],
		"space-infix-ops": 1,
		"template-curly-spacing": [
			2,
			"never"
		],
		"yield-star-spacing": [
			2,
			"both"
		],
		"yoda": [
			1,
			"never"
		],
		"eqeqeq": [
			1,
			"allow-null"
		],
		"no-array-constructor": 2,
		"no-caller": 2,
		"no-console": 1,
		"no-cond-assign": 2,
		"no-constant-condition": 2,
		"no-debugger": 2,
		"no-dupe-args": 2,
		"no-dupe-keys": 2,
		"no-duplicate-case": 2,
		"no-duplicate-imports": 1,
		"no-empty-pattern": 2,
		"no-ex-assign": 2,
		"no-func-assign": 2,
		"no-global-assign": 1,
		"no-invalid-regexp": 1,
		"no-irregular-whitespace": 2,
		"no-lone-blocks": 2,
		"no-mixed-spaces-and-tabs": 2,
		"no-new": 1,
		"no-new-func": 1,
		"no-new-object": 1,
		"no-new-require": 1,
		"no-new-symbol": 1,
		"no-new-wrappers": 1,
		"no-octal": 2,
		"no-octal-escape": 2,
		"no-redeclare": 2,
		"no-return-assign": [
			2,
			"except-parens"
		],
		"no-self-assign": 1,
		"no-self-compare": 2,
		"no-sequences": 2,
		"no-shadow-restricted-names": 2,
		"no-sparse-arrays": 2,
		"no-template-curly-in-string": 2,
		"no-unexpected-multiline": 2,
		"no-unmodified-loop-condition": 2,
		"no-unused-vars": [
			2,
			{
				"vars": "all",
				"args": "none"
			}
		],
		"no-unreachable": 2,
		"no-unsafe-finally": 2,
		"no-useless-call": 2,
		"no-useless-constructor": 2,
		"no-useless-escape": 2,
		"no-with": 1,
		"one-var": [
			2,
			{
				"initialized": "never"
			}
		],
		"use-isnan": 2,
		"valid-typeof": 2
	}
}