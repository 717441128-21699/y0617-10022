import { useEffect, useRef, useCallback } from 'react'
import { useSandboxStore } from '@/store/useSandboxStore'
import { encodeToHash, decodeFromHash } from '@/utils/share'

const DEBOUNCE_MS = 500

export function useUrlHashSync() {
  const html = useSandboxStore((s) => s.html)
  const css = useSandboxStore((s) => s.css)
  const javascript = useSandboxStore((s) => s.javascript)
  const loadFromHash = useSandboxStore((s) => s.loadFromHash)
  const loadedFromHashRef = useRef(false)
  const debounceTimerRef = useRef<number | null>(null)

  const updateHash = useCallback(() => {
    const encoded = encodeToHash({ html, css, javascript })
    if (window.location.hash.slice(1) !== encoded) {
      history.replaceState(null, '', `#${encoded}`)
    }
  }, [html, css, javascript])

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash) {
      const data = decodeFromHash(hash)
      if (data) {
        loadFromHash(data)
        loadedFromHashRef.current = true
        return
      }
    }
    loadedFromHashRef.current = true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!loadedFromHashRef.current) return

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }
    debounceTimerRef.current = window.setTimeout(() => {
      updateHash()
    }, DEBOUNCE_MS)

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [html, css, javascript, updateHash])

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1)
      if (!hash) return
      const data = decodeFromHash(hash)
      if (data) {
        loadFromHash(data)
      }
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [loadFromHash])
}
