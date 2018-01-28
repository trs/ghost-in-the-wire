/* globals __DEV__ */
import Phaser from 'phaser';
import Firefly from '../sprites/Firefly';
import Enemy from '../sprites/Enemy';

import {LEVEL_TYPE} from '../classes/const'
import * as GameStore from '../store/GameStore'

<<<<<<< HEAD
import Terminal from '../sprites/Terminal';
=======
>>>>>>> WIP: toggle switch states (#22)
import ToggleSwitch from '../sprites/ToggleSwitch';

export default class extends Phaser.State {
  init () {}

  preload () {}

  startMusic() {
    this.music.volume = 0.1;
    this.music.loopFull();
  }

  shutdown() {
    this.music.stop();
  }

  create() {
    this.music = this.game.add.audio('melody-120bpm');
    this.music.onDecoded.add(this.startMusic, this);

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

    const [connection] = GameStore.getConnections();
    const {connection_id} = connection;
    console.log(connection);

    this.toggleSwitch = new ToggleSwitch({
      game: this.game,
      x: this.world.centerX - 600,
      y: this.world.centerY - 600,
      asset: 'toggle_switch',
      connection_id
    });

    this.game.add.existing(this.firefly);
    this.game.add.existing(this.enemy);
<<<<<<< HEAD
=======
    this.game.add.existing(this.toggleSwitch);
>>>>>>> WIP: toggle switch states (#22)

    this.physics.startSystem(Phaser.Physics.Arcade);
    this.physics.setBoundsToWorld();

    this.physics.arcade.enable(this.firefly);
    this.physics.arcade.enable(this.enemy);
    this.physics.arcade.enable(this.toggleSwitch);

    this.firefly.body.collideWorldBounds = true;
    this.enemy.body.collideWorldBounds = true;
    this.firefly.body.bounce.set(1,1);

    this.toggleSwitch = new ToggleSwitch({
      game: this.game,
      x: this.world.centerX - 600,
      y: this.world.centerY - 600,
      asset: 'toggle_switch',
      connection_id: 'C23'
    });

    this.game.add.existing(this.toggleSwitch);
    this.physics.arcade.enable(this.toggleSwitch);
    this.toggleSwitch.body.collideWorldBounds = true;
    this.toggleSwitch.body.immovable = true;
    this.toggleSwitch.body.bounce.set(1, 1);

    this.terminal = new Terminal({
      game: this.game,
      x: this.world.centerX - 600,
      y: this.world.centerY - 650,
      asset: 'terminal',
      node: GameStore.NODES[0]
    });


    this.game.add.existing(this.terminal);
    this.physics.arcade.enable(this.terminal);
    this.terminal.body.collideWorldBounds = true;
    this.terminal.body.immovable = true;
    this.terminal.body.bounce.set(1, 1);

    this.camera.setBoundsToWorld();
    this.camera.follow(this.firefly);

    this.game.renderer.renderSession.roundPixels = true

    this.game.input.keyboard.maxPointers = 1;
    this.cursors = this.input.keyboard.createCursorKeys();

    if (__DEV__) {
      this.collisionLayer.debug = true;
      this.nwCollisionLayer.debug = true;
    }
  }

  toggleSwitchCollisionHandler(player, toggleSwitch) {
    toggleSwitch.toggle();
  }

  terminalCollisionHandler(player, terminal) {
    this.state.start('Network');
  }

  update() {
    this.physics.arcade.collide(this.firefly, this.collisionLayer)
    // this.physics.arcade.collide(this.firefly, this.toggleSwitch, this.toggleSwitchCollisionHandler, null, this);
    // this.physics.arcade.collide(this.firefly, this.terminal, this.terminalCollisionHandler, null, this);
    // this.physics.arcade.collide(this.firefly, this.nwCollisionLayer)

    this.firefly.body.velocity.y = 0;
    this.firefly.body.velocity.x = 0;
 
    if(this.cursors.up.isDown) {
      this.firefly.body.velocity.y = -200;
      this.firefly.body.velocity.x = 0;
    } else if(this.cursors.down.isDown) {
      this.firefly.body.velocity.y = 200;
      this.firefly.body.velocity.x = 0;
    } else if(this.cursors.left.isDown) {
      this.firefly.body.velocity.x = -200;
      this.firefly.body.velocity.y = 0;
    } else if(this.cursors.right.isDown) {
      this.firefly.body.velocity.x = 200;
      this.firefly.body.velocity.y = 0;
    }
  }
 
  render() {
    if (__DEV__) {
      // this.game.debug.spriteInfo(this.firefly, 32, 32)
    }
  }
}
