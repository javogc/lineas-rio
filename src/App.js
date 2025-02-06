import React from "react";
import { datosRio } from "./scripts/helper";
import { playParte1, stopParte1 } from "./scripts/parte1";
import useArduinoSound from "./scripts/useArduinoSound";

function App() {
  //devuelve una promesa,
  // de qué lo qué está adentro de la función se ejecute

  //procesar los datos del río
  // const datosRioValue = datosRio || 0;
  // const datosRioFeatures = datosRioValue.features || [];
  // const datosRioSize = datosRioFeatures.length;
  const { connectArduino, sensorValue } = useArduinoSound();

  const handlePlayParte1 = async () => {
    await playParte1();

    console.log("playing parte 1");
  };

  const handleStopParte1 = async () => {
    await stopParte1();

    console.log("stopping parte 1");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20vh" }}>
      <h1>Las líneas de un río</h1>
      {/* <p>Version 1.1: Sonificación de datos del río Santa Catarina</p> */}

      {/* <button onClick={handlePlayParte1}>Tocar parte 1</button>
      <button onClick={handleStopParte1}>Detener parte 1</button> */}

      <button onClick={connectArduino}>Arduino</button>
      <p>Valor del sensor: {sensorValue}</p>
    </div>
  );
}

export default App;
