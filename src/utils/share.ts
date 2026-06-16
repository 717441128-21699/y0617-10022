import LZString from 'lz-string'

export interface ShareData {
  html: string
  css: string
  javascript: string
}

export function encodeToHash(data: ShareData): string {
  const json = JSON.stringify(data)
  const compressed = LZString.compressToEncodedURIComponent(json)
  return compressed
}

export function decodeFromHash(hash: string): ShareData | null {
  try {
    const json = LZString.decompressFromEncodedURIComponent(hash)
    if (!json) return null
    const data = JSON.parse(json)
    if (typeof data.html === 'string' && typeof data.css === 'string' && typeof data.javascript === 'string') {
      return data as ShareData
    }
    return null
  } catch {
    return null
  }
}

export function getShareUrl(data: ShareData): string {
  const encoded = encodeToHash(data)
  const url = new URL(window.location.href)
  url.hash = encoded
  return url.toString()
}

export function loadFromCurrentHash(): ShareData | null {
  const hash = window.location.hash.slice(1)
  if (!hash) return null
  return decodeFromHash(hash)
}
