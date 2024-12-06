const textFile = await Deno.readTextFile('./input.txt');
const splitText = textFile.split('\n');

// create map and locate initial guard position
const map: string[][] = [];
const guardPostion: number[] = [];
for (let i = 0; i < splitText.length; i++) {
	const row = [];
	for (let j = 0; j < splitText[i].length; j++) {
		row.push(splitText[i][j]);
		if (splitText[i][j] === '^') {
			console.log('starting position');
			console.log(i, j);
			guardPostion.push(i, j);
		}
	}
	map.push(row);
}

// helpers to make naviagtion easier.
const DIRECTIONS = ['north', 'east', 'south', 'west'] as const;
type Direction = (typeof DIRECTIONS)[number];

function createDirection(initialDirection: Direction = 'north') {
	let currentIndex = DIRECTIONS.indexOf(initialDirection);

	return {
		current: () => DIRECTIONS[currentIndex],
		rotateRight: () => {
			currentIndex = (currentIndex + 1) % DIRECTIONS.length;
			return DIRECTIONS[currentIndex];
		},
		moveGuard: (row: number, col: number, direction: Direction) => {
			switch (direction) {
				case DIRECTIONS[0]:
					return [row - 1, col];
				case DIRECTIONS[1]:
					return [row, col + 1];
				case DIRECTIONS[2]:
					return [row + 1, col];
				case DIRECTIONS[3]:
					return [row, col - 1];
			}
		},
		moveOneStepBack: (row: number, col: number, direction: Direction) => {
			switch (direction) {
				case DIRECTIONS[0]:
					return [row + 1, col];
				case DIRECTIONS[1]:
					return [row, col - 1];
				case DIRECTIONS[2]:
					return [row - 1, col];
				case DIRECTIONS[3]:
					return [row, col + 1];
			}
		},
	};
}

const directionNavigator = createDirection('north');

let stepsTaken = 1;

function guardMovements(
	currentGuardPostion: number[],
	currentMovementDirection: Direction
) {
	let [row, col] = currentGuardPostion;

	while (map[row][col] !== '#') {
		[row, col] = directionNavigator.moveGuard(
			row,
			col,
			currentMovementDirection
		);

		// catch when we are outside the map
		if (row < 0 || row === map.length || col < 0 || col === map[0].length) {
			return;
		}

		if (map[row][col] === '.') {
			stepsTaken++;
			map[row][col] = 'X';
		}
	}

	[row, col] = directionNavigator.moveOneStepBack(
		row,
		col,
		currentMovementDirection
	);
	guardMovements([row, col], directionNavigator.rotateRight());
}

guardMovements(guardPostion, directionNavigator.current());

console.log({ stepsTaken });
