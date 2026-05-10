import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid"),
  password: z.string().min(1, "Kata sandi wajib diisi"),
});

export const registerSchema = z
  .object({
    namaDepan: z.string().min(1, "Nama depan wajib diisi"),
    namaBelakang: z.string().optional(),
    email: z
      .string()
      .min(1, "Email wajib diisi")
      .email("Format email tidak valid"),
    password: z.string().min(8, "Kata sandi minimal 8 karakter"),
    konfirmasi: z.string().min(1, "Konfirmasi kata sandi wajib diisi"),
  })
  .refine((data) => data.password === data.konfirmasi, {
    message: "Kata sandi dan konfirmasi tidak cocok",
    path: ["konfirmasi"],
  });
