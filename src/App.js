import React from "react";
import * as Tone from "tone";
import { playSynth, stopSynth } from "./scripts/toneSynth";

const mockFeatures = [
  {
    geometry: {
      coordinates: [
        [
          [-99.949791846, 25.556222861],
          [-99.949530554, 25.555908523],
          [-99.9491088, 25.555441708],
          [-99.948998652, 25.555349779],
        ],
      ],
    },
  },
];
function App() {
  const handlePlay = async () => {
    await Tone.start();
    playSynth(mockFeatures);
  };

  const handleStop = () => {
    stopSynth();
  };

  return (
    <div>
      <h1>Las líneas de un río</h1>
      <p>Version 1.0: Sonificación de datos del río Santa Catarina</p>
      <button onClick={handlePlay}>Play</button>
      <button onClick={handleStop}>Stop</button>
    </div>
  );
}

export default App;
