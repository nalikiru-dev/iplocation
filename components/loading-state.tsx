import { Loader2, Cpu } from "lucide-react"

export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <Loader2 className="h-16 w-16 animate-spin text-green-500" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Cpu className="h-6 w-6 text-green-500" />
        </div>
      </div>
      <div className="mt-6 font-mono text-green-400 flex flex-col items-center">
        <p className="text-lg">INITIALIZING SYSTEM</p>
        <div className="mt-2 flex space-x-1">
          <span className="animate-pulse">.</span>
          <span className="animate-pulse delay-100">.</span>
          <span className="animate-pulse delay-200">.</span>
        </div>
      </div>
    </div>
  )
}
