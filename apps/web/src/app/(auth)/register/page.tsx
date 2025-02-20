"use client";
import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, Formik, Form, useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { registerUserRequest } from "@/helper/auth/register.helper";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [role, setRole] = useState<string>("CUSTOMER");
  const { push } = useRouter();

  const formik = useFormik({
    validationSchema: Yup.object({
      first_name: Yup.string()
        .matches(/[A-Za-z]/, "First name must be alphabet")
        .min(2)
        .required("Name is required"),
      last_name: Yup.string()
        .matches(/[A-Za-z]/, "Last name must be alphabet")
        .min(2)
        .required("Name is required"),
      email: Yup.string().email().required("Email is required"),
      password: Yup.string()
        .matches(
          /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
          "Must contain at least 8 characters, one uppercase, one number and one special case character"
        )
        .required("Password is required"),
      refCode: Yup.string()
        .min(0)
        .max(15)
        .typeError("Must be maximum 15 characters"),
    }),
    initialValues: {
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      referral_code: "",
    },
    onSubmit: async (values) => {
      // alert(
      //   JSON.stringify({
      //     ...values,
      //     role,
      //   })
      // );

      try {
        const feedback: Response | Error = await registerUserRequest({
          ...values,
          role,
        });

        if ((feedback as Response).status === 201) {
          alert("Register account successful, please sign in");
          push("/api/auth/signin");
        } else {
          throw new Error("register failed");
        }

        formik.resetForm();
      } catch (error) {
        if (error instanceof Error) alert(error.message);
      }
    },
  });

  return (
    <div className="w-screen h-screen">
      <div className="flex justify-center items-center w-full h-full ">
        <div className="grid lg:grid-cols-2 xxs:grid-cols-none w-full h-full">
          <div className="w-full h-full flex justify-center items-center col-span-1 ">
            <div className="w-2/3 min-w-[300px] max-w-[470px] max-h-[700px] border-2 px-5 py-3 rounded-lg ">
              <div className="w-full h-full flex flex-col">
                <div className="w-full h-[150px] flex flex-col ">
                  {/**title and logo */}
                  <div className="w-full h-[50px] ">
                    <div className="w-full h-full">
                      <img
                        className="h-full"
                        src="./asset/logo-transparant.webp"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-5 w-full ">
                    <h1 className="md:text-[2.6rem] xxs:text-3xl font-bold">
                      Create An Account
                    </h1>
                    <h3>
                      Already have an account? Login{" "}
                      <span className="text-red-400">
                        {" "}
                        <Link href={"/api/auth/signin"}> here </Link>
                      </span>
                    </h3>
                  </div>
                </div>
                <form onSubmit={formik.handleSubmit}>
                  <div className="grid grid-rows-4 w-full h-[400px] py-5 gap-3 ">
                    <div className="row-span-1 w-full h-full">
                      <div className="group flex flex-col justify-end w-full h-full ">
                        <label
                          className=" ms-2 text-xs h-1/5 text-transparent group-focus-within:text-red-400"
                          htmlFor="emailInput"
                        >
                          {
                            <p>
                              {!formik.errors.email
                                ? "Enter your first name"
                                : formik.errors.email}
                            </p>
                          }
                        </label>
                        <Input
                          type="email"
                          className="w-full h-full placeholder:text-base rounded-none border-b-2 focus-visible:border-red-400 border-red-200 focus-within:h-4/5 focus:placeholder:text-transparent focus:bg-transparent"
                          placeholder="Email"
                          name="email"
                          required
                          id="emailInput"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                        />
                      </div>
                    </div>
                    <div className="row-span-1 w-full h-full ">
                      <div className="grid grid-cols-2 w-full h-full gap-5">
                        {/** Name fields */}
                        <div className="col-span-1 w-full h-full">
                          <div className="group flex flex-col justify-end w-full h-full ">
                            <label
                              className=" ms-2 text-xs h-1/5 text-transparent group-focus-within:text-red-400"
                              htmlFor="firstnameInput"
                            >
                              <p>
                                {" "}
                                {!formik.errors.first_name
                                  ? "Enter your first name"
                                  : formik.errors.first_name}{" "}
                              </p>
                            </label>
                            <Input
                              className="w-full h-full placeholder:text-base rounded-none border-b-2 focus-visible:border-red-400 border-red-200 focus-within:h-4/5 focus:placeholder:text-transparent focus:bg-transparent"
                              placeholder="First Name"
                              name="first_name"
                              required
                              id="firstnameInput"
                              onChange={formik.handleChange}
                              value={formik.values.first_name}
                            />
                            <p className="text-xs text-red-400"></p>
                          </div>
                        </div>
                        <div className="col-span-1 w-full h-full">
                          <div className="group flex flex-col justify-end w-full h-full ">
                            <label
                              className=" ms-2 text-xs h-1/5 text-transparent group-focus-within:text-red-400"
                              htmlFor="lastnameInput"
                            >
                              {
                                <p>
                                  {!formik.errors.last_name
                                    ? "Enter your last name"
                                    : formik.errors.last_name}
                                </p>
                              }
                            </label>
                            <Input
                              className="w-full h-full placeholder:text-base rounded-none border-b-2 focus-visible:border-red-400 border-red-200 focus-within:h-4/5 focus:placeholder:text-transparent focus:bg-transparent"
                              placeholder="Last Name"
                              name="last_name"
                              required
                              id="lastnameInput"
                              value={formik.values.last_name}
                              onChange={formik.handleChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row-span-1 w-full h-full ">
                      <div className="group flex flex-col justify-end w-full h-full ">
                        <label
                          className=" ms-2 text-xs h-1/5 text-transparent group-focus-within:text-red-400"
                          htmlFor="emailInput"
                        >
                          {
                            <p>
                              {!formik.errors.password
                                ? "Enter your password"
                                : formik.errors.password}
                            </p>
                          }
                        </label>
                        <Input
                          type="password"
                          className="w-full h-full placeholder:text-base rounded-none border-b-2 focus-visible:border-red-400 border-red-200 focus-within:h-4/5 focus:placeholder:text-transparent focus:bg-transparent"
                          placeholder="Password"
                          required
                          id="passwordInput"
                          name="password"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                        />
                      </div>
                    </div>
                    <div className="row-span-1 w-full h-full mt-2 ">
                      <div className="grid grid-cols-2 w-full h-full gap-2">
                        <div className="col-span-1 h-full w-full flex flex-col justify-end">
                          <label className="text-sm text-red-400 ms-1 hidden"></label>
                          <select
                            className="w-full h-4/5 text-base text-slate-500 border-b-2 border-red-200 focus-visible:border-red-400 checked:bg-black"
                            name="role"
                            onChange={(e) => setRole(e.target.value)}
                            value={role}
                          >
                            <option
                              className="text-base text-black focus:checked:active:bg-slate-100"
                              value={"CUSTOMER"}
                            >
                              Search events
                            </option>
                            <option
                              className="text-base text-black focus:checked:active:bg-slate-100"
                              value={"ORGANIZER"}
                            >
                              Create events
                            </option>
                          </select>
                        </div>
                        <div className="col-span-1 w-full h-full">
                          <div className="group flex flex-col justify-end w-full h-full ">
                            <label
                              className=" ms-2 text-xs h-1/5 text-transparent group-focus-within:text-red-400"
                              htmlFor="referralCodeInput"
                            >
                              {
                                <p>
                                  {!formik.errors.referral_code
                                    ? "Enter your Referral code"
                                    : formik.errors.referral_code}
                                </p>
                              }
                            </label>
                            <Input
                              className="w-full h-full placeholder:text-base rounded-none border-b-2 focus-visible:border-red-400 border-red-200 focus-within:h-4/5 focus:placeholder:text-transparent focus:bg-transparent"
                              placeholder="Referral Code"
                              name="referral_code"
                              id="referralCodeInput"
                              value={formik.values.referral_code}
                              onChange={formik.handleChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-[100px] flex items-center ">
                    <Button
                      className={`${
                        formik.isSubmitting
                          ? "bg-gray-300 text-gray-400"
                          : "hover:bg-red-800 bg-themeColor"
                      } w-1/2 min-w-[150px] h-1/2 text-lg hover:bg-red-800 bg-themeColor `}
                      disabled={formik.isSubmitting}
                      type="submit"
                    >
                      Create Account
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="w-full h-full  col-span-1 lg:block xxs:hidden bg-red-400">
            <div className="w-full h-full">
              <img
                className="w-full h-full object-cover"
                src="./asset/register-image.jpg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
