import { MDXEditorMethods } from "@mdxeditor/editor";
import { RefObject, useCallback, useEffect, useState } from "react";

export const useLocalStorage = (
  key: string,
  updateRef: RefObject<MDXEditorMethods>
) => {
  const [localMd, setLocalMd] = useState("");

  useEffect(() => {
    if (typeof window !== undefined) {
      const ls = localStorage.getItem(key);
      if (ls) {
        setLocalMd(ls);
        if (updateRef.current) {
          console.log("updating client");
          updateRef.current.setMarkdown(ls);
        }
      }
    }
  }, [key]);

  const updateLocalMd = useCallback(
    (md: string) => {
      if (typeof window !== "undefined") {
        setLocalMd(md);
        localStorage.setItem(key, md);
      }
    },
    [key]
  );

  return { localMd, updateLocalMd };
};
