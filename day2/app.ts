const text = await Deno.readTextFile('input.txt');
const reports = text.split(/\n/);

let safeReports = 0;
for (const report of reports) {
	const numbers = report.split(' ');
	const isAsc = Number(numbers[0]) < Number(numbers[1]);

	// part 1
	// let shouldAddReport = true;

	// part 2 we can withhold 1 error
	let errorsFound = 0;
	for (let i = 1; i < numbers.length; i++) {
		const currentNumber = Number(numbers[i]);
		const prevNumber = Number(numbers[i - 1]);

		if (isAsc) {
			// must be moving up
			// 1 2 3 4
			if (
				currentNumber - prevNumber === 0 ||
				currentNumber - prevNumber > 3 ||
				currentNumber < prevNumber
			) {
				console.log(currentNumber, prevNumber, isAsc);
				// shouldAddReport = false;
				errorsFound++;
			}
		} else {
			// must be moving down
			// 4 3 2 1
			if (
				prevNumber - currentNumber === 0 ||
				prevNumber - currentNumber > 3 ||
				prevNumber < currentNumber
			) {
				console.log(currentNumber, prevNumber, isAsc);
				// shouldAddReport = false;
				errorsFound++;
			}
		}
	}

	errorsFound <= 1 && safeReports++;
}

console.log(safeReports);

/*
655 - too high

634 - too low
*/
