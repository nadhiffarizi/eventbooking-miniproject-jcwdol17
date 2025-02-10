import { config } from "dotenv";
import { resolve } from 'path';
import { PrismaClient } from "@prisma/client";

config({ path: resolve(__dirname, `../.env`) })

export const PORT = process.env.PORT || 8000

export const prisma = new PrismaClient()

export const jwtAccessSecret = process.env.ACCESS_SECRET || ""

export const jwtRefreshSecret = process.env.REFRESH_SECRET || ""

export const nodemailerPass = process.env.NODEMAILER_PASS

export const nodemailerUser = process.env.NODEMAILER_USER

export const cloudinary_config = process.env.CLOUDINARY_URL || ""
