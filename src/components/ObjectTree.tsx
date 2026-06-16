import { useState } from 'react'

interface SerializedArg {
  __type: string
  __display: string
  __entries?: { key: string; value: SerializedArg }[]
  __items?: SerializedArg[]
  stack?: string
}

function isSerializedArg(val: unknown): val is SerializedArg {
  return typeof val === 'object' && val !== null && '__type' in val && '__display' in val
}

function getTypeColor(type: string): string {
  switch (type) {
    case 'string':
      return '#98c379'
    case 'number':
      return '#d19a66'
    case 'boolean':
      return '#56b6c2'
    case 'null':
    case 'undefined':
      return '#636da0'
    case 'function':
      return '#c678dd'
    case 'symbol':
      return '#e5c07b'
    case 'bigint':
      return '#d19a66'
    case 'error':
      return '#e06c75'
    case 'array':
      return '#61afef'
    case 'object':
      return '#e5c07b'
    default:
      return '#c8cad8'
  }
}

function ObjectTreeNode({ data, depth = 0 }: { data: SerializedArg; depth?: number }) {
  const [expanded, setExpanded] = useState(depth < 1)

  const hasChildren =
    (data.__type === 'object' && (data.__entries?.length ?? 0) > 0) ||
    (data.__type === 'array' && (data.__items?.length ?? 0) > 0)

  const indent = depth * 16

  if (data.__type === 'error' && data.stack) {
    return (
      <div>
        <span style={{ color: '#e06c75' }}>{data.__display}</span>
        {expanded && data.stack && (
          <pre
            className="mt-1 text-xs whitespace-pre-wrap opacity-60 ml-2"
            style={{ color: '#c8cad8' }}
          >
            {data.stack}
          </pre>
        )}
      </div>
    )
  }

  if (data.__type === 'string') {
    return <span style={{ color: '#98c379' }}>"{data.__display}"</span>
  }

  if (['number', 'boolean', 'bigint', 'symbol', 'null', 'undefined'].includes(data.__type)) {
    return <span style={{ color: getTypeColor(data.__type) }}>{data.__display}</span>
  }

  if (data.__type === 'function') {
    return <span style={{ color: '#c678dd' }}>{data.__display}</span>
  }

  if (!hasChildren) {
    return (
      <span style={{ color: getTypeColor(data.__type) }}>{data.__display}</span>
    )
  }

  return (
    <div style={{ marginLeft: depth > 0 ? 0 : 0 }}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="inline-flex items-center gap-1 hover:opacity-80 bg-transparent border-none cursor-pointer p-0 font-mono text-[13px]"
        style={{ color: getTypeColor(data.__type) }}
      >
        <span
          className="inline-block transition-transform duration-150"
          style={{
            transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
            fontSize: '10px',
            width: '12px',
            textAlign: 'center',
          }}
        >
          ▶
        </span>
        {data.__type === 'array'
          ? `Array(${data.__items!.length})`
          : data.__entries!.length === 0
            ? '{}'
            : `{${data.__entries!.slice(0, 3).map((e) => e.key).join(', ')}${data.__entries!.length > 3 ? ', ...' : ''}}`}
      </button>
      {expanded && (
        <div style={{ marginLeft: indent + 16 }}>
          {data.__type === 'array'
            ? data.__items!.map((item, i) => (
                <div key={i} className="flex items-start gap-1 py-[1px]">
                  <span style={{ color: '#636da0' }}>{i}:</span>
                  {isSerializedArg(item) ? (
                    <ObjectTreeNode data={item} depth={depth + 1} />
                  ) : (
                    <span style={{ color: '#c8cad8' }}>{String(item)}</span>
                  )}
                </div>
              ))
            : data.__entries!.map((entry) => (
                <div key={entry.key} className="flex items-start gap-1 py-[1px]">
                  <span style={{ color: '#e06c75' }}>{entry.key}:</span>
                  {isSerializedArg(entry.value) ? (
                    <ObjectTreeNode data={entry.value} depth={depth + 1} />
                  ) : (
                    <span style={{ color: '#c8cad8' }}>{String(entry.value)}</span>
                  )}
                </div>
              ))}
        </div>
      )}
    </div>
  )
}

export default function ObjectTree({ args }: { args: unknown[] }) {
  return (
    <div className="font-mono text-[13px] leading-5">
      {args.map((arg, i) => {
        if (isSerializedArg(arg)) {
          return <ObjectTreeNode key={i} data={arg} depth={0} />
        }
        return (
          <span key={i} style={{ color: '#c8cad8' }}>
            {String(arg)}
          </span>
        )
      })}
    </div>
  )
}
