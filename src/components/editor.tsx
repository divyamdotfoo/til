"use client";
import { PostTil } from "@/components/btns";
import { Quicksand } from "next/font/google";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { langs } from "@uiw/codemirror-extensions-langs";
import "@mdxeditor/editor/style.css";
import "../app/editor.css";
import { ErrorBoundary } from "react-error-boundary";
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
  diffSourcePlugin,
  DiffSourceToggleWrapper,
} from "@mdxeditor/editor";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { useLocalStorage } from "@/lib/hooks";
import { PostTilError } from "./btns/til";
import { Dialog, DialogContent } from "./ui/dialog";
import { useRouter } from "next/navigation";
const quickSand = Quicksand({ subsets: ["latin"] });

export function Editor() {
  const editorRef = useRef<MDXEditorMethods>(null);
  const { theme } = useTheme();
  const { localMd, updateLocalMd } = useLocalStorage("til-md", editorRef);

  useEffect(() => {
    if (editorRef.current) {
      setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.focus();
        }
      }, 200);
    }
  }, [theme]);

  return (
    <div className="md:w-[720px] mx-auto flex flex-col items-center gap-4">
      <MDXEditor
        placeholder="What did you learned today?"
        className={` bg-editor w-full ${
          theme === "light"
            ? "_light_1tncs_1 _light-theme_1tncs_1 shadow-lg rounded-md"
            : "_dark_1tncs_1 _dark-theme_1tncs_1 shadow-lg rounded-md"
        }
        `}
        ref={editorRef}
        markdown={""}
        onChange={(md) => {
          updateLocalMd(md);
        }}
        contentEditableClassName={`prose dark:prose-invert prose-span h-72 lg:h-80 overflow-auto scroll-container ${
          quickSand.className
        } ${
          theme === "light"
            ? "_light_1tncs_1 _light-theme_1tncs_1"
            : "_dark_1tncs_1 _dark-theme_1tncs_1"
        }
        `}
        plugins={plugins()}
      />
      <ErrorBoundary FallbackComponent={PostTilError}>
        <PostTil md={localMd} />
      </ErrorBoundary>
    </div>
  );
}

function ToolBarContents() {
  return (
    <DiffSourceToggleWrapper options={["rich-text", "source"]}>
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
    </DiffSourceToggleWrapper>
  );
}

const plugins = () => [
  headingsPlugin(),
  linkPlugin(),
  listsPlugin(),
  quotePlugin(),
  codeBlockPlugin({ defaultCodeBlockLanguage: "js" }),
  thematicBreakPlugin(),
  markdownShortcutPlugin(),
  diffSourcePlugin({
    viewMode: "rich-text",
    codeMirrorExtensions: [dracula, langs.markdown()],
  }),
  toolbarPlugin({
    toolbarContents: () => <ToolBarContents />,
  }),
  codeMirrorPlugin({
    codeBlockLanguages: supportedLangs(),
    codeMirrorExtensions: [dracula],
  }),
];

const supportedLangs = () => ({
  js: "JavaScript",
  ts: "TypeScript",
  jsx: "JSX",
  python: "Python",
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
});

export function ModalWrappedEditor() {
  const [open, setOpen] = useState(true);
  const router = useRouter();

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(!open);
        router.back();
      }}
    >
      <DialogContent className=" max-w-fit border-none outline-none shadow-none bg-transparent p-0 m-0 z-0">
        <Editor />
      </DialogContent>
    </Dialog>
  );
}
