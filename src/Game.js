import React, { Component } from 'react'; 
import Board from './Board.js';
import Button from './Button.js';
import Time from './Time.js';
import Tutorial from './Tutorial.js';


class Game extends React.Component {
	constructor(props) {
		super(props);
		const monsterState = this.getMonsterState();
		this.state = {
			lives: 3,
			gameOver: true,
			touched: 1,
			buttonMessage: "Begin Game!",
			seconds: this.props.level.time,
			statusCode: 'new-game',
			statusMessage: 'Paint Run',
			tutorial: false,
			monsterState: monsterState
		}
		
		this.endLevel = this.endLevel.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.showTutorial = this.showTutorial.bind(this);
	}	
	
	handleClick(e) {
		var sc = e.target.getAttribute('data-statuscode');
		
		if (sc == 'new-game') {
			this.setState({
				gameOver: false
			});
		} else if (sc == 'same-level') {
			this.setState({
				gameOver: false,
				touched: 1
			});
		} else if (sc == 'next-level') {
			var il = this.props.increaseLevel;
			il();
			
			this.setState({
				lives: Math.min(this.state.lives + 2, 4),
				gameOver: false,
				touched: 1
			});
		} else if (sc == 'restart') {
			this.setState({
				lives: 3,
				gameOver: false,
				touched: 1
			});
			
			var restart = this.props.restart;
			restart();
		} 
	}
	
	showTutorial(){
		this.setState({
			tutorial: !this.state.tutorial
		})
	}

	updateGameStatus(gameOver, sm, bm, sc, lives=this.state.lives){
		this.setState({
			gameOver: gameOver,
			statusMessage: sm,
			buttonMessage: bm,
			lives: lives,
			statusCode: sc
		});
	}
	
	updateTouchCount(){
		this.setState({
			touched: parseInt(this.state.touched) + 1
		});
	
		this.checkForWin();
	}
	
	lowerTouchCount(){
		this.setState({
			touched: parseInt(this.state.touched) - 1
		});
	}
	
	checkForWin(){
		if (this.state.touched == this.props.level.tiles) {
			this.updateGameStatus(true, "Level Won", "Next Level", 'next-level')
		} 
	}
	
	endLevel() {
		var lives = this.state.lives - 1
		var gameOver = true;
		
		if (lives > 0) {
			var sm = `Out of time, you have ${lives} lives remaining!`;
			var bm = 'Try again.';
			var sc = 'same-level';
		} else {
			var sm = `Game Over`;
			var bm = 'Play again';
			var sc = 'restart';
		}
		
		this.updateGameStatus(gameOver, sm, bm, sc, lives)
	}
	
	getTileState(locs){
		var rd = this.props.level.grid;
		var tiles = [];

		for (let y = 0; y < rd.length; y++) {
			let row = rd[y];
			let r = [];

			for (let x = 0; x < row.length; x++) {
				let type = row[x] ? 'tile' : 'space';
				let target = false;
				let touchedA = false;
				let touchedM = false;
				
				for (let loc of locs) {
					if (loc.x == x && loc.y == y) {
						if (loc.t == 'a') {
							touchedA = true;
							target = true;
						} else {
							touchedM = true;
						}
					}
				}

				r.push({	x: x,
							y: y,
							type: type,
							target: target,
							touchedA: touchedA,
							touchedM: touchedM
						});
			}

			tiles.push(r)
		}
		return tiles;
	}
	
	getMonsterState(){
		var monsters = []
		var num = this.props.level.monsters;
		var spaces = this.props.level.path;

		for (let i = 0; i < num; i++) {
			var randEndOfPath = Math.floor(Math.random() * spaces.length / 2) + Math.floor(spaces.length / 2);
			var location = spaces.splice(randEndOfPath, 1)[0];
			console.log(location);
			var row = location.y;
			var col = location.x;
			console.log(row, col);
			
			monsters.push({
				mtargetx: col,
				mtargety: row,
				prevDir: 1,
				lives: 3,
				id: i
			});
		}
		
		return monsters;
	}
	
	render() {
		var { x: aTargetx, y: aTargety } = this.props.level.path[0];
		var locs = [{t:'a', x: aTargetx, y: aTargety}];
		var monsterState = this.state.monsterState;
		var tileState = this.getTileState(locs);
		
		for (let monster of monsterState) {
			locs.push({t:'m', x:monster.mtargetx, y:monster.mtargety})
		}
		
		var gameOver = this.state.gameOver;
		var level = this.props.level;
		
		var ut = this.updateTouchCount;
		var ltc = this.lowerTouchCount;
		var endLevel = this.endLevel;

		return (
			<div className="game-board">
				<div className = "header-content">
					<div className="level">
						<h1>Level {level.levelNum}</h1>
						<div className="tbutton" onClick={this.showTutorial}>See tutorial</div>
						{ this.state.tutorial
						  ? <Tutorial />
						  : ''
						}
					</div>
					<div className = "details-tab">
						<div className="lives">{this.state.lives}<br></br><span>lives</span></div>
						<div className="status">{this.state.touched}/{level.tiles}<br></br><span>tiles</span></div>
						{ ! gameOver ? <Time time={this.props.level.time} endLevel={endLevel.bind(this)}/> : '' }
					</div>
				</div><div className = "clear"></div>
			
				{ ! gameOver 
				  ? <Board
						monsters={monsterState}
						rowData={tileState}
						lives={this.state.lives}
						tileCount={level.tiles}
						updateTouchCount={ut.bind(this)}
						lowerTouchCount={ltc.bind(this)}
						level={this.props.level}
						/> 
		  		  : <div className = "gameover">
						<h1>{this.state.statusMessage}</h1>
						<button className="button" onClick={this.handleClick} data-statuscode={this.state.statusCode}>
				        	{this.state.buttonMessage}
				     	</button>
					</div>
				}
			</div>
		);
	}	
}

export default Game;