import { leftItems, rightItems } from './data.ts';

// Part 1
const sortedLeftItems = leftItems.sort((a, b) => a - b);
const sortedRightItems = rightItems.sort((a, b) => a - b);

let totalDistance = 0;

for (let i = 0; i < sortedLeftItems.length; i++) {
	const leftItem = sortedLeftItems[i];
	const rightItem = sortedRightItems[i];

	totalDistance += Math.abs(leftItem - rightItem);
}

console.log(totalDistance);

// Part 2
const leftItemsFrequency: Record<number, number[]> = {};

// get a map of all numbers from leftItems with
// [frequency within leftItems, frequence of rightItems]
for (const lnumber of leftItems) {
	if (!leftItemsFrequency[lnumber]) {
		leftItemsFrequency[lnumber] = [0, 0];
	}
	leftItemsFrequency[lnumber][0] += 1;
}

// count how many times right numbers show up on the leftItemsFrequency

for (const rnumber of rightItems) {
	if (leftItemsFrequency[rnumber]) {
		leftItemsFrequency[rnumber][1] += 1;
	}
	// ignore any that do not match.
}

let totalSum = 0;

Object.entries(leftItemsFrequency).map((key) => {
	const [number, values] = key;

	if (values[1] !== 0) {
		totalSum += Number(number) * values[1];
	}
});

console.log(totalSum);
