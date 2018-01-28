import Phaser from 'phaser';

export default class extends Phaser.State {
  init () {
    let banner = this.add.text(40, 40, 'YOU HAVE ESCAPED', {
      font: '20px "Press Start 2P"',
      fill: '#77BFA3',
      smoothed: false
    })
  }

  create() {
    setTimeout(() => {
      window.location = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    }, 2500);
  }
}
