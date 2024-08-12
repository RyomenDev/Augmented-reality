// import React from "react";

// const ARScene = ({ recognizedText }) => {
//   return (
//     <a-scene>
//       <a-marker preset="hiro">
//         <a-text
//           value={recognizedText}
//           align="center"
//           color="black"
//           position="0 0.5 0"
//           scale="2 2 2"
//         ></a-text>
//       </a-marker>
//       <a-camera></a-camera>
//       {/* <a-entity camera></a-entity> */}
//     </a-scene>
//   );
// };

// export default ARScene;

import React from "react";

const ARScene = ({ recognizedText }) => {
  return (
    <a-scene embedded>
      <a-marker preset="hiro">
        <a-text
          value={recognizedText || "Waiting for text..."} // Default text if none is recognized
        //   align="center"
        //   color="black"
        //   position="0 0.5 0"
        //   scale="1 1 1"
        ></a-text>
      </a-marker>
      {/* <a-camera position="0 0 0"></a-camera> */}
      <a-entity camera></a-entity>
    </a-scene>
  );
};

export default ARScene;
