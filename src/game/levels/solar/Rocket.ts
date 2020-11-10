import { Sprite } from "../../../framework/Sprite";
import { Resources } from "../../../framework/Resources";

export class Rocket extends Sprite {

  private img: HTMLImageElement;

  constructor(ctx: CanvasRenderingContext2D, res: string) {
    super(ctx);
    this.img = Resources.getInstance().get(res);
  }

  protected onInit() {
    this.width = 186 / 4;
    this.height = 294 / 4;
    this.x = this.stageWidth / 2 - this.width / 2;
    this.y = this.stageHeight - this.height - 20;
    document.addEventListener("mousemove", (e: MouseEvent) => this.onMouseMove(e));
  }

  public render() {
    this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  onMouseMove(e: MouseEvent) {
    const newX = this.x + e.movementX;
    this.x = Math.max(0, Math.min(this.stageWidth - this.width, newX));
  }

}