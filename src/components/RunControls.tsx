import { useSandboxStore } from '@/store/useSandboxStore'
import { Play, RotateCcw, Trash2, Zap, ZapOff, Terminal } from 'lucide-react'

export default function RunControls() {
  const autoRun = useSandboxStore((s) => s.autoRun)
  const hasPendingChanges = useSandboxStore((s) => s.hasPendingChanges)
  const setAutoRun = useSandboxStore((s) => s.setAutoRun)
  const runCode = useSandboxStore((s) => s.runCode)
  const clearConsole = useSandboxStore((s) => s.clearConsole)
  const toggleConsole = useSandboxStore((s) => s.toggleConsole)
  const consoleOpen = useSandboxStore((s) => s.consoleOpen)

  return (
    <div className="flex items-center justify-between px-3 py-2 bg-[#12132a] border-b border-[#2a2d4e]">
      <div className="flex items-center gap-2">
        <span className="text-[11px] font-medium text-[#636da0] uppercase tracking-wide">
          Preview
        </span>
        {!autoRun && hasPendingChanges && (
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#f7df1e20] text-[#f7df1e] font-medium animate-pulse">
            Unsaved
          </span>
        )}
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={clearConsole}
          className="flex items-center gap-1 px-2 py-1 text-[11px] text-[#636da0] hover:text-[#c8cad8] hover:bg-[#1a1b2e] rounded transition-colors"
          title="Clear console"
        >
          <Trash2 size={13} />
          <span className="hidden sm:inline">Clear</span>
        </button>

        <button
          onClick={toggleConsole}
          className={`flex items-center gap-1 px-2 py-1 text-[11px] rounded transition-colors ${
            consoleOpen
              ? 'text-[#f7df1e] bg-[#1a1b2e]'
              : 'text-[#636da0] hover:text-[#c8cad8] hover:bg-[#1a1b2e]'
          }`}
          title={consoleOpen ? 'Hide console' : 'Show console'}
        >
          <Terminal size={13} />
          <span className="hidden sm:inline">Console</span>
        </button>

        <div className="w-px h-4 bg-[#2a2d4e] mx-1" />

        <button
          onClick={() => runCode({ clearConsole: true })}
          disabled={autoRun || !hasPendingChanges}
          className={`flex items-center gap-1 px-2.5 py-1 text-[11px] rounded transition-all font-medium ${
            autoRun || !hasPendingChanges
              ? 'text-[#3a3d5e] bg-[#16172e] cursor-not-allowed'
              : 'text-[#0d0e1f] bg-[#f7df1e] hover:bg-[#ffe94a] shadow-md shadow-[#f7df1e20]'
          }`}
          title="Run code (Ctrl+Enter)"
        >
          <Play size={12} />
          <span>Run</span>
        </button>

        <button
          onClick={() => setAutoRun(!autoRun)}
          className={`flex items-center gap-1 px-2 py-1 text-[11px] rounded transition-colors ${
            autoRun
              ? 'text-[#98c379] bg-[#161b20]'
              : 'text-[#636da0] hover:text-[#c8cad8] hover:bg-[#1a1b2e]'
          }`}
          title={autoRun ? 'Auto-run is on' : 'Auto-run is off'}
        >
          {autoRun ? <Zap size={13} /> : <ZapOff size={13} />}
          <span className="hidden sm:inline">{autoRun ? 'Auto' : 'Manual'}</span>
        </button>

        <button
          onClick={() => runCode({ clearConsole: true })}
          className="flex items-center gap-1 px-2 py-1 text-[11px] text-[#636da0] hover:text-[#c8cad8] hover:bg-[#1a1b2e] rounded transition-colors"
          title="Refresh preview"
        >
          <RotateCcw size={13} />
        </button>
      </div>
    </div>
  )
}
