import { SpaceMonsters } from './SpaceMonsters';
(() => {
  const canvas = document.createElement("canvas");
  canvas.width = 450;
  canvas.height = 800;
  document.body.appendChild(canvas);
  const game = new SpaceMonsters(canvas);
})();