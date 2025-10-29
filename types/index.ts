export type ColorScheme = "original" | "blackwhite" | "hacker" | "matrix"
export type OutputFormat = "binary" | "hash" | "hex" | "ascii" | "blocks"

export interface ImageProcessingOptions {
  colorScheme: ColorScheme
  outputFormat: OutputFormat
  fontSize: number
  density: number
}

export interface GeneratedImage {
  url: string
  format: OutputFormat
  colorScheme: ColorScheme
}
