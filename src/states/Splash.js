import Phaser from 'phaser'
import { centerGameObjects } from '../utils'
import LevelMap from '../classes/map'
import * as GameStore from '../store/GameStore'

export default class extends Phaser.State {
  init () {
    GameStore.addLevelMap(new LevelMap({name: 'level0', startX: 16, startY: 16}));
  
    // initialize network basic map
    GameStore.setCurrentNode(GameStore.NODES[0]);
    GameStore.connectPorts('C01', GameStore.NODES[0], GameStore.NODES[1]);
    GameStore.connectPorts('C02', GameStore.NODES[0], GameStore.NODES[2]);
    GameStore.connectPorts('C13', GameStore.NODES[1], GameStore.NODES[3], false);
    GameStore.connectPorts('C23', GameStore.NODES[2], GameStore.NODES[3], false);
  }

  preload () {
    this.titleArt = this.add.image(80, 100, 'titleArt');

    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg');
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');
    centerGameObjects([this.loaderBg, this.loaderBar]);

    this.load.setPreloadSprite(this.loaderBar);
    //
    // load your assets
    //
    this.load.spritesheet('firefly', 'assets/images/firefly.png', 17, 22, 3);
    this.load.spritesheet('electrifly', 'assets/images/electrifly.png', 17, 22, 3);
    this.load.spritesheet('enemy', 'assets/images/enemy.png', 22, 22, 5);
    this.load.spritesheet('toggle_switch', 'assets/images/toggle-switch.png', 3, 12, 2);
    this.load.image('global_tileset', 'assets/images/global_tileset.png');
    this.load.image('player', 'assets/images/player.png');
    this.load.image('terminal', 'assets/images/terminal.png');

    this.load.audio('no-melody-120bpm', 'assets/audio/no-melody-120bpm.mp3');
    this.load.audio('melody-120bpm', 'assets/audio/melody-120bpm.wav');
    this.load.audio('intro-160bpm', 'assets/audio/intro-160bpm.wav');
    this.load.audio('melody-160bpm', 'assets/audio/melody-160bpm.wav');

    GameStore.loadAllLevelMaps(this); 
  }

  create () {
    setTimeout(() => this.state.start('Onboarding'), 1500);
  }
}
