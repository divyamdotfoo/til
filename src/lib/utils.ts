import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getMdLength = (md: string) => {
  const codeBlockRegex = /(```[\s\S]*?```|`[^`]*`)/g;
  const markdownSyntaxRegex =
    /[#*_>\-\[\]\(\)!`]+|^(\s{0,3}>\s?|[-*+]\s|(\d+\.)\s)|(\n\s*\n)/gm;
  const emptyLinesRegex = /^\s*[\r\n]/gm;
  const htmlEntities = /&[#A-Za-z0-9]+;/g;

  // Remove code blocks, Markdown syntax, empty lines, and HTML entities
  return md
    .replace(codeBlockRegex, "")
    .replace(markdownSyntaxRegex, "")
    .replace(emptyLinesRegex, "")
    .replace(htmlEntities, "").length;
};

export const doesContainHeading = (md: string) => {
  const headingRegex = /^(#{1,6})\s+(\S.+)/;
  const result = md.trim().match(headingRegex);
  if (!result) return false;
  return result[2];
};

export const removeHeading = (md: string) => {
  const headingRegex = /^(#{1,6})\s+(.+)/;
  const result = md.trim().match(headingRegex);
  if (!result) return { heading: null, updatedMd: md };

  const heading = result[0];
  const updatedMd = md.replace(heading, "").trim();

  return updatedMd;
};

export const getTimeSincePosted = (dt: string) => {
  const datePosted = new Date(dt).getTime();
  const currentTime = Date.now();
  const diff = currentTime - datePosted;
  if (diff < 0 || typeof diff !== "number") return "";

  const days = Math.floor(diff / (24 * 60 * 60 * 1000));
  const hours = Math.floor(diff / (60 * 60 * 1000)) % 24;
  const minutes = Math.floor(diff / (60 * 1000)) % 60;

  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hr${hours > 1 ? "s" : ""} ago`;
  } else {
    return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
  }
};
