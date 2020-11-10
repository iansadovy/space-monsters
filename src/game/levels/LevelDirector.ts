import { Level } from "./Level";
import { ILevelBuilder } from "./ILevelBuilder";
import { EnemiesFactory } from "./solar/enemies/EnemiesFactory";

export class LevelDirector {
  public static createSimpleLevel(builder: ILevelBuilder): Level {
    return builder.reset()
      .setBackgound("assets/background.png")
      .setRocket("assets/space-ship.png")
      .setEnemiesCount(2)
      .setEnemiesFactory(new EnemiesFactory(builder.ctx))
      .getResult();
  }

  public static createHardLevel(builder: ILevelBuilder): Level {
    return builder.reset()
      .setBackgound("assets/background.png")
      .setRocket("assets/space-ship.png")
      .setEnemiesCount(10)
      .setEnemiesFactory(new EnemiesFactory(builder.ctx))
      .getResult();
  }
}