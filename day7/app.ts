const textFile = await Deno.readTextFile('input.txt');
const calibrationList = textFile.split(/\n/);
let sumOfGoodCalibrations = 0;
let sumOfGoodCalibrationsWithConcats = 0;

function checkIfGoodCalibration(
	index: number,
	arrOfValues: number[],
	currentSum: number,
	answer: number,
	foundHit: boolean
): boolean {
	// Base case: reached end of array and found a match
	if (index === arrOfValues.length && answer === currentSum && !foundHit) {
		sumOfGoodCalibrations += currentSum;
		return true;
	}

	// Stop if we've gone past array or already found a hit
	if (index >= arrOfValues.length || foundHit) {
		return foundHit;
	}

	// Try addition path
	const additionSum = currentSum + arrOfValues[index];
	const additionResult = checkIfGoodCalibration(
		index + 1,
		arrOfValues,
		additionSum,
		answer,
		foundHit
	);

	// If addition path found a solution, return true
	if (additionResult) {
		return true;
	}

	// Try multiplication path
	const multiplicationSum = currentSum * arrOfValues[index];
	const multiplicationResult = checkIfGoodCalibration(
		index + 1,
		arrOfValues,
		multiplicationSum,
		answer,
		foundHit
	);

	// Return result of multiplication path
	return multiplicationResult;
}

for (const calibration of calibrationList) {
	const [answer, values] = calibration.split(':');
	const arrOfValues = values.trim().split(' ').map(Number);
	checkIfGoodCalibration(0, arrOfValues, 0, Number(answer), false);
}

function checkIfGoodCalibrationWithConcats(
	index: number,
	arrOfValues: number[],
	currentSum: number,
	answer: number,
	foundHit: boolean
): boolean {
	// Base case: reached end of array and found a match
	if (index === arrOfValues.length && answer === currentSum && !foundHit) {
		sumOfGoodCalibrationsWithConcats += currentSum;
		return true;
	}

	// Stop if we've gone past array or already found a hit
	if (index >= arrOfValues.length || foundHit) {
		return foundHit;
	}

	// Try addition path
	const additionSum = currentSum + arrOfValues[index];
	const additionResult = checkIfGoodCalibrationWithConcats(
		index + 1,
		arrOfValues,
		additionSum,
		answer,
		foundHit
	);

	// If addition path found a solution, return true
	if (additionResult) {
		return true;
	}

	// Try multiplication path
	const multiplicationSum = currentSum * arrOfValues[index];
	const multiplicationResult = checkIfGoodCalibrationWithConcats(
		index + 1,
		arrOfValues,
		multiplicationSum,
		answer,
		foundHit
	);

	// Return result of multiplication path
	if (multiplicationResult) {
		return true;
	}

	// Try concatenation path
	const concatenationSum = Number(
		currentSum.toString() + arrOfValues[index].toString()
	);
	const concatenationResult = checkIfGoodCalibrationWithConcats(
		index + 1,
		arrOfValues,
		concatenationSum,
		answer,
		foundHit
	);

	// Return result of concatenation path
	return concatenationResult;
}

for (const calibration of calibrationList) {
	const [answer, values] = calibration.split(':');
	const arrOfValues = values.trim().split(' ').map(Number);
	checkIfGoodCalibrationWithConcats(0, arrOfValues, 0, Number(answer), false);
}

// console.log({ sumOfGoodCalibrations });

// console.log({ sumOfGoodCalibrationsWithConcats });
