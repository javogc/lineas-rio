import * as Tone from "tone";

let synth;

export async function playSynth(features) {
  //crear el synth

  synth = new Tone.Synth().toDestination();

  // mapeo básico, geometría a notas

  features.forEach((feature) => {
    const coordinates = feature.geometry.coordinates[0];

    const notes = coordinates.map(([lon, lat]) =>
      Tone.Frequency(lat % 127, "midi").toFrequency()
    );

    const now = Tone.now();

    notes.forEach((note, index) => {
      synth.triggerAttackRelease(note, "2n", now + index * 0.5);
    });
  });
}

export async function stopSynth() {
  if (synth) {
    synth.disconnect();
    synth = null;
  }
}
