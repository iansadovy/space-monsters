export abstract class Sprite {
  public x: number = 0;
  public y: number = 0;
  public width: number = 0;
  public height: number = 0;

  protected stageWidth: number = 0;
  protected stageHeight: number = 0;

  protected ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.stageWidth = ctx.canvas.width;
    this.stageHeight = ctx.canvas.height;
    this.onInit();
  }

  protected onInit(): void {

  }

  public abstract render(): void;
}