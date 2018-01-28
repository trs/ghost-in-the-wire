import Phaser from 'phaser'
import {ANIMATION} from '../classes/const';
import * as GameStore from '../store/GameStore';

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset, connection_id }) {
    super(game, x, y, asset)
    this.connection_id = connection_id;
    this.anchor.setTo(0.5);
    this.state = false;
  }

  toggle() {
    GameStore.toggleSwitchState(this.connection_id);
  }

  update () {
    this.state = GameStore.getSwitchState(this.connection_id);

    if (this.state) {
      this.frame = 1;
    } else {
      this.frame = 0;
    }
  }
}
