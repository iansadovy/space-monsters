import { Rocket } from './game/Rocket';
import { StartGameScreen } from './game/screens/StartGameScreen';
import { PauseGameScreen } from './game/screens/PauseGameScreen';
export class SpaceMonsters {

  private STAGE_W = 450;
  private STAGE_H = 800;

  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  
  private rocket: Rocket;
  private startScreen: StartGameScreen;
  private pauseScreen: PauseGameScreen;
  
  private isStarted: boolean;
  private isPaused: boolean;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.canvas.width = this.STAGE_W;
    this.canvas.height = this.STAGE_H;

    this.ctx = this.canvas.getContext("2d");
    this.rocket = new Rocket(this.ctx);

    this.startScreen = new StartGameScreen(this.ctx);
    this.pauseScreen = new PauseGameScreen(this.ctx);
    
    this.canvas.onclick = () => this.onCanvasClick();
    document.addEventListener('pointerlockchange', () => this.onPointerLockChange());
    
    this.startScreen.render();
  }

  private onCanvasClick() {
    this.canvas.requestPointerLock();
    this.start();
  }

  private onPointerLockChange(): any {
    if (document.pointerLockElement !== this.canvas) {
      if (this.isStarted) {
        this.pause();
      }
    }
  }

  private start() {
    console.log("start");
    this.isStarted = true;
    this.enterFrame();
  }

  private pause() {
    this.isPaused = true;
    cancelAnimationFrame(this.lastAnimationFrame);
    this.lastUpdate = 0;
    this.pauseScreen.render();
  }

  private lastUpdate: number = 0;
  private lastAnimationFrame: number;
  private enterFrame() {
    if (this.lastUpdate != 0) {
      const dt = (Date.now() - this.lastUpdate) / 1000.0;
      this.update(dt);
      this.render();
    }
    this.lastUpdate = Date.now();
    this.lastAnimationFrame = requestAnimationFrame(() => this.enterFrame());
  }

  private update(dt: number) {
  }

  private render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.rocket.render();
  }


}