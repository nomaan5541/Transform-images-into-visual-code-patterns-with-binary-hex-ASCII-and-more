import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Palette } from "lucide-react"

const examples = [
  {
    name: "Binary",
    pattern: "01001010\n10110001\n01010101",
    color: "text-green-400",
  },
  {
    name: "Hash",
    pattern: "###*+=-.\n*+=-###.\n.=-*+###",
    color: "text-orange-400",
  },
  {
    name: "Hex",
    pattern: "A1B2C3D4\nE5F67890\n1A2B3C4D",
    color: "text-blue-400",
  },
  {
    name: "ASCII",
    pattern: " .:-=+*%#@\n@#%*+=-:. \n .:+*%#@",
    color: "text-white",
  },
  {
    name: "Blocks",
    pattern: "█▓▒░ ░▒▓█\n▓▒░ █ ░▒▓\n▒░ ▓█▓ ░▒",
    color: "text-gray-300",
  },
]

export function PatternExamples() {
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-orange-400">
          <Palette className="w-5 h-5" />
          Pattern Examples
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {examples.map((example) => (
            <div key={example.name} className="space-y-2">
              <h3 className="font-medium text-white">{example.name}</h3>
              <div className={`bg-black p-3 rounded font-mono text-xs ${example.color}`}>{example.pattern}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
