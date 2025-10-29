"use client"

import type React from "react"

import { Badge } from "@/components/ui/badge"
import { ImageIcon } from "lucide-react"
import Image from "next/image"

interface ImageUploadZoneProps {
  uploadedImage: string | null
  isDragging: boolean
  onDragOver: (evt: React.DragEvent) => void
  onDragLeave: (evt: React.DragEvent) => void
  onDrop: (evt: React.DragEvent) => void
  onFileSelect: (evt: React.ChangeEvent<HTMLInputElement>) => void
}

export function ImageUploadZone({
  uploadedImage,
  isDragging,
  onDragOver,
  onDragLeave,
  onDrop,
  onFileSelect,
}: ImageUploadZoneProps) {
  return (
    <div
      className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
        isDragging ? "border-orange-500 bg-orange-500/10" : "border-gray-600 hover:border-orange-500/50"
      }`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      {uploadedImage ? (
        <div className="space-y-4">
          <Image
            src={uploadedImage || "/placeholder.svg"}
            alt="Uploaded"
            width={200}
            height={150}
            className="mx-auto rounded-lg max-w-full h-auto"
          />
          <Badge variant="secondary" className="bg-orange-500/20 text-orange-300">
            Image Loaded
          </Badge>
        </div>
      ) : (
        <div className="space-y-4">
          <ImageIcon className="w-12 h-12 mx-auto text-gray-500" />
          <div>
            <p className="font-medium">Drop image here</p>
            <p className="text-sm text-gray-400">or click to browse</p>
          </div>
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={onFileSelect}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
    </div>
  )
}
