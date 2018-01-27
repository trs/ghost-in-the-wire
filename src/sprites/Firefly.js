import Phaser from 'phaser'

const WALK = '[animation] walk';

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    
    this.anchor.setTo(0.5);
    this.scale.setTo(1.75);

    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.animations.add(WALK, [0, 1, 2], 8, true);
    this.angle = 270;
  }

  walk() {
    this.animations.play(WALK);
  }

  stopWalking() {
    this.frame = 0;
    this.animations.stop(WALK);
  }

  update () {
    // we don't have a use yet for the "down" control...
    // use it perhaps for shielding/defending action??
    if (this.cursors.right.isDown) {
        this.angle = this.angle + 5 % 360;
        this.walk();
    } else if (this.cursors.left.isDown) {
        this.angle = this.angle - 5 % 360;
        this.walk();
    } else if (this.cursors.up.isDown) {
        this.walk();
    }  else {
        this.stopWalking();
    }
  }
}
