import React from "react";
import { useEffect } from "react";
import { Howl } from "howler";

const Music = () => {
  useEffect(() => {
    const guitar = new Howl({
      src: ["../assets/audio/guitar.mp3"],
      volume: 0.2,
    });
    const mic = new Howl({ src: ["../assets/audio/mic.mp3"], volume: 0.2 });
    const drums = new Howl({ src: ["../assets/audio/drums.mp3"], volume: 0.2 });
    const piano = new Howl({ src: ["../assets/audio/piano.mp3"], volume: 0.2 });

    // Play all sounds initially at a low volume
    guitar.play();
    mic.play();
    drums.play();
    piano.play();

    const handleMarkerFound = (sound) => () => sound.volume(1);
    const handleMarkerLost = (sound) => () => sound.volume(0.2);

    const guitarMarker = document.getElementById("guitarMarker");
    const micMarker = document.getElementById("micMarker");
    const drumsMarker = document.getElementById("drumsMarker");
    const pianoMarker = document.getElementById("pianoMarker");

    guitarMarker.addEventListener("markerFound", handleMarkerFound(guitar));
    guitarMarker.addEventListener("markerLost", handleMarkerLost(guitar));
    micMarker.addEventListener("markerFound", handleMarkerFound(mic));
    micMarker.addEventListener("markerLost", handleMarkerLost(mic));
    drumsMarker.addEventListener("markerFound", handleMarkerFound(drums));
    drumsMarker.addEventListener("markerLost", handleMarkerLost(drums));
    pianoMarker.addEventListener("markerFound", handleMarkerFound(piano));
    pianoMarker.addEventListener("markerLost", handleMarkerLost(piano));

    return () => {
      guitarMarker.removeEventListener(
        "markerFound",
        handleMarkerFound(guitar)
      );
      guitarMarker.removeEventListener("markerLost", handleMarkerLost(guitar));
      micMarker.removeEventListener("markerFound", handleMarkerFound(mic));
      micMarker.removeEventListener("markerLost", handleMarkerLost(mic));
      drumsMarker.removeEventListener("markerFound", handleMarkerFound(drums));
      drumsMarker.removeEventListener("markerLost", handleMarkerLost(drums));
      pianoMarker.removeEventListener("markerFound", handleMarkerFound(piano));
      pianoMarker.removeEventListener("markerLost", handleMarkerLost(piano));
    };
  }, []);

  return (
    <div className="">
      <div className="">
        <button
          className="close-button"
          onClick={() => (window.location.href = "/")}
        >
          X
        </button>
        <h1>Musical</h1>
        <div className="scene-container">
          <a-scene
            embedded
            arjs="detectionMode: mono_and_matrix; matrixCodeType: 3x3"
          >
            <a-assets>
              <img id="drumsImage" src="../assets/pics/drums.png" />
              <img id="guitarImage" src="../assets/pics/guitar.png" />
              <img id="micImage" src="../assets/pics/mic.png" />
              <img id="pianoImage" src="../assets/pics/piano.png" />
            </a-assets>
            <a-marker id="drumsMarker" type="barcode" value="0">
              <a-image src="#drumsImage" rotation="90 0 0" position="0 0 0" />
            </a-marker>
            <a-marker id="guitarMarker" type="barcode" value="1">
              <a-image src="#guitarImage" rotation="90 0 0" />
            </a-marker>
            <a-marker id="micMarker" type="barcode" value="2">
              <a-image src="#micImage" rotation="90 0 0" />
            </a-marker>
            <a-marker id="pianoMarker" type="barcode" value="3">
              <a-image src="#pianoImage" rotation="90 0 0" />
            </a-marker>
            <a-entity camera position="0 1.6 3"></a-entity>{" "}
            {/* Adjust position as needed */}
          </a-scene>
        </div>
      </div>
    </div>
  );
};

export default Music;

// import React, { useEffect } from "react";
// import { Howl } from "howler";

// const Music = () => {
//   useEffect(() => {
//     const guitar = new Howl({
//       src: ["../assets/audio/guitar.mp3"],
//       volume: 0.2,
//     });
//     const mic = new Howl({ src: ["../assets/audio/mic.mp3"], volume: 0.2 });
//     const drums = new Howl({ src: ["../assets/audio/drums.mp3"], volume: 0.2 });
//     const piano = new Howl({ src: ["../assets/audio/piano.mp3"], volume: 0.2 });

//     // Play all sounds initially at a low volume
//     guitar.play();
//     mic.play();
//     drums.play();
//     piano.play();

//     const handleMarkerFound = (sound) => () => sound.volume(1);
//     const handleMarkerLost = (sound) => () => sound.volume(0.2);

//     const guitarMarker = document.getElementById("guitarMarker");
//     const micMarker = document.getElementById("micMarker");
//     const drumsMarker = document.getElementById("drumsMarker");
//     const pianoMarker = document.getElementById("pianoMarker");

//     guitarMarker.addEventListener("markerFound", handleMarkerFound(guitar));
//     guitarMarker.addEventListener("markerLost", handleMarkerLost(guitar));
//     micMarker.addEventListener("markerFound", handleMarkerFound(mic));
//     micMarker.addEventListener("markerLost", handleMarkerLost(mic));
//     drumsMarker.addEventListener("markerFound", handleMarkerFound(drums));
//     drumsMarker.addEventListener("markerLost", handleMarkerLost(drums));
//     pianoMarker.addEventListener("markerFound", handleMarkerFound(piano));
//     pianoMarker.addEventListener("markerLost", handleMarkerLost(piano));

//     return () => {
//       guitarMarker.removeEventListener(
//         "markerFound",
//         handleMarkerFound(guitar)
//       );
//       guitarMarker.removeEventListener("markerLost", handleMarkerLost(guitar));
//       micMarker.removeEventListener("markerFound", handleMarkerFound(mic));
//       micMarker.removeEventListener("markerLost", handleMarkerLost(mic));
//       drumsMarker.removeEventListener("markerFound", handleMarkerFound(drums));
//       drumsMarker.removeEventListener("markerLost", handleMarkerLost(drums));
//       pianoMarker.removeEventListener("markerFound", handleMarkerFound(piano));
//       pianoMarker.removeEventListener("markerLost", handleMarkerLost(piano));
//     };
//   }, []);

//   return (
//     <div style={{ width: "100%", height: "100%", position: "relative" }}>
//       <a-scene
//         embedded
//         arjs="detectionMode: mono_and_matrix; matrixCodeType: 3x3"
//         style={{ width: "100%", height: "100%" }}
//       >
//         <img id="drumsImage" src="/assets/pics/drums.png" />
//         <img id="guitarImage" src="/assets/pics/guitar.png" />
//         <img id="micImage" src="/assets/pics/mic.png" />
//         <img id="pianoImage" src="/assets/pics/piano.png" />

//         <a-marker id="drumsMarker" type="barcode" value="0">
//           <a-image src="#drumsImage" rotation="90 0 0" position="0 0 0" />
//         </a-marker>

//         <a-marker id="guitarMarker" type="barcode" value="1">
//           <a-image src="#guitarImage" rotation="90 0 0" />
//         </a-marker>

//         <a-marker id="micMarker" type="barcode" value="2">
//           <a-image src="#micImage" rotation="90 0 0" />
//         </a-marker>

//         <a-marker id="pianoMarker" type="barcode" value="3">
//           <a-image src="#pianoImage" rotation="90 0 0" />
//         </a-marker>

//         <a-entity camera></a-entity>
//       </a-scene>
//     </div>
//   );
// };

// export default Music;

// import React, { useState } from "react";
// import { Howl } from "howler";

// const Music = () => {
//   const [sound, setSound] = useState(null);

//   const handleInitializeMusic = () => {
//     console.log("Initializing Music");
//     const music = new Howl({
//       src: ["../assets/audio/guitar.mp3"], // Ensure this path is correct
//       volume: 0.9,
//       onloaderror: (id, error) => {
//         console.error("Failed to load sound \n", error);
//       },
//       onplayerror: (id, error) => {
//         console.error("Failed to play sound", error);
//       },
//     });
//     setSound(music);
//   };

//   const handlePlayMusic = () => {
//     if (sound) {
//       console.log("PLAYING");
//       sound.play();
//     } else {
//       console.log("Music not initialized. Click 'Initialize Music' first.");
//     }
//   };

//   return (
//     <div style={{ width: "100%", height: "100%", position: "relative" }}>
//       <button
//         onClick={handleInitializeMusic}
//         style={{
//           position: "absolute",
//           top: "10px",
//           left: "10px",
//           padding: "10px 20px",
//           fontSize: "16px",
//         }}
//       >
//         Initialize Music
//       </button>
//       <button
//         onClick={handlePlayMusic}
//         style={{
//           position: "absolute",
//           top: "50px",
//           left: "10px",
//           padding: "10px 20px",
//           fontSize: "16px",
//         }}
//       >
//         Play Music
//       </button>
//     </div>
//   );
// };

// export default Music;
