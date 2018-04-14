
var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

// c.fillStyle = "#de2499";
// c.fillRect(100, 100, 100, 100);
// c.fillRect(500, 100, 100, 100);

// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.strokeStyle = "#349021";
// c.stroke();

// for( var i=0; i<1000 ; i++) {
//     var x = Math.random();
//     var y = Math.random();
//     c.beginPath();
//     c.arc(x * window.innerWidth, y * window.innerHeight, 50, 0, Math.PI * 2, false);
//     c.strokeStyle = "#ff88ff";
//     c.stroke();
// }

var mouse = {
    x : undefined,
    y : undefined
}
var maxRadius = 100;

var colorArr = [
    '#A4243B',
    '#D8C99B',
    '#D8973C',
    '#BD632F',
    '#273E47',
];

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

function cursor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 10;

    c.beginPath();
    c.arc(this.x , this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = '#f0f';
    c.fill();
} 

function circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = colorArr[Math.floor(Math.random() * colorArr.length)];
    this.minRadius = radius;

    this.draw = function() {
        c.beginPath();
        c.arc(this.x , this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = function() {
        this.x += this.dx;
        this.y += this.dy;

        if ( this.x > (innerWidth - this.radius) || this.x < this.radius) {
            this.dx = -this.dx;
        }
        if ( this.y > (innerHeight - this.radius) || this.y < this.radius) {
            this.dy = -this.dy;
        }

        // Interactivity
        if( mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius) {
                this.radius += 1;                    
            }
        }
        else if(this.radius > this.minRadius) {
            this.radius -=1;
        }

        this.draw();
    }
}

var circleArr = [];
for(var i=0; i<200 ; i++) {
    var x = (Math.random() * (window.innerWidth - (radius *2))) + radius;
    var y = (Math.random() * (window.innerHeight - (radius * 2))) + radius;
    var dx = (Math.random() - 0.5) * 3;
    var dy = (Math.random() - 0.5) * 3;
    var radius = Math.random() * 5 + 1;
    circleArr.push(new circle(x, y, dx, dy, radius));
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    c.fillStyle = "#000";
    c.fillRect(0, 0, window.innerWidth, window.innerHeight);

    for (var i = 0; i < circleArr.length; i++) {
        circleArr[i].update();
    }

    cursor(mouse.x, mouse.y);

}

animate();