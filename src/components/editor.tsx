"use client";
import { Quicksand } from "next/font/google";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { langs } from "@uiw/codemirror-extensions-langs";
import "@mdxeditor/editor/style.css";
import "../app/editor.css";
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

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { useLocalStorage } from "@/lib/hooks";
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
    <div className=" py-4 max-w-3xl mx-auto">
      <MDXEditor
        placeholder="What did you learned today?"
        className={` bg-editor ${
          theme === "light"
            ? "_light_1tncs_1 _light-theme_1tncs_1 shadow-md rounded-md"
            : "_dark_1tncs_1 _dark-theme_1tncs_1 shadow-md rounded-md"
        }
        `}
        ref={editorRef}
        markdown={""}
        onChange={(md) => {
          updateLocalMd(md);
        }}
        contentEditableClassName={`prose dark:prose-invert prose-span md:h-96 overflow-auto scroll-container ${
          quickSand.className
        } ${
          theme === "light"
            ? "_light_1tncs_1 _light-theme_1tncs_1"
            : "_dark_1tncs_1 _dark-theme_1tncs_1"
        }
        `}
        plugins={plugins()}
      />
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
