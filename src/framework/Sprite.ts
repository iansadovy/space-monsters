import { ISprite } from './ISprite';
export abstract class Sprite implements ISprite {
  public x: number = 0;
  public y: number = 0;
  public width: number = 0;
  public height: number = 0;

  protected _parent: ISprite = null;
  protected ctx: CanvasRenderingContext2D;
  protected stageWidth: number = 0;
  protected stageHeight: number = 0;
  protected children: Set<ISprite> = new Set<ISprite>();
  protected lastUpdate: number = 0;
  protected isPlaying: boolean = false;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.stageWidth = ctx.canvas.width;
    this.stageHeight = ctx.canvas.height;
    this.onInit();
  }

  public render(): void { }

  public renderAll(): void {
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.render();
    for (const child of this.children) {
      child.render();
    }
  }

  public play() {
    this.isPlaying = true;
    const loop = () => {
      if (this.isPlaying == false) {
        return;
      }
      this.lastUpdate = Date.now();
      requestAnimationFrame(() => {
        if (this.isPlaying == false) {
          return;
        }
        const dt = (Date.now() - this.lastUpdate) / 10.0;
        this.onEnterFrame(dt);
        this.renderAll();
        loop();
      });
    }
    loop();
  }

  public stop() {
    this.isPlaying = false;
  }

  protected onInit(): void { }
  protected onEnterFrame(dt: number): void { }

  public appendChild(child: ISprite) {
    child.parent = this;
    this.children.add(child);
  }

  public removeChild(child: ISprite) {
    if (this.children.delete(child)) {
      child.parent = null;
    }
  }

  public removeFromParent() {
    this._parent.removeChild(this);
  }

  public get parent(): ISprite {
    return this._parent;
  }

  public set parent(value: ISprite) {
    this._parent = value;
  }
}