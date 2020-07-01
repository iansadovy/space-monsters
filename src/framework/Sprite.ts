export abstract class Sprite {
  public x: number = 0;
  public y: number = 0;
  public width: number = 0;
  public height: number = 0;

  protected _parent: Sprite = null;
  protected ctx: CanvasRenderingContext2D;
  protected stageWidth: number = 0;
  protected stageHeight: number = 0;
  protected children: Set<Sprite> = new Set<Sprite>();
  protected lastUpdate: number = 0;
  protected isPlaying: boolean = false;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.stageWidth = ctx.canvas.width;
    this.stageHeight = ctx.canvas.height;
    this.onInit();
  }

  public render(): void { }

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
        const dt = (Date.now() - this.lastUpdate) / 1000.0;
        this.onEnterFrame(dt);
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
        this.render();
        for (const child of this.children) {
          child.render();
        }
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

  public appendChild(child: Sprite) {
    child._parent = this;
    this.children.add(child);
  }

  public removeChild(child: Sprite) {
    if (this.children.delete(child)) {
      child._parent = null;
    }
  }

  public removeFromParent() {
    this._parent.removeChild(this);
  }

  public get parent(): Sprite {
    return this._parent;
  }
}