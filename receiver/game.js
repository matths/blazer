"use strict";

(function () {

	var WIDTH = window.screen.availWidth * 0.8;
	var HEIGHT = window.screen.availHeight * 0.8;
	var SIZE = 30;

	var gridWidth = Math.floor(WIDTH / SIZE);
	var gridHeight = Math.floor(HEIGHT / SIZE);

	var _grid = window.matths.grid;
	_grid.initGrid(gridWidth, gridHeight);

	var _renderer = window.matths.renderer;
	_renderer.initRenderer(WIDTH, HEIGHT, SIZE);

	var _snake = window.matths.snake.createSnake("a", _grid, 3, 3, 8, 'down');

	// game loop

	var _i = 0;
	var _loop = function () {
		_i++;

		if (_i > 2) {
			_i = 0;
			_renderer.clear();
			_renderer.drawAsDots(_snake.getSegments());
			_snake.step();
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
		if (e.keyCode && _keys[e.keyCode]){
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
