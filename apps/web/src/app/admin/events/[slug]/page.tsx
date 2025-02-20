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
import { useParams, useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { getEventDetails, updateEvent } from "@/helper/event/event.helper";

interface IEventData {
  event_name: string;
  speaker: string;
  date: string;
  location: string;
  capacity: number;
  price: number;
  description: string;
  image_url: string;
}

export default function AdminEventPage() {
  const { data: session, update, status } = useSession();
  const params = useParams<{ slug: string }>(); // for query in the backend
  const ref = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  let submitted = false;
  const [eventData, setEventData] = useState<IEventData>();
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
    initialValues: {
      event_name: "",
      speaker: "",
      date: "",
      location: "",
      capacity: "",
      price: "",
      description: "",
    },
    onSubmit: async (values) => {
      // alert(
      //   JSON.stringify({
      //     ...values,
      //   })
      // );

      // console.log(params?.slug);

      try {
        const feedback = await updateEvent(
          session?.user.accessToken!,
          {
            ...values,
          },
          params?.slug!
        );
        if (feedback?.status === 200) {
          alert("Update event success");
          submitted = !submitted;
          update();
        } else {
          throw new Error("update event data failed");
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
      const res = getEventDetails(session?.user.accessToken!, params?.slug!);
      res.then((d) => console.log(d["data"]));
      res.then((r) => {
        const tempData: IEventData = {
          event_name: r["data"]["event_name"],
          date: r["data"]["date"],
          location: r["data"]["location"],
          speaker: r["data"]["speaker"],
          capacity: r["data"]["capacity"],
          price: r["data"]["price"],
          description: r["data"]["description"],
          image_url: r["data"]["image_url"],
        };
        formik.values.event_name = tempData.event_name;
        formik.values.speaker = tempData.speaker;
        formik.values.capacity = String(tempData.capacity);
        formik.values.description = tempData.description;
        formik.values.location = tempData.location;
        formik.values.price = String(tempData.price);
        // submitted = false;
        setEventData(tempData);
      });
    }

    console.log("status now: ", status);
  }, [status, submitted]);

  return (
    <div className="flex justify-center items-center w-screen py-6 ">
      <div className="w-3/5 h-5/6 max-h-[700px] bg-white">
        <div className="w-full h-full py-7 px-12 shadow-md rounded-lg ring-slate-200 ring-2  bg-white">
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3">
            <div className="w-full h-[40px] ">
              <h1 className="text-lg text-red-500 font-semibold">
                {params?.slug.toUpperCase()}
              </h1>
            </div>
            <div className="w-full h-[460px] px-10 overflow-auto">
              <div className="flex flex-col justify-center items-center w-full h-1/2 ">
                <div className="flex flex-col justify-center w-[250px] h-full">
                  <div className=" w-full h-5/6 bg-slate-500">
                    {session?.user.image_url ? (
                      <img
                        className="w-full h-full object-cover ring-2 rounded-sm "
                        src={`${session?.user.image_url}`}
                      />
                    ) : (
                      <img
                        className="w-full h-full object-cover rounded-full ring-2 "
                        src={`../../../../asset/default-profile.png`}
                      />
                    )}
                  </div>
                  <div className="w-full h-1/6 flex justify-center ">
                    <input
                      type="file"
                      hidden
                      ref={ref}
                      accept="image/png, image/gif, image/jpeg"
                      onChange={upload}
                    />
                    <input
                      className={`mt-2 text-green-600 font-semibold text-sm cursor-pointer`}
                      onClick={() => ref.current?.click()}
                      type="button"
                      value={isLoading ? "Uploading..." : "Upload Event Photo"}
                      disabled={isLoading}
                    ></input>
                  </div>
                </div>
              </div>
              <div className="w-full h-[100px]  py-5">
                <div className="flex flex-row w-full h-full gap-6">
                  <div className=" w-full h-full flex flex-col gap-2">
                    <label className="text-sm">Event Name</label>
                    <Input
                      className="ring-2 bg-slate-50"
                      type="text"
                      name="event_name"
                      value={formik.values.event_name}
                      onChange={formik.handleChange}
                    />
                  </div>
                  <div className="w-full h-full flex flex-col gap-2">
                    <label className="text-sm">Date</label>
                    <Input
                      className="ring-2 bg-slate-100"
                      type="text"
                      name="date"
                      value={formik.values.date}
                      onChange={formik.handleChange}
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <div className="w-full h-[100px]  py-5">
                <div className="flex flex-row w-full h-full gap-6">
                  <div className=" w-full h-full flex flex-col gap-2">
                    <label className="text-sm">Speaker</label>
                    <Input
                      className="ring-2 bg-slate-50"
                      type="text"
                      name="speaker"
                      value={formik.values.speaker}
                      onChange={formik.handleChange}
                    />
                  </div>
                  <div className="w-full h-full flex flex-col gap-2">
                    <label className="text-sm">Location</label>
                    <Input
                      className="ring-2 bg-slate-50"
                      type="text"
                      name="location"
                      value={formik.values.location}
                      onChange={formik.handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full h-[100px] py-5">
                <div className="flex flex-row w-full h-full gap-6">
                  <div className=" w-full h-full flex flex-col gap-2">
                    <label className="text-sm">Capacity</label>
                    <Input
                      className="ring-2 bg-slate-50"
                      type="text"
                      name="capacity"
                      value={formik.values.capacity}
                      onChange={formik.handleChange}
                    />
                  </div>
                  <div className="w-full h-full flex flex-col gap-2">
                    <label className="text-sm">Price</label>
                    <Input
                      className="ring-2 bg-slate-50"
                      type="text"
                      name="price"
                      value={formik.values.price}
                      onChange={formik.handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full  py-5">
                {" "}
                <div className="flex flex-row w-full h-full">
                  <div className=" w-full h-full flex flex-col gap-2">
                    <label className="text-sm">Description</label>
                    <Textarea
                      className="ring-2 bg-slate-50"
                      name="description"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className=" flex justify-end items-end w-full h-[70px] ">
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
  );
}
