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
    // Show modal every time homepage loads
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1000); // show after 1 second delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
    >
      <Dialog.Panel className="bg-white p-6 rounded-xl max-w-md w-full relative">
        <button
          className="absolute top-3 right-3"
          onClick={() => setIsOpen(false)}
          aria-label="Close modal"
        >
          <X />
        </button>
        <h2 className="text-xl font-bold mb-4">🔥 Special Offers</h2>
        {specialOffers.map((offer, i) => (
          <div key={i} className="mb-4">
            <img
              src={offer.image}
              alt={offer.title}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="text-lg font-semibold mt-2">{offer.title}</h3>
            <p className="text-sm">{offer.description}</p>
          </div>
        ))}
      </Dialog.Panel>
    </Dialog>
  );
}
