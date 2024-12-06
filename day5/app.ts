const textFile = await Deno.readTextFile('./input.txt');

// get all rules
const sections = textFile.split('\n\n');

const rules = sections[0]
	.split('\n')
	.map((line) => line.split('|').map((i) => Number(i)));
const pages = sections[1]
	.split('\n')
	.map((line) => line.split(',').map((i) => Number(i)));

// function checkRules() {
// 	const validPages = pages.filter((page) => {
// 		// need to check each page against every rule
// 		return rules.every((rule) => {
// 			const [leftNum, rightNum] = rule;

// 			// page of rule numbers (could exists)
// 			const leftPage = page.indexOf(leftNum);
// 			const rightPage = page.indexOf(rightNum);

// 			// check if they exists
// 			// if both exists then leftNum must be smaller
// 			return leftPage === -1 || rightPage === -1 || leftPage < rightPage;
// 		});
// 	});

// 	let sum = 0;

// 	validPages.forEach((pages) => {
// 		const midPoint = Math.floor(pages.length / 2);
// 		sum += pages[midPoint];
// 	});

// 	console.log(sum);
// }

function findIncorrectOrededAndFix() {
	const incorrectlyOrederedPages = pages.filter((page) => {
		// need to check each page against every rule
		return rules.some(([left, right]) => {
			// Find indices of both numbers in the page
			const leftIndex = page.indexOf(left);
			const rightIndex = page.indexOf(right);

			/// we need to find the pages where both pages do exist
			// AND they are incorrectly ordered.
			return !(leftIndex === -1 || rightIndex === -1 || leftIndex < rightIndex);
		});
	});

	const reorderedPages = incorrectlyOrederedPages.map((page) => {
		const mustComeBefore: Record<number, Set<number>> = {};
		for (const num of page) {
			mustComeBefore[num] = new Set();
		}

		// Build dependencies based on rules
		for (const [left, right] of rules) {
			if (page.includes(left) && page.includes(right)) {
				mustComeBefore[right].add(left);
			}
		}

		// Repeatedly find numbers that can come next (have no dependencies)
		const result: number[] = [];
		const remaining = new Set(page);

		while (remaining.size > 0) {
			const available = Array.from(remaining).filter((num) =>
				Array.from(mustComeBefore[num]).every((dep) => !remaining.has(dep))
			);

			if (available.length === 0) {
				// If we get stuck, there must be a cycle - just take any remaining number
				const next = Array.from(remaining)[0];
				result.push(next);
				remaining.delete(next);
			} else {
				// Take the first available number
				const next = available[0];
				result.push(next);
				remaining.delete(next);
			}
		}

		return result;
	});

	let sum = 0;

	reorderedPages.forEach((pages) => {
		const midPoint = Math.floor(pages.length / 2);
		sum += pages[midPoint];
	});

	console.log(sum);
}

checkRules();
findIncorrectOrededAndFix();
