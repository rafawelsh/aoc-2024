// part 1
// const text = await Deno.readTextFile('input.txt');
// const mulRegex = /(mul\(\d+\,\d+\))/g;

// const matches = text.matchAll(mulRegex);
// let totalSum = 0;

// for (const match of matches) {
// 	const items = match[0].match(/\d+/g);
// 	if (!items) {
// 		totalSum += 0;
// 	} else {
// 		totalSum += Number(items[0]) * Number(items[1]);
// 	}
// }

// console.log(totalSum);

// part 2
const text = await Deno.readTextFile('input.txt');
const mulRegex = /(mul\(\d+\,\d+\))|(do\(\))|(don\'t\(\))/g;

const matches = text.matchAll(mulRegex);
let totalSum = 0;
let shouldAdd = true;
const START = 'do()';
const STOP = "don't()";

for (const match of matches) {
	if (match[0] === START) {
		shouldAdd = true;
	}
	if (match[0] === STOP) {
		shouldAdd = false;
	}

	if (shouldAdd) {
		const items = match[0].match(/\d+/g);
		if (!items) {
			totalSum += 0;
		} else {
			totalSum += Number(items[0]) * Number(items[1]);
		}
	}
}

console.log(totalSum);
