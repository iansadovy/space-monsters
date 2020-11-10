import { Level } from "./Level";
import { ILevelBuilder } from "./ILevelBuilder";
import { Background } from "./solar/Background";
import { Rocket } from "./solar/Rocket";
import { IEnemyFactory } from "./solar/enemies/IEnemyFactory";

export class LevelBuilder implements ILevelBuilder {
  public ctx: CanvasRenderingContext2D;
  
  private level: Level;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }
  reset(): ILevelBuilder {
    this.level = new Level();
    return this;
  }
  setBackgound(res: string): ILevelBuilder {
    this.level.background = new Background(this.ctx, res);
    return this;
  }
  setRocket(res: string): ILevelBuilder {
    this.level.rocket = new Rocket(this.ctx, res);
    return this;
  }
  setEnemiesFactory(factory: IEnemyFactory): ILevelBuilder {
    this.level.enemiesFactory = factory;
    return this;
  }
  setEnemiesCount(count: number): ILevelBuilder {
    this.level.enemiesCount = count;
    return this;
  }
  getResult(): Level {
    return this.level;
  }

}