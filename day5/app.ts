const textFile = await Deno.readTextFile('./input.txt');

// get all rules
const sections = textFile.split('\n\n');

const rules = sections[0]
	.split('\n')
	.map((line) => line.split('|').map((i) => Number(i)));
const pages = sections[1]
	.split('\n')
	.map((line) => line.split(',').map((i) => Number(i)));

function checkRules() {
	const validPages = pages.filter((page) => {
		// need to check each page against every rule
		return rules.every((rule) => {
			const [leftNum, rightNum] = rule;

			// page of rule numbers (could exists)
			const leftPage = page.indexOf(leftNum);
			const rightPage = page.indexOf(rightNum);

			// check if they exists
			// if both exists then leftNum must be smaller
			return leftPage === -1 || rightPage === -1 || leftPage < rightPage;
		});
	});

	let sum = 0;

	validPages.forEach((pages) => {
		const midPoint = Math.floor(pages.length / 2);
		sum += pages[midPoint];
	});

	console.log(sum);
}

checkRules();
