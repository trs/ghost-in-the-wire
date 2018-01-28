import Phaser from 'phaser'
import { centerGameObjects } from '../utils'
import LevelMap from '../classes/map'
import * as GameStore from '../store/GameStore'

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

export default class extends Phaser.State {
  init () {
    GameStore.addLevelMap(new LevelMap({name: 'level0', startX: 16, startY: 16}));
  
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
    this.load.spritesheet('toggle_switch', 'assets/images/toggle-switch.png', 3, 12, 2);
    this.load.image('global_tileset', 'assets/images/global_tileset.png')
    this.load.image('player', 'assets/images/player.png');
    this.load.image('terminal', 'assets/images/terminal.png');

    GameStore.loadAllLevelMaps(this); 
  }

  create () {
    this.state.start('Game')
  }
}
