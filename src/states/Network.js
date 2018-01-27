/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'

export default class NetworkState extends Phaser.State {
  init () {}
  preload () {
    this.load.spritesheet('network-node-button', 'assets/images/network-node-button.png', 33, 33, 2);
  }

  create () {
    // const bannerText = 'Phaser + ES6 + Webpack'
    // let banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText, {
    //   font: '40px Bangers',
    //   fill: '#77BFA3',
    //   smoothed: false
    // })

    // banner.padding.set(10, 16)
    // banner.anchor.setTo(0.5)

    this.button = this.add.button(this.world.centerX, this.world.centerY, 'network-node-button', this.actionOnClick, this, 1, 0, 0);

    //  setting the anchor to the center
    this.button.anchor.setTo(0.5, 0.5);
    // this.button.onInputOver.add(over, this);
    // this.button.onInputOut.add(out, this);
    // this.button.onInputUp.add(up, this);
  }

  actionOnClick () {
    console.log('fuk u')
  }

  render () {
    if (__DEV__) {
      // this.game.debug.spriteInfo(this.mushroom, 32, 32)
    }
  }
}
