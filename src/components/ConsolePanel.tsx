import { useSandboxStore } from '@/store/useSandboxStore'
import ObjectTree from './ObjectTree'
import { Trash2, ChevronDown, ChevronUp, Terminal } from 'lucide-react'

const LEVEL_STYLES: Record<string, { border: string; bg: string; icon: string }> = {
  log: { border: 'border-l-[#636da0]', bg: 'bg-[#1a1b2e]', icon: 'text-[#636da0]' },
  info: { border: 'border-l-[#61afef]', bg: 'bg-[#1a1d35]', icon: 'text-[#61afef]' },
  warn: { border: 'border-l-[#e5c07b]', bg: 'bg-[#1e1c25]', icon: 'text-[#e5c07b]' },
  error: { border: 'border-l-[#e06c75]', bg: 'bg-[#1e1a22]', icon: 'text-[#e06c75]' },
}

const LEVEL_LABELS: Record<string, string> = {
  log: '',
  info: 'ℹ',
  warn: '⚠',
  error: '✕',
}

export default function ConsolePanel() {
  const entries = useSandboxStore((s) => s.consoleEntries)
  const consoleOpen = useSandboxStore((s) => s.consoleOpen)
  const toggleConsole = useSandboxStore((s) => s.toggleConsole)
  const clearConsole = useSandboxStore((s) => s.clearConsole)

  const errorCount = entries.filter((e) => e.level === 'error').length

  return (
    <div className="flex flex-col h-full">
      <div
        className="flex items-center justify-between px-3 py-1.5 bg-[#12132a] border-b border-[#2a2d4e] cursor-pointer select-none"
        onClick={toggleConsole}
      >
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-[#636da0]" />
          <span className="text-xs font-medium text-[#8a8db0] tracking-wide uppercase">
            Console
          </span>
          {entries.length > 0 && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#2a2d4e] text-[#8a8db0]">
              {entries.length}
            </span>
          )}
          {errorCount > 0 && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#e06c7520] text-[#e06c75]">
              {errorCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              clearConsole()
            }}
            className="p-1 hover:bg-[#2a2d4e] rounded transition-colors text-[#636da0] hover:text-[#c8cad8]"
            title="Clear console"
          >
            <Trash2 size={13} />
          </button>
          {consoleOpen ? (
            <ChevronDown size={14} className="text-[#636da0]" />
          ) : (
            <ChevronUp size={14} className="text-[#636da0]" />
          )}
        </div>
      </div>
      {consoleOpen && (
        <div className="flex-1 overflow-y-auto bg-[#16172e]">
          {entries.length === 0 ? (
            <div className="flex items-center justify-center h-full text-[#3a3d5e] text-xs">
              Console output will appear here
            </div>
          ) : (
            entries.map((entry) => {
              const style = LEVEL_STYLES[entry.level] || LEVEL_STYLES.log
              return (
                <div
                  key={entry.id}
                  className={`border-l-2 ${style.border} ${style.bg} px-3 py-1.5 border-b border-[#1e2040] hover:brightness-110 transition-all`}
                >
                  <div className="flex items-start gap-2">
                    {LEVEL_LABELS[entry.level] && (
                      <span className={`text-xs mt-0.5 ${style.icon} shrink-0`}>
                        {LEVEL_LABELS[entry.level]}
                      </span>
                    )}
                    <div className="flex-1 min-w-0">
                      <ObjectTree args={entry.args} />
                    </div>
                    <span className="text-[10px] text-[#3a3d5e] shrink-0 mt-0.5">
                      {new Date(entry.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              )
            })
          )}
        </div>
      )}
    </div>
  )
}
