
import { Background } from './Background';
import { ILevelFactory } from '../../ILevelFactory';
import { ISprite } from '../../../framework/ISprite';
import { IEnemy } from './enemies/IEnemy';
import { Asteroid } from './enemies/Asteroid';
import { UFO } from './enemies/UFO';
import { Rocket } from './Rocket';

export class SolarLevelFactory implements ILevelFactory {
    private ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }

    createBackground(): ISprite {
        return new Background(this.ctx);
    }

    createRocket(): ISprite {
        return new Rocket(this.ctx);
    }

    createEnemy(): IEnemy {
        const enemy: IEnemy = Math.random() > 0.2 ? new Asteroid(this.ctx) : new UFO(this.ctx);
        return enemy;
    }

}