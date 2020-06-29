import { SpaceMonsters } from './SpaceMonsters';
(() => {
  const canvas = document.createElement("canvas");
  document.body.appendChild(canvas);
  const game = new SpaceMonsters(canvas);
  game.start();
})();