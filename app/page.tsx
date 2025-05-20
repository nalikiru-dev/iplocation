'use client';
import { Suspense } from "react"
import LoadingState from "@/components/loading-state"
import dynamic from "next/dynamic"

const IPLocationMap = dynamic(() => import("@/components/ip-location-map"), {
  ssr: false,
})

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-green-400">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-mono font-bold text-center mb-2 tracking-tight">
          <span className="text-green-500">&gt;</span> IP LOCATION <span className="text-green-500">&lt;</span>
        </h1>
        <p className="text-center text-green-300 font-mono mb-8 border-b border-green-500 pb-4 max-w-2xl mx-auto">
          [SYSTEM] Trace and locate any IP address on the global network
        </p>

        <Suspense fallback={<LoadingState />}>
          <IPLocationMap />
        </Suspense>

        <div className="text-xs text-green-600 text-center mt-8 font-mono">
          [WARNING] Use responsibly. Unauthorized tracking may violate privacy laws.
        </div>
        <div className="text-xs text-green-600 text-center mt-2 font-mono">
          [GITHUB] <a href="https://github.com/nalikiru-dev" target="_blank" rel="noopener noreferrer" className="underline hover:text-green-400">Github</a>
        </div>
      </div>
    </main>
  )
}
