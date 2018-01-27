/* globals __DEV__ */
import Phaser from 'phaser';
import Firefly from '../sprites/Firefly';
import Enemy from '../sprites/Enemy';
import * as GameStore from '../store/GameStore'
import {LEVEL_TYPE} from '../classes/const'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    const bannerText = 'Ghost in the Wire'
    let banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText, {
      font: '20px "Press Start 2P"',
      fill: '#77BFA3',
      smoothed: false
    })

    banner.padding.set(10, 16)
    banner.anchor.setTo(0.5)

    let currentLevelMap = GameStore.getCurrentLevelMap(LEVEL_TYPE.MAP);
    currentLevelMap.create(this);

    this.firefly = new Firefly({
      game: this.game,
      x: currentLevelMap.startX,
      y: currentLevelMap.startY,
      asset: 'firefly'
    });

    this.enemy = new Enemy({
      game: this.game,
      x: this.world.centerX - 50,
      y: this.world.centerY,
      asset: 'enemy'
    });

    this.game.add.existing(this.firefly);
    this.game.add.existing(this.enemy);
    
    this.physics.startSystem(Phaser.Physics.Arcade);
    this.physics.setBoundsToWorld();

    this.physics.arcade.enable(this.firefly);
    this.physics.arcade.enable(this.enemy);

    this.firefly.body.collideWorldBounds = true;
    this.enemy.body.collideWorldBounds = true;

    this.camera.setBoundsToWorld();
    this.camera.follow(this.firefly);

    this.game.renderer.renderSession.roundPixels = true

    this.cursors = this.input.keyboard.createCursorKeys();

    // Temporary testing for network layer switch
    this.spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.spacebar.onDown.add(function () {
      let currentLevelMap = GameStore.getCurrentLevelMap(LEVEL_TYPE.MAP);

      GameStore.setCurrentMapType(GameStore.getCurrentMapType() === LEVEL_TYPE.NETWORK ? LEVEL_TYPE.MAP : LEVEL_TYPE.NETWORK);
      currentLevelMap.setLevelTypeVisibility(this, GameStore.getCurrentMapType());
    }, this);


    if (__DEV__) {
      this.collisionLayer.debug = true;
      this.nwCollisionLayer.debug = true;
    }
  }

  update () {
    this.physics.arcade.collide(this.firefly, this.collisionLayer)
    this.physics.arcade.collide(this.firefly, this.nwCollisionLayer)

    this.firefly.body.velocity.y = 0;
    this.firefly.body.velocity.x = 0;
 
    if(this.cursors.up.isDown) {
      this.firefly.body.velocity.y -= 200;
    }
    else if(this.cursors.down.isDown) {
      this.firefly.body.velocity.y += 200;
    }
    if(this.cursors.left.isDown) {
      this.firefly.body.velocity.x -= 200;
    }
    else if(this.cursors.right.isDown) {
      this.firefly.body.velocity.x += 200;
    }
  }
 
  render () {
    if (__DEV__) {
      // this.game.debug.spriteInfo(this.firefly, 32, 32)
    }
  }
}
