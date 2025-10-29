"use client"

import type React from "react"

import { useState, useCallback } from "react"

export function useImageUpload() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = useCallback((evt: React.DragEvent) => {
    evt.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((evt: React.DragEvent) => {
    evt.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((evt: React.DragEvent) => {
    evt.preventDefault()
    setIsDragging(false)

    const files = Array.from(evt.dataTransfer.files)
    const imageFile = files.find((file) => file.type.startsWith("image/"))

    if (imageFile) {
      const reader = new FileReader()
      reader.onload = (evt) => {
        const result = (evt.target as FileReader | null)?.result as string | null
        if (result) setUploadedImage(result)
      }
      reader.readAsDataURL(imageFile)
    }
  }, [])

  const handleFileSelect = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    const file = evt.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (evt) => {
        const result = (evt.target as FileReader | null)?.result as string | null
        if (result) setUploadedImage(result)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const clearImage = useCallback(() => {
    setUploadedImage(null)
  }, [])

  return {
    uploadedImage,
    isDragging,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileSelect,
    clearImage,
  }
}
