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
    const collisionTile = [2, 3, 4, 12, 13, 14, 34, 44, 47, 54, 55, 56, 57, 58, 61, 62, 67, 71, 72, 78, 81, 82, 88, 91, 92, 97, 98];
    
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
