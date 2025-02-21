import { User } from "@prisma/client";
import cron from "node-cron";
import { prisma } from "../config";

export function cronPointExpiry() {
  // checking point expiry every 5 seconds
  cron.schedule("*/5 * * * * *", async () => {
    console.log("checks point expiry ", new Date());

    const data = await prisma.user.findMany({
      where: {
        point_expired_date: {
          not: null
        }
      }
    });
    // console.log("checks point data...");

    if (!data) return;
    data.map(async (user: User) => {
      if (!user.point_expired_date) return;
      // console.log("checks for point:", user.email);

      if (new Date().getTime() > user.point_expired_date.getTime()) {
        await prisma.user.update({
          where: {
            email: user.email
          },
          data: {
            point_balance: 0,
            point_expired_date: null
          }
        });
      }
    });
  });
}

export const cronCouponExpiry = () => {
  // checking coupon expiry every 7 seconds
  cron.schedule("*/5 * * * * *", async () => {
    console.log("checks coupon expiry ", new Date());
    const data = await prisma.user.findMany({
      where: {
        coupon_expired: {
          not: null
        }
      }
    });

    if (!data) return;
    data.map(async (user: User) => {
      if (!user.coupon_expired) return;

      if (new Date().getTime() > user.coupon_expired.getTime()) {
        await prisma.user.update({
          where: {
            email: user.email
          },
          data: {
            coupon: 0,
            coupon_expired: null
          }
        });
      }
    });
  });
};
