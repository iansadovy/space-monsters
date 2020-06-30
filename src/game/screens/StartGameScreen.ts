import { Sprite } from '../../framework/Sprite';

export class StartGameScreen extends Sprite {

  protected onInit() {
    this.width = this.stageWidth;
    this.height = this.stageHeight;
  }

  public render() {
    this.ctx.font = '48px monospace';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('SPACE MONSTERS', this.width / 2, this.height / 2);

    this.ctx.font = '20px monospace';
    this.ctx.fillText('click to start', this.width / 2, this.height / 2 + 48);
  }
}