"use client"

import { useState, useEffect } from "react"
import { Smartphone, Tablet, Monitor } from "lucide-react"

interface DeviceData {
  type: string
  os: string
  browser: string
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
}

export default function DeviceInfo() {
  const [deviceData, setDeviceData] = useState<DeviceData | null>(null)

  useEffect(() => {
    // Detect device type and OS
    const detectDevice = () => {
      const userAgent = navigator.userAgent

      // Check device type
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
      const isTablet = /iPad|Android(?!.*Mobile)/i.test(userAgent)
      const isDesktop = !isMobile || isTablet

      // Detect OS
      let os = "Unknown"
      if (/Windows/i.test(userAgent)) os = "Windows"
      else if (/Macintosh|Mac OS X/i.test(userAgent)) os = "macOS"
      else if (/Linux/i.test(userAgent)) os = "Linux"
      else if (/Android/i.test(userAgent)) os = "Android"
      else if (/iPhone|iPad|iPod/i.test(userAgent)) os = "iOS"

      // Detect browser
      let browser = "Unknown"
      if (/Chrome/i.test(userAgent) && !/Chromium|Edge|Edg|OPR|Opera/i.test(userAgent)) browser = "Chrome"
      else if (/Firefox/i.test(userAgent)) browser = "Firefox"
      else if (/Safari/i.test(userAgent) && !/Chrome|Chromium|Edge|Edg|OPR|Opera/i.test(userAgent)) browser = "Safari"
      else if (/Edge|Edg/i.test(userAgent)) browser = "Edge"
      else if (/Opera|OPR/i.test(userAgent)) browser = "Opera"

      // Determine device type name
      let type = "Unknown"
      if (isTablet) type = "Tablet"
      else if (isMobile) type = "Mobile"
      else if (isDesktop) type = "Desktop"

      setDeviceData({
        type,
        os,
        browser,
        isMobile,
        isTablet,
        isDesktop,
      })
    }

    detectDevice()
  }, [])

  if (!deviceData) {
    return <div className="text-green-500 font-mono">SCANNING DEVICE...</div>
  }

  return (
    <div>
      <h2 className="text-xl font-mono font-semibold mb-4 flex items-center">
        <span className="text-green-400 mr-2">&gt;</span> DEVICE FINGERPRINT
      </h2>

      <div className="flex items-center mb-4">
        {deviceData.isDesktop && <Monitor className="mr-2 h-6 w-6 text-green-500" />}
        {deviceData.isMobile && !deviceData.isTablet && <Smartphone className="mr-2 h-6 w-6 text-green-500" />}
        {deviceData.isTablet && <Tablet className="mr-2 h-6 w-6 text-green-500" />}
        <span className="text-lg font-mono font-medium text-green-300">{deviceData.type.toUpperCase()} SYSTEM</span>
      </div>

      <div className="space-y-3 font-mono">
        <div className="grid grid-cols-3 gap-2 items-center">
          <span className="text-green-600 col-span-1">OS:</span>
          <span className="font-medium text-green-300 col-span-2 bg-black/30 p-1 rounded">{deviceData.os}</span>
        </div>

        <div className="grid grid-cols-3 gap-2 items-center">
          <span className="text-green-600 col-span-1">BROWSER:</span>
          <span className="font-medium text-green-300 col-span-2 bg-black/30 p-1 rounded">{deviceData.browser}</span>
        </div>

        <div className="grid grid-cols-3 gap-2 items-center">
          <span className="text-green-600 col-span-1">SCREEN:</span>
          <span className="font-medium text-green-300 col-span-2 bg-black/30 p-1 rounded">
            {window.screen.width} x {window.screen.height}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 items-center">
          <span className="text-green-600 col-span-1">VIEWPORT:</span>
          <span className="font-medium text-green-300 col-span-2 bg-black/30 p-1 rounded">
            {window.innerWidth} x {window.innerHeight}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 items-center">
          <span className="text-green-600 col-span-1">USER_AGENT:</span>
          <span
            className="font-medium text-green-300 col-span-2 bg-black/30 p-1 rounded text-xs truncate"
            title={navigator.userAgent}
          >
            {navigator.userAgent.substring(0, 30)}...
          </span>
        </div>
      </div>
    </div>
  )
}
