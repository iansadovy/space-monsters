import { IEnemy } from "../../../IEnemy";

export interface IEnemyFactory {
  createEnemy(): IEnemy;
}