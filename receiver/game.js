"use strict";

(function () {

	var WIDTH = 1920;
	var HEIGHT = 1080;
	var SIZE = 30;
	var MODE = 'dots'; // 'lines'

	var gridWidth = Math.floor(WIDTH / SIZE);
	var gridHeight = Math.floor(HEIGHT / SIZE);

	var _grid = window.matths.grid;
	_grid.initGrid(gridWidth, gridHeight);

	var _renderer = window.matths.renderer;
	_renderer.initRenderer(WIDTH, HEIGHT, SIZE);

	var _snake = window.matths.snake.createSnake("a", _grid, 3, 3, 8, 'down');
	var _snake2 = window.matths.snake.createSnake("b", _grid, 18, 11, 7, 'left');

	var directions = ['up', 'down', 'left', 'right'];
	var getRandomDirection = function (formerDirection) {
		var r = Math.floor(4*Math.random());
		var direction = directions[r];
		if ((formerDirection == 'up' && direction == 'down')
			|| (formerDirection == 'down' && direction == 'up')
			|| (formerDirection == 'left' && direction == 'right')
			|| (formerDirection == 'right' && direction == 'left'))
			return getRandomDirection();
		console.log(formerDirection, r, direction);
		return direction;
	};

	// game loop

	var _i = 0;
	var _r = 0;
	var _loop = function () {
		_i++;
		_r++;

		if (MODE == 'lines') {
			_renderer.clear();
			_renderer.drawAsLines(_snake.getSegments(), _i/10);
			_renderer.drawAsLines(_snake2.getSegments(), _i/10);
		}
		
		if (_i > 9) {
			_i = 0;
			if (MODE == 'dots') {
				_renderer.clear();
				_renderer.drawAsDots(_snake.getSegments());
				_renderer.drawAsDots(_snake2.getSegments());
			}
			_snake.step();
			_snake2.step();
		}

		if (_r > 39) {
			_r = 0;
			_snake2.setDirection(getRandomDirection(_snake2.getDirection()));
		}

		window.requestAnimationFrame(_loop);
	};
	_loop();

	// keyboard interaction

	var _keys = {
		38: 'up',
		40: 'down',
		37: 'left',
		39: 'right'
	}

	document.addEventListener('keydown', function (e) {
		var direction;
		if (e.key) {
			// firefox
			direction = e.key.toLowerCase();
		} else if (e.keyIdentifier) {
			// chrome
			direction = e.keyIdentifier.toLowerCase();
		} else if (e.keyCode && _keys[e.keyCode]){
			// fallback
			direction = _keys[e.keyCode];
		}
		_snake.setDirection(direction);
	});

	// MatchStick receiver

	var receiverManager = new ReceiverManager("~blazer");
	var channel = receiverManager.createMessageChannel("blazer");
	receiverManager.open();

	channel.on("message", function(senderId, data){
		_snake.setDirection(data);
	});

})();
