"use client";

import { createContext, useContext } from "react";

/** Contador que sube cada vez que la escena debe animarse (al pasar el mouse por la tarjeta o al abrir el panel). */
export const Disparo = createContext(0);
export const useDisparo = () => useContext(Disparo);
