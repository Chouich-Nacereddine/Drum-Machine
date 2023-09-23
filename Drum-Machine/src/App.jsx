import { useState, useEffect } from "react";
import bg_img from './assets/pngegg (11).png'

function App() {
  const [displayText, setDisplayText] = useState("");

  const playSound = (soundId) => {
    // Play the sound corresponding to the soundId
    const audio = document.getElementById(soundId);
    if (audio) {
      audio.currentTime = 0;
      audio.play();
      setDisplayText(soundId);
    }
  };
  useEffect(() => {
    const handleKeyPress = (event) => {
      // Map key codes to drum pad IDs
      const keyToPad = {
        81: "Q", // Keycode for "Q"
        87: "W", // Keycode for "W"
        69: "E", // Keycode for "E"
        65: "A", // Keycode for "A"
        83: "S", // Keycode for "S"
        68: "D", // Keycode for "D"
        90: "Z", // Keycode for "Z"
        88: "X", // Keycode for "X"
        67: "C", // Keycode for "C"
      };

      const soundId = keyToPad[event.keyCode];
      if (soundId) {
        playSound(soundId);
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const drumPads = [
    { id: "Q", sound: "Heater-1" },
    { id: "W", sound: "Heater-2" },
    { id: "E", sound: "Heater-3" },
    { id: "A", sound: "Heater-4_1" },
    { id: "S", sound: "Heater-6" },
    { id: "D", sound: "Dsc_Oh" },
    { id: "Z", sound: "Kick_n_Hat" },
    { id: "X", sound: "RP4_KICK_1" },
    { id: "C", sound: "Cev_H2" },
  ];
  return (
    <div className="flex items-center justify-center w-full h-screen relative overflow-hidden">
      <div className="absolute text-4xl sm:text-6xl  text-[#71c4ef] font-bold top-10">Drum Machine</div>
      <div className="absolute sm:top-0 sm:right-0 bottom-0 h-[50%] -z-10"><img src={bg_img} alt="" /></div>
      <div
        id="drum-machine"
        className=" py-4 px-16 flex flex-col-reverse sm:flex-row items-center justify-between sm:w-[40vw] w-[60vw] h-[max-content] bg-[#00668c] rounded-2xl shadow-2xl border-4"
      >
        <div className="grid grid-cols-3 gap-6">
          {drumPads.map((pad) => (
            <div
              key={pad.id}
              className=" border-2 border-yellow-600 hover:scale-90 active:scale-90 drum-pad bg-black w-10 h-10 sm:w-16 sm:h-16 flex items-center justify-center rounded-lg cursor-pointer text-yellow-600 text-2xl "
              onClick={() => playSound(pad.id)}
            >
              {pad.id}
              <audio
                id={pad.id}
                className="clip"
                src={`https://s3.amazonaws.com/freecodecamp/drums/${pad.sound}.mp3`}
              />
            </div>
          ))}
        </div>
        <div id="display" className="text-3xl font-bold w-[100%] sm:w-[30%] bg-[#b6ccd8] text-center rounded-md mb-4">
          {displayText}
        </div>
      </div>
    </div>
  );
}

export default App;
