import { Rocket } from './game/Rocket';
import { StartGameScreen } from './game/screens/StartGameScreen';
import { PauseGameScreen } from './game/screens/PauseGameScreen';
import { Resources } from './framework/Resources';
import { Background } from './game/Background';
import { Sprite } from './framework/Sprite';

export class SpaceMonsters extends Sprite {

  private canvas: HTMLCanvasElement;

  private rocket: Rocket;
  private startScreen: StartGameScreen;
  private pauseScreen: PauseGameScreen;
  private background: Background;
  private isStarted: boolean;

  constructor(canvas: HTMLCanvasElement) {
    super(canvas.getContext("2d"));
    this.canvas = canvas;
  }

  protected onInit() {
    Resources.getInstance().onReady = () => this.onResourcesReady();
    Resources.getInstance().load([
      "assets/background.png",
      "assets/space-ship.png",
    ]);
  }

  private onResourcesReady() {
    this.background = new Background(this.ctx);
    this.appendChild(this.background);
    this.rocket = new Rocket(this.ctx);
    this.appendChild(this.rocket);
    this.renderAll();

    this.startScreen = new StartGameScreen(this.ctx);
    this.startScreen.render();
    this.pauseScreen = new PauseGameScreen(this.ctx);

    this.canvas.onclick = () => this.onCanvasClick();
    document.addEventListener('pointerlockchange', () => this.onPointerLockChange());
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
    this.play();
  }

  private pause() {
    this.isStarted = false;
    this.stop();
    this.pauseScreen.render();
  }

  protected onEnterFrame(dt: number) {
    ``
  }
}