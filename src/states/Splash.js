import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar) 
    //
    // load your assets
    //

    this.load.image('theif', 'assets/images/theif.png')
    this.load.image('player', 'assets/images/player.png')
    this.load.tilemap(
      'map1',
      'assets/maps/map1.json',
      null,
      Phaser.Tilemap.TILED_JSON)
  
  }

  create () {
    this.state.start('Game')
  }
}
