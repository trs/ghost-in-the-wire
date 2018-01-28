/* globals __DEV__ */
import Phaser from 'phaser';
import * as GameStore from '../store/GameStore';
import _ from 'lodash';
import Electrifly from '../sprites/Electrifly';

export default class NetworkState extends Phaser.State {
  init () {
    // for drawing primitives
    this.graphics = this.game.add.graphics();
  }

  preload () {
    this.load.spritesheet('network-node-button', 'assets/images/network-node-button.png', 33, 33, 3);
  }

  drawButton(node, x, y, enabled = true) {
    let button;

    if (enabled) {
      button = this.add.button(this.world.centerX + x, this.world.centerY + y, 'network-node-button', this.jump.bind(this, node), 0, 1, 0);
    } else {
      button = this.add.button(this.world.centerX + x, this.world.centerY + y, 'network-node-button', this.cannotJump.bind(this, node), 2, 2, 2);
    }

    button.anchor.setTo(0.5, 0.5);
    
    return button;
  }
  
  drawLine(x1, y1, x2, y2, enabled = true) {
    if (enabled) {
      this.graphics.lineStyle(2, 0x80dfdd, 1);
    } else {
      this.graphics.lineStyle(2, 0xff0000, 1);
    }

    this.graphics.moveTo(this.world.centerX + x1, this.world.centerY + y1);//moving position of graphic if you draw mulitple lines
    this.graphics.lineTo(this.world.centerX + x2, this.world.centerY + y2);
    this.graphics.endFill();
  }

  shutdown () {
    this.music.fadeOut(2000);
  }

  create () {
    this.music = this.add.audio('melody-160bpm');
    this.music.fadeIn(2000);

    const currentNode = GameStore.getCurrentNode();

    // draw lines first
    const connections = GameStore.getConnections()
      .forEach((connection) => {
        const { enabled, between } = connection;
        const [from, to] = between;
        const [x1, y1] = from.pos;
        const [x2, y2] = to.pos;
        this.drawLine(x1, y1, x2, y2, enabled);
      })

    const nodes = GameStore.getPorts()
      .forEach((node) => {
        const [x, y] = node.pos;

        if (!(node === currentNode)) {
          this.drawButton(node, x, y, GameStore.canJumpBetween(currentNode, node));
        }
      });

    // draw character last
    const [x, y] = currentNode.pos;

    this.electrifly = new Electrifly({
      game: this.game,
      x: this.world.centerX + x,
      y: this.world.centerY + y,
      asset: 'electrifly'
    });

    this.game.add.existing(this.electrifly);
    this.physics.arcade.enable(this.electrifly);


    this.camera.focusOnXY(this.world.centerX, this.world.centerY);
  }

  cannotJump(toNode) {
    const currentNode = GameStore.getCurrentNode();
    console.log(`impossible to jump from ${currentNode.id} to ${toNode.id}`)
  }

  jump(toNode) {
    this.state.start('Game');
    const currentNode = GameStore.getCurrentNode();
    GameStore.setCurrentNode(toNode);
    console.log(`can jump from ${currentNode.id} to ${toNode.id}`);
  }

  update() {
    this.electrifly.rotation = game.physics.arcade.angleToPointer(this.electrifly);
  }

  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.electrifly, 32, 32)
    }
  }
}
