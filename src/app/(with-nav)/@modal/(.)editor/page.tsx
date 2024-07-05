import dynamic from "next/dynamic";

const ModalWrappedEditor = dynamic(() =>
  import("@/components/editor").then((mod) => mod.ModalWrappedEditor)
);

export default function ModalEditor() {
  return <ModalWrappedEditor />;
}
