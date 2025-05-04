const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const startBtn = document.getElementById('startBtn');

let ball = { x: 200, y: 300, vx: 2, vy: -3, radius: 10 };
let paddle = { x: 150, width: 100, height: 10 };
let score = 0;
let running = false;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // draw ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
    ctx.fillStyle = '#ff0';
    ctx.fill();
    ctx.closePath();
    // draw paddle
    ctx.fillStyle = '#0f0';
    ctx.fillRect(paddle.x, canvas.height - paddle.height - 10, paddle.width, paddle.height);
}

function update() {
    if (!running) return;
    ball.x += ball.vx;
    ball.y += ball.vy;
    // wall collision
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) ball.vx *= -1;
    if (ball.y - ball.radius < 0) ball.vy *= -1;
    // paddle collision
    if (ball.y + ball.radius > canvas.height - paddle.height - 10 &&
        ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
        ball.vy *= -1;
        score++;
        scoreEl.textContent = score;
    }
    // bottom miss
    if (ball.y - ball.radius > canvas.height) endGame();
}

function loop() {
    draw();
    update();
    if (running) requestAnimationFrame(loop);
}

function startGame() {
    if (running) return;
    // TODO: integrate linera start_game call
    running = true;
    score = 0;
    scoreEl.textContent = score;
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.vx = 2;
    ball.vy = -3;
    loop();
}

function endGame() {
    running = false;
    // TODO: integrate linera submit_score call with score
    alert('Game Over! Your score: ' + score);
}

canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    paddle.x = e.clientX - rect.left - paddle.width/2;
    if (paddle.x < 0) paddle.x = 0;
    if (paddle.x + paddle.width > canvas.width) paddle.x = canvas.width - paddle.width;
});

startBtn.addEventListener('click', startGame);