import Phaser from 'phaser'
import * as GameStore from '../store/GameStore'

export default class {
  constructor({ name, startX, startY }) {
    this.name = name;
    this.startX = startX;
    this.startY = startY;
  }

  load(state) {
    return state.load.tilemap(
      this.name,
      `assets/maps/${this.name}.json`,
      null,
      Phaser.Tilemap.TILED_JSON)
  }

  create(state) {
    state.map = state.add.tilemap(this.name);
    state.map.addTilesetImage('global_tileset');
    state.backgroundLayer = state.map.createLayer(GameStore.LAYER_TYPE.BACKGROUND);
    state.floorLayer = state.map.createLayer(GameStore.LAYER_TYPE.FLOOR);
    state.collisionLayer = state.map.createLayer(GameStore.LAYER_TYPE.COLLISION);
    state.interactLayer = state.map.createLayer(GameStore.LAYER_TYPE.INTERACT);

    // state.map.setCollision([3, 4, 5, 9, 10, 11,  15, 17, 27, 28, 29], true, GameStore.LAYER_TYPE.COLLISION);

    state.backgroundLayer.resizeWorld()
  }
}
