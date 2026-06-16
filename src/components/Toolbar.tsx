import { useState } from 'react'
import { useSandboxStore } from '@/store/useSandboxStore'
import { getShareUrl } from '@/utils/share'
import { Share2, RotateCcw, Check, Code2 } from 'lucide-react'

export default function Toolbar() {
  const html = useSandboxStore((s) => s.html)
  const css = useSandboxStore((s) => s.css)
  const javascript = useSandboxStore((s) => s.javascript)
  const loadFromHash = useSandboxStore((s) => s.loadFromHash)
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const url = getShareUrl({ html, css, javascript })
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      prompt('Copy this link:', url)
    }
  }

  const handleReset = () => {
    loadFromHash({
      html: '<div class="container">\n  <h1>Hello, Sandbox!</h1>\n  <p>Start editing to see live changes.</p>\n</div>',
      css: '.container {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  min-height: 100vh;\n  font-family: system-ui, sans-serif;\n}',
      javascript: "console.log('Sandbox reset!');",
    })
    window.location.hash = ''
  }

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-[#0d0e1f] border-b border-[#2a2d4e]">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#e44d26] via-[#264de4] to-[#f7df1e] flex items-center justify-center">
            <Code2 size={15} className="text-white" />
          </div>
          <h1 className="text-sm font-semibold text-[#c8cad8] tracking-wide">
            Sandbox
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#8a8db0] hover:text-[#c8cad8] bg-[#1a1b2e] hover:bg-[#2a2d4e] rounded-lg transition-all border border-[#2a2d4e] hover:border-[#3a3d5c]"
          title="Reset code"
        >
          <RotateCcw size={13} />
          Reset
        </button>
        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#0d0e1f] bg-[#f7df1e] hover:bg-[#ffe94a] rounded-lg transition-all font-medium shadow-lg shadow-[#f7df1e20]"
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
