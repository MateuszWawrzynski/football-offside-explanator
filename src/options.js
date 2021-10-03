
//	Team IDs
const TEAM_DEF = 0;
const TEAM_ATK = 1;

//	Players initial positions on the pitch
const INIT_POS_RANDOM = 0; 	 // all players stand completely random
const INIT_POS_OWN_HALF = 1; // each team has random formation on own side 
const INIT_POS_ATK_HALF = 2; // all players random on attackers team side 
const INIT_POS_DEF_HALF = 3; // all players random on defenders team side 
const INIT_POS_BENCH = 4;	 // start on bench	


//	Environment options
const options = {
	renderScale: 1,
	playersInitialPosition: INIT_POS_RANDOM,

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
		gkStroke: '#FFBB55',
		runMaxSpeed: 3
	},

	ball: {
		radius: 6,
		color: '#FFFFFF',
		passSpeed: 10
	},

	offside: {
		lineColor: '#FF0000',
		indicatorColor: '#FF5522'
	}
}
