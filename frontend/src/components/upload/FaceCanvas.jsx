import React, { useRef, useEffect } from 'react'

const FaceCanvas = ({ imageUrl, detections = [], width = 400, height = 400 }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = imageUrl
    img.onload = () => {
      ctx.drawImage(img, 0, 0, width, height)
      detections.forEach((det) => {
        ctx.strokeStyle = '#EF4444'
        ctx.lineWidth = 2
        ctx.strokeRect(det.x, det.y, det.w, det.h)
      })
    }
  }, [imageUrl, detections, width, height])

  return <canvas ref={canvasRef} width={width} height={height} className="rounded-xl w-full" />
}

export default FaceCanvas

