import { StartGameScreen } from './game/screens/StartGameScreen';
import { PauseGameScreen } from './game/screens/PauseGameScreen';
import { Resources } from './framework/Resources';
import { Sprite } from './framework/Sprite';
import { IEnemy } from './game/IEnemy';
import { LevelBuilder } from './game/levels/LevelBuilder';
import { LevelDirector } from './game/levels/LevelDirector';
import { Level } from './game/levels/Level';

export class SpaceMonsters extends Sprite {

  private static instance: SpaceMonsters = null;

  private canvas: HTMLCanvasElement;
  private level: Level;
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
    this.level = LevelDirector.createHardLevel(new LevelBuilder(this.ctx));

    this.appendChild(this.level.background);
    this.appendChild(this.level.rocket);
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
    if (this.enemies.length < this.level.enemiesCount) {
      const enemy: IEnemy = this.level.enemiesFactory.createEnemy();
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