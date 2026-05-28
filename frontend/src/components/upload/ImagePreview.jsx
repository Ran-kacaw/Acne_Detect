import React, { useEffect, useState } from 'react'
import { Trash2 } from 'lucide-react'

const ImagePreview = ({ file, onRemove }) => {
  const [previewUrl, setPreviewUrl] = useState(null)

  useEffect(() => {
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [file])

  if (!previewUrl) return null

  return (
    <div className="relative rounded-xl overflow-hidden shadow-sm">
      <img src={previewUrl} alt="Preview" className="w-full h-64 object-cover" />
      <button
        onClick={onRemove}
        className="absolute top-3 right-3 bg-white/90 text-red-500 p-2 rounded-full shadow hover:bg-white transition"
      >
        <Trash2 size={16} />
      </button>
    </div>
  )
}

export default ImagePreview

