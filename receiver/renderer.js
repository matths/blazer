"use strict";

if (!window.matths) window.matths = {};
window.matths.renderer = (function () {

	var _body;
	var _canvasElement;
	var _canvasContext;

	var _width;
	var _height;
	var _size;

	var _clear = function () {
		_canvasContext.fillStyle = '#333333';
		_canvasContext.fillRect(0, 0, _width, _height);
	};

	var _initRenderer = function (width, height, size) {
		_width = width;
		_height = height;
		_size = size;

		_canvasElement = document.createElement('canvas');
		_canvasElement.setAttribute('width', _width);
		_canvasElement.setAttribute('height', _height);
		_canvasElement.setAttribute('style', 'margin: 5% 10% auto 10%');

		_body = document.documentElement.getElementsByTagName('body')[0];
		_body.appendChild(_canvasElement);

		_canvasContext = _canvasElement.getContext('2d');
		_clear();
	};

	var _drawAsLines = function (segments, percent) {
		window.ctx = _canvasContext;

		_canvasContext.lineCap = 'round';
		_canvasContext.lineJoin = 'round';
		_canvasContext.lineWidth = _size * 0.75;

		// calc head

		var segH = segments.pop();
		var xH = segH[0] * _size;
		var yH = segH[1] * _size;

		var segment = segments.pop();
		var x = segment[0] * _size;
		var y = segment[1] * _size;

		xH = x - percent * (x - xH);
		yH = y - percent * (y - yH);

		// draw body

		_canvasContext.beginPath();
		_canvasContext.strokeStyle = 'rgba(255, 255, 255, 0.3)';

		_canvasContext.moveTo(xH, yH);
		_canvasContext.lineTo(x, y);

		while (segments.length - 1) {
			segment = segments.pop();
			x = segment[0] * _size;
			y = segment[1] * _size;
			_canvasContext.lineTo(x, y);
		}

		// calc & draw tail

		var segT = segments.pop();
		var xT = segT[0] * _size;
		var yT = segT[1] * _size;
		xT = xT - percent * (xT - x);
		yT = yT - percent * (yT - y);
		_canvasContext.lineTo(xT, yT);

		_canvasContext.stroke();

		// draw head
		
		_canvasContext.beginPath();
		_canvasContext.strokeStyle = 'rgba(168, 72, 8, 0.8)';

		_canvasContext.moveTo(xH, yH);
		_canvasContext.lineTo(xH + 0.01, yH + 0.01);

		_canvasContext.stroke();

	};

	var _drawAsDots = function (segments) {
		window.ctx = _canvasContext;

		var z = 0.001;

		_canvasContext.lineCap = 'round';
		_canvasContext.lineJoin = 'round';
		_canvasContext.lineWidth = _size * 0.75;

		// head
		var segment = segments.pop();
		var x = segment[0] * _size;
		var y = segment[1] * _size;

		_canvasContext.beginPath();
		_canvasContext.strokeStyle = 'rgba(168, 72, 8, 0.8)';
		_canvasContext.moveTo(x, y);
		_canvasContext.lineTo(x+z, y+z);
		_canvasContext.stroke();

		// body
		_canvasContext.beginPath();
		_canvasContext.strokeStyle = 'rgba(255, 255, 255, 0.3)';
		while (segments.length) {
			segment = segments.pop();
			x = segment[0] * _size;
			y = segment[1] * _size;
			_canvasContext.moveTo(x, y);
			_canvasContext.lineTo(x+z, y+z);
		}
		_canvasContext.stroke();
	};

	var _wrap = function (fnc) {
		return function () {
			return fnc.apply(this, Array.prototype.slice.call(arguments));
		};
	}

	return {
		initRenderer: _wrap(_initRenderer),
		drawAsLines: _wrap(_drawAsLines),
		drawAsDots: _wrap(_drawAsDots),
		clear: _wrap(_clear)
	};
})();
