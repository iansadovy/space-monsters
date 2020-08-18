import { Sprite } from '../../framework/Sprite';
import { Resources } from '../../framework/Resources';

export class UFO extends Sprite {

    public speed = 4;

    protected onInit() {
        this.width = 50;
        this.height = 45;
    }

    public render() {
        const img = Resources.getInstance().get("assets/ufo.png");
        this.ctx.drawImage(img, this.x, this.y, this.width, this.height);
    }
}