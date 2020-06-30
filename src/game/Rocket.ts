import { Sprite } from '../framework/Sprite';

export class Rocket extends Sprite {

  constructor(ctx: CanvasRenderingContext2D) {
    super(ctx);
    this.width = 100;
    this.height = 100;
    this.x = this.stageWidth / 2 - this.width / 2;
    this.y = this.stageHeight - this.height;
    document.addEventListener("mousemove", (e: MouseEvent) => this.onMouseMove(e));
  }

  public render() {
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.width, this.height);
    this.ctx.fillStyle = "#FF0000";
    this.ctx.fill();
    this.ctx.closePath();
  }

  onMouseMove(e: MouseEvent) {
    const newX = this.x + e.movementX;
    this.x = Math.max(0, Math.min(this.stageWidth - this.width, newX));
  }

}