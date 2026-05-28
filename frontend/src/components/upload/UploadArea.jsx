import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, ImageIcon, AlertCircle } from 'lucide-react'

const UploadArea = ({ onFileSelect }) => {
  const [error, setError] = useState(null)

  const onDrop = useCallback(
    (acceptedFiles, fileRejections) => {
      setError(null)

      if (fileRejections.length > 0) {
        const rejection = fileRejections[0]
        const errorCode = rejection.errors[0]?.code

        const message =
          errorCode === 'file-too-large'
            ? 'File terlalu besar. Maksimal 5MB.'
            : 'Format tidak didukung. Gunakan JPG, JPEG, atau PNG.'

        setError(message)
        return
      }

      if (acceptedFiles[0]) {
        onFileSelect(acceptedFiles[0])
      }
    },
    [onFileSelect]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    },
    maxSize: 5 * 1024 * 1024,
    multiple: false,
  })

  return (
    <div>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl p-10 cursor-pointer transition ${
          isDragActive
            ? 'border-teal bg-teal-xlight'
            : 'border-teal-light hover:border-teal bg-white'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 bg-teal-xlight rounded-full flex items-center justify-center">
            {isDragActive ? (
              <ImageIcon size={32} className="text-teal" />
            ) : (
              <Upload size={32} className="text-teal" />
            )}
          </div>
          <p className="text-sm text-text font-medium">
            {isDragActive ? 'Lepaskan foto di sini' : 'Klik atau seret foto ke sini'}
          </p>
          <p className="text-tiny text-text-muted">JPG, JPEG, PNG · Maks 5MB</p>
        </div>
      </div>

      {error && (
        <div className="mt-3 flex items-center gap-2 text-red-500 text-sm justify-center">
          <AlertCircle size={16} />
          {error}
        </div>
      )}
    </div>
  )
}

export default UploadArea