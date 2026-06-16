import { useState } from 'react'
import TemplateSelector from './TemplateSelector'
import DraftManager from './DraftManager'
import { useSandboxStore } from '@/store/useSandboxStore'
import { useDraftStore } from '@/store/useDraftStore'
import { Share2, Check, Code2, RotateCcw } from 'lucide-react'

export default function Toolbar() {
  const [copied, setCopied] = useState(false)
  const [activeTemplateId, setActiveTemplateId] = useState<string | null>('default')
  const setActiveDraftId = useDraftStore((s) => s.setActiveDraftId)

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      prompt('Copy this link:', window.location.href)
    }
  }

  const handleReset = () => {
    if (confirm('Reset all code to defaults?')) {
      useSandboxStore.getState().loadFromHash({
        html: '<div class="container">\n  <h1>Hello, Sandbox!</h1>\n  <p>Start editing to see live changes.</p>\n  <button id="btn">Click Me</button>\n</div>',
        css: '.container {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  min-height: 100vh;\n  font-family: system-ui, sans-serif;\n  background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);\n  color: #fff;\n}\n\nh1 { color: #fff; }',
        javascript: "console.log('Sandbox reset!');",
      })
      setActiveTemplateId('default')
      setActiveDraftId(null)
      window.location.hash = ''
    }
  }

  const handleTemplateChange = (id: string | null) => {
    setActiveTemplateId(id)
    setActiveDraftId(null)
  }

  return (
    <div className="flex items-center justify-between px-4 py-2.5 bg-[#0d0e1f] border-b border-[#2a2d4e] shrink-0">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#e44d26] via-[#264de4] to-[#f7df1e] flex items-center justify-center shadow-lg shadow-black/30">
            <Code2 size={16} className="text-white" />
          </div>
          <div className="flex flex-col leading-tight">
            <h1 className="text-sm font-bold text-[#e8eaf5] tracking-tight">
              Code Sandbox
            </h1>
            <span className="text-[10px] text-[#5a5d80] font-medium">
              Live code playground
            </span>
          </div>
        </div>

        <div className="w-px h-8 bg-[#2a2d4e] mx-1" />

        <TemplateSelector
          activeTemplateId={activeTemplateId}
          onTemplateChange={handleTemplateChange}
        />

        <DraftManager />
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-[#636da0] hover:text-[#c8cad8] bg-[#16172e] hover:bg-[#1e2040] rounded-md transition-all border border-[#2a2d4e] hover:border-[#3a3d5c]"
          title="Reset to defaults"
        >
          <RotateCcw size={13} />
          <span className="hidden sm:inline">Reset</span>
        </button>

        <button
          onClick={handleShare}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs rounded-md transition-all font-medium shadow-md ${
            copied
              ? 'text-[#0d0e1f] bg-[#98c379] shadow-[#98c379]/20'
              : 'text-[#0d0e1f] bg-[#f7df1e] hover:bg-[#ffe94a] shadow-[#f7df1e]/20'
          }`}
          title="Share via URL"
        >
          {copied ? (
            <>
              <Check size={13} />
              Copied!
            </>
          ) : (
            <>
              <Share2 size={13} />
              Share
            </>
          )}
        </button>
      </div>
    </div>
  )
}
