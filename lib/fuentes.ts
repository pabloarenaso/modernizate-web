import { Archivo, Inter } from "next/font/google";

export const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo", display: "swap" });
export const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const clasesFuentes = `${archivo.variable} ${inter.variable}`;
