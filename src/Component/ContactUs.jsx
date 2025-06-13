import { motion } from "framer-motion";
import { Map, Marker } from "pigeon-maps";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaPaperPlane, FaClock } from "react-icons/fa";
import { useInView } from "react-intersection-observer";

const ContactUs = () => {
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
        hidden: { y: 30, opacity: 0 },
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

    // Intersection observer hooks
    const [contactRef, contactInView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [formRef, formInView] = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <motion.div
                ref={contactRef}
                initial="hidden"
                animate={contactInView ? "visible" : "hidden"}
                variants={containerVariants}
                className="relative  text-black py-12 md:py-20 overflow-hidden"
            >
                <motion.div
                    className="container mx-auto px-4 sm:px-6 text-center"
                    variants={itemVariants}
                >
                    <motion.h1
                        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6"
                        initial={{ y: -30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        Contact Us
                    </motion.h1>
                    <motion.p
                        className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        We'd love to hear from you. Reach out for reservations, inquiries, or feedback.
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

            {/* Contact Content */}
            <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16">
                <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
                    {/* Contact Information */}
                    <motion.div
                        className="lg:w-1/2"
                        initial="hidden"
                        animate={contactInView ? "visible" : "hidden"}
                        variants={slideInFromLeft}
                    >
                        <motion.h2
                            className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-gray-800"
                            variants={itemVariants}
                        >
                            Get in Touch
                        </motion.h2>

                        <motion.div
                            className="space-y-4 md:space-y-6"
                            variants={containerVariants}
                        >
                            {/* Address */}
                            <motion.div
                                className="flex items-start gap-3 sm:gap-4"
                                variants={itemVariants}
                                whileHover={{ x: 5 }}
                            >
                                <div className="text-blue-600 text-xl sm:text-2xl mt-1">
                                    <FaMapMarkerAlt />
                                </div>
                                <div>
                                    <h3 className="text-lg sm:text-xl font-semibold mb-1">Address</h3>
                                    <p className="text-gray-600 text-sm sm:text-base">123 Luxury Avenue</p>
                                    <p className="text-gray-600 text-sm sm:text-base">Downtown District</p>
                                    <p className="text-gray-600 text-sm sm:text-base">Metropolis City, 10001</p>
                                </div>
                            </motion.div>

                            {/* Phone */}
                            <motion.div
                                className="flex items-start gap-3 sm:gap-4"
                                variants={itemVariants}
                                whileHover={{ x: 5 }}
                            >
                                <div className="text-blue-600 text-xl sm:text-2xl mt-1">
                                    <FaPhone />
                                </div>
                                <div>
                                    <h3 className="text-lg sm:text-xl font-semibold mb-1">Phone</h3>
                                    <p className="text-gray-600 text-sm sm:text-base">+1 (555) 123-4567</p>
                                    <p className="text-gray-600 text-sm sm:text-base">+1 (555) 765-4321 (24/7)</p>
                                </div>
                            </motion.div>

                            {/* Email */}
                            <motion.div
                                className="flex items-start gap-3 sm:gap-4"
                                variants={itemVariants}
                                whileHover={{ x: 5 }}
                            >
                                <div className="text-blue-600 text-xl sm:text-2xl mt-1">
                                    <FaEnvelope />
                                </div>
                                <div>
                                    <h3 className="text-lg sm:text-xl font-semibold mb-1">Email</h3>
                                    <p className="text-gray-600 text-sm sm:text-base">info@luxuryhotel.com</p>
                                    <p className="text-gray-600 text-sm sm:text-base">reservations@luxuryhotel.com</p>
                                </div>
                            </motion.div>

                            {/* Hours */}
                            <motion.div
                                className="flex items-start gap-3 sm:gap-4"
                                variants={itemVariants}
                                whileHover={{ x: 5 }}
                            >
                                <div className="text-blue-600 text-xl sm:text-2xl mt-1">
                                    <FaClock />
                                </div>
                                <div>
                                    <h3 className="text-lg sm:text-xl font-semibold mb-1">Operating Hours</h3>
                                    <p className="text-gray-600 text-sm sm:text-base">Front Desk: 24/7</p>
                                    <p className="text-gray-600 text-sm sm:text-base">Reservations: 8AM - 10PM Daily</p>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Social Media */}
                        <motion.div
                            className="mt-8 md:mt-12"
                            variants={itemVariants}
                        >
                            <h3 className="text-lg sm:text-xl font-semibold mb-3 md:mb-4 text-gray-800">Follow Us</h3>
                            <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
                                {['Facebook', 'Instagram', 'Twitter', 'LinkedIn'].map((social, index) => (
                                    <motion.a
                                        key={social}
                                        href="#"
                                        className="bg-blue-100 text-blue-600 px-3 py-2 sm:p-3 rounded-full hover:bg-blue-200 transition duration-300 text-sm sm:text-base"
                                        whileHover={{ y: -5, scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        {social}
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        ref={formRef}
                        initial="hidden"
                        animate={formInView ? "visible" : "hidden"}
                        variants={slideInFromRight}
                        className="lg:w-1/2 bg-white p-6 sm:p-8 rounded-lg shadow-lg"
                    >
                        <motion.h2
                            className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-800"
                            variants={itemVariants}
                        >
                            Send Us a Message
                        </motion.h2>

                        <motion.form
                            className="space-y-4 md:space-y-6"
                            variants={containerVariants}
                        >
                            <motion.div variants={itemVariants}>
                                <label htmlFor="name" className="block text-gray-700 mb-1 md:mb-2 text-sm sm:text-base">Your Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 text-sm sm:text-base"
                                    placeholder="John Doe"
                                />
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <label htmlFor="email" className="block text-gray-700 mb-1 md:mb-2 text-sm sm:text-base">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 text-sm sm:text-base"
                                    placeholder="your@email.com"
                                />
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <label htmlFor="phone" className="block text-gray-700 mb-1 md:mb-2 text-sm sm:text-base">Phone Number (Optional)</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 text-sm sm:text-base"
                                    placeholder="+1 (555) 123-4567"
                                />
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <label htmlFor="subject" className="block text-gray-700 mb-1 md:mb-2 text-sm sm:text-base">Subject</label>
                                <select
                                    id="subject"
                                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 text-sm sm:text-base"
                                >
                                    <option value="">Select a subject</option>
                                    <option value="reservation">Room Reservation</option>
                                    <option value="event">Event Inquiry</option>
                                    <option value="feedback">Feedback</option>
                                    <option value="other">Other</option>
                                </select>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <label htmlFor="message" className="block text-gray-700 mb-1 md:mb-2 text-sm sm:text-base">Your Message</label>
                                <textarea
                                    id="message"
                                    rows="4"
                                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 text-sm sm:text-base"
                                    placeholder="How can we help you?"
                                ></textarea>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <motion.button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <FaPaperPlane />
                                    Send Message
                                </motion.button>
                            </motion.div>
                        </motion.form>
                    </motion.div>
                </div>
            </div>

            {/* Map Section */}
            <motion.div
                className="bg-gray-100 py-12 md:py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className="container mx-auto px-4 sm:px-6">
                    <motion.h2
                        className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-gray-800"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        Find Us on the Map
                    </motion.h2>

                    <motion.div
                        className="rounded-xl overflow-hidden shadow-xl"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        whileHover={{ scale: 1.005 }}
                    >
                        <div className="h-64 sm:h-80 md:h-96">
                            <Map 
                                height="100%" 
                                defaultCenter={[23.7808875, 90.4169257]} 
                                defaultZoom={15}
                            >
                                <Marker width={50} anchor={[23.7808875, 90.4169257]} />
                            </Map>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default ContactUs;