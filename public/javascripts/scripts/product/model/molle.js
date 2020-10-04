const Accessory = function(id, name, x, y, width, height, color){
	this.id = id;
	this.name = name;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.isDragging = false;
	this.color = color;
	this.verifyContact = (objects) => {
		for(i in objects){
			if(this.id != objects[i].id && this.name != objects[i].name){
				if(lib.collide(this, objects[i]) == "left"){
					this.x = objects[i].x - this.width - 1;
				} else if(lib.collide(this, objects[i]) == "right"){
					this.x = objects[i].x + objects[i].width + 1;
				} else if(lib.collide(this, objects[i]) == "top"){
					this.y = objects[i].y - this.height - 1;
				} else if(lib.collide(this, objects[i]) == "bottom"){
					this.y = objects[i].y + objects[i].height + 1;
				};
			};
		};
		// left
		if(this.x < 0){ this.x = 80; this.height; this.verifyContact(objects); };
		// right
		if(this.x > 380 - this.width){ this.x = 380 - this.width - 80; this.height; this.verifyContact(objects); };
		// top
		if(this.y < 0){ this.y = 80; this.height; this.verifyContact(objects); };
		// botton
		if(this.y > 400 - this.height){ this.y = 400 - this.height - 80; this.verifyContact(objects); };
	};
};

Accessory.database = [];

Accessory.draw = (ctx) => {
	for(i in Accessory.database){
        lib.rect(ctx, Accessory.database[i].color, Accessory.database[i].x, Accessory.database[i].y, Accessory.database[i].width, Accessory.database[i].height);
    };
};

Accessory.mouse = {
	verifyClick: (mx, my) => {
        for(i in Accessory.database){
            if(mx>Accessory.database[i].x && mx<Accessory.database[i].x+Accessory.database[i].width && my>Accessory.database[i].y && my<Accessory.database[i].y+Accessory.database[i].height){
                Accessory.database[i].isDragging = true;
            }
        }
	},
	release: () => {
		for(i in Accessory.database){
			if(Accessory.database[i].isDragging){
            	Accessory.database[i].isDragging = false;
				Accessory.database[i].verifyContact(Accessory.database);
			};
        };
	},
	move: (dx, dy) => {
		for(i in Accessory.database){
			if(Accessory.database[i].isDragging){
				Accessory.database[i].x += dx;
				Accessory.database[i].y += dy;
			}
		}
	}
};

let bolsaP = new Accessory(1, "bolsa P", 100, 100, 30, 40, "#000");
let bolsaM = new Accessory(2, "bolsa M", 200, 100, 45, 40, "#333");
let bolsaG = new Accessory(3, "bolsa g", 200, 100, 90, 40, "#555");

Accessory.database.push(bolsaP);
Accessory.database.push(bolsaM);
Accessory.database.push(bolsaG);