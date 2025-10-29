"use client"

import { Button } from "@/components/ui/button"
import { Code2, Download } from "lucide-react"
import Image from "next/image"

interface OutputDisplayProps {
  generatedImageUrl: string | null
  onDownload: () => void
}

export function OutputDisplay({ generatedImageUrl, onDownload }: OutputDisplayProps) {
  if (!generatedImageUrl) {
    return (
      <div className="min-h-[400px] flex items-center justify-center border-2 border-dashed border-gray-600 rounded-lg">
        <div className="text-center space-y-2">
          <Code2 className="w-16 h-16 mx-auto text-gray-500" />
          <p className="text-gray-400">Upload an image and generate to see code pattern</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="flex gap-2 mb-4">
        <Button onClick={onDownload} className="bg-orange-600 hover:bg-orange-700 text-white">
          <Download className="w-4 h-4 mr-2" />
          Download PNG
        </Button>
      </div>
      <div className="border border-gray-700 rounded-lg p-4 bg-black">
        <Image
          src={generatedImageUrl || "/placeholder.svg"}
          alt="Generated Code Pattern"
          width={800}
          height={600}
          className="max-w-full h-auto mx-auto rounded"
        />
      </div>
    </>
  )
}
