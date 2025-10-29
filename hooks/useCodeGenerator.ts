"use client"

import { useState, useCallback, useRef } from "react"
import type { ImageProcessingOptions } from "@/types"
import { CodePatternGenerator } from "@/utils/codePatternGenerator"

export function useCodeGenerator() {
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const generateCodeImage = useCallback(
    async (
      uploadedImage: string,
      options: ImageProcessingOptions,
      onSuccess: (message: string) => void,
      onError: (message: string) => void,
    ) => {
      if (!uploadedImage || !canvasRef.current) return

      setIsGenerating(true)

      try {
        const generator = new CodePatternGenerator(canvasRef.current)
        const imageUrl = await generator.generate(uploadedImage, options)

        setGeneratedImageUrl(imageUrl)
        onSuccess(`Your image has been converted to ${options.outputFormat} code pattern.`)
      } catch (error) {
        console.error("Error generating code image:", error)
        onError("Failed to generate code image. Please try again.")
      } finally {
        setIsGenerating(false)
      }
    },
    [],
  )

  const downloadImage = useCallback((filename: string) => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const link = document.createElement("a")
    link.download = filename
    link.href = canvas.toDataURL()
    link.click()
  }, [])

  const clearGenerated = useCallback(() => {
    setGeneratedImageUrl(null)
  }, [])

  return {
    generatedImageUrl,
    isGenerating,
    canvasRef,
    generateCodeImage,
    downloadImage,
    clearGenerated,
  }
}
