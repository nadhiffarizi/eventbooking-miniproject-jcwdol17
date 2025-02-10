"use client";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { useFormik } from "formik";
import { useRef, useState } from "react";
import * as Yup from "yup";
import * as React from "react";
import { useCallback } from "react";
import { uploadAvatar } from "@/helper/profile/updateprofile.helper";

export default function Profile() {
  const { data: session, update } = useSession();
  const ref = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  // upload image callback
  const upload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsLoading(true);
      if (e.target.files?.length) {
        const image: File = e.target.files[0];
        formik.setFieldValue("image", image);
        const form = new FormData();
        form.append("image", image);
        console.log("form", form);

        await uploadAvatar(form, session?.user.accessToken!);
        await update();
      }
      setIsLoading(false);
    },
    [session]
  );

  // formik
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
      password: Yup.string()
        .matches(
          /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
          "Must contain at least 8 characters, one uppercase, one number and one special case character"
        )
        .required("Password is required"),
    }),
    initialValues: {
      first_name: "",
      last_name: "",
      password: "",
    },
    onSubmit: async (values) => {
      // alert(
      //   JSON.stringify({
      //     ...values,
      //     role,
      //   })
      // );
      //   try {
      //     const feedback: Response | Error = await registerUserRequest({
      //       ...values,
      //       role,
      //     });
      //     if ((feedback as Response).status === 201) {
      //       alert("Register account successful, please sign in");
      //       push("/api/auth/signin");
      //     } else {
      //       throw new Error("register failed");
      //     }
      //     formik.resetForm();
      //   } catch (error) {
      //     if (error instanceof Error) alert(error.message);
      //   }
    },
  });

  return (
    <div className="flex justify-center items-center w-screen h-screen ">
      <div className="w-3/5 h-5/6 max-h-[700px] bg-white">
        <div className="flex justify-end items-center w-full h-[50px] ">
          <h1>
            Welcome{" "}
            <span className="text-lg text-red-500">
              {" "}
              {session?.user.first_name}!
            </span>
          </h1>
        </div>
        <div className="w-full h-[600px] flex justify-end ">
          <div className="w-full h-full py-10 px-32 shadow-md rounded-lg ring-slate-200 ring-2  bg-white">
            <div className="w-full h-[40px] ">
              <h1 className="text-lg text-red-500 font-semibold">
                Edit Your Profile
              </h1>
            </div>
            <div className="w-full h-[410px] grid grid-rows-6 gap-3">
              <div className="flex flex-col gap-1 items-center w-full h-full row-span-2 ">
                {/**Image */}
                <div className="w-1/2 max-w-[110px] h-5/6  ">
                  <img
                    className="w-full h-full object-cover rounded-full ring-2 "
                    src={
                      `${session?.user.image_url}` ||
                      "../../asset/login-image.jpg"
                    }
                  />
                </div>
                <div className="flex justify-center w-1/2 max-w-[110px] h-1/6 ">
                  <input
                    type="file"
                    hidden
                    ref={ref}
                    accept="image/png, image/gif, image/jpeg"
                    onChange={upload}
                  />
                  <input
                    className={`mt-2 text-red-600 font-semibold text-xs cursor-pointer `}
                    onClick={() => ref.current?.click()}
                    type="button"
                    value={isLoading ? "Uploading..." : "Upload new Picture"}
                    disabled={isLoading}
                  ></input>
                </div>
              </div>

              <div className="w-full h-full row-span-1 ">
                <div className=" w-full h-full flex flex-rows gap-6">
                  <div className="w-full h-full ">
                    <label className="text-sm">First Name</label>
                    <Input
                      className="ring-2 bg-slate-100"
                      type="text"
                      name="first_name"
                    />
                  </div>
                  <div className="w-full h-full ">
                    <label className="text-sm">Last Name</label>
                    <Input
                      className="ring-2 bg-slate-100"
                      type="text"
                      name="last_name"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full h-full row-span-1 ">
                <div className=" w-full h-full flex flex-rows gap-6">
                  <div className="w-full h-full ">
                    <label className="text-sm">Email</label>
                    <Input
                      className="ring-2 bg-slate-200"
                      type="email"
                      name="email"
                      value={String(session?.user.email)}
                      readOnly
                    />
                  </div>

                  <div className="w-full h-full ">
                    <label className="text-sm">Referral Code</label>
                    <Input
                      className="ring-2 bg-slate-200"
                      type="text"
                      name="referral_code"
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <div className="w-full h-full row-span-1 ">
                <div className="w-full h-full ">
                  <label className="text-sm">Current Password</label>
                  <Input
                    className="ring-2 bg-slate-100"
                    type="password"
                    name="current_password"
                  />
                </div>
              </div>
              <div className="w-full h-full row-span-1 ">
                <div className="w-full h-full ">
                  <label className="text-sm">New Password</label>
                  <Input
                    className="ring-2 bg-slate-100"
                    type="password"
                    name="new_password"
                  />
                </div>
              </div>
            </div>
            <div className=" flex justify-end items-center w-full h-[100px] ">
              <button className="bg-red-500 hover:bg-red-700 w-[150px] h-[50px] text-white rounded-md">
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
