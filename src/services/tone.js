import Tone from "tone";

const synth = new Tone.Synth().toMaster();

function setVolume(value) {
  synth.volume.value = value;
}

function sing() {
  synth.triggerAttackRelease("C4", 0.5);
}

export { setVolume, sing };
export default synth;
