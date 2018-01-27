/* globals __DEV__ */
import Phaser from 'phaser';
import Mushroom from '../sprites/Mushroom';
import * as GameStore from '../store/GameStore';
import _ from 'lodash';

const NODES = [{
  id: 0,
  pos: [-200, 0]
}, {
  id: 1,
  pos: [-100, -20]
}, {
  id: 2,
  pos: [0, 0]
}, {
  id: 3,
  pos: [-150, 50]
}, {
  id: 4,
  pos: [20, 100]
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
  }

  preload () {
    this.load.spritesheet('network-node-button', 'assets/images/network-node-button.png', 33, 33, 3);
  }

  createButton(node, x, y, enabled = true) {
    let button;

    if (enabled) {
      button = this.add.button(this.world.centerX + x, this.world.centerY + y, 'network-node-button', this.jump.bind(this, node), 0, 1, 0);
    } else {
      button = this.add.button(this.world.centerX + x, this.world.centerY + y, 'network-node-button', this.cannotJump.bind(this, node), 2, 2, 2);
    }

    button.anchor.setTo(0.5, 0.5);
    
    return button;
  }

  create () {
    const currentNode = GameStore.getCurrentNode();

    const nodes = GameStore.getPorts()
      .forEach((port) => {
        const [x, y] = port.pos;
        const thisNode = NODES[port.id];

        let button = this.createButton(thisNode, x, y, GameStore.canJumpBetween(currentNode, thisNode));
      });

    console.log(GameStore.getPorts());
  }

  cannotJump(toNode) {
    const currentNode = GameStore.getCurrentNode();
    console.log(`impossible to jump from ${currentNode.id} to ${toNode.id}`)
  }

  jump(toNode) {
    const currentNode = GameStore.getCurrentNode();
    console.log(`can jump from ${currentNode.id} to ${toNode.id}`);
  }

  render () {
    if (__DEV__) {
      // this.game.debug.spriteInfo(this.mushroom, 32, 32)
    }
  }
}
