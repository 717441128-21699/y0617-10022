import CodeEditor from './CodeEditor'
import { useSandboxStore } from '@/store/useSandboxStore'
import { FileCode2, FileType2, Braces } from 'lucide-react'

const TABS = [
  { key: 'html' as const, label: 'HTML', icon: FileCode2, color: '#e44d26', setter: 'setHtml' as const },
  { key: 'css' as const, label: 'CSS', icon: FileType2, color: '#264de4', setter: 'setCss' as const },
  { key: 'javascript' as const, label: 'JS', icon: Braces, color: '#f7df1e', setter: 'setJavascript' as const },
]

export default function EditorPanel() {
  const activeTab = useSandboxStore((s) => s.activeEditorTab)
  const setActiveTab = useSandboxStore((s) => s.setActiveEditorTab)
  const html = useSandboxStore((s) => s.html)
  const css = useSandboxStore((s) => s.css)
  const javascript = useSandboxStore((s) => s.javascript)
  const setHtml = useSandboxStore((s) => s.setHtml)
  const setCss = useSandboxStore((s) => s.setCss)
  const setJavascript = useSandboxStore((s) => s.setJavascript)

  const values = { html, css, javascript }
  const setters = { html: setHtml, css: setCss, javascript: setJavascript }

  return (
    <div className="flex flex-col h-full bg-[#16172e]">
      <div className="flex items-center border-b border-[#2a2d4e] bg-[#12132a]">
        {TABS.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.key
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-medium transition-all border-b-2 ${
                isActive
                  ? 'text-[#c8cad8] bg-[#16172e] border-b-2'
                  : 'text-[#5a5d80] hover:text-[#8a8db0] border-transparent hover:bg-[#1a1b2e]'
              }`}
              style={{
                borderBottomColor: isActive ? tab.color : 'transparent',
              }}
            >
              <Icon size={13} style={{ color: isActive ? tab.color : undefined }} />
              {tab.label}
            </button>
          )
        })}
      </div>
      <div className="flex-1 overflow-hidden">
        {TABS.map((tab) => (
          <div
            key={tab.key}
            className={`h-full ${activeTab === tab.key ? 'block' : 'hidden'}`}
          >
            <CodeEditor
              value={values[tab.key]}
              onChange={setters[tab.key]}
              language={tab.key}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
