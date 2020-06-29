export class SpaceMonsters {
  private STAGE_W = 450;
  private STAGE_H = 800;

  private canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.canvas.setAttribute("width", this.STAGE_W.toString());
    this.canvas.setAttribute("height", this.STAGE_H.toString());
  }

  public start() {
    console.log("start");
  }


}