import Phaser from 'phaser'

const WALK = '[animation] walk';

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    
    this.anchor.setTo(0.5);
    this.scale.setTo(1.75);

    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.animations.add(WALK, [0, 1, 2], 8, true);
  }

  walk() {
    this.animations.play(WALK);
  }

  stopWalking() {
    this.frame = 0;
    this.animations.stop(WALK);
  }

  update () {
    if (this.cursors.right.isDown) {
        this.angle = 0;
        this.walk();
    } else if (this.cursors.down.isDown) {
        this.angle = 90;
        this.walk();
    } else if (this.cursors.left.isDown) {
        this.angle = 180;
        this.walk();
    } else if (this.cursors.up.isDown) {
        this.angle = 270;
        this.walk();
    } else {
        this.stopWalking();
    }
    // this.angle += 1
  }
}
