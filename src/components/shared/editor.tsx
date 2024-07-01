/* eslint-disable @typescript-eslint/no-explicit-any */
import "@blocknote/core/fonts/inter.css"
import { useCreateBlockNote } from "@blocknote/react"
import { BlockNoteView } from "@blocknote/mantine"
import "@blocknote/mantine/style.css"
import { UseFormReturn } from "react-hook-form"
import { PartialBlock } from "@blocknote/core"
import { useUploadMutation } from "@/redux/features/upload/upload-api"
import { toast } from "sonner"

interface EditorProps {
  name: string
  form: UseFormReturn<any>
}

const Editor: React.FC<EditorProps> = ({ name, form }) => {
  const [upload] = useUploadMutation()
  const initialContent = form.watch(name)

  // Creates a new editor instance.
  const editor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    uploadFile: async file => {
      if (!file) return null

      try {
        const formData = new FormData()
        formData.append("file", file)

        const res = await upload(formData)

        return res?.data?.data?.secure_url
      } catch (error: any) {
        toast.error(error?.data?.message || "Unbale to upload image")
      }
    },
  })

  // Renders the editor instance using a React component.
  return (
    <BlockNoteView
      editor={editor}
      theme={"light"}
      className="min-h-full"
      onChange={() => {
        form.setValue(name, JSON.stringify(editor.document))
      }}
    />
  )
}
export default Editor
