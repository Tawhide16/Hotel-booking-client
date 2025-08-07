import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";

const specialOffers = [
  {
    title: "🔥 Summer Sale - 30% Off!",
    image: "https://i.ibb.co/JFpdqGcb/sara-dubler-Koei-7y-Yt-Io-unsplash-1.jpg",
    description: "Book now and save big this summer!",
  },
  {
    title: "🎉 Weekend Deal - Free Breakfast",
    image: "https://i.ibb.co/spz9ZDGd/rhema-kallianpur-uoc-Sn-WMhn-As-unsplash-1.jpg",
    description: "Stay 2 nights and get breakfast free!",
  },
];

export default function SpecialOffersModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show modal after 1 second
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 mx-6"
    >
      <Dialog.Panel className="bg-white dark:bg-gray-900 p-6 rounded-xl max-w-md w-full relative shadow-lg">
        <button
          className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          onClick={() => setIsOpen(false)}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          🔥 Special Offers
        </h2>
        {specialOffers.map((offer, i) => (
          <div key={i} className="mb-6">
            <img
              src={offer.image}
              alt={offer.title}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="text-lg font-semibold mt-2 text-gray-800 dark:text-gray-200">
              {offer.title}
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {offer.description}
            </p>
          </div>
        ))}
      </Dialog.Panel>
    </Dialog>
  );
}
