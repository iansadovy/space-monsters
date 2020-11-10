import { Level } from "./Level";
import { IEnemyFactory } from "./solar/enemies/IEnemyFactory";

export interface ILevelBuilder {
  ctx: CanvasRenderingContext2D;
  reset(): ILevelBuilder;
  setBackgound(res: string): ILevelBuilder;
  setRocket(res: string): ILevelBuilder;
  setEnemiesFactory(factory: IEnemyFactory): ILevelBuilder;
  setEnemiesCount(count: number): ILevelBuilder;
  getResult(): Level;
}