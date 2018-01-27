import Phaser from 'phaser'
import {LAYER_TYPE, LEVEL_TYPE} from './const'

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

    state.backgroundLayer = state.map.createLayer(LAYER_TYPE.BACKGROUND);
    state.floorLayer = state.map.createLayer(LAYER_TYPE.FLOOR);
    state.collisionLayer = state.map.createLayer(LAYER_TYPE.COLLISION);
    state.interactLayer = state.map.createLayer(LAYER_TYPE.INTERACT);

    // Network layers, shown
    state.dividerLayer = state.map.createLayer(LAYER_TYPE.DIVIDER);

    state.nwBackgroundLayer = state.map.createLayer(LAYER_TYPE.NETWORK_BACKGROUND);
    state.nwFloorLayer = state.map.createLayer(LAYER_TYPE.NETWORK_FLOOR);
    state.nwCollisionLayer = state.map.createLayer(LAYER_TYPE.NETWORK_COLLISION);
    state.nwInteractLayer = state.map.createLayer(LAYER_TYPE.NETWORK_INTERACT);

    this.setLevelTypeVisibility(state, LEVEL_TYPE.MAP)

    state.backgroundLayer.resizeWorld()
  }

  setLevelTypeVisibility(state, type) {
    const collisionTile = [3, 4, 5, 7, 8, 9, 10, 11, 12, 14, 15, 17, 22, 23, 24, 27, 28, 29, 36];
    
    state.backgroundLayer.visible = false;
    state.floorLayer.visible = false;
    state.collisionLayer.visible = false;
    state.interactLayer.visible = false;
    state.dividerLayer.visible = false;
    state.nwBackgroundLayer.visible = false;
    state.nwFloorLayer.visible = false;
    state.nwCollisionLayer.visible = false;
    state.nwInteractLayer.visible = false;

    switch (type) {
      case LEVEL_TYPE.MAP: {
        state.map.setCollision(collisionTile, true, LAYER_TYPE.COLLISION);
        state.map.setCollision(collisionTile, false, LAYER_TYPE.NETWORK_COLLISION);

        state.backgroundLayer.visible = true;
        state.floorLayer.visible = true;
        state.collisionLayer.visible = true;
        state.interactLayer.visible = true;
        break;
      }
      case LEVEL_TYPE.NETWORK: {
        state.map.setCollision(collisionTile, true, LAYER_TYPE.NETWORK_COLLISION);
        state.map.setCollision(collisionTile, false, LAYER_TYPE.COLLISION);

        state.dividerLayer.visible = true;
        state.nwBackgroundLayer.visible = true;
        state.nwFloorLayer.visible = true;
        state.nwCollisionLayer.visible = true;
        state.nwInteractLayer.visible = true;
        break;
      }
    }
  }
}
