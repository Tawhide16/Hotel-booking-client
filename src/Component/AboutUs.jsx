import { FaHotel, FaMapMarkerAlt, FaPhone, FaEnvelope, FaStar, FaUsers, FaThumbsUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const AboutUs = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  };

  const slideInFromLeft = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  const slideInFromRight = {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  const scaleUp = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } }
  };

  // Intersection observer hooks
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [storyRef, storyInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [teamRef, teamInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.div 
        ref={heroRef}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="relative  text-black py-20 overflow-hidden"
      >
        <motion.div 
          className="container mx-auto px-4 text-center"
          variants={itemVariants}
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            About Our Hotel
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl max-w-3xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover luxury, comfort, and unforgettable experiences at our world-class hotel
          </motion.p>
        </motion.div>
        
        {/* Animated decorative elements */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-full bg-blue-600 opacity-10"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </motion.div>

      {/* Our Story */}
      <motion.div 
        ref={storyRef}
        initial="hidden"
        animate={storyInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="container mx-auto px-4 py-16"
      >
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div 
            className="md:w-1/2"
            variants={slideInFromLeft}
          >
            <motion.img 
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
              alt="Hotel Lobby" 
              className="rounded-lg shadow-xl w-full h-auto"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
          <motion.div 
            className="md:w-1/2"
            variants={slideInFromRight}
          >
            <motion.h2 
              className="text-3xl font-bold mb-6 text-gray-800"
              variants={itemVariants}
            >
              Our Story
            </motion.h2>
            <motion.p 
              className="text-gray-600 mb-4"
              variants={itemVariants}
            >
              Founded in 2010, our hotel began as a small family-run establishment with just 10 rooms. 
              Today, we've grown into a premier destination with over 200 luxurious rooms and suites, 
              while maintaining our commitment to personalized service and attention to detail.
            </motion.p>
            <motion.p 
              className="text-gray-600 mb-6"
              variants={itemVariants}
            >
              Our mission is to create memorable experiences for every guest, combining modern 
              amenities with timeless hospitality traditions. We take pride in being more than 
              just a place to stay - we're a home away from home.
            </motion.p>
            <motion.div variants={itemVariants}>
              <Link 
                to="/rooms" 
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Our Rooms
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Why Choose Us */}
      <motion.div 
        ref={featuresRef}
        initial="hidden"
        animate={featuresInView ? "visible" : "hidden"}
        variants={fadeIn}
        className="bg-gray-100 py-16"
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12 text-gray-800"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Why Choose Our Hotel
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Feature 1 */}
            <motion.div 
              className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition duration-300"
              variants={itemVariants}
              whileHover={{ y: -10 }}
            >
              <motion.div 
                className="text-blue-600 text-4xl mb-4 flex justify-center"
                whileHover={{ rotate: 15, scale: 1.2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FaStar />
              </motion.div>
              <h3 className="text-xl font-semibold mb-3">Luxury Accommodations</h3>
              <p className="text-gray-600">
                Experience premium comfort with our elegantly designed rooms featuring plush bedding and modern amenities.
              </p>
            </motion.div>
            
            {/* Feature 2 */}
            <motion.div 
              className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition duration-300"
              variants={itemVariants}
              whileHover={{ y: -10 }}
            >
              <motion.div 
                className="text-blue-600 text-4xl mb-4 flex justify-center"
                whileHover={{ rotate: 15, scale: 1.2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FaUsers />
              </motion.div>
              <h3 className="text-xl font-semibold mb-3">Exceptional Service</h3>
              <p className="text-gray-600">
                Our dedicated staff is committed to providing personalized service to meet your every need.
              </p>
            </motion.div>
            
            {/* Feature 3 */}
            <motion.div 
              className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition duration-300"
              variants={itemVariants}
              whileHover={{ y: -10 }}
            >
              <motion.div 
                className="text-blue-600 text-4xl mb-4 flex justify-center"
                whileHover={{ rotate: 15, scale: 1.2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FaThumbsUp />
              </motion.div>
              <h3 className="text-xl font-semibold mb-3">Prime Location</h3>
              <p className="text-gray-600">
                Situated in the heart of the city with easy access to major attractions and business districts.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Team Section */}
      <motion.div 
        ref={teamRef}
        initial="hidden"
        animate={teamInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="container mx-auto px-4 py-16"
      >
        <motion.h2 
          className="text-3xl font-bold text-center mb-12 text-gray-800"
          variants={itemVariants}
        >
          Meet Our Team
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
        >
          {/* Team Member 1 */}
          <motion.div 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
            variants={scaleUp}
            whileHover={{ scale: 1.03 }}
          >
            <img 
              src="https://i.ibb.co/hRd4XhMM/marie-michele-bouchard-3-U9-BCWHMh-Uw-unsplash.jpg" 
              alt="Team Member" 
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-1">Sarah Johnson</h3>
              <p className="text-blue-600 mb-3">General Manager</p>
              <p className="text-gray-600 text-sm">
                With 15 years in hospitality, Sarah ensures every guest receives exceptional service.
              </p>
            </div>
          </motion.div>
          
          {/* Team Member 2 */}
          <motion.div 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
            variants={scaleUp}
            whileHover={{ scale: 1.03 }}
          >
            
            <img 
              src="https://i.ibb.co/CKtH1ddY/shipman-northcutt-sg-ZX15-Da8-YE-unsplash.jpg" 
              alt="Team Member" 
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-1">Michael Chen</h3>
              <p className="text-blue-600 mb-3">Head Chef</p>
              <p className="text-gray-600 text-sm">
                Award-winning chef specializing in fusion cuisine with local ingredients.
              </p>
            </div>
          </motion.div>
          
          {/* Team Member 3 */}
          <motion.div 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
            variants={scaleUp}
            whileHover={{ scale: 1.03 }}
          >
            <img 
              src="https://i.ibb.co/XfkyXmcg/freestocks-9-UVml-Ib0w-JU-unsplash.jpg" 
              alt="Team Member" 
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-1">Emma Rodriguez</h3>
              <p className="text-blue-600 mb-3">Guest Relations</p>
              <p className="text-gray-600 text-sm">
                Multilingual specialist dedicated to making your stay unforgettable.
              </p>
            </div>
          </motion.div>
          
          {/* Team Member 4 */}
          <motion.div 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
            variants={scaleUp}
            whileHover={{ scale: 1.03 }}
          >
            <img 
              src="https://i.ibb.co/LHJJdtS/jonas-kakaroto-KIPqvv-TOC1s-unsplash.jpg" 
              alt="Team Member" 
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-1">David Wilson</h3>
              <p className="text-blue-600 mb-3">Concierge</p>
              <p className="text-gray-600 text-sm">
                Local expert who can arrange anything from tours to exclusive dining.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutUs;