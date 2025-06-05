// import { useEffect, useState } from 'react';
// import Lottie from "lottie-react";
// import { Link } from 'react-router';

// const ErrorPage = () => {
//   const [animationData, setAnimationData] = useState(null);

//   useEffect(() => {
//     fetch('/error.json') 
//       .then(res => res.json())
//       .then(data => setAnimationData(data));
//   }, []);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-4 text-center">
//       <div style={{ width: 300, marginBottom: 24 }}>
//         {animationData && <Lottie animationData={animationData} loop={true} />}
//       </div>
//       <h1 className="text-4xl font-bold text-green-800 mb-2">Oops! Page Not Found </h1>
//       <p className="text-gray-600 mb-4">
//         No thing found ! 😅
//       </p>
//       <Link to="/">
//         <button className="px-6 py-2 bg-green-600 text-white font-semibold rounded-full shadow-md hover:bg-green-700 transition-all duration-300">
//           🌿 Go to Home
//         </button>
//       </Link>
//     </div>
//   );
// };

// export default ErrorPage;

