import Phaser from 'phaser'
import { centerGameObjects } from '../utils'
import LevelMap from '../classes/map'
import * as GameStore from '../store/GameStore'

export default class extends Phaser.State {
  init () {
    GameStore.addLevelMap(new LevelMap({name: 'level0', startX: 16, startY: 16}));
  }

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //
    this.load.spritesheet('firefly', 'assets/images/firefly.png', 17, 22, 3);
    this.load.spritesheet('electrifly', 'assets/images/electrifly.png', 17, 22, 3);
    this.load.spritesheet('enemy', 'assets/images/enemy.png', 22, 22, 5);

    this.load.image('global_tileset', 'assets/images/global_tileset.png')
    this.load.image('player', 'assets/images/player.png')
    
    GameStore.loadAllLevelMaps(this); 
  }

  create () {
    this.state.start('Game')
  }
}
