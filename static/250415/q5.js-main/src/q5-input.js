Q5.modules.input = ($, q) => {
	if ($._scope == 'graphics') return;

	$.mouseX = 0;
	$.mouseY = 0;
	$.pmouseX = 0;
	$.pmouseY = 0;
	$.touches = [];
	$.mouseButton = '';
	$.keyIsPressed = false;
	$.mouseIsPressed = false;
	$.key = '';
	$.keyCode = 0;

	$.UP_ARROW = 38;
	$.DOWN_ARROW = 40;
	$.LEFT_ARROW = 37;
	$.RIGHT_ARROW = 39;
	$.SHIFT = 16;
	$.TAB = 9;
	$.BACKSPACE = 8;
	$.ENTER = $.RETURN = 13;
	$.ALT = $.OPTION = 18;
	$.CONTROL = 17;
	$.DELETE = 46;
	$.ESCAPE = 27;

	$.ARROW = 'default';
	$.CROSS = 'crosshair';
	$.HAND = 'pointer';
	$.MOVE = 'move';
	$.TEXT = 'text';

	let keysHeld = {};
	let mouseBtns = [Q5.LEFT, Q5.CENTER, Q5.RIGHT];

	let c = $.canvas;

	$._startAudio = () => {
		if (!Q5.aud || Q5.aud?.state != 'running') $.userStartAudio();
	};

	$._updateMouse = (e) => {
		if (e.changedTouches) return;

		if (document.pointerLockElement) {
			// In pointer lock mode, update position based on movement
			q.mouseX += e.movementX;
			q.mouseY += e.movementY;
		} else if (c) {
			let rect = c.getBoundingClientRect();
			let sx = c.scrollWidth / $.width || 1;
			let sy = c.scrollHeight / $.height || 1;
			q.mouseX = (e.clientX - rect.left) / sx;
			q.mouseY = (e.clientY - rect.top) / sy;
			if ($._webgpu) {
				q.mouseX -= c.hw;
				q.mouseY -= c.hh;
			}
		} else {
			q.mouseX = e.clientX;
			q.mouseY = e.clientY;
		}
		q.moveX = e.movementX;
		q.moveY = e.movementY;
	};

	let pressAmt = 0;

	$._onmousedown = (e) => {
		pressAmt++;
		$._startAudio();
		$._updateMouse(e);
		q.mouseIsPressed = true;
		q.mouseButton = mouseBtns[e.button];
		$.mousePressed(e);
	};

	$._onmousemove = (e) => {
		if (c && !c.visible) return;
		$._updateMouse(e);
		if ($.mouseIsPressed) $.mouseDragged(e);
		else $.mouseMoved(e);
	};

	$._onmouseup = (e) => {
		if (pressAmt > 0) pressAmt--;
		else return;
		$._updateMouse(e);
		q.mouseIsPressed = false;
		$.mouseReleased(e);
	};

	$._onclick = (e) => {
		$._updateMouse(e);
		q.mouseIsPressed = true;
		$.mouseClicked(e);
		q.mouseIsPressed = false;
	};

	$._ondblclick = (e) => {
		$._updateMouse(e);
		q.mouseIsPressed = true;
		$.doubleClicked(e);
		q.mouseIsPressed = false;
	};

	$._onwheel = (e) => {
		$._updateMouse(e);
		e.delta = e.deltaY;
		if ($.mouseWheel(e) == false || $._noScroll) e.preventDefault();
	};

	$.cursor = (name, x, y) => {
		let pfx = '';
		if (name.includes('.')) {
			name = `url("${name}")`;
			pfx = ', auto';
		}
		if (x !== undefined) {
			name += ' ' + x + ' ' + y;
		}
		$.canvas.style.cursor = name + pfx;
	};

	$.noCursor = () => ($.canvas.style.cursor = 'none');
	$.noScroll = () => ($._noScroll = true);

	$.requestPointerLock = (unadjustedMovement = false) => {
		return document.body?.requestPointerLock({ unadjustedMovement });
	};
	$.exitPointerLock = () => document.exitPointerLock();

	$._onkeydown = (e) => {
		if (e.repeat) return;
		$._startAudio();
		q.keyIsPressed = true;
		q.key = e.key;
		q.keyCode = e.keyCode;
		keysHeld[$.keyCode] = keysHeld[$.key.toLowerCase()] = true;
		$.keyPressed(e);
		if (e.key.length == 1) $.keyTyped(e);
	};

	$._onkeyup = (e) => {
		q.keyIsPressed = false;
		q.key = e.key;
		q.keyCode = e.keyCode;
		keysHeld[$.keyCode] = keysHeld[$.key.toLowerCase()] = false;
		$.keyReleased(e);
	};

	$.keyIsDown = (v) => !!keysHeld[typeof v == 'string' ? v.toLowerCase() : v];

	function getTouchInfo(touch) {
		const rect = $.canvas.getBoundingClientRect();
		const sx = $.canvas.scrollWidth / $.width || 1;
		const sy = $.canvas.scrollHeight / $.height || 1;
		let modX = 0,
			modY = 0;
		if ($._webgpu) {
			modX = $.halfWidth;
			modY = $.halfHeight;
		}
		return {
			x: (touch.clientX - rect.left) / sx - modX,
			y: (touch.clientY - rect.top) / sy - modY,
			id: touch.identifier
		};
	}

	$._ontouchstart = (e) => {
		$._startAudio();
		q.touches = [...e.touches].map(getTouchInfo);
		if (!$.touchStarted(e)) e.preventDefault();
	};

	$._ontouchmove = (e) => {
		if (c && !c.visible) return;
		q.touches = [...e.touches].map(getTouchInfo);
		if (!$.touchMoved(e)) e.preventDefault();
	};

	$._ontouchend = (e) => {
		q.touches = [...e.touches].map(getTouchInfo);
		if (!$.touchEnded(e)) e.preventDefault();
	};

	if (window) {
		let l = window.addEventListener;
		l('keydown', (e) => $._onkeydown(e), false);
		l('keyup', (e) => $._onkeyup(e), false);

		let pointer = window.PointerEvent ? 'pointer' : 'mouse';

		l(pointer + 'move', (e) => $._onmousemove(e), false);

		l('touchmove', (e) => $._ontouchmove(e));

		if (!c) l('wheel', (e) => $._onwheel(e));
		// making the window level event listener for wheel events
		// not passive would be necessary to be able to use `e.preventDefault`
		// but browsers warn that it's bad for performance
		else c.addEventListener('wheel', (e) => $._onwheel(e));

		if (!$._isGlobal && c) l = c.addEventListener.bind(c);

		l(pointer + 'down', (e) => $._onmousedown(e));
		l(pointer + 'up', (e) => $._onmouseup(e));

		l('click', (e) => $._onclick(e));
		l('dblclick', (e) => $._ondblclick(e));

		l('touchstart', (e) => $._ontouchstart(e));
		l('touchend', (e) => $._ontouchend(e));
		l('touchcancel', (e) => $._ontouchend(e));
	}
};
