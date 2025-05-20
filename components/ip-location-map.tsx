"use client"

import { useState, useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { Icon } from "leaflet"
import DeviceInfo from "./device-info"
import IPInfoPanel from "./ip-info-panel"
import IPSearchForm from "./ip-search-form"

// Fix for default marker icon in Leaflet with Next.js
const customIcon = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

interface IPData {
  ip: string
  city: string
  region: string
  country_name: string
  postal: string
  latitude: number
  longitude: number
  timezone: string
  org: string
}

// Component to update map view when coordinates change
function ChangeMapView({ coords }: { coords: [number, number] }) {
  const map = useMap()
  map.setView(coords, 13)
  return null
}

export default function IPLocationMap() {
  const [ipData, setIpData] = useState<IPData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchIP, setSearchIP] = useState<string>("")

  const fetchIPData = async (ip = "") => {
    try {
      setLoading(true)
      setError(null)

      // Use the provided IP or get current user's IP
      const url = ip ? `https://ipapi.co/${ip}/json/` : "https://ipapi.co/json/"
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error("Failed to fetch IP data")
      }

      const data = await response.json()

      // Check if the API returned an error
      if (data.error) {
        throw new Error(data.reason || "Invalid IP address")
      }

      setIpData(data)
    } catch (err: any) {
      setError(err.message || "Failed to fetch location data. Please try again later.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchIPData()
  }, [])

  const handleIPSearch = (ip: string) => {
    setSearchIP(ip)
    fetchIPData(ip)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 bg-gray-900 rounded-lg border border-green-500 shadow-lg shadow-green-500/20 p-6">
        <IPSearchForm onSearch={handleIPSearch} isLoading={loading} />

        {error && (
          <div className="mt-4 p-3 bg-red-900/50 border border-red-500 text-red-300 rounded font-mono text-sm">
            [ERROR] {error}
          </div>
        )}

        {ipData && (
          <>
            <IPInfoPanel ipData={ipData} />
            <div className="mt-8 pt-6 border-t border-green-800">
              <DeviceInfo />
            </div>
          </>
        )}
      </div>

      <div className="lg:col-span-2 bg-gray-900 rounded-lg border border-green-500 shadow-lg shadow-green-500/20 p-4 h-[500px]">
        {ipData ? (
          <MapContainer
            center={[ipData.latitude, ipData.longitude]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
            className="rounded-lg z-0"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright"></a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[ipData.latitude, ipData.longitude]} icon={customIcon}>
              <Popup>
                <div className="font-mono text-sm">
                  <span className="font-bold">{ipData.ip}</span>
                  <br />
                  {ipData.city}, {ipData.region}, {ipData.country_name}
                </div>
              </Popup>
            </Marker>
            <ChangeMapView coords={[ipData.latitude, ipData.longitude]} />
          </MapContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-green-500 font-mono">
            {loading ? "SCANNING NETWORK..." : "NO LOCATION DATA AVAILABLE"}
          </div>
        )}
      </div>
    </div>
  )
}
