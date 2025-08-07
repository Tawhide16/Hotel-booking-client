import React from 'react';

const images = [
  "https://i.ibb.co/pBP761TR/julia-60-Snth-S09-Ao-unsplash.jpg",
  "https://i.ibb.co/HfB7xn8n/spacejoy-um-AXne-H4-Gh-A-unsplash.jpg",
  "https://i.ibb.co/67cdM9LS/sven-brandsma-GZ5c-KOge-IB0-unsplash.jpg",
  "https://i.ibb.co/Jwhp49KS/julia-Ru-CVvjuy-Ne-Q-unsplash.jpg",
  "https://i.ibb.co/ch7RpZ8R/minh-pham-YAPZt8wx-MO4-unsplash-1.jpg",
  "https://i.ibb.co/ch7RpZ8R/minh-pham-YAPZt8wx-MO4-unsplash-1.jpg", // duplicate intentional?
  "https://i.ibb.co/4RXKnVJJ/mariia-zakatiura-t7z-YZz-O-CX0-unsplash.jpg",
  "https://i.ibb.co/8gWyR1hy/samantha-gades-Bl-Ih-Vf-Xbi9s-unsplash.jpg",
  "https://i.ibb.co/Cy3wyLZ/norbert-levajsics-o-TJ92-KUXHls-unsplash.jpg",
  "https://i.ibb.co/RpCyn8GG/naomi-hebert-2dc-Yhvb-HV-M-unsplash.jpg",
  "https://i.ibb.co/rKB98n1S/rahul-chakraborty-dv9-Ao-OYeg-Rc-unsplash.jpg",
  "https://i.ibb.co/JFgc3rxx/benjamin-child-0s-T9-Yh-Ng-SEs-unsplash.jpg",
  "https://i.ibb.co/5xMKhqqC/hans-eiskonen-Pot-GJds-W06k-unsplash.jpg",
  "https://i.ibb.co/rKkT11jG/andy-vult-zw-Zpdho-Tb-U0-unsplash.jpg",
];

const Gallery = () => {
  return (
    <div className="py-10 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text- mt-15">📸 Room Gallery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {images.map((src, idx) => (
          <div
            key={idx}
            className="overflow-hidden rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <img
              src={src}
              alt={`Room ${idx + 1}`}
              className="w-full h-64 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
