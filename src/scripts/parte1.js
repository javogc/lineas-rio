import * as Tone from "tone";

export const playParte1 = async () => {
  try {
    const synthA = new Tone.FMSynth().toDestination();

    //tocar una nota cada cuarto de nota

    const loopA = new Tone.Loop((time) => {
      console.log("time", time);
      synthA.triggerAttackRelease("C2", "8n", time);
      //   new Tone.Distortion(0.8).toDestination();
    }, "4n").start(0);

    Tone.getTransport().start();

    Tone.getTransport().bpm.rampTo(600, 30);
  } catch (error) {
    console.log("error en parte 1", error);
  }
};

export const stopParte1 = () => {
  Tone.getTransport().stop();
  Tone.getTransport().clear();
};
