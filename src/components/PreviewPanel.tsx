import { useRef, useEffect, useCallback, useState } from 'react'
import { useSandboxStore, type ConsoleEntry, type ConsoleLogLevel } from '@/store/useSandboxStore'

function serializeArg(arg: unknown): unknown {
  if (arg === null) return { __type: 'null', __display: 'null' }
  if (arg === undefined) return { __type: 'undefined', __display: 'undefined' }
  if (typeof arg === 'string') return { __type: 'string', __display: arg }
  if (typeof arg === 'number') return { __type: 'number', __display: String(arg) }
  if (typeof arg === 'boolean') return { __type: 'boolean', __display: String(arg) }
  if (typeof arg === 'symbol') return { __type: 'symbol', __display: arg.toString() }
  if (typeof arg === 'bigint') return { __type: 'bigint', __display: String(arg) }
  if (typeof arg === 'function') return { __type: 'function', __display: `f ${arg.name || 'anonymous'}()` }
  if (arg instanceof Error) {
    return {
      __type: 'error',
      __display: `${arg.name}: ${arg.message}`,
      stack: arg.stack || '',
    }
  }
  if (Array.isArray(arg)) {
    return {
      __type: 'array',
      __display: `Array(${arg.length})`,
      __items: arg.map(serializeArg),
    }
  }
  if (typeof arg === 'object') {
    try {
      const entries = Object.entries(arg as Record<string, unknown>).map(([k, v]) => ({
        key: k,
        value: serializeArg(v),
      }))
      return {
        __type: 'object',
        __display: `{${entries.length > 0 ? '...' : ''}}`,
        __entries: entries,
      }
    } catch {
      return { __type: 'object', __display: '{...}' }
    }
  }
  return { __type: 'unknown', __display: String(arg) }
}

const CONSOLE_INTERCEPT = `
<script>
(function() {
  var serializeArg = ${serializeArg.toString()};
  var originalConsole = {};
  var methods = ['log', 'warn', 'error', 'info'];
  methods.forEach(function(method) {
    originalConsole[method] = console[method].bind(console);
    console[method] = function() {
      var args = Array.from(arguments).map(function(arg) {
        return serializeArg(arg);
      });
      window.parent.postMessage({
        type: 'sandbox-console',
        level: method,
        args: args,
        timestamp: Date.now()
      }, '*');
      originalConsole[method].apply(console, arguments);
    };
  });

  window.onerror = function(message, source, lineno, colno, error) {
    window.parent.postMessage({
      type: 'sandbox-error',
      message: String(message),
      source: source || '',
      lineno: lineno || 0,
      colno: colno || 0,
      stack: error ? error.stack || '' : ''
    }, '*');
    return false;
  };

  window.addEventListener('unhandledrejection', function(event) {
    window.parent.postMessage({
      type: 'sandbox-error',
      message: 'Unhandled Promise Rejection: ' + String(event.reason),
      source: '',
      lineno: 0,
      colno: 0,
      stack: event.reason && event.reason.stack ? event.reason.stack : ''
    }, '*');
  });
})();
</script>
`

function buildSrcDoc(htmlCode: string, cssCode: string, jsCode: string): string {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>${cssCode}</style>
${CONSOLE_INTERCEPT}
</head>
<body>
${htmlCode}
<script>${jsCode}</script>
</body>
</html>`
}

let entryIdCounter = 0

function useDebouncedValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debouncedValue
}

export default function PreviewPanel() {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const html = useSandboxStore((s) => s.html)
  const css = useSandboxStore((s) => s.css)
  const javascript = useSandboxStore((s) => s.javascript)
  const addConsoleEntry = useSandboxStore((s) => s.addConsoleEntry)

  const debouncedHtml = useDebouncedValue(html, 300)
  const debouncedCss = useDebouncedValue(css, 300)
  const debouncedJs = useDebouncedValue(javascript, 300)

  const srcDoc = buildSrcDoc(debouncedHtml, debouncedCss, debouncedJs)

  const handleMessage = useCallback(
    (event: MessageEvent) => {
      const data = event.data
      if (!data || typeof data !== 'object') return

      if (data.type === 'sandbox-console') {
        const entry: ConsoleEntry = {
          id: `c-${++entryIdCounter}`,
          level: data.level as ConsoleLogLevel,
          args: data.args as unknown[],
          timestamp: data.timestamp as number,
        }
        addConsoleEntry(entry)
      }

      if (data.type === 'sandbox-error') {
        const entry: ConsoleEntry = {
          id: `e-${++entryIdCounter}`,
          level: 'error',
          args: [
            {
              __type: 'error',
              __display: data.message as string,
              stack: data.stack as string,
            },
          ],
          timestamp: Date.now(),
        }
        addConsoleEntry(entry)
      }
    },
    [addConsoleEntry],
  )

  useEffect(() => {
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [handleMessage])

  return (
    <div className="h-full w-full bg-white rounded-lg overflow-hidden shadow-lg shadow-black/20">
      <iframe
        ref={iframeRef}
        srcDoc={srcDoc}
        sandbox="allow-scripts"
        title="Preview"
        className="w-full h-full border-0"
      />
    </div>
  )
}
