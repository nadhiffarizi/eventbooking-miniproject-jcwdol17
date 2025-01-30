import React from "react";
import Image from "next/image";

interface HeroCard {
  title: string;
  description: string;
  imageUrl: string;
  buttonText: string;
}

const cardsData: HeroCard[] = [
  {
    title: "Shoes!",
    description: "If a dog chews shoes whose shoes does he choose?",
    imageUrl:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    buttonText: "Buy Ticket"
  },
  {
    title: "Hats!",
    description: "Protect your head in style.",
    imageUrl:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    buttonText: "Buy Ticket"
  },
  {
    title: "Bags!",
    description: "Carry your essentials anywhere.",
    imageUrl:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    buttonText: "Buy Ticket"
  },
  {
    title: "Watches!",
    description: "Time is precious, wear it well.",
    imageUrl:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    buttonText: "Buy Ticket"
  },
  {
    title: "Watches!",
    description: "Time is precious, wear it well.",
    imageUrl:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    buttonText: "Buy Ticket"
  },
  {
    title: "Watches!",
    description: "Time is precious, wear it well.",
    imageUrl:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    buttonText: "Buy Ticket"
  },
  {
    title: "Watches!",
    description: "Time is precious, wear it well.",
    imageUrl:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    buttonText: "Buy Ticket"
  },
  {
    title: "Watches!",
    description: "Time is precious, wear it well.",
    imageUrl:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    buttonText: "Buy Ticket"
  }
];

const HeroEvents: React.FC = () => {
  return (
    <div className="grid grid-cols-1 bg-[#fc9247] sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      {cardsData.map((card, index) => (
        <div key={index} className="card shadow-xl">
          <figure className="px-4 pt-4">
            <Image
              src={card.imageUrl}
              alt={card.title}
              className="rounded-xl"
              width={200}
              height={200}
            />
          </figure>
          <div className="card-body bg-[#fc9247] mt-4 shadow-2xl border-2 border-gray-700 rounded-[80%] items-center text-center">
            <h2 className="card-title text-black bold">{card.title}</h2>
            <p className="text-black">{card.description}</p>
            <div className="card-actions">
              <button className="btn btn-primary hover:bg-white hover:border-white hover:scale-110 transition duration-300 ease-in-out">
                {card.buttonText}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroEvents;
