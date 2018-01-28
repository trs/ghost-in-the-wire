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
    const text = [
      'The year is 2587, the country of Rangatira has been under\nthe control of its government for hundreds of years with\nno contact to the outside world. Every story that was\npassed down about the time before has been forgotten,\nleaving generations of citizens with irrefutable loyalty\nand love for their leader.\n\nThe government controls everything from your job to who\nyou marry with the help of its secret police.',
      '\n\nOn January 28, Dr Winston Smith saw something that made him\nbegin to question his government and how safe the citizens\ntruly were. Later that night Smith was awoken at 1:04 am\nby armed police and taken to a secret facility. There, he\nwas tortured, beaten, and experimented on for 14 months,\ntoday he attempts his escape.',
      '\n\nWith the aid of the experimental drugs and an exoskeleton\ndrilled onto his body, Smith is able to move through the\nethernet as a stream of digitized information.\n\nWinston must find a way to escape while avoiding the guards\npatrolling the halls and without making too many jumps in\nthe net.'
    ];

    let banner = this.add.text(40, 40, text[0] + text[1] + text[2], {
      font: '12px "Press Start 2P"',
      fill: '#77BFA3',
      smoothed: false
    })
  }

  preload() {
    this.load.spritesheet('playButton', 'assets/images/play-button.png', 111, 30, 2);
  }

  create() {
    setTimeout(() => {
      this.playButton = this.add.button(608, 500, 'playButton', () => this.state.start('Game'), 0, 1, 0);
    }, 1500);
  }
}
