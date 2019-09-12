import * as alt from 'alt'
import * as natives from 'natives';
import EventEmitter from 'events';

import utils from '../../../common/modules/utils/index';
import game  from '../game/index';
import Ped   from '../ped/index';
import Model from '../model/index';

const PlayerProto = alt.Player.prototype;
const Player      = PlayerProto.constructor;

Object.defineProperty(PlayerProto, 'sid', {
  get: function() { return -1; }
});

Object.defineProperty(PlayerProto, 'exists', {
  get: function() { return this.ped.exists; }
});

Object.defineProperty(PlayerProto, 'idle', {
  get: function() { return this.ped.isTaskActive(CTASKS.CTaskPlayerIdles); }
});

Object.defineProperty(PlayerProto, 'maxArmour', {
  get: function() { return natives.getPlayerMaxArmour(this.scriptID); },
  set: function(val) { natives.setPlayerMaxArmour(this.scriptID, val); }
});

Object.defineProperty(PlayerProto, 'model', {
  get: function() { return this.ped.model; },
  set: async function(val) {
    natives.setPlayerModel(this.ped.handle, +val);
    natives.setPedHeadBlendData(this.ped.handle, 0, 21, 0, 0, 0, 0, 0.0, 0.0, 0.0, true);
  }
});

Object.defineProperty(PlayerProto, 'onFoot', {
  get: function() { return this.ped.isCTaskActive(CTASKS.CTaskPlayerOnFoot); }
});

Object.defineProperty(PlayerProto, 'owned', {
  get: function() {
    return this == alt.Player.local;
  }
});

Object.defineProperty(PlayerProto, 'ped', {
  get: function() {
    this._ped = this.valid ? ((this.scriptID === null || this.scriptID <= 0) ? null : (this._ped && this._ped.handle === this.scriptID) ? this._ped : new Ped(this.scriptID)) : null;
    return this._ped;
  }
});

PlayerProto.valueOf = function() {
  return this.scriptID;
}

export default Player;
