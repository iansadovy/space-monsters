export interface ISprite {
    x: number;
    y: number;
    width: number;
    height: number;
    parent: ISprite;
    render(): void;
    renderAll(): void;
    play()
    stop()
    appendChild(child: ISprite)
    removeChild(child: ISprite)
    removeFromParent()
}