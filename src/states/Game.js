/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    this.physics.startSystem(Phaser.Physics.ARCADE);

    this.map = this.add.tilemap('map1')
    this.map.addTilesetImage('theif')
    this.map.setCollision([2, 3, 4, 15, 17, 26, 27, 28])

    this.backgroundLayer = this.map.createLayer('bg')
    this.backgroundLayer.resizeWorld()

    this.player = this.add.sprite(16, 16, 'player');
    this.player.anchor.set(0);

    this.physics.arcade.enable(this.player);

    this.camera.follow(this.player);

    this.cursors = this.input.keyboard.createCursorKeys();

    // this.layer.debug = true;

    // this.mushroom = new Mushroom({
    //   game: this.game,
    //   x: this.world.centerX,
    //   y: this.world.centerY,
    //   asset: 'mushroom'
    // })

    // this.game.add.existing(this.mushroom)
  }

  update () {
    this.physics.arcade.collide(this.player, this.backgroundLayer)

    this.player.body.velocity.y = 0;
    this.player.body.velocity.x = 0;
 
    if(this.cursors.up.isDown) {
      this.player.body.velocity.y -= 100;
    }
    else if(this.cursors.down.isDown) {
      this.player.body.velocity.y += 100;
    }
    if(this.cursors.left.isDown) {
      this.player.body.velocity.x -= 100;
    }
    else if(this.cursors.right.isDown) {
      this.player.body.velocity.x += 100;
    }
  }
 
  render () {
    if (__DEV__) {
      //this.game.debug.spriteInfo(this.mushroom, 32, 32)
    }
  }
}
