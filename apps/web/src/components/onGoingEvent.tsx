// import React from "react";
// import { products } from "@/data";
// import Image from "next/image";

// const onGoingEvent: React.FC = () => {
//   return (
//     <div>
//       <h2 className="text-2xl font-semibold mb-6">Ongoing Events</h2>
//       <div className="product-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {products.map((product) => (
//           <div
//             key={product.id}
//             className="product-card border p-4 rounded-lg text-center shadow-md">
//             <Image
//               src={product.imageUrl}
//               alt={product.name}
//               width={200}
//               height={200}
//             />
//             <h3 className="text-xl mt-4">{product.name}</h3>
//             <p className="mt-2">
//               Rating: {product.rating} ({product.reviewCount} reviews)
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default onGoingEvent;
