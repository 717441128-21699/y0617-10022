import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Draft {
  id: string
  name: string
  html: string
  css: string
  javascript: string
  createdAt: number
  updatedAt: number
}

interface DraftStore {
  drafts: Draft[]
  activeDraftId: string | null

  saveDraft: (data: { name?: string; html: string; css: string; javascript: string }) => Draft
  updateDraft: (id: string, data: Partial<Pick<Draft, 'name' | 'html' | 'css' | 'javascript'>>) => void
  deleteDraft: (id: string) => void
  duplicateDraft: (id: string) => Draft
  loadDraft: (id: string) => Draft | undefined
  setActiveDraftId: (id: string | null) => void
  getDraftById: (id: string) => Draft | undefined
}

function generateId(): string {
  return `draft-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export const useDraftStore = create<DraftStore>()(
  persist(
    (set, get) => ({
      drafts: [],
      activeDraftId: null,

      saveDraft: ({ name, html, css, javascript }) => {
        const newDraft: Draft = {
          id: generateId(),
          name: name || `Draft ${get().drafts.length + 1}`,
          html,
          css,
          javascript,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        }
        set((state) => ({
          drafts: [newDraft, ...state.drafts],
          activeDraftId: newDraft.id,
        }))
        return newDraft
      },

      updateDraft: (id, data) => {
        set((state) => ({
          drafts: state.drafts.map((draft) =>
            draft.id === id
              ? { ...draft, ...data, updatedAt: Date.now() }
              : draft
          ),
        }))
      },

      deleteDraft: (id) => {
        set((state) => ({
          drafts: state.drafts.filter((draft) => draft.id !== id),
          activeDraftId: state.activeDraftId === id ? null : state.activeDraftId,
        }))
      },

      duplicateDraft: (id) => {
        const draft = get().getDraftById(id)
        if (!draft) throw new Error('Draft not found')
        const newDraft: Draft = {
          id: generateId(),
          name: `${draft.name} (Copy)`,
          html: draft.html,
          css: draft.css,
          javascript: draft.javascript,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        }
        set((state) => ({
          drafts: [newDraft, ...state.drafts],
          activeDraftId: newDraft.id,
        }))
        return newDraft
      },

      loadDraft: (id) => {
        const draft = get().getDraftById(id)
        if (draft) {
          set({ activeDraftId: id })
        }
        return draft
      },

      setActiveDraftId: (id) => set({ activeDraftId: id }),

      getDraftById: (id) => get().drafts.find((draft) => draft.id === id),
    }),
    {
      name: 'sandbox-drafts',
    }
  )
)
