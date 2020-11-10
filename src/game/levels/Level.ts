import { ISprite } from "../../framework/ISprite";
import { IEnemyFactory } from "./solar/enemies/IEnemyFactory";

export class Level {
  background: ISprite;
  rocket: ISprite;
  enemiesCount: number;
  enemiesFactory: IEnemyFactory;
}