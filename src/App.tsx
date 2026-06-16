import { useEffect, useState, useRef, useCallback } from 'react'
import Toolbar from '@/components/Toolbar'
import EditorPanel from '@/components/EditorPanel'
import PreviewPanel from '@/components/PreviewPanel'
import ConsolePanel from '@/components/ConsolePanel'
import { useSandboxStore } from '@/store/useSandboxStore'
import { loadFromCurrentHash } from '@/utils/share'
import { GripHorizontal } from 'lucide-react'

export default function App() {
  const loadFromHash = useSandboxStore((s) => s.loadFromHash)
  const [verticalSplit, setVerticalSplit] = useState(55)
  const [consoleHeight, setConsoleHeight] = useState(200)
  const isDraggingV = useRef(false)
  const isDraggingC = useRef(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const data = loadFromCurrentHash()
    if (data) {
      loadFromHash(data)
    }
  }, [loadFromHash])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDraggingV.current && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const ratio = ((e.clientY - rect.top) / rect.height) * 100
      setVerticalSplit(Math.max(20, Math.min(80, ratio)))
    }
    if (isDraggingC.current && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const fromBottom = rect.bottom - e.clientY
      setConsoleHeight(Math.max(80, Math.min(rect.height * 0.6, fromBottom)))
    }
  }, [])

  const handleMouseUp = useCallback(() => {
    isDraggingV.current = false
    isDraggingC.current = false
    document.body.style.cursor = ''
    document.body.style.userSelect = ''
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [handleMouseMove, handleMouseUp])

  return (
    <div ref={containerRef} className="flex flex-col h-screen w-screen overflow-hidden bg-[#0d0e1f]">
      <Toolbar />

      <div className="flex-1 flex flex-col overflow-hidden" style={{ minHeight: 0 }}>
        <div
          className="overflow-hidden"
          style={{ flex: `${verticalSplit} 0 0`, minHeight: 0 }}
        >
          <EditorPanel />
        </div>

        <div
          className="flex items-center justify-center h-[6px] bg-[#0d0e1f] cursor-row-resize hover:bg-[#2a2d4e] transition-colors group relative z-10"
          onMouseDown={(e) => {
            e.preventDefault()
            isDraggingV.current = true
            document.body.style.cursor = 'row-resize'
            document.body.style.userSelect = 'none'
          }}
        >
          <GripHorizontal
            size={14}
            className="text-[#2a2d4e] group-hover:text-[#636da0] transition-colors"
          />
        </div>

        <div
          className="overflow-hidden flex flex-col"
          style={{ flex: `${100 - verticalSplit} 0 0`, minHeight: 0 }}
        >
          <div className="flex-1 overflow-hidden" style={{ minHeight: 0 }}>
            <PreviewPanel />
          </div>

          <div
            className="flex items-center justify-center h-[4px] bg-[#0d0e1f] cursor-row-resize hover:bg-[#2a2d4e] transition-colors shrink-0"
            onMouseDown={(e) => {
              e.preventDefault()
              isDraggingC.current = true
              document.body.style.cursor = 'row-resize'
              document.body.style.userSelect = 'none'
            }}
          >
            <div className="w-8 h-[2px] rounded bg-[#2a2d4e]" />
          </div>

          <div
            className="shrink-0 overflow-hidden"
            style={{ height: consoleHeight }}
          >
            <ConsolePanel />
          </div>
        </div>
      </div>
    </div>
  )
}
