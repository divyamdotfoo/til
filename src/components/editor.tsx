"use client";
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
  InsertAdmonition,
  diffSourcePlugin,
  DiffSourceToggleWrapper,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { useRef } from "react";

const quickSand = Quicksand({ subsets: ["latin"] });

export function Editor() {
  const editorRef = useRef<MDXEditorMethods>(null);
  return (
    <>
      <MDXEditor
        className=""
        autoFocus
        ref={editorRef}
        markdown="# hello there"
        onChange={(e) => {
          console.log(e);
        }}
        contentEditableClassName={`prose dark:prose-invert prose-span md:min-h-96 bg-popover shadow-md rounded-br-md rounded-bl-md  ${quickSand.className}`}
        plugins={[
          headingsPlugin(),
          linkPlugin(),
          listsPlugin(),
          quotePlugin(),
          codeBlockPlugin({ defaultCodeBlockLanguage: "js" }),
          thematicBreakPlugin(),
          markdownShortcutPlugin(),
          toolbarPlugin({
            toolbarContents: () => (
              <>
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
                  <InsertAdmonition />
                </DiffSourceToggleWrapper>
              </>
            ),
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
            codeMirrorExtensions: [githubDark],
          }),

          diffSourcePlugin({ viewMode: "rich-text" }),
        ]}
      />
    </>
  );
}
