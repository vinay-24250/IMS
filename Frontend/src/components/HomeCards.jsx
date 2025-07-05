import React, { useState } from "react";

const cardData = [
  {
    title: "Products",
    frontText: "View Total Products",
    backText:
      "Easily manage and view all inventory items. Quickly find details like stock, pricing, and ratings.",
    color: ["#1FA2FF", "#12D8FA"],
  },
  {
    title: "Low Stock",
    frontText: "Check Low Stock",
    backText:
      "Stay ahead with real-time alerts for items below stock threshold. Avoid running out!",
    color: ["#FF512F", "#DD2476"],
  },
  {
    title: "Suppliers",
    frontText: "Supplier Details",
    backText:
      "Access and update supplier contact information in one place for smooth operations.",
    color: ["#56ab2f", "#a8e063"],
  },
  {
    title: "Reports",
    frontText: "Generate Reports",
    backText:
      "Download sales and inventory reports to analyze performance and plan strategically.",
    color: ["#614385", "#516395"],
  },
];

const HomeCards = () => {
  const [flippedIndex, setFlippedIndex] = useState(null);

  const handleFlip = (index) => {
    setFlippedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="bg-gray-500 h-[500px] rounded-3xl flex-col justify-center place-items-center py-16 px-20 mb-10">
      <h2 className="font-['Poppins'] font-extrabold text-2xl sm:text-5xl md:text-4xl text-white hover:scale-105 transition duration-500 mb-20">
        Explore Key Features
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-20 w-[1200px] mx-auto">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="relative w-full h-60 cursor-pointer perspective"
            onClick={() => handleFlip(index)}
          >
            <div
              className={`relative preserve-3d w-full h-full duration-700 ${
                flippedIndex === index ? "my-rotate-y-180" : ""
              }`}
            >
              {/* Front Side */}
              <div
                className={`absolute backface-hidden w-full h-full rounded-xl shadow-md p-6 bg-white/10 backdrop-blur-md border border-white/20 transition-transform transform hover:scale-105 flex flex-col justify-center items-center text-white`}
                style={{
                  backgroundImage: `linear-gradient(135deg, ${card.color[0]}, ${card.color[1]})`,
                }}
              >
                <h2 className="text-xl font-bold">{card.title}</h2>
                <p className="text-sm mt-2 opacity-90 text-center">
                  {card.frontText}
                </p>
              </div>


              <div className="absolute my-rotate-y-180 backface-hidden w-full h-full rounded-xl shadow-md p-6 bg-zinc-900 text-white flex flex-col justify-center items-center border border-gray-300 hover:shadow-xl">
                <h2 className="text-md font-semibold text-center">
                  {card.backText}
                </h2>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCards;
