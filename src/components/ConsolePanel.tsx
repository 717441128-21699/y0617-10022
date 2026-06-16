import { useRef, useEffect } from 'react'
import { useSandboxStore } from '@/store/useSandboxStore'
import ObjectTree from './ObjectTree'
import { Trash2, Terminal, AlertTriangle, Info, XCircle } from 'lucide-react'

const LEVEL_CONFIG: Record<string, { icon: typeof Terminal; iconColor: string; borderColor: string; bgColor: string }> = {
  log: { icon: Terminal, iconColor: 'text-[#c8cad8]', borderColor: 'border-transparent', bgColor: 'bg-transparent hover:bg-[#1a1d30]' },
  info: { icon: Info, iconColor: 'text-[#61afef]', borderColor: 'border-[#61afef]/20', bgColor: 'bg-[#1a1d35] hover:bg-[#1e2240]' },
  warn: { icon: AlertTriangle, iconColor: 'text-[#e5c07b]', borderColor: 'border-[#e5c07b]/20', bgColor: 'bg-[#1e1c25] hover:bg-[#282530]' },
  error: { icon: XCircle, iconColor: 'text-[#e06c75]', borderColor: 'border-[#e06c75]/20', bgColor: 'bg-[#1e1a22] hover:bg-[#282028]' },
}

export default function ConsolePanel() {
  const entries = useSandboxStore((s) => s.consoleEntries)
  const consoleOpen = useSandboxStore((s) => s.consoleOpen)
  const toggleConsole = useSandboxStore((s) => s.toggleConsole)
  const clearConsole = useSandboxStore((s) => s.clearConsole)
  const scrollRef = useRef<HTMLDivElement>(null)

  const errorCount = entries.filter((e) => e.level === 'error').length
  const warnCount = entries.filter((e) => e.level === 'warn').length

  useEffect(() => {
    if (scrollRef.current && consoleOpen) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [entries, consoleOpen])

  return (
    <div className="flex flex-col h-full bg-[#16172e]">
      <div
        className="flex items-center justify-between px-3 py-1.5 bg-[#12132a] border-b border-[#2a2d4e] cursor-pointer select-none shrink-0"
        onClick={toggleConsole}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Terminal size={13} className="text-[#8a8db0]" />
            <span className="text-[11px] font-medium text-[#8a8db0] tracking-wide uppercase">
              Console
            </span>
          </div>

          {entries.length > 0 && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#2a2d4e] text-[#8a8db0] font-medium">
              {entries.length}
            </span>
          )}

          {warnCount > 0 && (
            <div className="flex items-center gap-1 text-[#e5c07b]">
              <AlertTriangle size={11} />
              <span className="text-[10px] font-medium">{warnCount}</span>
            </div>
          )}

          {errorCount > 0 && (
            <div className="flex items-center gap-1 text-[#e06c75]">
              <XCircle size={11} />
              <span className="text-[10px] font-medium">{errorCount}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation()
              clearConsole()
            }}
            className="flex items-center gap-1 px-2 py-0.5 text-[11px] text-[#636da0] hover:text-[#c8cad8] hover:bg-[#1a1b2e] rounded transition-colors"
            title="Clear console"
          >
            <Trash2 size={11} />
            <span className="hidden sm:inline">Clear</span>
          </button>
        </div>
      </div>

      {consoleOpen && (
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto overflow-x-hidden"
          style={{ scrollBehavior: 'smooth' }}
        >
          {entries.length === 0 ? (
            <div className="flex items-center justify-center h-full text-[#3a3d5e] text-xs font-mono">
              Console is empty
            </div>
          ) : (
            entries.map((entry, idx) => {
              const config = LEVEL_CONFIG[entry.level] || LEVEL_CONFIG.log
              const Icon = config.icon
              return (
                <div
                  key={entry.id}
                  className={`flex items-start gap-2 px-3 py-1.5 border-b border-[#1e2040] transition-colors ${config.bgColor}`}
                >
                  <div className="flex items-center gap-2 shrink-0 pt-0.5">
                    <span className="text-[10px] text-[#3a3d5e] font-mono w-6 text-right">
                      {idx + 1}
                    </span>
                    <Icon size={12} className={config.iconColor} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <ObjectTree args={entry.args} />
                  </div>
                  <span className="text-[10px] text-[#3a3d5e] shrink-0 pt-1 font-mono">
                    {new Date(entry.timestamp).toLocaleTimeString(undefined, {
                      hour12: false,
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                    })}
                  </span>
                </div>
              )
            })
          )}
        </div>
      )}
    </div>
  )
}
