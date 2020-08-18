import { StartGameScreen } from './game/screens/StartGameScreen';
import { PauseGameScreen } from './game/screens/PauseGameScreen';
import { Resources } from './framework/Resources';
import { Sprite } from './framework/Sprite';
import { ILevelFactory } from './game/ILevelFactory';
import { ISprite } from './framework/ISprite';
import { IEnemy } from './game/levels/solar/enemies/IEnemy';
import { SolarLevelFactory } from './game/levels/solar/SolarLevelFactory';

export class SpaceMonsters extends Sprite {

  private static instance: SpaceMonsters = null;

  private canvas: HTMLCanvasElement;

  private levelFactory: ILevelFactory;

  private rocket: ISprite;
  private background: ISprite;
  private enemies: IEnemy[] = [];


  private startScreen: StartGameScreen;
  private pauseScreen: PauseGameScreen;
  private isStarted: boolean;

  constructor(canvas: HTMLCanvasElement) {
    super(canvas.getContext("2d"));
    if (SpaceMonsters.instance != null) {
      throw "SpaceMonsters cannot be created more than once.";
    }
    SpaceMonsters.instance = this;
    this.canvas = canvas;
  }

  public static getInstance(canvas: HTMLCanvasElement) {
    if (SpaceMonsters.instance == null) {
      SpaceMonsters.instance = new SpaceMonsters(canvas);
    }
    return SpaceMonsters.instance;
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
    this.levelFactory = new SolarLevelFactory(this.ctx);
    
    this.background = this.levelFactory.createBackground();
    this.appendChild(this.background);

    this.rocket = this.levelFactory.createRocket();
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
    if (this.enemies.length < 3) {
      const enemy: IEnemy = this.levelFactory.createEnemy();
      enemy.x = Math.random() * (this.stageWidth - enemy.width);
      enemy.y = Math.random() * -this.stageHeight;
      this.enemies.push(enemy);
      this.appendChild(enemy);
    }

    const enemiesToRemove: IEnemy[] = [];
    for (const enemy of this.enemies) {
      enemy.y += enemy.speed * dt;
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