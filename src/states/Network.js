/* globals __DEV__ */
import Phaser from 'phaser';
import * as GameStore from '../store/GameStore';
import _ from 'lodash';
import Electrifly from '../sprites/Electrifly';

const NODES = [{
  id: 0,
  pos: [-200, -50]
}, {
  id: 1,
  pos: [-20, -60]
}, {
  id: 2,
  pos: [200, 0]
}, {
  id: 3,
  pos: [-150, 20]
}, {
  id: 4,
  pos: [0, 50]
}];

export default class NetworkState extends Phaser.State {
  init () {
    // init basic map
    const adjacency = [
      [NODES[0], NODES[1]],
      [NODES[0], NODES[2]],
      [NODES[1], NODES[2]],
      [NODES[2], NODES[3]],
      [NODES[2], NODES[4]]
    ];
    
    GameStore.setCurrentNode(NODES[0]);

    adjacency.forEach(([from, to]) => GameStore.connectPorts(from, to));

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
      this.graphics.lineStyle(2, 0xc8c8c8, 1);
    }

    this.graphics.moveTo(this.world.centerX + x1, this.world.centerY + y1);//moving position of graphic if you draw mulitple lines
    this.graphics.lineTo(this.world.centerX + x2, this.world.centerY + y2);
    this.graphics.endFill();
  }

  create () {
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
      .forEach((port) => {
        const [x, y] = port.pos;
        const thisNode = NODES[port.id];

        if (!(thisNode === currentNode)) {
          this.drawButton(thisNode, x, y, GameStore.canJumpBetween(currentNode, thisNode));
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
  }

  cannotJump(toNode) {
    const currentNode = GameStore.getCurrentNode();
    console.log(`impossible to jump from ${currentNode.id} to ${toNode.id}`)
  }

  jump(toNode) {
    const currentNode = GameStore.getCurrentNode();
    console.log(`can jump from ${currentNode.id} to ${toNode.id}`);
  }

  update() {
    this.electrifly.rotation = game.physics.arcade.angleToPointer(this.electrifly);
  }

  render () {
    if (__DEV__) {
      
    }
  }
}
