"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/helper/auth/auth.helper";
import { useFormik } from "formik";
import Link from "next/link";
export default function ForgetPassword() {
  const [error, setError] = useState<string>("");
  const { push } = useRouter();

  // forms validation
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async (userData) => {
      //   await login(userData)
      //     .then(() => {
      //       // alert("success");
      //       push("/");
      //     })
      //     .catch((e) => {
      //       // alert("wrong email/password");
      //       setError("Wrong email/password");
      //     });
    },
  });
  return (
    <div className="w-screen h-screen">
      <div className="flex justify-center items-center w-full h-full ">
        <div className="lg:grid lg:grid-cols-2 xxs:grid-cols-none w-full h-full">
          <div className="w-full h-full flex justify-center items-center col-span-1 ">
            <div className="w-2/3 max-w-[450px] min-w-[400px] max-w-h-[500px] border-2 px-5 py-3 rounded-lg ">
              <div className="w-full h-full flex flex-col">
                <div className="w-full h-[170px] flex flex-col ">
                  {/**title and logo */}
                  <div className="w-full h-[50px] ">
                    <div className="w-full h-full">
                      <img
                        className="h-full"
                        src="../asset/logo-transparant.webp"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 w-full h-[120px] ">
                    <h1 className="text-[2.2rem] font-bold">
                      Reset your password
                    </h1>
                    <h2>
                      Don't have an account yet? Register{" "}
                      <Link href={"/register"}>
                        {" "}
                        <span className="text-red-500 hover:text-red-700">
                          here
                        </span>
                      </Link>
                    </h2>
                    <h3 className="text-sm text-red-400">{error}</h3>
                  </div>
                </div>
                <form onSubmit={formik.handleSubmit}>
                  <div className="grid grid-rows-1 w-full h-[100px] py-5 gap-3 ">
                    <div className="row-span-1 w-full h-full">
                      <div className="group flex flex-col justify-end w-full h-full ">
                        <label
                          className=" ms-2 text-xs h-1/5 text-transparent group-focus-within:text-red-400"
                          htmlFor="emailInput"
                        >
                          <p> Please enter your new password </p>
                        </label>
                        <Input
                          type="email"
                          name="email"
                          className="w-full h-full placeholder:text-base rounded-none border-b-2 focus-visible:border-red-400 border-red-200 focus-within:h-4/5 focus:placeholder:text-transparent focus:bg-transparent"
                          placeholder="Email"
                          required
                          id="emailInput"
                          onChange={formik.handleChange}
                          onFocus={() => setError("")}
                          value={formik.values.email}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-[100px] flex flex-row ">
                    <div className="flex items-center w-1/2 h-full ">
                      <Button
                        type="submit"
                        className={`${
                          formik.isSubmitting
                            ? "bg-gray-300 text-gray-400"
                            : "hover:bg-red-800 bg-themeColor"
                        } w-1/2 min-w-[150px] h-1/2 text-lg `}
                        disabled={formik.isSubmitting}
                      >
                        {formik.isSubmitting ? "Processing..." : "Reset"}
                      </Button>
                    </div>
                    <div className="flex items-center w-1/2 h-full ">
                      <Link href={"/api/auth/signin"}>
                        {" "}
                        <h3 className="text-red-400 text-sm hover:text-red-700">
                          Already have an account?
                        </h3>
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="xxs:hidden lg:block w-full h-full col-span-1 bg-red-400">
            <div className="w-full h-full">
              <img
                className="w-full h-full object-cover"
                src="../asset/login-image.jpg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
