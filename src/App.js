import React from "react";
import { datosRio } from "./scripts/helper";
import { playParte1 } from "./scripts/parte1";

function App() {
  //devuelve una promesa,
  // de qué lo qué está adentro de la función se ejecute

  //procesar los datos del río
  const datosRioValue = datosRio || 0;
  const datosRioFeatures = datosRioValue.features || [];
  const datosRioSize = datosRioFeatures.length;

  const handlePlayParte1 = async () => {
    await playParte1();

    console.log("playing parte 1");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20vh" }}>
      <h1>Las líneas de un río</h1>
      <p>Version 1.1: Sonificación de datos del río Santa Catarina</p>

      <button onClick={handlePlayParte1}>Tocar parte 1</button>
    </div>
  );
}

export default App;
