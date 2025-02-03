import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export const readFileDataUrl = (file: File | Blob): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onloadend = () => {
      const result = fileReader.result;
      if (typeof result === "string") {
        resolve(result);
      } else {
        reject(new Error("File reading failed"));
      }
    };

    fileReader.onerror = () => reject(new Error("Error reading file"));

    fileReader.readAsDataURL(file);
  });
};
