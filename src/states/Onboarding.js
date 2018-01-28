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
    
  }

  preload () {
    
  }

  create () {
    setTimeout(() => this.state.start('Game'), 2000);
  }
}
