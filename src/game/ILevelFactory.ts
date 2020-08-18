import { ISprite } from '../framework/ISprite';
import { IEnemy } from './levels/solar/enemies/IEnemy';

export interface ILevelFactory {
    createBackground(): ISprite;
    createRocket(): ISprite;
    createEnemy(): IEnemy;
}