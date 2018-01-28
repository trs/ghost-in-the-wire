import Phaser from 'phaser';

export default class extends Phaser.State {
  init () {
    const text = [
      'The year is 2587, the country of Rangatira has been under\nthe control of its government for hundreds of years with\nno contact to the outside world. Every story that was\npassed down about the time before has been forgotten,\nleaving generations of citizens with irrefutable loyalty\nand love for their leader.\n\nThe government controls everything from your job to who\nyou marry with the help of its secret police.',
      'On January 28, Dr Winston Smith saw something that made him\nbegin to question his government and how safe the citizens\ntruly were. Later that night Smith was awoken at 1:04 am\nby armed police and taken to a secret facility. There, he\nwas tortured, beaten, and experimented on for 14 months,\ntoday he attempts his escape.',
      'With the aid of the experimental drugs and an exoskeleton\ndrilled onto his body, Smith is able to move through the\nethernet as a stream of digitized information.\n\nWinston must find a way to escape while avoiding the guards\npatrolling the halls and without making too many jumps in\nthe net.'
    ];

    let banner = this.add.text(40, 40, text.join('\n\n'), {
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
