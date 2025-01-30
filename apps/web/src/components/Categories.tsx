import React from "react";

const Categories: React.FC = () => {
  return (
    <div className="container-categories rounded-full mt-2 pt-2 items-center justify-center">
      <div className="browse-by text-xl bold mb-4 underline">
        Browse By Categories
      </div>
      <section>
        <div className="button-group">
          <button className="button">Education</button>
          <button className="button">Business</button>
          <button className="button">Entertainment</button>
          <button className="button">Hobby</button>
          <button className="button">Music</button>
          <button className="button">Food & Drink</button>
        </div>
      </section>
      <div className="browse-by text-xl bold mb-4 underline">
        Browse By City
      </div>
      <section>
        <div className="button-group">
          <button className="button">Jakarta</button>
          <button className="button">Bandung</button>
          <button className="button">Bali</button>
          <button className="button">Surabaya</button>
          <button className="button">Semarang</button>
          <button className="button">Medan</button>
        </div>
      </section>
    </div>
  );
};

export default Categories;
