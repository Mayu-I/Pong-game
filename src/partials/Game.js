import { SVG_NS, PADDLE_HEIGHT, PADDLE_WIDTH, PADDLE_GAP, PADDLE_SPEED, KEYS, BALL_RADIUS, SCORE_FONT } from '../settings';
import Board from './Board';
import Paddle from './Paddle';
import Ball from './Ball';
import Score from './Score';

export default class Game {
  constructor(element, width, height, bg) {
    this.element = element;
    this.width = width;
    this.height = height;
    this.bg = bg;
    this.gameElement = document.getElementById(this.element);
    this.bgElement = document.getElementById(this.bg);
    this.board = new Board(this.width, this.height);
    const paddleY = (this.height - PADDLE_HEIGHT) / 2;
    const paddleX1 = this.width - PADDLE_GAP - PADDLE_WIDTH;
    this.paddle1 = new Paddle(this.height, PADDLE_WIDTH, PADDLE_HEIGHT, paddleX1, paddleY, KEYS.p1Up, KEYS.p1Down, KEYS.p1Fire);
    this.paddle2 = new Paddle(this.height, PADDLE_WIDTH, PADDLE_HEIGHT, PADDLE_GAP, paddleY, KEYS.p2Up, KEYS.p2Down, KEYS.p2Fire);
    this.ball1 = new Ball(BALL_RADIUS, this.width, this.height, PADDLE_GAP, PADDLE_WIDTH, "#EC47AA");
    this.ball2 = new Ball(BALL_RADIUS, this.width, this.height, PADDLE_GAP, PADDLE_WIDTH, "#72F453");
    this.paused = false;
    this.score1 = new Score(this.width / 2 + 35, SCORE_FONT);
    this.score2 = new Score(this.width / 2 - 60, SCORE_FONT);
    document.addEventListener("keydown", (event) => {
      if (event.key === KEYS.pause) {
        this.paddle1.setSpeed(PADDLE_SPEED);
        this.paddle2.setSpeed(PADDLE_SPEED);
        this.paused = !this.paused;
      }
    });


    // Other code goes here...
  }

  render() {
    if (this.paused) {
      this.paddle1.setSpeed(0);
      this.paddle2.setSpeed(0);
      // this.bgElement.classList.add("pause-bg");
      return;
    }
    this.gameElement.innerHTML = '';

    let svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttributeNS(null, "width", this.width);
    svg.setAttributeNS(null, "height", this.height);
    svg.setAttributeNS(null, "viewBox", `0 0 ${this.width} ${this.height}`);
    this.gameElement.appendChild(svg);

    this.board.render(svg);
    this.paddle1.render(svg);
    this.paddle2.render(svg);
    this.ball1.render(svg, this.paddle1, this.paddle2);
    this.ball2.render(svg, this.paddle1, this.paddle2);
    this.score1.render(svg, this.paddle1.getScore());
    this.score2.render(svg, this.paddle2.getScore());
  }
}

