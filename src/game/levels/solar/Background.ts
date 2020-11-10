import { Sprite } from '../../../framework/Sprite';
import { Resources } from '../../../framework/Resources';

export class Background extends Sprite {

  private PARALLAX_EFFECT = 0.05;
  private img: HTMLImageElement;

  constructor(ctx: CanvasRenderingContext2D, res: string) {
    super(ctx);
    this.img = Resources.getInstance().get(res);
  }

  protected onInit() {
    this.width = this.stageWidth;
    this.height = this.stageHeight;
    document.addEventListener("mousemove", (e: MouseEvent) => this.onMouseMove(e));
  }

  public render(): void {
    this.ctx.drawImage(this.img, this.img.width / 2 + this.dx * this.PARALLAX_EFFECT, 0, this.width, this.height, this.x, this.y, this.width, this.height);
  }

  private dx: number = 0;
  onMouseMove(e: MouseEvent) {
    this.dx += e.movementX;
    this.dx = Math.max(-this.stageWidth / 2, Math.min(this.stageWidth / 2, this.dx));
  }

}