"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

interface Ticket {
  id: number;
  event_name: string;
  image_url?: string;
  price?: number;
}

const PaymentPage: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams() as URLSearchParams;
  const [orderItems, setOrderItems] = useState<Ticket[]>([]);
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>("Pending");

  useEffect(() => {
    const ticketString = searchParams.get("tickets");

    if (ticketString) {
      try {
        const ticketData: Ticket[] = JSON.parse(
          decodeURIComponent(ticketString)
        );
        setOrderItems(ticketData);
      } catch (err) {
        console.error("Failed to parse ticket data");
      }
    }
  }, [searchParams]);

  const subtotal = orderItems.reduce((acc, item) => acc + (item.price ?? 0), 0);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPaymentProof(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleUploadClick = () => {
    if (!paymentProof) {
      alert("Please upload your payment proof before proceeding.");
      return;
    }

    setStatusMessage("Waiting for Admin");
    alert("Payment proof uploaded successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Payment
        </h1>

        <div className="space-y-4">
          {orderItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center bg-gray-200 p-3 rounded-lg gap-4">
              {/* Gambar Event */}
              <img
                src={
                  item.image_url ||
                  "https://cdn.pixabay.com/photo/2023/04/03/12/59/crowd-7896788_1280.jpg"
                }
                alt={item.event_name}
                className="w-16 h-16 object-cover rounded-lg"
              />

              {/* Nama Event & Harga */}
              <div className="flex flex-col flex-grow">
                <span className="text-gray-700 font-medium">
                  {item.event_name}
                </span>
                <span className="text-gray-900 font-semibold">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR"
                  }).format(item.price ?? 0)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-lg font-semibold text-right mt-4">
          Total:{" "}
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
          }).format(subtotal)}
        </p>

        <p
          className={`text-center font-bold mt-2 ${
            statusMessage === "Waiting for Admin"
              ? "text-yellow-500"
              : "text-gray-600"
          }`}>
          Status: {statusMessage}
        </p>

        {/* Upload Payment Proof */}
        <div className="mt-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Upload Payment Proof
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border rounded p-2"
            required
          />
          {previewImage && (
            <div className="mt-3">
              <img
                src={previewImage}
                alt="Payment Proof Preview"
                className="w-full rounded-lg shadow-md"
              />
            </div>
          )}
          <button
            onClick={handleUploadClick}
            className="w-full mt-4 bg-green-500 text-white font-semibold py-2 rounded-lg hover:bg-green-600 transition">
            Upload Payment Proof
          </button>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => router.back()}
            className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition">
            Cancel
          </button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
