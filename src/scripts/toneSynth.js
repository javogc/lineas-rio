import * as Tone from "tone";

let synth;

const C_MAJOR_MODE = [60, 62, 64, 65, 67, 69, 71, 72]; // MIDI notes: C, D, E, F, G, A, B, C

export async function playSynth(features) {
  //crear el synth

  synth = new Tone.PolySynth().toDestination();

  // mapeo básico, geometría a notas

  features.forEach((feature) => {
    const coordinates = feature.geometry.coordinates[0];

    const notes = coordinates.map(([lon, lat]) => {
      return Tone.Frequency(mapToMode(lat, C_MAJOR_MODE), "midi").toFrequency();
    });

    console.log("notes", notes);

    const now = Tone.now();

    notes.forEach((note, index) => {
      synth.triggerAttackRelease(note, "2n", now + index * 0.5);
    });

    notes.forEach((note, index) => {
      synth.triggerAttackRelease(note, "4n", now + index * 0.5);
    });

    notes.forEach((note, index) => {
      synth.triggerAttackRelease(note, "8n", now + index * 0.5);
    });
  });
}

export async function stopSynth() {
  if (synth) {
    synth.disconnect();
    synth = null;
  }
}

//mapear valores a un modo

const mapToMode = (lat, mode, minLat = 25.69, scale = 110) => {
  //restamos el minimo de latitud al valor, para ser más especifico. Y luego multiplicamos, para ampliar variabilidad de alturas
  const normalizedLat = (lat - minLat) * scale;
  const fractionalLat = normalizedLat % 1; //asegurar qué el valor este entre 0 y 1, con modulo
  const modeIndex = Math.floor(fractionalLat * mode.length); // Escalar al modo
  return mode[modeIndex];
};
