import { Sprite } from '../framework/Sprite';
import { Resources } from '../framework/Resources';

export class Background extends Sprite {

  protected onInit() {
    this.width = this.stageWidth;
    this.height = this.stageHeight;
  }

  public render(): void {
    const img = Resources.getInstance().get("assets/background.png");
    this.ctx.drawImage(img, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
  }

}