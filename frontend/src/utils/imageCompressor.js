import imageCompression from 'browser-image-compression'

export const compressImage = async (file) => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1024,
    useWebWorker: true,
  }
  try {
    const compressedFile = await imageCompression(file, options)
    return compressedFile
  } catch (error) {
    throw new Error('Gagal mengompres gambar')
  }
}

