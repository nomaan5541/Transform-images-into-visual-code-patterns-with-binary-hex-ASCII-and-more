"use client"

import { Button } from "@/components/ui/button"
import { Zap, RefreshCw } from "lucide-react"

interface GenerationControlsProps {
  canGenerate: boolean
  isGenerating: boolean
  hasGenerated: boolean
  onGenerate: () => void
  onRegenerate: () => void
}

export function GenerationControls({
  canGenerate,
  isGenerating,
  hasGenerated,
  onGenerate,
  onRegenerate,
}: GenerationControlsProps) {
  return (
    <div className="flex gap-2">
      <Button
        onClick={onGenerate}
        disabled={!canGenerate || isGenerating}
        className="flex-1 bg-orange-600 hover:bg-orange-700 text-white"
      >
        {isGenerating ? (
          <>
            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Zap className="w-4 h-4 mr-2" />
            Generate
          </>
        )}
      </Button>

      {hasGenerated && (
        <Button onClick={onRegenerate} variant="outline" className="border-gray-600 hover:bg-gray-800 bg-transparent">
          <RefreshCw className="w-4 h-4" />
        </Button>
      )}
    </div>
  )
}
