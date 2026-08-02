"use client";

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import { Button } from '@/components/ui/button'
import { 
  Bold, Italic, List, ListOrdered, Link as LinkIcon, 
  Image as ImageIcon, Heading1, Heading2, Quote, Undo, Redo 
} from 'lucide-react'
import { useState, useCallback } from 'react';

export function TiptapEditor({ 
  content, 
  onChange 
}: { 
  content: string;
  onChange: (html: string) => void;
}) {
  const [isUrlModalOpen, setIsUrlModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [url, setUrl] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
      Image,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base dark:prose-invert focus:outline-none min-h-[300px] max-w-none p-4',
      },
    },
  });

  const setLink = useCallback(() => {
    if (url === null) return;
    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run();
    } else {
      editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
    setIsUrlModalOpen(false);
    setUrl("");
  }, [editor, url]);

  const addImage = useCallback(() => {
    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
    setIsImageModalOpen(false);
    setUrl("");
  }, [editor, url]);

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-border/40 rounded-xl overflow-hidden bg-background flex flex-col">
      <div className="bg-secondary/30 border-b border-border/40 p-2 flex flex-wrap gap-1 items-center sticky top-0 z-10">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`w-8 h-8 p-0 ${editor.isActive('bold') ? 'bg-secondary' : ''}`}
        >
          <Bold className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`w-8 h-8 p-0 ${editor.isActive('italic') ? 'bg-secondary' : ''}`}
        >
          <Italic className="w-4 h-4" />
        </Button>
        
        <div className="w-px h-6 bg-border/40 mx-1" />
        
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`w-8 h-8 p-0 font-bold ${editor.isActive('heading', { level: 2 }) ? 'bg-secondary' : ''}`}
        >
          H2
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`w-8 h-8 p-0 font-bold ${editor.isActive('heading', { level: 3 }) ? 'bg-secondary' : ''}`}
        >
          H3
        </Button>
        
        <div className="w-px h-6 bg-border/40 mx-1" />
        
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`w-8 h-8 p-0 ${editor.isActive('bulletList') ? 'bg-secondary' : ''}`}
        >
          <List className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`w-8 h-8 p-0 ${editor.isActive('orderedList') ? 'bg-secondary' : ''}`}
        >
          <ListOrdered className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`w-8 h-8 p-0 ${editor.isActive('blockquote') ? 'bg-secondary' : ''}`}
        >
          <Quote className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-border/40 mx-1" />
        
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => {
            const previousUrl = editor.getAttributes('link').href
            setUrl(previousUrl || "")
            setIsUrlModalOpen(true)
          }}
          className={`w-8 h-8 p-0 ${editor.isActive('link') ? 'bg-secondary' : ''}`}
        >
          <LinkIcon className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => {
            setUrl("")
            setIsImageModalOpen(true)
          }}
          className={`w-8 h-8 p-0`}
        >
          <ImageIcon className="w-4 h-4" />
        </Button>

        <div className="flex-1" />
        
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="w-8 h-8 p-0"
        >
          <Undo className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="w-8 h-8 p-0"
        >
          <Redo className="w-4 h-4" />
        </Button>
      </div>

      {isUrlModalOpen && (
        <div className="bg-card border-b border-border/40 p-2 flex gap-2 items-center">
          <input 
            type="url" 
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 bg-secondary/50 border border-border/40 rounded px-3 py-1.5 text-sm outline-none focus:border-primary"
            autoFocus
          />
          <Button size="sm" type="button" onClick={setLink}>Set Link</Button>
          <Button size="sm" variant="ghost" type="button" onClick={() => {
            editor.chain().focus().unsetLink().run()
            setIsUrlModalOpen(false)
          }}>Unlink</Button>
          <Button size="sm" variant="ghost" type="button" onClick={() => setIsUrlModalOpen(false)}>Cancel</Button>
        </div>
      )}

      {isImageModalOpen && (
        <div className="bg-card border-b border-border/40 p-2 flex gap-2 items-center">
          <input 
            type="url" 
            placeholder="Image URL (e.g. https://example.com/img.png)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 bg-secondary/50 border border-border/40 rounded px-3 py-1.5 text-sm outline-none focus:border-primary"
            autoFocus
          />
          <Button size="sm" type="button" onClick={addImage}>Insert Image</Button>
          <Button size="sm" variant="ghost" type="button" onClick={() => setIsImageModalOpen(false)}>Cancel</Button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto max-h-[600px]">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
