// import "./app.css";
// import React from "react";
// import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
// import * as tf from "@tensorflow/tfjs";

// import ObjectIdentify from "./pages/ObjectIdentify";
// import Musical from "./pages/Musical";
// import Header from "./pages/Header";
// import Footer from "./pages/Footer";

// // Set the backend to CPU if WebGL is not supported
// tf.setBackend("cpu").then(() => {
//   tf.ready().then(() => {
//     console.log("TensorFlow.js is ready");
//   });
// });

// const App = () => {
//   return (
//     <div className="">
//       <Router>
//         <Header />
//         <main className=" items-center bg-gray-50 p-6">
//           <div className="text-center mb-8">
//             <h1 className="text-4xl font-bold text-blue-600 mb-4">
//               Welcome to AetherAI
//             </h1>
//             <p className="text-lg text-gray-700 max-w-2xl mx-auto">
//               Lorem Ipsum is simply dummy text of the printing and typesetting
//               industry. Lorem Ipsum has been the industry's standard dummy text
//               ever since the 1500s, when an unknown printer took a galley of
//               type and scrambled it to make a type specimen book. It has
//               survived not only five centuries, but also the leap into
//               electronic typesetting, remaining essentially unchanged. It was
//               popularised in the 1960s with the release of Letraset sheets
//               containing Lorem Ipsum passages, and more recently with desktop
//               publishing software like Aldus PageMaker including versions of
//               Lorem Ipsum.
//             </p>
//           </div>

//           {/* <nav className="mb-8">
//             <ul className="flex flex-col space-y-4">
//               <li>
//                 <Link to="/ObjectIdentify">
//                   <button className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                     Alphabet Learning
//                   </button>
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/ObjectIdentify">
//                   <button className="btn bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
//                     Music AR
//                   </button>
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/ObjectIdentify">
//                   <button className="btn bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
//                     Object Identification
//                   </button>
//                 </Link>
//               </li>
//             </ul>
//           </nav> */}

//           <div className="flex flex-wrap gap-6">
//             {/* Card 1 */}
//             <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-sm">
//               <div className="p-6">
//                 <h2 className="text-xl font-bold mb-2">Card Title 1</h2>
//                 <p className="text-gray-700 mb-4">
//                   Description for the first route. This is a brief summary of
//                   what you can expect.
//                 </p>
//                 <Link to="/ObjectIdentify">
//                   <button className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                     Go to Object Identify
//                   </button>
//                 </Link>
//               </div>
//             </div>

//             {/* Card 2 */}
//             <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-sm">
//               <div className="p-6">
//                 <h2 className="text-xl font-bold mb-2">Card Title 2</h2>
//                 <p className="text-gray-700 mb-4">
//                   Description for the second route. Here you can include more
//                   details.
//                 </p>
//                 <Link to="/Musical">
//                   <button className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                     Music
//                   </button>
//                 </Link>
//               </div>
//             </div>

//             {/* Card 3 */}
//             <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-sm">
//               <div className="p-6">
//                 <h2 className="text-xl font-bold mb-2">Card Title 3</h2>
//                 <p className="text-gray-700 mb-4">
//                   Description for the third route. Here is another brief summary
//                   of what is provided.
//                 </p>
//                 <Link to="/ObjectIdentify">
//                   <button className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                     Alphabet
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           </div>

//           <Routes>
//             <Route path="/ObjectIdentify" element={<ObjectIdentify />} />
//             <Route path="/Musical" element={<Musical />} />
//             <Route path="/ObjectIdentify" element={<ObjectIdentify />} />
//           </Routes>
//         </main>
//       </Router>
//       <Footer />
//     </div>
//   );
// };

// export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import Musical from "./pages/Musical";

const App = () => {
  return (
    <Router>
      <div>
        <header>
          <h1>Welcome to AetherAI</h1>
        </header>
        <main>
          <Link to="/musical">
            <button>Open Musical</button>
          </Link>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/musical" element={<Musical />} />
          </Routes>
        </main>
        <footer>
          <p>&copy; 2024 Made by Akash Mishra</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
