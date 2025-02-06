import { useState, useEffect, use } from "react";
import * as Tone from "tone";

const useArduinoSound = () => {
  const [sensorValue, setSensorValue] = useState(0);
  const [port, setPort] = useState(null);

  // Crear una única instancia del sintetizador
  const [synth] = useState(() =>
    new Tone.Oscillator({
      frequency: 100,
      type: "sine",
    }).toDestination()
  );

  const [synth2] = useState(() =>
    new Tone.Oscillator({
      frequency: 100,
      type: "sine",
    }).toDestination()
  );

  const [delay] = useState(() =>
    new Tone.FeedbackDelay("4n", 0.5).toDestination()
  );

  const [distortion] = useState(() => new Tone.Distortion(0.8).toDestination());

  const [reverb] = useState(() => new Tone.Reverb(0.5).toDestination());

  useEffect(() => {
    // synth.connect(delay);
    // synth2.connect(reverb);
    // synth.connect(reverb);
  }, []);

  // Conectarse a Arduino
  const connectArduino = async () => {
    try {
      const port = await navigator.serial.requestPort();
      await port.open({ baudRate: 9600 });
      setPort(port);

      const decoder = new TextDecoderStream();
      const inputStream = port.readable.pipeThrough(decoder);
      const inputReader = inputStream.getReader();

      if (synth.state !== "started") {
        console.log("Iniciando Synth...");
        synth.start();
        synth2.start();
      }

      let lastUpdate = 0;
      while (port.readable) {
        try {
          const { value, done } = await inputReader.read();
          if (done) {
            console.log("Stream cerrado");
            break;
          }

          let cleanData = value.replace(/[^0-9]/g, "").trim();
          if (cleanData.length > 0) {
            let sensorData = parseInt(cleanData);
            console.log("Sensor Value:", sensorData);
            setSensorValue(sensorData);

            let now = Tone.now();

            if (now - lastUpdate >= 0.3) {
              lastUpdate = now;

              let freq = 50 + (sensorData / 1023) * 450;
              let volume = -20 + (sensorData / 1023) * 20;

              // Asegurar que el synth sigue encendido
              if (synth.state !== "started") {
                console.log("Reiniciando Synth...");
                synth.start();
                synth2.start();
              }

              console.log("note", freq, "volume", volume, "time", now);

              synth.frequency.setValueAtTime(freq, now);
              synth.volume.setValueAtTime(volume, now);

              synth2.frequency.setValueAtTime(freq + 50, now);
              synth2.volume.setValueAtTime(volume - 15, now);
            }
          }
        } catch (error) {
          console.error("Error leyendo datos del puerto serie", error);
          if (port.readable) {
            console.log("Reiniciando lectura...");
            continue;
          }
        }
      }
    } catch (error) {
      console.log("Error en connectArduino", error);
    }
  };

  return { connectArduino, sensorValue };
};

export default useArduinoSound;
