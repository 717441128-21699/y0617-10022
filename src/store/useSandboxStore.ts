import { create } from 'zustand'

export type ConsoleLogLevel = 'log' | 'warn' | 'error' | 'info'

export interface ConsoleEntry {
  id: string
  level: ConsoleLogLevel
  args: unknown[]
  timestamp: number
}

interface SandboxState {
  html: string
  css: string
  javascript: string

  runHtml: string
  runCss: string
  runJavascript: string

  autoRun: boolean
  hasPendingChanges: boolean

  consoleEntries: ConsoleEntry[]
  consoleOpen: boolean

  setHtml: (v: string) => void
  setCss: (v: string) => void
  setJavascript: (v: string) => void

  setAutoRun: (v: boolean) => void
  runCode: (options?: { clearConsole?: boolean }) => void

  addConsoleEntry: (entry: ConsoleEntry) => void
  clearConsole: () => void
  toggleConsole: () => void

  loadFromHash: (data: { html: string; css: string; javascript: string }) => void
}

const DEFAULT_HTML = `<div class="container">
  <h1>Hello, Sandbox!</h1>
  <p>Start editing to see live changes.</p>
  <button id="btn">Click Me</button>
</div>`

const DEFAULT_CSS = `.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  font-family: system-ui, sans-serif;
  background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
  color: #fff;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(90deg, #f7df1e, #e44d26);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

p {
  color: #a0a0c0;
  margin-bottom: 1.5rem;
}

button {
  padding: 0.75rem 2rem;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  background: #e44d26;
  color: white;
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(228, 77, 38, 0.4);
}`

const DEFAULT_JS = `const btn = document.getElementById('btn');
let count = 0;

btn.addEventListener('click', () => {
  count++;
  console.log('Button clicked!', { count, timestamp: Date.now() });

  const obj = {
    name: 'Sandbox',
    version: '1.0',
    features: ['live preview', 'console', 'sharing'],
    nested: { deep: { value: 42 } }
  };
  console.info('Object output demo:', obj);
});

console.log('Sandbox ready! Edit the code above.');`

export const useSandboxStore = create<SandboxState>((set, get) => ({
  html: DEFAULT_HTML,
  css: DEFAULT_CSS,
  javascript: DEFAULT_JS,

  runHtml: DEFAULT_HTML,
  runCss: DEFAULT_CSS,
  runJavascript: DEFAULT_JS,

  autoRun: true,
  hasPendingChanges: false,

  consoleEntries: [],
  consoleOpen: true,

  setHtml: (v) => {
    const state = get()
    const hasPending = !state.autoRun && (
      v !== state.runHtml ||
      state.css !== state.runCss ||
      state.javascript !== state.runJavascript
    )
    set({ html: v, hasPendingChanges: hasPending })
  },
  setCss: (v) => {
    const state = get()
    const hasPending = !state.autoRun && (
      state.html !== state.runHtml ||
      v !== state.runCss ||
      state.javascript !== state.runJavascript
    )
    set({ css: v, hasPendingChanges: hasPending })
  },
  setJavascript: (v) => {
    const state = get()
    const hasPending = !state.autoRun && (
      state.html !== state.runHtml ||
      state.css !== state.runCss ||
      v !== state.runJavascript
    )
    set({ javascript: v, hasPendingChanges: hasPending })
  },

  setAutoRun: (v) => {
    if (v) {
      const state = get()
      set({
        autoRun: true,
        runHtml: state.html,
        runCss: state.css,
        runJavascript: state.javascript,
        hasPendingChanges: false,
      })
    } else {
      set({ autoRun: false })
    }
  },

  runCode: (options = {}) => {
    const { clearConsole = false } = options
    const state = get()
    set({
      runHtml: state.html,
      runCss: state.css,
      runJavascript: state.javascript,
      hasPendingChanges: false,
      consoleEntries: clearConsole ? [] : state.consoleEntries,
    })
  },

  addConsoleEntry: (entry) =>
    set((state) => ({ consoleEntries: [...state.consoleEntries, entry] })),
  clearConsole: () => set({ consoleEntries: [] }),
  toggleConsole: () => set((state) => ({ consoleOpen: !state.consoleOpen })),

  loadFromHash: (data) =>
    set({
      html: data.html,
      css: data.css,
      javascript: data.javascript,
      runHtml: data.html,
      runCss: data.css,
      runJavascript: data.javascript,
      consoleEntries: [],
      hasPendingChanges: false,
    }),
}))
