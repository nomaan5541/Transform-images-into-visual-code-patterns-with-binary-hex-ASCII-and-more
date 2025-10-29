"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import type { ColorScheme, OutputFormat } from "@/types"

interface PatternControlsProps {
  colorScheme: ColorScheme
  outputFormat: OutputFormat
  fontSize: number[]
  density: number[]
  onColorSchemeChange: (value: ColorScheme) => void
  onOutputFormatChange: (value: OutputFormat) => void
  onFontSizeChange: (value: number[]) => void
  onDensityChange: (value: number[]) => void
}

export function PatternControls({
  colorScheme,
  outputFormat,
  fontSize,
  density,
  onColorSchemeChange,
  onOutputFormatChange,
  onFontSizeChange,
  onDensityChange,
}: PatternControlsProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-orange-400">Pattern Type</label>
        <Select value={outputFormat} onValueChange={onOutputFormatChange}>
          <SelectTrigger className="bg-gray-800 border-gray-700">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            <SelectItem value="binary">🔢 Binary (0,1)</SelectItem>
            <SelectItem value="hash">⚡ Hash (#,*,+)</SelectItem>
            <SelectItem value="hex">🎯 Hex (0-F)</SelectItem>
            <SelectItem value="ascii">📝 ASCII Art</SelectItem>
            <SelectItem value="blocks">⬛ Block Chars</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-orange-400">Color Scheme</label>
        <Select value={colorScheme} onValueChange={onColorSchemeChange}>
          <SelectTrigger className="bg-gray-800 border-gray-700">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            <SelectItem value="original">🎨 Original</SelectItem>
            <SelectItem value="blackwhite">⚫ Monochrome</SelectItem>
            <SelectItem value="hacker">💚 Hacker Green</SelectItem>
            <SelectItem value="matrix">🟢 Matrix Style</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-orange-400">Font Size: {fontSize[0]}px</label>
        <Slider value={fontSize} onValueChange={onFontSizeChange} max={16} min={4} step={1} className="w-full" />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-orange-400">Density: {density[0]}</label>
        <Slider value={density} onValueChange={onDensityChange} max={20} min={5} step={1} className="w-full" />
      </div>
    </div>
  )
}
