"use client";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { Formik, useFormik, validateYupSchema } from "formik";
import { useRef, useState } from "react";
import * as Yup from "yup";
import * as React from "react";
import { useCallback } from "react";
import {
  updateData,
  uploadAvatar,
} from "@/helper/profile/updateprofile.helper";
import { useEffect } from "react";
import { getUserInfo } from "@/helper/profile/getUser.helper";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface IUserProfile {
  first_name: string;
  last_name: string;
  email: string;
  referral_code: string;
  point_balance?: number;
  point_expired_date?: Date | null | string;
  coupon?: number;
  coupon_expired?: Date | null | string;
}

export default function AdminProfile() {
  const { data: session, update, status } = useSession();
  const ref = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  let submitted = false;
  const [userData, setUserData] = useState<IUserProfile>();
  const { push } = useRouter();

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
      current_password:
        Yup.string().matches(
          /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
          "Must contain at least 8 characters, one uppercase, one number and one special case character"
        ) || Yup.string().nullable(),

      new_password:
        Yup.string().matches(
          /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
          "Must contain at least 8 characters, one uppercase, one number and one special case character"
        ) || Yup.string().nullable(),
    }),
    initialValues: {
      first_name: "",
      last_name: "",
      current_password: "",
      new_password: "",
      email: "",
      referral_code: "",
    },
    onSubmit: async (values) => {
      // alert(
      //   JSON.stringify({
      //     ...values,
      //   })
      // );

      if (!formik.values.current_password && formik.values.new_password) {
        alert("Current password cannot be empty!");
        return;
      }

      if (formik.values.current_password && !formik.values.new_password) {
        formik.values.new_password = formik.values.current_password;
      }
      try {
        const feedback = await updateData(
          {
            ...values,
          },
          session?.user.accessToken!
        );

        if (feedback.status === 200) {
          alert("Update profile data success");
          submitted = !submitted;
          update();
        } else {
          throw new Error("update data failed");
        }
      } catch (error) {
        if (error instanceof Error) alert(error.message);
      }
    },
  });

  // get user data
  useEffect(() => {
    if (status === "authenticated") {
      // call data
      const res = getUserInfo(session?.user.accessToken!);
      res.then((d) => console.log(d["data"]));
      res.then((r) => {
        const tempData: IUserProfile = {
          first_name: r["data"]["first_name"],
          last_name: r["data"]["last_name"],
          email: r["data"]["email"],
          referral_code: r["data"]["referral_code"],
          coupon: r["data"]["coupon"],
          coupon_expired: r["data"]["coupon_expired"],
          point_balance: r["data"]["point_balance"],
          point_expired_date: r["data"]["point_expired_date"],
        };

        formik.values.first_name = tempData.first_name;
        formik.values.last_name = tempData.last_name;
        formik.values.email = tempData.email;
        formik.values.referral_code = tempData.referral_code;
        submitted = false;
        setUserData(tempData);
      });
    }

    console.log("status now: ", status);
  }, [status, submitted]);

  return (
    <div className="flex justify-center items-center w-screen py-6 ">
      <div className="w-3/5 h-5/6 max-h-[700px] bg-white">
        <div className="flex justify-between items-center w-full h-[70px] ">
          <h1 className="text-lg">
            Welcome{" "}
            <span className=" text-red-500">
              {" "}
              {String(session?.user.first_name).substring(0, 1).toUpperCase() +
                String(session?.user.first_name).substring(1)}
            </span>
          </h1>
        </div>
        <div className="w-full h-[600px] flex justify-end ">
          <div className="w-full h-full py-10 px-32 shadow-md rounded-lg ring-slate-200 ring-2  bg-white">
            <form onSubmit={formik.handleSubmit}>
              <div className="w-full h-[40px] ">
                <h1 className="text-lg text-red-500 font-semibold">
                  Edit Your Profile
                </h1>
              </div>
              <div className="w-full h-[410px] grid grid-rows-6 gap-3">
                <div className="flex flex-col gap-1 items-center w-full h-full row-span-2 ">
                  {/**Image */}
                  <div className="w-1/2 max-w-[110px] h-5/6  ">
                    {session?.user.image_url ? (
                      <img
                        className="w-full h-full object-cover rounded-full ring-2 "
                        src={`${session?.user.image_url}`}
                      />
                    ) : (
                      <img
                        className="w-full h-full object-cover rounded-full ring-2 "
                        src={`../../../../asset/default-profile.png`}
                      />
                    )}
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
                        value={formik.values.first_name}
                        onChange={formik.handleChange}
                      />
                    </div>
                    <div className="w-full h-full ">
                      <label className="text-sm">Last Name</label>
                      <Input
                        className="ring-2 bg-slate-100"
                        type="text"
                        name="last_name"
                        value={formik.values.last_name}
                        onChange={formik.handleChange}
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
                        value={formik.values.email}
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
                        value={formik.values.referral_code}
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
                      onChange={formik.handleChange}
                      value={formik.values.current_password}
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
                      onChange={formik.handleChange}
                      value={formik.values.new_password}
                    />
                  </div>
                </div>
              </div>
              <div className=" flex justify-end items-center w-full h-[100px] ">
                <Button
                  type="submit"
                  className={`${
                    formik.isSubmitting
                      ? "bg-gray-300 text-gray-400"
                      : "hover:bg-red-800 bg-themeColor"
                  } min-w-[150px] w-[150px] h-[50px] text-lg `}
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? "Processing..." : "Update"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
