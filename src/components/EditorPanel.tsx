import { useState, useRef, useEffect, useCallback } from 'react'
import CodeEditor from './CodeEditor'
import { useSandboxStore } from '@/store/useSandboxStore'
import { FileCode2, FileType2, Braces } from 'lucide-react'

const EDITORS = [
  { key: 'html' as const, label: 'HTML', icon: FileCode2, color: '#e44d26', setter: 'setHtml' as const },
  { key: 'css' as const, label: 'CSS', icon: FileType2, color: '#264de4', setter: 'setCss' as const },
  { key: 'javascript' as const, label: 'JS', icon: Braces, color: '#f7df1e', setter: 'setJavascript' as const },
]

const DRAG_HANDLE_WIDTH = 6
const DRAG_MIN_WIDTH = 120

export default function EditorPanel() {
  const html = useSandboxStore((s) => s.html)
  const css = useSandboxStore((s) => s.css)
  const javascript = useSandboxStore((s) => s.javascript)
  const setHtml = useSandboxStore((s) => s.setHtml)
  const setCss = useSandboxStore((s) => s.setCss)
  const setJavascript = useSandboxStore((s) => s.setJavascript)

  const containerRef = useRef<HTMLDivElement>(null)
  const [widths, setWidths] = useState<[number, number, number]>([33.33, 33.33, 33.34])
  const dragIndex = useRef<number | null>(null)
  const startX = useRef(0)
  const startWidths = useRef<[number, number, number]>([33.33, 33.33, 33.34])
  const containerWidth = useRef(0)

  const values = { html, css, javascript }
  const setters = { html: setHtml, css: setCss, javascript: setJavascript }

  const handleMouseDown = useCallback((index: number, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!containerRef.current) return
    dragIndex.current = index
    startX.current = e.clientX
    containerWidth.current = containerRef.current.getBoundingClientRect().width
    startWidths.current = [...widths] as [number, number, number]
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
  }, [widths])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (dragIndex.current === null || containerWidth.current === 0) return

    const delta = ((e.clientX - startX.current) / containerWidth.current) * 100
    const idx = dragIndex.current
    const newWidths = [...startWidths.current] as [number, number, number]

    const leftIdx = idx
    const rightIdx = idx + 1

    const newLeft = newWidths[leftIdx] + delta
    const newRight = newWidths[rightIdx] - delta

    const minPct = (DRAG_MIN_WIDTH / containerWidth.current) * 100

    if (newLeft >= minPct && newRight >= minPct) {
      newWidths[leftIdx] = newLeft
      newWidths[rightIdx] = newRight
      setWidths(newWidths)
    }
  }, [])

  const handleMouseUp = useCallback(() => {
    dragIndex.current = null
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
    <div
      ref={containerRef}
      className="flex h-full w-full bg-[#16172e] overflow-hidden relative"
    >
      {EDITORS.map((editor, idx) => {
        const Icon = editor.icon
        const isLast = idx === EDITORS.length - 1
        const editorWidth = isLast
          ? `calc(${widths[idx]}% - ${DRAG_HANDLE_WIDTH / 2}px)`
          : `calc(${widths[idx]}% - ${DRAG_HANDLE_WIDTH / 2}px)`

        return (
          <div
            key={editor.key}
            className="flex flex-col h-full shrink-0 relative"
            style={{ width: editorWidth }}
          >
            <div
              className="flex items-center gap-1.5 px-3 py-2 border-b border-[#2a2d4e] bg-[#12132a] shrink-0"
            >
              <Icon size={13} style={{ color: editor.color }} />
              <span
                className="text-xs font-medium"
                style={{ color: editor.color }}
              >
                {editor.label}
              </span>
            </div>
            <div className="flex-1 overflow-hidden relative">
              <CodeEditor
                value={values[editor.key]}
                onChange={setters[editor.key]}
                language={editor.key}
              />
            </div>

            {!isLast && (
              <div
                className="absolute top-0 right-0 bottom-0 z-20 cursor-col-resize group"
                style={{ width: DRAG_HANDLE_WIDTH, transform: 'translateX(50%)' }}
                onMouseDown={(e) => handleMouseDown(idx, e)}
              >
                <div
                  className="absolute top-0 left-1/2 h-full -translate-x-1/2 w-px bg-[#2a2d4e] group-hover:bg-[#636da0] transition-colors"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-0.5 h-3 rounded-full bg-[#636da0]" />
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
