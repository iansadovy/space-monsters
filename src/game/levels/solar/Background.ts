import { Sprite } from '../../../framework/Sprite';
import { Resources } from '../../../framework/Resources';

export class Background extends Sprite {

  private PARALLAX_EFFECT = 0.05;

  protected onInit() {
    this.width = this.stageWidth;
    this.height = this.stageHeight;
    document.addEventListener("mousemove", (e: MouseEvent) => this.onMouseMove(e));
  }

  public render(): void {
    const img = Resources.getInstance().get("assets/background.png");
    this.ctx.drawImage(img, img.width / 2 + this.dx * this.PARALLAX_EFFECT, 0, this.width, this.height, this.x, this.y, this.width, this.height);
  }

  private dx: number = 0;
  onMouseMove(e: MouseEvent) {
    this.dx += e.movementX;
    this.dx = Math.max(-this.stageWidth / 2, Math.min(this.stageWidth / 2, this.dx));
  }

}