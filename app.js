// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Following variables are used to determine x and y-axis and speed of the bugs.
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    // Multiplying speed with dt parameter.
    this.x += this.speed * dt;
    // When enemies are out of the board , they reappear with different speed.
    if (this.x > 510) {
        this.x = -50;
        this.speed = 100 + Math.floor(Math.random() * 600);
    }
    // When collision takes place between player and enemy , player is send to starting position.
    if (player.x < this.x + 80 &&
        player.x + 80 > this.x &&
        player.y < this.y + 60 &&
        60 + player.y > this.y) {
        player.x = 202;
        player.y = 405;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Function to define the player.
let Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.player = 'images/char-boy.png';
};

Player.prototype.update = function (dt) {

};
// Draw the player on the screen
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
};

Player.prototype.handleInput = function (keyPress) {
    if (keyPress == 'left' && this.x > 0) {
        this.x -= 102;
    }
    if (keyPress == 'right' && this.x < 405) {
        this.x += 102;
    }
    if (keyPress == 'up' && this.y > 0) {
        this.y -= 83;
    }
    if (keyPress == 'down' && this.y < 405) {
        this.y += 83;
    }
    if (this.y < 0) {
    	swal({
  				title: "You Made It!",
  				text: `Do you want to replay it ?`,
  				icon: "success",
  				//buttons: ["Close", "Ready"],
			})
			.then((playAgain) => {
				if(playAgain) {
					// setTimeout(function(){
					// 	reStart();
					// }, 500)
					setTimeout(() => {
			            this.x = 202;
			            this.y = 405;
			        }, 100);
				}
			});
        // setTimeout(() => {
        //     this.x = 202;
        //     this.y = 405;
        // }, 500);
    }
};

// let Life = function (x,y){
//     this.x = x;
//     this.y = y;
//     this.life = 'images/Heart.png';
// };
// Life.prototype.update = function (dt) {

// };
// Life.prototype.render = function () {
//     ctx.drawImage(Resources.get(this.life), this.x, this.y);
// };

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


// Array of enemies.
let allEnemies = [];
// Location of enemies on y-axis.
let enemyLocation = [63, 147, 230];
// Until update function for enemies is invoked, the enemies will run at a speed of 200.
enemyLocation.forEach(function (locationY) {
    enemy = new Enemy(0, locationY, 300);
    allEnemies.push(enemy);
});
// Starting position of player.
let player = new Player(202, 405);
//let life = new Life(0,405);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
