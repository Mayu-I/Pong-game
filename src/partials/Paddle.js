import { SVG_NS, PADDLE_SPEED, PADDLE_Y } from '../settings';

export default class Paddle {
    constructor(boardHeight, width, height, x, y, upKey, downKey) {
        this.boardHeight = boardHeight;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.speed = PADDLE_SPEED;
        this.score = 0;
        this.maxNum = this.boardHeight - this.height;
        this.minNum = 0;
        document.addEventListener("keydown", (event) => {
            switch (event.key) {
                case upKey:
                    this.isMoveUp = true;
                    break;
                case downKey:
                    this.isMoveDown = true;
                    break;
            };
        });
        document.addEventListener("keyup", (event) => {
            switch (event.key) {
                case upKey:
                    this.isMoveUp = false;
                    break;
                case downKey:
                    this.isMoveDown = false;
                    break;
            };
        });
    }

    moveUp() {
        if (this.isMoveUp) {
            this.y = Math.max(this.minNum, this.y - this.speed)
        }
    }
    moveDown() {
        if (this.isMoveDown) {
            this.y = Math.min(this.maxNum, this.y + this.speed)
        }
    }
    reset() {
        this.score = 0;
        this.y = PADDLE_Y;
    }
    increaseScore() {
        this.score += 1;
    }
    decreaseScore() {
        if (this.score > 0) {
            this.score -= 1;
        }
        this.x -= 3;
        setTimeout(() => {
            this.x += 3;
        }, 50);
        setTimeout(() => {
            this.x -= 3;
        }, 100);
        setTimeout(() => {
            this.x += 3;
        }, 150);
    }
    /*
    shaking() {
        this.x -= 5;
        setTimeout(() => {
            this.x += 5;
        }, 50);
        setTimeout(() => {
            this.x -= 5;
        }, 150);
        setTimeout(() => {
            this.x += 5;
        }, 200);
    }
    */
    getScore() {
        return this.score;
    }
    setSpeed(speed) {
        this.speed = speed;
    }
    getCoordinates() {
        return {
            left: this.x,
            top: this.y,
            right: this.x + this.width,
            bottom: this.y + this.height
        };
    }
    render(svg) {
        const paddle = document.createElementNS(SVG_NS, "rect");
        paddle.setAttributeNS(null, "width", this.width);
        paddle.setAttributeNS(null, "height", this.height);
        paddle.setAttributeNS(null, "x", this.x);
        paddle.setAttributeNS(null, "y", this.y);
        paddle.setAttributeNS(null, "fill", "#ffffff");
        this.moveUp();
        this.moveDown();
        svg.appendChild(paddle);
    }

}


