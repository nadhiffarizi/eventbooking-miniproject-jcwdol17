/** @format */

import Image from "next/image";
import React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
function createData(name: string, img_url: string, price: number) {
  return { name, img_url, price };
}

const rows = [
  createData(
    "THE NORTH FACE",
    "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    1500000
  ),
  createData(
    "BLUNDSTONE 063 Leather Lined Rustic Brown",
    "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    2445000
  )
];

function BasicTable() {
  return (
    <TableContainer
      component={Paper}
      className="flex justify-center bg-[#ededed]">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Product</b>
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
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell align="center">
                <Image
                  src={row.img_url}
                  alt=""
                  width={200}
                  height={200}
                  className="m-auto"
                />
              </TableCell>
              <TableCell scope="row" className="max-w-60">
                <div className="font-bold"> {row.name}</div>
                <p className=" text-xs">
                  If you are unsure about your size, please click the size chart
                  button and browse through the chart to find your correct
                  measurements. Our company policy does not accept refunds or
                  returns for sizing-related issues. For more details, kindly
                  contact our Customer Service to consult
                </p>
              </TableCell>
              <TableCell align="center">
                <button>
                  <DeleteIcon />
                </button>
              </TableCell>
              <TableCell align="right">
                <span className="font-bold">
                  Rp {row.price.toLocaleString("id-ID")}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default function Page() {
  return (
    <div className="flex justify-center bg-[#ededed]">
      <div className="max-w-screen-xl w-full mt-14">
        <div className="flex p-3 md:border md:shadow-md rounded-md bg-[#ededed] flex-col md:flex-row">
          <div className="w-full">
            <div className="p-6">
              <BasicTable />
              <div className="flex justify-end mt-3">
                <Button>
                  <span className="font-bold text-xl">checkout</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
