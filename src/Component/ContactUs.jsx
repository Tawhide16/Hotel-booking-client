import { motion } from "framer-motion";
import { Map, Marker } from "pigeon-maps";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaPaperPlane, FaClock } from "react-icons/fa";
import { useInView } from "react-intersection-observer";

const ContactUs = () => {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
    };

    const slideInFromLeft = {
        hidden: { x: -50, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 0.6 } }
    };

    const slideInFromRight = {
        hidden: { x: 50, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 0.6 } }
    };

    const [contactRef, contactInView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [formRef, formInView] = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            {/* Hero Section */}
            <motion.div
                ref={contactRef}
                initial="hidden"
                animate={contactInView ? "visible" : "hidden"}
                variants={containerVariants}
                className="relative text-gray-900 dark:text-gray-100 py-12 md:py-20 overflow-hidden"
            >
                <motion.div className="container mx-auto px-4 sm:px-6 text-center" variants={itemVariants}>
                    <motion.h1
                        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6"
                        initial={{ y: -30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        Contact Us
                    </motion.h1>
                    <motion.p
                        className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto text-gray-600 dark:text-gray-300"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        We'd love to hear from you. Reach out for reservations, inquiries, or feedback.
                    </motion.p>
                </motion.div>

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
                            className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-gray-800 dark:text-gray-100"
                            variants={itemVariants}
                        >
                            Get in Touch
                        </motion.h2>

                        <motion.div className="space-y-4 md:space-y-6" variants={containerVariants}>
                            {[
                                {
                                    icon: <FaMapMarkerAlt />,
                                    title: "Address",
                                    lines: ["123 Luxury Avenue", "Downtown District", "Metropolis City, 10001"]
                                },
                                {
                                    icon: <FaPhone />,
                                    title: "Phone",
                                    lines: ["+1 (555) 123-4567", "+1 (555) 765-4321 (24/7)"]
                                },
                                {
                                    icon: <FaEnvelope />,
                                    title: "Email",
                                    lines: ["info@luxuryhotel.com", "reservations@luxuryhotel.com"]
                                },
                                {
                                    icon: <FaClock />,
                                    title: "Operating Hours",
                                    lines: ["Front Desk: 24/7", "Reservations: 8AM - 10PM Daily"]
                                }
                            ].map((info, idx) => (
                                <motion.div
                                    key={idx}
                                    className="flex items-start gap-3 sm:gap-4"
                                    variants={itemVariants}
                                    whileHover={{ x: 5 }}
                                >
                                    <div className="text-blue-600 text-xl sm:text-2xl mt-1">{info.icon}</div>
                                    <div>
                                        <h3 className="text-lg sm:text-xl font-semibold mb-1 dark:text-gray-100">
                                            {info.title}
                                        </h3>
                                        {info.lines.map((line, i) => (
                                            <p key={i} className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                                                {line}
                                            </p>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        ref={formRef}
                        initial="hidden"
                        animate={formInView ? "visible" : "hidden"}
                        variants={slideInFromRight}
                        className="lg:w-1/2 bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg"
                    >
                        <motion.h2
                            className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-800 dark:text-gray-100"
                            variants={itemVariants}
                        >
                            Send Us a Message
                        </motion.h2>

                        <motion.form className="space-y-4 md:space-y-6" variants={containerVariants}>
                            {[
                                { id: "name", label: "Your Name", type: "text", placeholder: "John Doe" },
                                { id: "email", label: "Email Address", type: "email", placeholder: "your@email.com" },
                                { id: "phone", label: "Phone Number (Optional)", type: "tel", placeholder: "+1 (555) 123-4567" }
                            ].map((field, idx) => (
                                <motion.div key={idx} variants={itemVariants}>
                                    <label htmlFor={field.id} className="block text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
                                        {field.label}
                                    </label>
                                    <input
                                        type={field.type}
                                        id={field.id}
                                        placeholder={field.placeholder}
                                        className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 text-sm sm:text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                    />
                                </motion.div>
                            ))}

                            <motion.div variants={itemVariants}>
                                <label htmlFor="subject" className="block text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
                                    Subject
                                </label>
                                <select
                                    id="subject"
                                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 text-sm sm:text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                >
                                    <option value="">Select a subject</option>
                                    <option value="reservation">Room Reservation</option>
                                    <option value="event">Event Inquiry</option>
                                    <option value="feedback">Feedback</option>
                                    <option value="other">Other</option>
                                </select>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
                                    Your Message
                                </label>
                                <textarea
                                    id="message"
                                    rows="4"
                                    placeholder="How can we help you?"
                                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 text-sm sm:text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
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
            <motion.div className="bg-gray-100 dark:bg-gray-800 py-12 md:py-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                <div className="container mx-auto px-4 sm:px-6">
                    <motion.h2
                        className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-gray-800 dark:text-gray-100"
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
                            <Map defaultCenter={[23.7808875, 90.4169257]} defaultZoom={15} height="100%">
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
