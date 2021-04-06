"use strict";var _createClass=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}();function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var __instance=function(){var t=void 0;return function(e){return e&&(t=e),t}}(),AudioRenderer=function(){function t(){if(_classCallCheck(this,t),__instance())return __instance();if(void 0!==t.unique)return t.unique;t.unique=this,this.oAudioContext=null,this.currentVolume=.8,this.bSetVolume=!1,this.gainNode=null,this.iWndNum=-1,this.mVolumes=new Map;var e=window.AudioContext||window.webkitAudioContext;this.oAudioContext=new e,this.writeString=function(t,e,n){for(var i=0;i<n.length;i++)t.setUint8(e+i,n.charCodeAt(i))},this.setBufferToDataview=function(t,e,n){for(var i=0;i<n.length;i++,e++)t.setUint8(e,n[i])},__instance(this)}return _createClass(t,[{key:"Play",value:function(t,e,n){var i=new ArrayBuffer(44+e),o=new DataView(i),r=n.samplesPerSec,u=n.channels,a=n.bitsPerSample;this.writeString(o,0,"RIFF"),o.setUint32(4,32+2*e,!0),this.writeString(o,8,"WAVE"),this.writeString(o,12,"fmt "),o.setUint32(16,16,!0),o.setUint16(20,1,!0),o.setUint16(22,u,!0),o.setUint32(24,r,!0),o.setUint32(28,2*r,!0),o.setUint16(32,u*a/8,!0),o.setUint16(34,a,!0),this.writeString(o,36,"data"),o.setUint32(40,e,!0),this.setBufferToDataview(o,44,t);var s=this;return this.oAudioContext.decodeAudioData(o.buffer,(function(t){var e=s.oAudioContext.createBufferSource();if(null==e)return-1;e.buffer=t,e.start(0),(null==s.gainNode||s.bSetVolume)&&(s.gainNode=s.oAudioContext.createGain(),s.bSetVolume=!1),s.gainNode.gain.value=s.currentVolume,s.gainNode.connect(s.oAudioContext.destination),e.connect(s.gainNode)}),(function(t){return console.log("decode error"),-1})),0}},{key:"Stop",value:function(){return null!=this.gainNode&&(this.gainNode.disconnect(),this.gainNode=null),!0}},{key:"SetVolume",value:function(t){return this.bSetVolume=!0,this.currentVolume=t,this.mVolumes.set(this.iWndNum,t),!0}},{key:"SetWndNum",value:function(t){this.iWndNum=t;var e=this.mVolumes.get(t);return void 0==e&&(e=.8),this.currentVolume=e,!0}},{key:"GetVolume",value:function(){var t=this.mVolumes.get(this.iWndNum);return void 0==t&&(t=.8),t}}]),t}();