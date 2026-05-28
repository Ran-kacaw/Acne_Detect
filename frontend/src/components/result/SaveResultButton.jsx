import React, { useState } from 'react'
import { Bookmark, BookmarkCheck } from 'lucide-react'

const SaveResultButton = ({ onSave }) => {
  const [saved, setSaved] = useState(false)

  const handleClick = () => {
    if (saved) return
    onSave()
    setSaved(true)
  }

  return (
    <button
      onClick={handleClick}
      disabled={saved}
      className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
        saved
          ? 'bg-green-100 text-green-700'
          : 'bg-teal text-white hover:bg-teal-dark hover:shadow-lg hover:scale-105 active:scale-95'
      }`}
    >
      {saved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
      {saved ? 'Tersimpan' : 'Simpan ke Riwayat'}
    </button>
  )
}

export default SaveResultButton
