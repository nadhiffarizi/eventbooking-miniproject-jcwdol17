import React from "react";
// import { products } from "@/data";
import Image from "next/image";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon
} from "@heroicons/react/24/outline";

const Event: React.FC = () => {
  return (
    <div className="flex flex-col border-b mt-4">
      <header className="flex items-center justify-between px-4 py-2 text-xl font-bold underline">
        <span>Ongoing Events</span>
        <button className="flex gap-2">
          <ArrowLeftCircleIcon className="w-8 h-8" />
          <ArrowRightCircleIcon className="w-8 h-8" />
        </button>
      </header>
      {/* <div className="product-list py-4 mt-4 ml-8">
        {products.map((product) => (
          <div key={product.id} className="product-card shadow-md w-72 h-72">
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={200}
              height={200}
              className="rounded-lg h-36"
            />
            <h3 className="py-6">{product.name}</h3>
            <p>
              Rating: {product.rating} ({product.reviewCount} reviews)
            </p>
          </div>
        ))}
      </div> */}
      <section className="section-event overflow-x-auto py-4 mt-4">
        <div className="flex gap-4">
          {/* Card 1 */}
          <div className="card bg-white shadow-xl min-w-[250px]">
            <figure>
              <Image
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                width={250}
                height={200}
                alt="Event"
              />
            </figure>
            <div className="card-body p-4">
              <h2 className="card-title text-lg text-black font-semibold">
                Vitae Event
                <div className="badge badge-secondary ml-2">NEW</div>
              </h2>
              <p className="text-sm mt-2 text-black">
                If a dog chews shoes whose shoes does he choose?
              </p>
              <div className="card-actions mt-4 flex justify-end gap-2">
                <div className="badge badge-outline text-black">Education</div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="card bg-white shadow-xl min-w-[250px]">
            <figure>
              <Image
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                width={250}
                height={200}
                alt="Event"
              />
            </figure>
            <div className="card-body p-4">
              <h2 className="card-title text-lg text-black font-semibold">
                Shoes!
                <div className="badge badge-secondary ml-2">NEW</div>
              </h2>
              <p className="text-sm mt-2 text-black">
                If a dog chews shoes whose shoes does he choose?
              </p>
              <div className="card-actions mt-4 flex justify-end gap-2">
                <div className="badge badge-outline text-black">Hobby</div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="card bg-white shadow-xl min-w-[250px]">
            <figure>
              <Image
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                width={250}
                height={200}
                alt="Event"
              />
            </figure>
            <div className="card-body p-4">
              <h2 className="card-title text-lg font-semibold">
                Shoes!
                <div className="badge badge-secondary ml-2">NEW</div>
              </h2>
              <p className="text-sm mt-2">
                If a dog chews shoes whose shoes does he choose?
              </p>
              <div className="card-actions mt-4 flex justify-end gap-2">
                <div className="badge badge-outline">Fashion</div>
                <div className="badge badge-outline">Products</div>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="card bg-white shadow-xl min-w-[250px]">
            <figure>
              <Image
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                width={250}
                height={200}
                alt="Event"
              />
            </figure>
            <div className="card-body p-4">
              <h2 className="card-title text-lg font-semibold">
                Shoes!
                <div className="badge badge-secondary ml-2">NEW</div>
              </h2>
              <p className="text-sm mt-2">
                If a dog chews shoes whose shoes does he choose?
              </p>
              <div className="card-actions mt-4 flex justify-end gap-2">
                <div className="badge badge-outline">Fashion</div>
                <div className="badge badge-outline">Products</div>
              </div>
            </div>
          </div>

          {/* Card 5 */}
          <div className="card bg-white shadow-xl min-w-[250px]">
            <figure>
              <Image
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                width={250}
                height={200}
                alt="Event"
              />
            </figure>
            <div className="card-body p-4">
              <h2 className="card-title text-lg font-semibold">
                Shoes!
                <div className="badge badge-secondary ml-2">NEW</div>
              </h2>
              <p className="text-sm mt-2">
                If a dog chews shoes whose shoes does he choose?
              </p>
              <div className="card-actions mt-4 flex justify-end gap-2">
                <div className="badge badge-outline">Fashion</div>
                <div className="badge badge-outline">Products</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

{
  /* <style jsx>{`
        .product-list {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
        }
        .product-card {
          border: 1px solid #ccc;
          padding: 10px;
          border-radius: 5px;
          text-align: center;
        }
      `}</style> */
}

export default Event;
