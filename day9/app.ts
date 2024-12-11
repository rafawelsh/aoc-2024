const textFile = await Deno.readTextFile('./sample.txt');

function addToArr(
	itemToAdd: number | string,
	frequency: number,
	arr: string[]
) {
	for (let i = 0; i < frequency; i++) {
		arr.push(String(itemToAdd));
	}

	return arr;
}

const length = textFile.length - 1;
const parsedSequence: string[] = [];
let currSequenceNumber = 0;

// for part 2
const countOfSpaces = [];
//

for (let i = 0; i < length; i++) {
	if (i % 2 === 0) {
		addToArr(currSequenceNumber, Number(textFile[i]), parsedSequence);
		currSequenceNumber++;
	} else {
		addToArr('.', Number(textFile[i]), parsedSequence);
		countOfSpaces.push(Number(textFile[i]));
	}
}

const parsedSequenceForPt2 = [...parsedSequence];

// part 1 work
let right = parsedSequence.length - 1;
for (let left = 0; left < right; left++) {
	if (parsedSequence[left] === '.') {
		while (parsedSequence[right] === '.' && left < right) {
			right--;
		}

		// swap elegible numbers from right
		[parsedSequence[left], parsedSequence[right]] = [
			parsedSequence[right],
			parsedSequence[left],
		];
		right--;
	}
}

const totalCount = parsedSequence.reduce((acc, curr, index) => {
	return (acc += curr !== '.' ? Number(curr) * index : 0);
}, 0);

// console.log({ totalCount });

console.log({ countOfSpaces });
