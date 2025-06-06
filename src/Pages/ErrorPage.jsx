import { useState, useEffect } from 'react';

const ErrorPage = ({ statusCode = 404, message = "Page Not Found" }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsAnimating(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Split status code into individual digits for animation
  const digits = String(statusCode).split('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-800 flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Animated background elements */}
      <div 
        className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-pink-500 opacity-20 blur-xl"
        style={{
          transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
          transition: 'transform 0.3s ease-out'
        }}
      ></div>
      <div 
        className="absolute bottom-1/3 right-1/3 w-40 h-40 rounded-full bg-blue-500 opacity-20 blur-xl"
        style={{
          transform: `translate(${mousePosition.x * -40}px, ${mousePosition.y * -40}px)`,
          transition: 'transform 0.4s ease-out'
        }}
      ></div>
      
      {/* Main content */}
      <div className="relative z-10 text-center">
        <div className={`transition-all duration-1000 ${isAnimating ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
          <h1 className="text-9xl font-bold text-white mb-4">
            {digits.map((digit, index) => (
              <span 
                key={index} 
                className={`inline-block ${index === 1 ? 'animate-bounce' : ''}`}
              >
                {digit}
              </span>
            ))}
          </h1>
          <h2 className="text-3xl font-semibold text-white mb-6">Oops! {message}</h2>
          <p className="text-xl text-white/80 mb-8 max-w-md">
            {statusCode === 404 
              ? "The page you're looking for doesn't exist or has been moved."
              : "Something went wrong. Please try again later."}
          </p>
          <div className="flex gap-4 justify-center">
            <button 
              className="px-6 py-3 bg-white text-indigo-900 rounded-full font-medium hover:bg-indigo-100 transition-all duration-300 hover:scale-105 shadow-lg"
              onClick={() => window.history.back()}
            >
              Go Back
            </button>
            <button 
              className="px-6 py-3 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-all duration-300 hover:scale-105 shadow-lg"
              onClick={() => window.location.href = '/'}
            >
              Home Page
            </button>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className={`mt-12 flex justify-center space-x-8 transition-all duration-1000 delay-300 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}>
          {[...Array(5)].map((_, i) => (
            <div 
              key={i}
              className={`w-4 h-4 rounded-full ${i % 2 === 0 ? 'bg-pink-400' : 'bg-blue-400'}`}
              style={{
                animation: `float 3s ease-in-out infinite ${i * 0.2}s`,
              }}
            ></div>
          ))}
        </div>
      </div>
      
      {/* Add keyframes for floating animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
      `}</style>
    </div>
  );
};

export default ErrorPage;