"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Code2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useImageUpload } from "@/hooks/useImageUpload"
import { useCodeGenerator } from "@/hooks/useCodeGenerator"
import { ImageUploadZone } from "@/components/ImageUploadZone"
import { PatternControls } from "@/components/PatternControls"
import { GenerationControls } from "@/components/GenerationControls"
import { OutputDisplay } from "@/components/OutputDisplay"
import { PatternExamples } from "@/components/PatternExamples"
import type { ColorScheme, OutputFormat } from "@/types"

export default function ImageCodeConverter() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("original")
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("binary")
  const [fontSize, setFontSize] = useState([8])
  const [density, setDensity] = useState([10])

  const { toast } = useToast()
  const imageUpload = useImageUpload()
  const codeGenerator = useCodeGenerator()

  const handleGenerate = () => {
    if (!imageUpload.uploadedImage) return

    const options = {
      colorScheme,
      outputFormat,
      fontSize: fontSize[0],
      density: density[0],
    }

    codeGenerator.generateCodeImage(
      imageUpload.uploadedImage,
      options,
      (message) => toast({ title: "Code Image Generated!", description: message }),
      (message) => toast({ title: "Error", description: message, variant: "destructive" }),
    )
  }

  const handleDownload = () => {
    const filename = `code-pattern-${outputFormat}-${colorScheme}.png`
    codeGenerator.downloadImage(filename)
  }

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">
            Image to Code Pattern Generator
          </h1>
          <p className="text-gray-400">Transform images into visual code patterns with binary, hex, ASCII and more</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Upload Section */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-400">
                <Upload className="w-5 h-5" />
                Image Upload
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ImageUploadZone
                uploadedImage={imageUpload.uploadedImage}
                isDragging={imageUpload.isDragging}
                onDragOver={imageUpload.handleDragOver}
                onDragLeave={imageUpload.handleDragLeave}
                onDrop={imageUpload.handleDrop}
                onFileSelect={imageUpload.handleFileSelect}
              />

              <PatternControls
                colorScheme={colorScheme}
                outputFormat={outputFormat}
                fontSize={fontSize}
                density={density}
                onColorSchemeChange={setColorScheme}
                onOutputFormatChange={setOutputFormat}
                onFontSizeChange={setFontSize}
                onDensityChange={setDensity}
              />

              <GenerationControls
                canGenerate={!!imageUpload.uploadedImage}
                isGenerating={codeGenerator.isGenerating}
                hasGenerated={!!codeGenerator.generatedImageUrl}
                onGenerate={handleGenerate}
                onRegenerate={handleGenerate}
              />
            </CardContent>
          </Card>

          {/* Generated Image Output */}
          <Card className="lg:col-span-2 bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-400">
                <Code2 className="w-5 h-5" />
                Generated Code Pattern
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <OutputDisplay generatedImageUrl={codeGenerator.generatedImageUrl} onDownload={handleDownload} />
            </CardContent>
          </Card>
        </div>

        <PatternExamples />

        {/* Hidden Canvas */}
        <canvas ref={codeGenerator.canvasRef} className="hidden" width={800} height={600} />
      </div>
    </div>
  )
}
