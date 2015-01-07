"use strict";

if (!window.matths) window.matths = {};
window.matths.snake = (function () {

	var _wrap = function (fnc) {
		return function () {
			return fnc.apply(this, Array.prototype.slice.call(arguments));
		};
	}

	var _createSnake = function (symbol, grid, headX, headY, length, direction) {
		var _grid = grid;
		var _symbol = symbol;
		var _direction = direction;
		var _snake = [];

		var l = 0;
		while (l < length) {
			l++;
			_grid.setItem(headX, headY, symbol);
			_snake.push([headX, headY]);
		}

		var _setDirection = function (direction) {
			_direction = direction;
		}

		var _getDirection = function () {
			return _direction;
		}

		var _step = function() {
			var dx = (_direction == 'left' ? -1 : (_direction == 'right' ? +1 : 0));
			var dy = (_direction == 'up' ? -1 : (_direction == 'down' ? +1 : 0));

			var second = _snake[_snake.length - 1];
			var first = [second[0] + dx, second[1] + dy];

			var alive = true;
			if (_grid.hasItem(first[0], first[1])) {
				// collision
//				console.log('collision');
				alive = false;
			}
			if (alive) {
				_snake.push(first);
				_grid.addItem(first[0], first[1]);

				var last = _snake.shift();
				_grid.removeItem(last[0], last[1]);
			}
		};

		var _getSegments = function () {
			return _snake.slice(0);
		};

		return {
			step: _wrap(_step),
			setDirection: _wrap(_setDirection),
			getDirection: _wrap(_getDirection),
			getSegments: _wrap(_getSegments)
		};
	};

	return {
		createSnake: _wrap(_createSnake)
	}

})();
