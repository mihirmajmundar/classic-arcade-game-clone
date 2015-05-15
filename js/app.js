// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    //For better animation, x poisition is negative
    //To rendamize the position of enemy, used random
    // number with mod of 3
    // enemy height and width will use to check the collusion
    this.x = -90;
    this.y = 225 - (Math.round(Math.random()*100) % 3)*83;
    this.sprite = 'images/enemy-bug.png';
    this.width = 60;
    this.height = 60;
    this.speed = 125 + (Math.round(Math.random()*200));
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed*dt;
    this.sprite = 'images/enemy-bug.png';

    //****Reset enemy
    // If foward position of enemy is more than the width of
    // the canvas then position of enemy reset to beginning
    if (this.x >= ctx.canvas.width){
    this.x = -90;
    this.y = 225 - (Math.round(Math.random()*100) % 3)*83;
    this.speed = 125 + (Math.round(Math.random()*200));
    this.sprite = 'images/enemy-bug.png';
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(){
    this.sprite = 'images/char-boy.png';
    this.width = 60;
    this.height = 60;
    this.x = 220;
    this.y = 415;
}

Player.prototype.update = function(){

}

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite),this.x, this.y);
}

// handleInput function moves the player on the screen. Function check the next position
// if position is outside of canvas then it will stop. It also check if player has crossed
// the road and reached to other end, in that case it will prompt user and reset the position.

Player.prototype.handleInput = function(keypressed){
    var keyMoves = 41;
    switch(keypressed){
        case 'left':
            if(this.x - keyMoves <-keyMoves/2)
                {return;}
            this.x -= keyMoves;
            break;
        case 'right':
            if(this.x + keyMoves > ctx.canvas.width-(keyMoves*2))
                {return;}
            this.x += keyMoves;
            break;
        case 'up':
            if(this.y - keyMoves < -keyMoves/2)
                {
                    alert("You Win!!!");
                    this.x = 220;
                    this.y = 415;
            }
            this.y -= keyMoves;
            break;
        case 'down':
            if(this.y + keyMoves > ctx.canvas.height-(keyMoves*4.5))
                {return;}
            this.y += keyMoves;
            break;
    }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var totalEnemies = 3;
var allEnemies = [];

for(i=0; i<totalEnemies; i++){
    var enemy = new Enemy();
    allEnemies.push(enemy);
}

var player = new Player();

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
