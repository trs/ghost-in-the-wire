/* globals __DEV__ */
import Phaser from 'phaser'
import Firefly from '../sprites/Firefly'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    const bannerText = 'Ghost in the Wire'
    let banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText, {
      font: '40px Bangers',
      fill: '#77BFA3',
      smoothed: false
    })

    banner.padding.set(10, 16)
    banner.anchor.setTo(0.5)

    this.firefly = new Firefly({
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY,
      asset: 'firefly'
    })

    this.game.add.existing(this.firefly)
  }

  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.firefly, 32, 32)
    }
  }
}
