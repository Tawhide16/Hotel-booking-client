import { FaHotel, FaMapMarkerAlt, FaPhone, FaEnvelope, FaStar, FaUsers, FaThumbsUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const AboutUs = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
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

  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [storyRef, storyInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [teamRef, teamInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <motion.div
        ref={heroRef}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="relative py-20 overflow-hidden"
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
            className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-700 dark:text-gray-300"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover luxury, comfort, and unforgettable experiences at our world-class hotel
          </motion.p>
        </motion.div>

        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-blue-600 opacity-10 dark:opacity-20"
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
          <motion.div className="md:w-1/2" variants={slideInFromLeft}>
            <motion.img
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
              alt="Hotel Lobby"
              className="rounded-lg shadow-xl w-full h-auto"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
          <motion.div className="md:w-1/2" variants={slideInFromRight}>
            <motion.h2
              className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100"
              variants={itemVariants}
            >
              Our Story
            </motion.h2>
            <motion.p className="text-gray-600 dark:text-gray-300 mb-4" variants={itemVariants}>
              Founded in 2010, our hotel began as a small family-run establishment with just 10 rooms...
            </motion.p>
            <motion.p className="text-gray-600 dark:text-gray-300 mb-6" variants={itemVariants}>
              Our mission is to create memorable experiences for every guest...
            </motion.p>
            <motion.div variants={itemVariants}>
              <Link
                to="/rooms"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300"
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
        className="bg-gray-100 dark:bg-gray-800 py-16"
      >
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100"
          >
            Why Choose Our Hotel
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {[
              { icon: <FaStar />, title: "Luxury Accommodations", desc: "Experience premium comfort..." },
              { icon: <FaUsers />, title: "Exceptional Service", desc: "Our dedicated staff is committed..." },
              { icon: <FaThumbsUp />, title: "Prime Location", desc: "Situated in the heart of the city..." }
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md text-center hover:shadow-lg transition duration-300"
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <div className="text-blue-600 dark:text-blue-400 text-4xl mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.desc}</p>
              </motion.div>
            ))}
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
          className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100"
          variants={itemVariants}
        >
          Meet Our Team
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
        >
          {/* Example Member */}
          <motion.div
            className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
            variants={scaleUp}
            whileHover={{ scale: 1.03 }}
          >
            <img
              src="https://i.ibb.co/hRd4XhMM/marie-michele-bouchard.jpg"
              alt="Team Member"
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-1">Sarah Johnson</h3>
              <p className="text-blue-600 dark:text-blue-400 mb-3">General Manager</p>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                With 15 years in hospitality, Sarah ensures every guest receives exceptional service.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutUs;
