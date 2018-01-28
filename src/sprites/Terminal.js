import Phaser from 'phaser'
import {ANIMATION} from '../classes/const';
import * as GameStore from '../store/GameStore';

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset, node }) {
    super(game, x, y, asset)
    this.node = node;
    this.anchor.setTo(0.5);
  }

  update () {
  }
}
