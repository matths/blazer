"use strict";

if (!window.matths) window.matths = {};
window.matths.grid = (function () {

	var _grid;
	var _width;
	var _height;

	var _initGrid = function (w, h) {
		_grid = [];
		_width = w;
		_height = h;
		var x = 0;
		var y = 0;
		while (x <= w) {
			_grid[x] = [];
			while (y <= h) {
				_grid[x][y] = false;
				y++;
			}
			x++;
			y = 0;
		}
	}

	var _setItem = function (x, y, item) {
		_grid[x][y] = item;
	};

	var _getItem = function (x, y) {
		return _grid[x][y];
	};

	var _isOut = function (x, y) {
		return (x < 0 || y < 0 || x > _width || y > _height);
	};

	var _hasItem = function (x, y) {
		return _isOut(x, y) || (_getItem(x, y) != false);
	};

	var _removeItem = function (x, y) {
		_setItem(x, y, false);
	};

	var _wrap = function (fnc) {
		return function () {
			return fnc.apply(this, Array.prototype.slice.call(arguments));
		};
	}

	return {
		initGrid: _wrap(_initGrid),
		addItem: _wrap(_setItem),
		setItem: _wrap(_setItem),
		getItem: _wrap(_getItem),
		hasItem: _wrap(_hasItem),
		removeItem: _wrap(_removeItem),
	}

})();
