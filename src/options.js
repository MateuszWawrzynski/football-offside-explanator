
//	Team IDs
const TEAM_DEF = 0;
const TEAM_ATK = 1;

//	Environment options
const options = {
	renderScale: 1,

	env: {
		fieldOffset: 20,
		fieldWidth: 1065,
		fieldHeight: 715,
		fieldGrassColor: '#567D46',
		fieldGrassColorOut: '#5D884C',
		fieldLinesColor: '#FFFFFF',
		fieldLinesSize: 3,

		cornersRadius: 9,

		penaltyBoxWidth: 165,
		penaltyBoxHeight: 402,
		penaltyKickDist: 110,
		penaltyCircleRadius: 91,

		goalBoxWidth: 55,
		goalBoxHeight: 183,
		goalNetColor: '#DDDDDD',

		middleCircleRadius: 91,

		goalWidth: 20,
		goalHeight: 73
	},

	players: {
		bodyRadius: 12,
		defendersColor: '#5555FF',
		attackersColor: '#FF5555',
		gkStroke: '#FFBB55'
	},

	ball: {
		radius: 6,
		color: '#FFFFFF',
		passSpeed: 10
	}
}
