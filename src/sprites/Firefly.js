import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.anchor.setTo(0.5);
    this.scale.setTo(1.75);
    this.animations.add('walk', [0, 1, 2], 8, true);
    this.animations.play('walk');
  }

  update () {
    // this.angle += 1
  }
}
