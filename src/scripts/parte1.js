import * as Tone from "tone";

export const playParte1 = async () => {
  try {
    //esperamos a qué empieze el audio, usando la función Tone.start(),
    // crea el contexto de audio y lo inicia, es
    await Tone.start();

    //creamos un synth simple, para probar qué funcione
    const synth = new Tone.Synth().toDestination();

    const now = Tone.now(); //obtenemos el tiempo actual

    // //disparamos una nota
    // synth.triggerAttack("C4", now);
    // // esperar antes del release
    // synth.triggerRelease(now + 10);

    //triggerAttackRelease, combina ambas

    //primer argumento: nota(en formato pitch-octave) o valor de la frecuencia
    //segundo argumento: duración de la nota, segundos o fracción de nota
    //tercer argumento: tiempo de inicio de la nota
    synth.triggerAttackRelease("G#2", "3n", now);
    synth.triggerAttackRelease("B2", "3n", now + 1);
    synth.triggerAttackRelease("A#2", "3n", now + 2);
    synth.triggerAttackRelease("A2", "3n", now + 3);
  } catch (error) {
    console.log("error en parte 1", error);
  }
};
