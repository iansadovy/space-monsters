import { Sprite } from '../../framework/Sprite';

export class PauseGameScreen extends Sprite {

  protected onInit() {
    this.width = this.stageWidth;
    this.height = this.stageHeight;
  }

  public render() {
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.width, this.height);
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    this.ctx.fill();
    this.ctx.closePath();

    this.ctx.filter = 'blur(100px)';
    this.ctx.drawImage(this.ctx.canvas,
      this.x, this.y, this.width, this.height,
      this.x, this.y, this.width, this.height
    );
    this.ctx.filter = 'none'; // remove filter

    this.ctx.fillStyle = '#000';
    this.ctx.font = '48px monospace';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('PAUSE', this.width / 2, this.height / 2);

    this.ctx.font = '20px monospace';
    this.ctx.fillText('click to resume', this.width / 2, this.height / 2 + 48);
  }
}