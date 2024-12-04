const textFile = await Deno.readTextFile('input.txt');
const reports = textFile.split(/\n/);

const grid: string[][] = [];
reports.forEach((report) => grid.push(report.split('')));

const keys = ['X', 'M', 'A', 'S'];
const DIRECTIONS = {
	UP: 'up',
	DOWN: 'down',
	FORWARDS: 'forwards',
	BACKWARDS: 'backwards',
	UPFORWARDS: 'upforwards',
	DOWNFORWARDS: 'downforwards',
	UPBACKWARDS: 'upbackwards',
	DOWNBACKWARDS: 'downbackwards',
};
let matches = 0;

const lookForRemainingLetter = ({
	row,
	col,
	nextLetter,
	direction,
}: {
	row: number;
	col: number;
	nextLetter: number;
	direction?: string;
}) => {
	// out of bounds;
	if (row < 0 || col < 0 || row === grid.length || col === grid[0].length) {
		console.log('out of bounds');
		console.log(row, col);
		return;
	}

	// we found found a legit coordinate that returns
	// the wrong letter. end search
	if (grid[row][col] !== keys[nextLetter]) {
		console.log('not a match');
		console.log(`trying to match ${grid[row][col]} to ${keys[nextLetter]}`);
		return;
	}

	// if (nextLetter > 3) {
	// 	console.log('too many attempts');
	// 	return;
	// }
	// found a complete match!
	if (
		nextLetter === 3 &&
		keys[nextLetter] === grid[row][col] &&
		grid[row][col] === 'S'
	) {
		// console.log('FOUND A MATCH-----------');
		// console.log(`MATCHING ${keys[nextLetter]} TO ${grid[row][col]}`);
		matches++;
		return;
	}

	// get directions
	// force search to follow only one path until return;
	switch (direction) {
		case DIRECTIONS.UP:
			lookForRemainingLetter({
				row: row + 1,
				col: col,
				nextLetter: nextLetter + 1,
				direction: DIRECTIONS.UP,
			});
			break;
		case DIRECTIONS.DOWN:
			lookForRemainingLetter({
				row: row - 1,
				col: col,
				nextLetter: nextLetter + 1,
				direction: DIRECTIONS.DOWN,
			});
			break;
		case DIRECTIONS.FORWARDS:
			lookForRemainingLetter({
				row: row,
				col: col + 1,
				nextLetter: nextLetter + 1,
				direction: DIRECTIONS.FORWARDS,
			});
			break;
		case DIRECTIONS.BACKWARDS:
			lookForRemainingLetter({
				row: row,
				col: col - 1,
				nextLetter: nextLetter + 1,
				direction: DIRECTIONS.BACKWARDS,
			});
			break;
		case DIRECTIONS.UPFORWARDS:
			lookForRemainingLetter({
				row: row + 1,
				col: col + 1,
				nextLetter: nextLetter + 1,
				direction: DIRECTIONS.UPFORWARDS,
			});
			break;
		case DIRECTIONS.DOWNFORWARDS:
			lookForRemainingLetter({
				row: row - 1,
				col: col + 1,
				nextLetter: nextLetter + 1,
				direction: DIRECTIONS.DOWNFORWARDS,
			});
			break;
		case DIRECTIONS.UPBACKWARDS:
			lookForRemainingLetter({
				row: row + 1,
				col: col - 1,
				nextLetter: nextLetter + 1,
				direction: DIRECTIONS.UPBACKWARDS,
			});
			break;
		case DIRECTIONS.DOWNBACKWARDS:
			lookForRemainingLetter({
				row: row - 1,
				col: col - 1,
				nextLetter: nextLetter + 1,
				direction: DIRECTIONS.DOWNBACKWARDS,
			});
			break;
		default:
			console.log('X was found, on to the rest!');
	}
};

for (let row = 0; row < grid.length; row++) {
	for (let col = 0; col < grid[0].length; col++) {
		const currentLetter = grid[row][col];
		if (currentLetter === 'X') {
			Object.entries(DIRECTIONS).map((val) => {
				lookForRemainingLetter({ row, col, nextLetter: 0, direction: val[1] });
			});
		}
	}
}

// console.log({ matches });

// part 2
const lookForRemainingLetterInX = ({
	row,
	col,
}: {
	row: number;
	col: number;
}) => {
	// if any of the additional grabs are out of bounds
	if (
		row - 1 < 0 ||
		col - 1 < 0 ||
		row + 1 === grid.length ||
		col + 1 === grid[0].length
	) {
		console.log('out of bounds');
		console.log(row, col);
		return;
	}

	// get all the letters
	// upbackwards, middle, downforwards \
	const backslash = [
		grid[row - 1][col - 1],
		grid[row][col],
		grid[row + 1][col + 1],
	];

	// downbackwards, middle, upforwards /
	const forwardslach = [
		grid[row + 1][col - 1],
		grid[row][col],
		grid[row - 1][col + 1],
	];

	const sortedBackSlash = backslash
		.sort((a: string, b: string) => a.localeCompare(b))
		.join('');
	const sortedForwardSlash = forwardslach
		.sort((a: string, b: string) => a.localeCompare(b))
		.join('');

	if (sortedBackSlash === 'AMS' && sortedForwardSlash === 'AMS') {
		matches++;
		return;
	}
};

for (let row = 0; row < grid.length; row++) {
	for (let col = 0; col < grid[0].length; col++) {
		const currentLetter = grid[row][col];
		if (currentLetter === 'A') {
			lookForRemainingLetterInX({ row, col });
		}
	}
}

console.log(matches);
