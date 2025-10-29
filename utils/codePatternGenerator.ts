import type { ColorScheme, OutputFormat, ImageProcessingOptions } from "@/types"

export class CodePatternGenerator {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    const context = canvas.getContext("2d")
    if (!context) {
      throw new Error("Canvas context not available")
    }
    this.ctx = context
  }

  async generate(imageUrl: string, options: ImageProcessingOptions): Promise<string> {
    const img = await this.loadImage(imageUrl)
    const { width, height } = this.calculateDimensions(img)

    this.setupCanvas(width, height, options.colorScheme)
    const pixels = this.extractPixelData(img, width, height)

    this.drawCodePattern(pixels, width, height, options)
    this.addRandomElements(width, height, options)

    return this.canvasToUrl()
  }

  private async loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.onload = () => resolve(img)
      img.onerror = () => reject(new Error("Image failed to load"))
      img.src = src
    })
  }

  private calculateDimensions(img: HTMLImageElement): { width: number; height: number } {
    const maxWidth = 800
    const maxHeight = 600
    let { width, height } = img

    if (width > maxWidth || height > maxHeight) {
      const ratio = Math.min(maxWidth / width, maxHeight / height)
      width *= ratio
      height *= ratio
    }

    return { width, height }
  }

  private setupCanvas(width: number, height: number, colorScheme: ColorScheme): void {
    this.canvas.width = width
    this.canvas.height = height

    const bgColor = this.getBackgroundColor(colorScheme)
    this.ctx.fillStyle = bgColor
    this.ctx.fillRect(0, 0, width, height)
  }

  private getBackgroundColor(scheme: ColorScheme): string {
    switch (scheme) {
      case "hacker":
        return "#001100"
      case "matrix":
        return "#000000"
      default:
        return "#000000"
    }
  }

  private extractPixelData(img: HTMLImageElement, width: number, height: number): Uint8ClampedArray {
    this.ctx.drawImage(img, 0, 0, width, height)
    const imageData = this.ctx.getImageData(0, 0, width, height)

    // Clear canvas for pattern drawing
    const bgColor = this.getBackgroundColor("original")
    this.ctx.fillStyle = bgColor
    this.ctx.fillRect(0, 0, width, height)

    return imageData.data
  }

  private drawCodePattern(
    pixels: Uint8ClampedArray,
    width: number,
    height: number,
    options: ImageProcessingOptions,
  ): void {
    this.ctx.font = `${options.fontSize}px 'Courier New', monospace`
    this.ctx.textAlign = "center"
    this.ctx.textBaseline = "middle"

    const characters = this.getCharacterSet(options.outputFormat)
    const step = Math.max(1, Math.floor(options.density / 2))

    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        const pixelIndex = (y * width + x) * 4
        const r = pixels[pixelIndex]
        const g = pixels[pixelIndex + 1]
        const b = pixels[pixelIndex + 2]
        const alpha = pixels[pixelIndex + 3]

        if (alpha < 128) continue

        const char = this.selectCharacter(r, g, b, characters, options.outputFormat)
        const color = this.getColorForScheme(r, g, b, options.colorScheme)

        this.ctx.fillStyle = color
        this.ctx.fillText(char, x, y)
      }
    }
  }

  private getCharacterSet(format: OutputFormat): string[] {
    const characterSets = {
      binary: ["0", "1"],
      hash: ["#", ".", "*", "+", "-", "="],
      hex: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"],
      ascii: [" ", ".", ":", ";", "+", "*", "?", "%", "S", "#", "@"],
      blocks: ["█", "▓", "▒", "░", " "],
    }
    return characterSets[format]
  }

  private selectCharacter(r: number, g: number, b: number, characters: string[], format: OutputFormat): string {
    const brightness = (r + g + b) / 3
    const charIndex = Math.floor((brightness / 255) * (characters.length - 1))
    let char = characters[charIndex] || characters[0]

    // Add randomness for specific formats
    if (format === "hex" && Math.random() > 0.7) {
      const hexChars = ["A", "B", "C", "D", "E", "F", "0", "1", "2", "3"]
      char = hexChars[Math.floor(Math.random() * hexChars.length)]
    } else if (format === "binary" && Math.random() > 0.8) {
      char = Math.random() > 0.5 ? "1" : "0"
    }

    return char
  }

  private getColorForScheme(r: number, g: number, b: number, scheme: ColorScheme): string {
    switch (scheme) {
      case "blackwhite":
        const gray = Math.round(0.299 * r + 0.587 * g + 0.114 * b)
        return `rgb(${gray}, ${gray}, ${gray})`
      case "hacker":
        return `rgb(0, ${Math.round(g * 1.5)}, ${Math.round(g * 0.3)})`
      case "matrix":
        const intensity = Math.round(0.299 * r + 0.587 * g + 0.114 * b)
        return `rgb(0, ${Math.min(255, intensity + 50)}, 0)`
      default:
        return `rgb(${r}, ${g}, ${b})`
    }
  }

  private addRandomElements(width: number, height: number, options: ImageProcessingOptions): void {
    if (options.outputFormat === "hex") {
      this.ctx.fillStyle = options.colorScheme === "hacker" ? "#00ff41" : "#ff6b35"

      for (let i = 0; i < 20; i++) {
        const x = Math.random() * width
        const y = Math.random() * height
        const hexString = Math.floor(Math.random() * 0xffffff)
          .toString(16)
          .toUpperCase()
          .padStart(6, "0")
        this.ctx.fillText(`#${hexString}`, x, y)
      }
    }
  }

  private canvasToUrl(): Promise<string> {
    return new Promise((resolve) => {
      this.canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob)
          resolve(url)
        }
      }, "image/png")
    })
  }
}
