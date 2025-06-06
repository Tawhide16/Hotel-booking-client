import React, { useEffect, useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Faq = () => {
  const [faqs, setFaqs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    fetch('/faq.json') // ✅ public folder er path
      .then((res) => res.json())
      .then((data) => setFaqs(data))
      .catch((error) => console.error("FAQ fetch error:", error));
  }, []);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <section className="faq-section">
        <h2 className="text-4xl font-bold text-center text-indigo-700 mb-4 dark:text-indigo-500">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-gray-600 mb-12 dark:text-gray-300">
          Find answers to common questions about our services
        </p>

        <div className="space-y-4">
          {faqs.length === 0 ? (
            <p className="text-center text-gray-500">Loading FAQs...</p>
          ) : (
            faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 dark:border-gray-700 dark:bg-gray-800"
              >
                <button
                  className={`flex items-center justify-between w-full p-6 text-left font-medium transition-colors duration-200 ${
                    activeIndex === index
                      ? 'bg-indigo-50 dark:bg-gray-700'
                      : 'bg-white dark:bg-gray-800'
                  }`}
                  onClick={() => toggleAccordion(index)}
                >
                  <span className="text-lg text-gray-800 dark:text-white">{faq.question}</span>
                  {activeIndex === index ? (
                    <FaChevronUp className="text-indigo-600 dark:text-indigo-400" />
                  ) : (
                    <FaChevronDown className="text-gray-500 dark:text-gray-400" />
                  )}
                </button>

                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    activeIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="p-6 pt-0 text-gray-600 dark:text-gray-300">{faq.answer}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Faq;
