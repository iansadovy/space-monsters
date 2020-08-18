import { IEnemy } from './IEnemy';
import { Sprite } from '../../../../framework/Sprite';
import { Resources } from '../../../../framework/Resources';

export class Asteroid extends Sprite implements IEnemy {

    public speed = 7;

    protected onInit() {
        this.width = 50;
        this.height = 75;
    }

    public render() {
        const img = Resources.getInstance().get("assets/asteroid.png");
        this.ctx.drawImage(img, this.x, this.y, this.width, this.height);
    }
}