import { 
  FaWifi, 
  FaSwimmingPool, 
  FaParking, 
  FaUtensils, 
  FaSpa, 
  FaConciergeBell, 
  FaSnowflake, 
  FaDumbbell,
  FaTshirt,
  FaChild,
  FaGlassCheers,
  FaBus
} from "react-icons/fa";

const OurService = () => {
  // হোটেল সেবাগুলোর লিস্ট
   const services = [
    { name: "Free WiFi", icon: <FaWifi className="text-2xl" />, desc: "High-speed internet in all rooms" },
    { name: "Infinity Pool", icon: <FaSwimmingPool className="text-2xl" />, desc: "Stunning rooftop pool with city views" },
    { name: "Valet Parking", icon: <FaParking className="text-2xl" />, desc: "Complimentary valet service" },
    { name: "Fine Dining", icon: <FaUtensils className="text-2xl" />, desc: "5-star restaurant with international chefs" },
    { name: "Luxury Spa", icon: <FaSpa className="text-2xl" />, desc: "Award-winning spa treatments" },
    { name: "24/7 Concierge", icon: <FaConciergeBell className="text-2xl" />, desc: "Personalized service anytime" },
    { name: "AC Rooms", icon: <FaSnowflake className="text-2xl" />, desc: "Smart climate control in all suites" },
    { name: "Fitness Center", icon: <FaDumbbell className="text-2xl" />, desc: "State-of-the-art gym equipment" },
    { name: "Laundry", icon: <FaTshirt className="text-2xl" />, desc: "Same-day dry cleaning service" },
    { name: "Kids Club", icon: <FaChild className="text-2xl" />, desc: "Supervised activities for children" },
    { name: "Bar Lounge", icon: <FaGlassCheers className="text-2xl" />, desc: "Signature cocktails and live music" },
    { name: "Airport Shuttle", icon: <FaBus className="text-2xl" />, desc: "Complimentary transfers to airport" }
  ];

 

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 my-15  ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Exceptional Services
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Experience unparalleled hospitality with our premium amenities designed for your comfort
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 dark:border-gray-700 transform hover:-translate-y-2"
            >
              <div className="flex items-start mb-5">
                <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 mr-4">
                  {service.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {service.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurService;