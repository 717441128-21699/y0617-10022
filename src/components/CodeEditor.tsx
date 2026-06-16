import { useRef, useEffect } from 'react'
import { EditorState } from '@codemirror/state'
import { EditorView, keymap, lineNumbers, highlightActiveLineGutter, highlightActiveLine, drawSelection, rectangularSelection, highlightSpecialChars } from '@codemirror/view'
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands'
import { syntaxHighlighting, defaultHighlightStyle, bracketMatching, foldGutter, indentOnInput } from '@codemirror/language'
import { closeBrackets, closeBracketsKeymap } from '@codemirror/autocomplete'
import { searchKeymap, highlightSelectionMatches } from '@codemirror/search'
import { lintKeymap } from '@codemirror/lint'
import { html } from '@codemirror/lang-html'
import { css } from '@codemirror/lang-css'
import { javascript } from '@codemirror/lang-javascript'

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  language: 'html' | 'css' | 'javascript'
}

const darkTheme = EditorView.theme({
  '&': {
    backgroundColor: '#1a1b2e',
    color: '#c8cad8',
    fontSize: '13px',
    height: '100%',
  },
  '.cm-content': {
    fontFamily: '"JetBrains Mono", "Fira Code", "Consolas", monospace',
    caretColor: '#f7df1e',
    padding: '8px 0',
  },
  '.cm-cursor': {
    borderLeftColor: '#f7df1e',
    borderLeftWidth: '2px',
  },
  '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {
    backgroundColor: '#3a3d5c',
  },
  '.cm-gutters': {
    backgroundColor: '#15162a',
    color: '#4a4d6e',
    border: 'none',
    paddingRight: '4px',
  },
  '.cm-activeLineGutter': {
    backgroundColor: '#1e2040',
    color: '#7a7da0',
  },
  '.cm-activeLine': {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
  '.cm-matchingBracket': {
    backgroundColor: '#3a3d5c',
    outline: '1px solid #6a6dac',
    color: '#f7df1e !important',
  },
  '.cm-foldGutter': {
    color: '#4a4d6e',
  },
  '.cm-foldPlaceholder': {
    backgroundColor: '#2a2d4e',
    border: 'none',
    color: '#7a7da0',
  },
}, { dark: true })

function getLanguageExtension(lang: 'html' | 'css' | 'javascript') {
  switch (lang) {
    case 'html':
      return html()
    case 'css':
      return css()
    case 'javascript':
      return javascript()
  }
}

export default function CodeEditor({ value, onChange, language }: CodeEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const viewRef = useRef<EditorView | null>(null)
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange

  useEffect(() => {
    if (!containerRef.current) return

    const state = EditorState.create({
      doc: value,
      extensions: [
        darkTheme,
        lineNumbers(),
        highlightActiveLineGutter(),
        highlightSpecialChars(),
        history(),
        foldGutter(),
        drawSelection(),
        EditorState.allowMultipleSelections.of(true),
        indentOnInput(),
        syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
        bracketMatching(),
        closeBrackets(),
        rectangularSelection(),
        highlightActiveLine(),
        highlightSelectionMatches(),
        keymap.of([
          ...closeBracketsKeymap,
          ...defaultKeymap,
          ...searchKeymap,
          ...historyKeymap,
          ...lintKeymap,
          indentWithTab,
        ]),
        getLanguageExtension(language),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            onChangeRef.current(update.state.doc.toString())
          }
        }),
        EditorView.lineWrapping,
      ],
    })

    const view = new EditorView({
      state,
      parent: containerRef.current,
    })

    viewRef.current = view

    return () => {
      view.destroy()
      viewRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language])

  useEffect(() => {
    const view = viewRef.current
    if (!view) return
    const currentDoc = view.state.doc.toString()
    if (currentDoc !== value) {
      view.dispatch({
        changes: { from: 0, to: currentDoc.length, insert: value },
      })
    }
  }, [value])

  return (
    <div
      ref={containerRef}
      className="cm-editor-container h-full w-full overflow-hidden"
    />
  )
}
