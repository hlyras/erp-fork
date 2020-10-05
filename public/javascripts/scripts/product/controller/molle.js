// CANVAS CONFIGURATION
let CANVAS_MOLLE = document.getElementById("canvas");
let CANVAS_MOLLE_CONTEXT = CANVAS_MOLLE.getContext("2d");
let CANVAS_CLIENT_RECT = CANVAS_MOLLE.getBoundingClientRect();

CANVAS_MOLLE.color = "#f0f0f0";

let offsetX = CANVAS_CLIENT_RECT.left;
let offsetY = CANVAS_CLIENT_RECT.top;

let startX;
let startY;

// ACCESSORY CONTROLLER
// CANVAS_MOLLE.addEventListener("touch", function (e) {
//   var touch = e.touches[0];
//   console.log(touch);
//   var mouseEvent = new MouseEvent("mousemove", {
//     clientX: touch.clientX,
//     clientY: touch.clientY
//   });
//   CANVAS_MOLLE.dispatchEvent(mouseEvent);
// }, false);


Accessory.controller = {
	mouse: {
		down: (e) => {
			e.preventDefault();
	        e.stopPropagation();

	        let mx=parseInt(e.clientX-offsetX);
	        let my=parseInt(e.clientY-offsetY);

	        if(Accessory){
	        	Accessory.mouse.verifyClick(mx, my);
	        };

	        startX = mx;
	        startY = my;
		},
		up: (e) => {
			e.preventDefault();
	        e.stopPropagation();

	        if(Accessory){
	        	Accessory.mouse.release();
	        };
		},
		out: (e) => {
	        if(Accessory){
				Accessory.mouse.release();
	        };
		},
		move: (e) => {
			e.preventDefault();
			e.stopPropagation();

			let mx=parseInt(e.clientX-offsetX);
			let my=parseInt(e.clientY-offsetY);

			let dx = mx-startX;
			let dy = my-startY;

			if(Accessory){
				Accessory.mouse.move(dx, dy);
			};

			lib.rect(CANVAS_MOLLE_CONTEXT, CANVAS_MOLLE.color, 0, 0, CANVAS_MOLLE.width, CANVAS_MOLLE.height);
			Accessory.draw(CANVAS_MOLLE_CONTEXT);

			startX = mx;
			startY = my;
		}
	},
	touch: {
		down: (e) => {
			e.preventDefault();
	        e.stopPropagation();

			let mx = parseInt(e.targetTouches[0].clientX-offsetX);
	        let my = parseInt(e.targetTouches[0].clientY-offsetY);

	        if(Accessory){
	        	Accessory.mouse.verifyClick(mx, my);
	        };

	        startX = mx;
	        startY = my;
		},
		up: (e) => {
			e.preventDefault();
	        e.stopPropagation();

	        if(Accessory){
	        	Accessory.mouse.release();
	        };
		},
		out: (e) => {
			e.preventDefault();
	        e.stopPropagation();
	        
	        if(Accessory){
				Accessory.mouse.release();
	        };
		},
		move: (e) => {
			e.preventDefault();
			e.stopPropagation();

			let mx=parseInt(e.targetTouches[0].clientX-offsetX);
			let my=parseInt(e.targetTouches[0].clientY-offsetY);

			let dx = mx-startX;
			let dy = my-startY;

			if(Accessory){
				Accessory.mouse.move(dx, dy);
			};

			lib.rect(CANVAS_MOLLE_CONTEXT, CANVAS_MOLLE.color, 0, 0, CANVAS_MOLLE.width, CANVAS_MOLLE.height);
			Accessory.draw(CANVAS_MOLLE_CONTEXT);

			startX = mx;
			startY = my;
		}
	}
};

CANVAS_MOLLE.onmousedown = Accessory.controller.mouse.down;
CANVAS_MOLLE.onmouseup = Accessory.controller.mouse.up;
CANVAS_MOLLE.onmousemove = Accessory.controller.mouse.move;
CANVAS_MOLLE.onmouseout = Accessory.controller.mouse.out;

CANVAS_MOLLE.ontouchstart = Accessory.controller.touch.down;
CANVAS_MOLLE.ontouchend = Accessory.controller.touch.up;
CANVAS_MOLLE.ontouchcancel = Accessory.controller.touch.out;
CANVAS_MOLLE.ontouchmove = Accessory.controller.touch.move;

lib.rect(CANVAS_MOLLE_CONTEXT, CANVAS_MOLLE.color, 0, 0, CANVAS_MOLLE.width, CANVAS_MOLLE.height);
Accessory.draw(CANVAS_MOLLE_CONTEXT);

window.onscroll = function (oEvent) {
	CANVAS_CLIENT_RECT = CANVAS_MOLLE.getBoundingClientRect();
	offsetX = CANVAS_CLIENT_RECT.left;
	offsetY = CANVAS_CLIENT_RECT.top;
};