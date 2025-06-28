import clsx from "clsx";
import { twMerge } from "tailwind-merge";
export const cn = (...classLists) => twMerge(clsx(classLists));
