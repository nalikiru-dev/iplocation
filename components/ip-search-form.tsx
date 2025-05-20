"use client"

import type React from "react"

import { useState } from "react"
import { Search, Loader2 } from "lucide-react"

interface IPSearchFormProps {
  onSearch: (ip: string) => void
  isLoading: boolean
}

export default function IPSearchForm({ onSearch, isLoading }: IPSearchFormProps) {
  const [ipAddress, setIpAddress] = useState("")
  const [error, setError] = useState("")

  const validateIP = (ip: string) => {
    // Basic IPv4 validation regex
    const ipv4Regex =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    return ipv4Regex.test(ip)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // If empty, use current IP
    if (!ipAddress.trim()) {
      onSearch("")
      return
    }

    // Validate IP format
    if (!validateIP(ipAddress)) {
      setError("Invalid IPv4 format. Use format: xxx.xxx.xxx.xxx")
      return
    }

    setError("")
    onSearch(ipAddress)
  }

  return (
    <div className="mb-6">
      <h2 className="text-xl font-mono font-semibold mb-3 flex items-center">
        <span className="text-green-400 mr-2">&gt;</span> TARGET IP
      </h2>

      <form onSubmit={handleSubmit} className="relative">
        <div className="flex">
          <input
            type="text"
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
            placeholder="Enter IP address (e.g. 8.8.8.8) or leave empty for your IP"
            className="w-full bg-gray-800 border border-green-600 text-green-100 px-4 py-2 rounded-l-md font-mono focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-gray-500"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-green-600 hover:bg-green-700 text-black font-bold px-4 rounded-r-md flex items-center justify-center disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
          </button>
        </div>

        {error && <p className="mt-2 text-red-400 text-sm font-mono">[ERROR] {error}</p>}

        <div className="mt-2 text-xs text-green-600 font-mono">
          [INFO] Enter target IP or leave blank to trace your own connection
        </div>
      </form>
    </div>
  )
}
