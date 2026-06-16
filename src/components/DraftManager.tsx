import { useState, useRef, useEffect } from 'react'
import { useDraftStore, type Draft } from '@/store/useDraftStore'
import { useSandboxStore } from '@/store/useSandboxStore'
import {
  Save,
  FolderOpen,
  Trash2,
  Copy,
  Edit3,
  Check,
  X,
  Clock,
  FileCode2,
  ChevronDown,
} from 'lucide-react'

interface DraftManagerProps {
  onClose?: () => void
}

function formatDate(ts: number): string {
  const d = new Date(ts)
  const now = new Date()
  const diff = now.getTime() - d.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  return d.toLocaleDateString()
}

function DraftItem({
  draft,
  onLoad,
  onDelete,
  onRename,
  onDuplicate,
}: {
  draft: Draft
  onLoad: (draft: Draft) => void
  onDelete: (id: string) => void
  onRename: (id: string, name: string) => void
  onDuplicate: (id: string) => void
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState(draft.name)
  const inputRef = useRef<HTMLInputElement>(null)
  const activeDraftId = useDraftStore((s) => s.activeDraftId)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  const handleSave = () => {
    const name = editName.trim()
    if (name) {
      onRename(draft.id, name)
    }
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSave()
    if (e.key === 'Escape') {
      setEditName(draft.name)
      setIsEditing(false)
    }
  }

  return (
    <div
      className={`flex flex-col p-3 rounded-lg transition-all border ${
        activeDraftId === draft.id
          ? 'bg-[#1e2240] border-[#3a3d6c]'
          : 'bg-[#16172e] border-[#2a2d4e] hover:border-[#3a3d5c]'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <FileCode2
            size={14}
            className={activeDraftId === draft.id ? 'text-[#f7df1e] shrink-0' : 'text-[#636da0] shrink-0'}
          />
          {isEditing ? (
            <input
              ref={inputRef}
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-[#0d0e1f] border border-[#3a3d5c] rounded px-2 py-0.5 text-xs text-[#c8cad8] outline-none focus:border-[#f7df1e]"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <button
              onClick={() => onLoad(draft)}
              className="flex-1 text-left text-xs font-medium text-[#c8cad8] truncate hover:text-[#f7df1e] transition-colors"
            >
              {draft.name}
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#2a2d4e]">
        <div className="flex items-center gap-1 text-[10px] text-[#5a5d80]">
          <Clock size={10} />
          <span>{formatDate(draft.updatedAt)}</span>
        </div>

        <div className="flex items-center gap-1">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="p-1 text-[#98c379] hover:bg-[#2a2d4e] rounded transition-colors"
                title="Save"
              >
                <Check size={12} />
              </button>
              <button
                onClick={() => {
                  setEditName(draft.name)
                  setIsEditing(false)
                }}
                className="p-1 text-[#e06c75] hover:bg-[#2a2d4e] rounded transition-colors"
                title="Cancel"
              >
                <X size={12} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 text-[#636da0] hover:text-[#c8cad8] hover:bg-[#2a2d4e] rounded transition-colors"
                title="Rename"
              >
                <Edit3 size={12} />
              </button>
              <button
                onClick={() => onDuplicate(draft.id)}
                className="p-1 text-[#636da0] hover:text-[#61afef] hover:bg-[#2a2d4e] rounded transition-colors"
                title="Duplicate"
              >
                <Copy size={12} />
              </button>
              <button
                onClick={() => {
                  if (confirm(`Delete "${draft.name}"?`)) {
                    onDelete(draft.id)
                  }
                }}
                className="p-1 text-[#636da0] hover:text-[#e06c75] hover:bg-[#2a2d4e] rounded transition-colors"
                title="Delete"
              >
                <Trash2 size={12} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default function DraftManager() {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const drafts = useDraftStore((s) => s.drafts)
  const saveDraft = useDraftStore((s) => s.saveDraft)
  const deleteDraft = useDraftStore((s) => s.deleteDraft)
  const updateDraft = useDraftStore((s) => s.updateDraft)
  const duplicateDraft = useDraftStore((s) => s.duplicateDraft)
  const loadDraft = useDraftStore((s) => s.loadDraft)

  const html = useSandboxStore((s) => s.html)
  const css = useSandboxStore((s) => s.css)
  const javascript = useSandboxStore((s) => s.javascript)
  const loadFromHash = useSandboxStore((s) => s.loadFromHash)
  const setActiveDraftId = useDraftStore((s) => s.setActiveDraftId)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSave = () => {
    const name = prompt('Save draft as:', `Draft ${drafts.length + 1}`)
    if (name === null) return
    saveDraft({ name: name.trim() || undefined, html, css, javascript })
    setIsOpen(true)
  }

  const handleLoad = (draft: Draft) => {
    loadFromHash({
      html: draft.html,
      css: draft.css,
      javascript: draft.javascript,
    })
    loadDraft(draft.id)
    setIsOpen(false)
  }

  const handleRename = (id: string, name: string) => {
    updateDraft(id, { name })
  }

  const handleDelete = (id: string) => {
    deleteDraft(id)
  }

  const handleDuplicate = (id: string) => {
    duplicateDraft(id)
  }

  return (
    <div ref={containerRef} className="relative">
      <div className="flex items-center gap-1">
        <button
          onClick={handleSave}
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-[#0d0e1f] bg-[#98c379] hover:bg-[#a5d88a] rounded-md transition-all font-medium"
          title="Save current code as draft"
        >
          <Save size={12} />
          <span className="hidden sm:inline">Save</span>
        </button>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-[#c8cad8] bg-[#1e2040] hover:bg-[#2a2d4e] rounded-md transition-all border border-[#3a3d5c] hover:border-[#4a4d70]"
          title="Open drafts"
        >
          <FolderOpen size={12} />
          <span className="hidden sm:inline">Drafts</span>
          {drafts.length > 0 && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-sm bg-[#2a2d4e] text-[#8a8db0] font-medium">
              {drafts.length}
            </span>
          )}
          <ChevronDown
            size={11}
            className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-80 bg-[#12132a] border border-[#2a2d4e] rounded-lg shadow-2xl shadow-black/50 overflow-hidden z-50">
          <div className="px-3 py-2 bg-[#0d0e1f] border-b border-[#2a2d4e] flex items-center justify-between">
            <p className="text-[10px] text-[#5a5d80] uppercase tracking-wide font-medium">
              Saved Drafts ({drafts.length})
            </p>
            <button
              onClick={handleSave}
              className="text-[10px] text-[#98c379] hover:text-[#a5d88a] font-medium"
            >
              + Save Current
            </button>
          </div>

          <div className="max-h-96 overflow-y-auto p-3">
            {drafts.length === 0 ? (
              <div className="py-8 text-center">
                <FileCode2 size={32} className="mx-auto text-[#3a3d5e] mb-2" />
                <p className="text-xs text-[#5a5d80]">No saved drafts yet</p>
                <p className="text-[11px] text-[#3a3d5e] mt-1">Click "Save" to store your current code</p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {drafts.map((draft) => (
                  <DraftItem
                    key={draft.id}
                    draft={draft}
                    onLoad={handleLoad}
                    onDelete={handleDelete}
                    onRename={handleRename}
                    onDuplicate={handleDuplicate}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
