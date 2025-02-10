"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { data: sesssion } = useSession();

  return (
    <div className=" flex flex-row gap-10 justify-center">
      {sesssion?.user.accessToken ? (
        <>
          <h1>
            Hello{" "}
            <span className="text-yellow-500">{sesssion?.user.first_name}</span>
          </h1>{" "}
          <button onClick={() => signOut()}>SignOut</button>{" "}
          <p>
            {sesssion.user.role === "CUSTOMER" ? (
              <>
                <Link href={"/profile"}>Profile</Link>
              </>
            ) : (
              <>Admin</>
            )}
          </p>
        </>
      ) : (
        <>
          <Link href={"/api/auth/signin"}>
            <p>SignIn</p>
          </Link>
        </>
      )}
    </div>
  );
}
