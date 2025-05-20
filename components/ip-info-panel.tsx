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

interface IPInfoPanelProps {
  ipData: IPData
}

export default function IPInfoPanel({ ipData }: IPInfoPanelProps) {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-mono font-semibold mb-4 flex items-center">
        <span className="text-green-400 mr-2">&gt;</span> NETWORK INTEL
      </h2>

      <div className="space-y-3 font-mono">
        <div className="grid grid-cols-3 gap-2 items-center">
          <span className="text-green-600 col-span-1">IP_ADDR:</span>
          <span className="font-medium text-green-300 col-span-2 bg-black/30 p-1 rounded">{ipData.ip}</span>
        </div>

        <div className="grid grid-cols-3 gap-2 items-center">
          <span className="text-green-600 col-span-1">LOCATION:</span>
          <span className="font-medium text-green-300 col-span-2 bg-black/30 p-1 rounded">
            {ipData.city}, {ipData.region}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 items-center">
          <span className="text-green-600 col-span-1">COUNTRY:</span>
          <span className="font-medium text-green-300 col-span-2 bg-black/30 p-1 rounded">{ipData.country_name}</span>
        </div>

        <div className="grid grid-cols-3 gap-2 items-center">
          <span className="text-green-600 col-span-1">POSTAL:</span>
          <span className="font-medium text-green-300 col-span-2 bg-black/30 p-1 rounded">
            {ipData.postal || "N/A"}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 items-center">
          <span className="text-green-600 col-span-1">TIMEZONE:</span>
          <span className="font-medium text-green-300 col-span-2 bg-black/30 p-1 rounded">{ipData.timezone}</span>
        </div>

        <div className="grid grid-cols-3 gap-2 items-center">
          <span className="text-green-600 col-span-1">ISP:</span>
          <span className="font-medium text-green-300 col-span-2 bg-black/30 p-1 rounded truncate" title={ipData.org}>
            {ipData.org}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 items-center">
          <span className="text-green-600 col-span-1">GEO_COORDS:</span>
          <span className="font-medium text-green-300 col-span-2 bg-black/30 p-1 rounded">
            {ipData.latitude.toFixed(6)}, {ipData.longitude.toFixed(6)}
          </span>
        </div>
      </div>
    </div>
  )
}
