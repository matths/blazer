"use strict";
(function () {

	var appId = "~blazer";
	var appUrl = "http://192.168.12.33:8000/receiver/index.html";

	var senderDaemon = null;
	var messageChannel = null;

	var ipInput = document.getElementById('ipInput');
	ipInput.focus();

	var startReceiverApp = function () {

		if (ipInput.value != "") {
			var patrn = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
			if (!patrn.exec(ipInput.value)) {
				return;
			}
			var ip = ipInput.value;

			if (senderDaemon == null) {
				senderDaemon = new SenderDaemon(ip, appId);

				console.log("CREATE SENDER DAEMON");

				senderDaemon.on("appopened", function (mc) {
					messageChannel = mc;
					console.info("senderDaemon appopened");
				});

				senderDaemon.openApp(appUrl, -1, true);
			}

		}
	};

	var stopReceiverApp = function () {
		senderDaemon.closeApp(appUrl, -1, true);
		senderDaemon = null;
	};

	var sendHandlerForDirection = function (direction) {
		return function (e) {
			if (messageChannel)
				messageChannel.send(direction);
		}
	};

	var startBtn = document.getElementById('startBtn');
	var stopBtn = document.getElementById('stopBtn');
	
	startBtn.addEventListener('click', startReceiverApp);
	stopBtn.addEventListener('click', stopReceiverApp);

	var directions = ['up', 'left', 'down', 'right'];
	var btn;
	for (var i=0; i<directions.length; i++) {
		var dir = directions[i];
		btn = document.getElementById(dir + 'Btn');
		btn.addEventListener('click', sendHandlerForDirection(dir));
	}

	// keyboard interaction

	var _keys = {
		38: 'up',
		40: 'down',
		37: 'left',
		39: 'right'
	}

	var getEventDirection = function (e) {
		var direction = false;
		if (e.keyCode && _keys[e.keyCode]){
			// fallback
			direction = _keys[e.keyCode];
		}
		return direction;
	};

	document.addEventListener('keydown', function (e) {
		var dir = getEventDirection(e);
		if (!dir) return;
		btn = document.getElementById(dir + 'Btn');
		btn.setAttribute('class', 'controlBtn active');
		sendHandlerForDirection(dir)();
	});

	document.addEventListener('keyup', function (e) {
		var dir = getEventDirection(e);
		if (!dir) return;
		btn = document.getElementById(dir + 'Btn');
		btn.setAttribute('class', 'controlBtn');
	});

})();
