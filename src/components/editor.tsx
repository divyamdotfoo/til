"use client";
const MarkdownEditor = dynamic(
  () => import("@uiw/react-markdown-editor").then((mod) => mod.default),
  { ssr: false }
);

import { Quicksand } from "next/font/google";
import { githubDark, githubLight } from "@uiw/codemirror-theme-github";
import {
  MDXEditor,
  headingsPlugin,
  linkPlugin,
  listsPlugin,
  quotePlugin,
  toolbarPlugin,
  codeBlockPlugin,
  MDXEditorMethods,
  thematicBreakPlugin,
  codeMirrorPlugin,
  markdownShortcutPlugin,
  BoldItalicUnderlineToggles,
  CreateLink,
  StrikeThroughSupSubToggles,
  InsertImage,
  Separator,
  ListsToggle,
  BlockTypeSelect,
  InsertCodeBlock,
  ButtonWithTooltip,
} from "@mdxeditor/editor";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import "@mdxeditor/editor/style.css";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { MdSvg, RichTextSvg } from "./ui/svgs";
const quickSand = Quicksand({ subsets: ["latin"] });

export function Editor() {
  const editorRef = useRef<MDXEditorMethods>(null);
  const { theme } = useTheme();
  const [tab, setTab] = useState<"rich-text" | "source-mode">("rich-text");

  const router = useRouter();
  useEffect(() => {
    if (editorRef.current) {
      const md = editorRef.current.getMarkdown();
      editorRef.current.setMarkdown("");
      // to change the theme of rendered code blocks
      setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.setMarkdown(md);
          editorRef.current.focus();
        }
      }, 200);
    }
  }, [theme]);

  return (
    <>
      <MDXEditor
        className={`${
          theme === "light"
            ? "_light_1tncs_1 _light-theme_1tncs_1"
            : "_dark_1tncs_1 _dark-theme_1tncs_1"
        }
        `}
        ref={editorRef}
        markdown="# React launched its compiler"
        onChange={(e) => {
          console.log(e);
        }}
        contentEditableClassName={`prose dark:prose-invert prose-span md:min-h-96 bg-popover shadow-md rounded-br-md rounded-bl-md  ${
          quickSand.className
        } ${
          theme === "light"
            ? "_light_1tncs_1 _light-theme_1tncs_1"
            : "_dark_1tncs_1 _dark-theme_1tncs_1"
        }
           ${tab === "source-mode" ? "hidden" : ""}
        `}
        plugins={[
          headingsPlugin(),
          linkPlugin(),
          listsPlugin(),
          quotePlugin(),
          codeBlockPlugin({ defaultCodeBlockLanguage: "js" }),
          thematicBreakPlugin(),
          markdownShortcutPlugin(),
          toolbarPlugin({
            toolbarContents: () => <ToolBarContents setTab={setTab} />,
          }),
          codeMirrorPlugin({
            codeBlockLanguages: {
              js: "JavaScript",
              ts: "TypeScript",
              py: "Python",
              java: "Java",
              c: "C",
              cpp: "C++",
              csharp: "C#",
              go: "Go",
              ruby: "Ruby",
              php: "PHP",
              swift: "Swift",
              kotlin: "Kotlin",
              rust: "Rust",
              scala: "Scala",
              sql: "SQL",
              html: "HTML",
              css: "CSS",
              markdown: "Markdown",
              json: "JSON",
              xml: "XML",
              yaml: "YAML",
              bash: "Bash",
              shell: "Shell",
              dockerfile: "Dockerfile",
              graphql: "GraphQL",
            },
            codeMirrorExtensions:
              theme === "light" ? [githubLight] : [githubDark],
          }),
        ]}
      />
    </>
  );
}

function ToolBarContents({
  setTab,
}: {
  setTab: Dispatch<SetStateAction<"rich-text" | "source-mode">>;
}) {
  return (
    <div className=" w-full flex items-center justify-between">
      <div className=" flex items-center">
        <BoldItalicUnderlineToggles />
        <Separator />
        <StrikeThroughSupSubToggles />
        <Separator />
        <ListsToggle />
        <Separator />
        <BlockTypeSelect />
        <Separator />
        <CreateLink />
        <InsertImage />
        <Separator />
        <InsertCodeBlock />
      </div>
      <div className=" flex items-center ">
        <ButtonWithTooltip
          title="Rich text"
          onClick={() =>
            setTab((p) => (p === "rich-text" ? "source-mode" : "rich-text"))
          }
        >
          <RichTextSvg />
        </ButtonWithTooltip>
        <ButtonWithTooltip
          title="Source Mode"
          onClick={() =>
            setTab((p) => (p === "rich-text" ? "source-mode" : "rich-text"))
          }
        >
          <MdSvg />
        </ButtonWithTooltip>
      </div>
    </div>
  );
}
