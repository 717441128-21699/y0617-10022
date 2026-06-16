import { useState, useRef, useEffect } from 'react'
import { TEMPLATES, getTemplateById, type Template } from '@/data/templates'
import { useSandboxStore } from '@/store/useSandboxStore'
import { ChevronDown, LayoutGrid } from 'lucide-react'

interface TemplateSelectorProps {
  activeTemplateId: string | null
  onTemplateChange: (id: string | null) => void
}

export default function TemplateSelector({ activeTemplateId, onTemplateChange }: TemplateSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const loadFromHash = useSandboxStore((s) => s.loadFromHash)

  const activeTemplate = activeTemplateId ? getTemplateById(activeTemplateId) : null

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (template: Template) => {
    loadFromHash({
      html: template.html,
      css: template.css,
      javascript: template.javascript,
    })
    onTemplateChange(template.id)
    setIsOpen(false)
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 text-xs text-[#c8cad8] bg-[#1e2040] hover:bg-[#2a2d4e] rounded-md transition-all border border-[#3a3d5c] hover:border-[#4a4d70]"
      >
        <LayoutGrid size={13} className="text-[#f7df1e]" />
        <span className="hidden sm:inline font-medium">
          {activeTemplate ? activeTemplate.name : 'Templates'}
        </span>
        <ChevronDown
          size={12}
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-72 bg-[#12132a] border border-[#2a2d4e] rounded-lg shadow-2xl shadow-black/50 overflow-hidden z-50">
          <div className="px-3 py-2 bg-[#0d0e1f] border-b border-[#2a2d4e]">
            <p className="text-[10px] text-[#5a5d80] uppercase tracking-wide font-medium">
              Quick Start Templates
            </p>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {TEMPLATES.map((template) => (
              <button
                key={template.id}
                onClick={() => handleSelect(template)}
                className={`w-full flex items-start gap-3 px-3 py-2.5 text-left hover:bg-[#1e2040] transition-colors border-b border-[#1e2040] last:border-b-0 ${
                  activeTemplateId === template.id ? 'bg-[#1e2040]' : ''
                }`}
              >
                <span className="text-xl leading-none">{template.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-[#e8eaf5] truncate">
                      {template.name}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#5a5d80] mt-0.5 line-clamp-2">
                    {template.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
