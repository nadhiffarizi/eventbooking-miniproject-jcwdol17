"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);

  const updateCart = async () => {
    const cartIds = JSON.parse(localStorage.getItem("cart") || "[]");
    if (cartIds.length > 0) {
      try {
        const response = await fetch(`/api/event/get?ids=${cartIds.join(",")}`);
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const selectedEvents = await response.json();
        setCartItems(selectedEvents);
      } catch (error) {
        console.error(error);
      }
    } else {
      setCartItems([]);
    }
  };

  useEffect(() => {
    updateCart();
    const handleStorageChange = () => {
      updateCart();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleRemoveFromCart = (id: number) => {
    const updatedCart = cartItems.filter((event) => event.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart.map((e) => e.id)));
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="flex justify-center bg-white">
      <div className="max-w-screen-xl w-full mb-14 mt-14">
        <div className="flex p-3 md:border md:shadow-md rounded-md bg-slate-200 flex-col md:flex-row">
          <div className="w-full">
            <div className="p-6">
              <TableContainer
                component={Paper}
                className="flex justify-center bg-slate-100">
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <b>Event</b>
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell align="center">
                        <b>Action</b>
                      </TableCell>
                      <TableCell align="right">
                        <b>Price</b>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cartItems.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} align="center">
                          <p className="text-gray-600">Cart is empty</p>
                        </TableCell>
                      </TableRow>
                    ) : (
                      cartItems.map((event) => (
                        <TableRow
                          key={event.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 }
                          }}>
                          <TableCell align="center">
                            <Image
                              src={event.image_url}
                              alt={event.event_name}
                              width={200}
                              height={200}
                              className="m-auto"
                            />
                          </TableCell>
                          <TableCell scope="row" className="max-w-60">
                            <div className="font-bold">{event.event_name}</div>
                            <p className="text-xs">{event.description}</p>
                          </TableCell>
                          <TableCell align="center">
                            <button
                              onClick={() => handleRemoveFromCart(event.id)}>
                              <DeleteIcon className="text-red-500 hover:text-red-700" />
                            </button>
                          </TableCell>
                          <TableCell align="right">
                            <span className="font-bold">
                              Rp {event.price.toLocaleString("id-ID")}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <div className="flex justify-end mt-3">
                <Button
                  variant="contained"
                  color="primary"
                  disabled={cartItems.length === 0}
                  href="/payment">
                  <span className="font-bold text-xl">Checkout</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
