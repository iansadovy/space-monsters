import { Rocket } from './game/Rocket';
import { StartGameScreen } from './game/screens/StartGameScreen';
import { PauseGameScreen } from './game/screens/PauseGameScreen';
import { Resources } from './framework/Resources';
import { Background } from './game/Background';
import { Sprite } from './framework/Sprite';
import { Asteroid } from './game/enemies/Asteroid';
import { UFO } from './game/enemies/UFO';

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
      "assets/asteroid.png",
      "assets/ufo.png",
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

  private enemies: Sprite[] = [];

  protected onEnterFrame(dt: number) {
    if (this.enemies.length < 3) {
      const enemy: Asteroid | UFO = Math.random() > 0.5 ? new Asteroid(this.ctx) : new UFO(this.ctx);
      enemy.x = Math.random() * (this.stageWidth - enemy.width);
      enemy.y = Math.random() * -this.stageHeight;
      this.enemies.push(enemy);
      this.appendChild(enemy);
    }

    const enemiesToRemove: Sprite[] = [];
    for (const enemy of this.enemies) {
      enemy.y += (<Asteroid | UFO>enemy).speed * dt;
      if (enemy.y > this.stageHeight) {
        enemiesToRemove.push(enemy);
      }
    }

    for (const enemy of enemiesToRemove) {
      this.enemies.splice(this.enemies.indexOf(enemy), 1);
      enemy.removeFromParent();
    }
  }
}