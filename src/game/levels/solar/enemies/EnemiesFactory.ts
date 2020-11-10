import { IEnemy } from "../../../IEnemy";
import { IEnemyFactory } from "./IEnemyFactory";
import { Asteroid } from './Asteroid';
import { UFO } from './UFO';

export class EnemiesFactory implements IEnemyFactory {

  private ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  createEnemy(): IEnemy {
    const enemy: IEnemy = Math.random() > 0.5 ? new Asteroid(this.ctx) : new UFO(this.ctx);
    return enemy;
  }

}