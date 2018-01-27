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
    this.load.spritesheet('network-node-button', 'assets/images/network-node-button.png', 33, 33, 2);
  }

  create () {
    // const bannerText = 'Phaser + ES6 + Webpack'
    // let banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText, {
    //   font: '40px Bangers',
    //   fill: '#77BFA3',
    //   smoothed: false
    // })

    // banner.padding.set(10, 16)
    // banner.anchor.setTo(0.5)

    const nodes = GameStore.getPorts()
      .forEach((port, index) => {
        const [x, y] = port.pos;
        const node = this.add.button(this.world.centerX + x, this.world.centerY + y, 'network-node-button', this.jump.bind(this, NODES[index]), this, 1, 0, 0);
        node.anchor.setTo(0.5, 0.5);
      });

    // const node = this.add.button(this.world.centerX, this.world.centerY, 'network-node-button', this.actionOnClick, this, 1, 0, 0);
    // const node2 = this.add.button(this.world.centerX - 50, this.world.centerY, 'network-node-button', this.actionOnClick, this, 1, 0, 0);
    // //  setting the anchor to the center
    // node.anchor.setTo(0.5, 0.5);
    // node2.anchor.setTo(0.5, 0.5);

    console.log(GameStore.getPorts());
    // this.button.onInputOver.add(over, this);
    // this.button.onInputOut.add(out, this);
    // this.button.onInputUp.add(up, this);
  }

  jump(toNode) {
    const currentNode = GameStore.getCurrentNode();

    if (GameStore.canJumpBetween(currentNode, toNode)) {
      console.log(`can jump from ${currentNode.id} to ${toNode.id}`);
    } else {
      console.log(`impossible to jump from ${currentNode.id} to ${toNode.id}`)
    }
  }

  render () {
    if (__DEV__) {
      // this.game.debug.spriteInfo(this.mushroom, 32, 32)
    }
  }
}
