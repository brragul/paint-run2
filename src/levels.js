// Paint Run - Level Maps
// 1 = tile
// 0 = empty

var levels = [{
	// 4x4
	tiles: [
		[1,1,1,0],
		[1,0,1,1],
		[0,0,1,1],
		[1,1,1,1],
	]
},{
	// 5x5
	tiles: [
		[1,1,1,1,0],
		[1,0,0,1,1],
		[1,0,1,1,1],
		[1,0,1,0,0],
		[1,1,1,1,0],
	]
},{
	// 6x6
	tiles: [
		[1,1,1,1,0,1],
		[0,0,0,1,1,1],
		[0,0,1,1,1,1],
		[1,0,1,1,0,1],
		[1,1,1,1,0,1],
		[0,1,0,1,1,1]
	]
},{
	// 6x7
	tiles: [
		[1,1,1,1,1,1],
		[0,0,0,1,1,1],
		[0,0,1,1,0,1],
		[1,0,0,1,0,1],
		[1,1,1,1,0,1],
		[0,1,1,1,1,1],
		[1,1,1,0,1,1]
	]
},{
	// 7x9
	tiles: [
		[1,0,1,1,0,1,0],
		[1,0,0,1,1,1,1],
		[1,0,1,1,0,1,1],
		[1,0,1,1,0,1,0],
		[1,1,1,0,0,1,0],
		[0,1,1,0,1,1,1],
		[0,1,0,1,1,1,0],
		[0,1,0,1,0,1,0],
		[0,1,1,1,1,1,1]
	]
},{
	// 8x8
	tiles: [
		[1,0,1,1,1,0,1,0],
		[1,0,0,0,1,1,1,1],
		[1,0,1,1,1,0,1,1],
		[1,0,1,1,1,1,0,1],
		[1,1,1,0,0,0,1,1],
		[0,1,1,0,0,0,1,1],
		[0,1,1,1,0,0,0,0],
		[0,1,0,1,1,1,1,1],
	]
}];

export default levels
