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

function getPropKeyColor(key: string): string {
  if (key.startsWith('__')) return '#636da0'
  return '#e06c75'
}

interface TreeNodeProps {
  data: SerializedArg
  depth?: number
  isLast?: boolean
  pathPrefix?: string
}

function ObjectTreeNode({ data, depth = 0, pathPrefix = '' }: TreeNodeProps) {
  const [expanded, setExpanded] = useState(false)

  const isExpandable =
    (data.__type === 'object' && (data.__entries?.length ?? 0) > 0) ||
    (data.__type === 'array' && (data.__items?.length ?? 0) > 0) ||
    (data.__type === 'error' && !!data.stack)

  const indent = depth * 14

  if (data.__type === 'error') {
    return (
      <div style={{ marginLeft: 0 }}>
        {data.stack ? (
          <button
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-start gap-1 bg-transparent border-none cursor-pointer p-0 font-mono text-[13px] text-left"
            style={{ color: '#e06c75' }}
          >
            <span
              className="inline-block shrink-0 transition-transform duration-100 mt-0.5"
              style={{
                transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
                fontSize: '9px',
                width: '11px',
                color: '#636da0',
              }}
            >
              ▶
            </span>
            <span className="text-[#e06c75] font-medium">{data.__display}</span>
          </button>
        ) : (
          <span style={{ color: '#e06c75' }}>{data.__display}</span>
        )}
        {expanded && data.stack && (
          <pre
            className="text-[12px] whitespace-pre-wrap mt-1 leading-5"
            style={{ color: '#9093b0', paddingLeft: indent + 14 }}
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

  if (data.__type === 'number') {
    return <span style={{ color: '#d19a66' }}>{data.__display}</span>
  }

  if (data.__type === 'boolean') {
    return <span style={{ color: '#56b6c2' }}>{data.__display}</span>
  }

  if (['null', 'undefined', 'symbol', 'bigint', 'function'].includes(data.__type)) {
    return <span style={{ color: getTypeColor(data.__type), fontStyle: data.__type === 'undefined' ? 'italic' : 'normal' }}>{data.__display}</span>
  }

  if (!isExpandable) {
    return (
      <span style={{ color: getTypeColor(data.__type) }}>{data.__display}</span>
    )
  }

  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="inline-flex items-start gap-1 bg-transparent border-none cursor-pointer p-0 font-mono text-[13px] text-left hover:brightness-125 transition-all"
        style={{ color: getTypeColor(data.__type) }}
      >
        <span
          className="inline-block shrink-0 transition-transform duration-100 mt-0.5"
          style={{
            transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
            fontSize: '9px',
            width: '11px',
            color: '#636da0',
          }}
        >
          ▶
        </span>
        <span style={{ color: getTypeColor(data.__type) }}>{data.__display}</span>
      </button>
      {expanded && (
        <div style={{ paddingLeft: 12, marginTop: 2, marginBottom: 2 }}>
          {data.__type === 'array'
            ? data.__items!.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 py-[1px] leading-5"
                >
                  <span
                    className="shrink-0 font-mono text-[12px]"
                    style={{ color: '#636da0', minWidth: '24px', textAlign: 'right' }}
                  >
                    {i}:
                  </span>
                  {isSerializedArg(item) ? (
                    <ObjectTreeNode data={item} depth={depth + 1} pathPrefix={`${pathPrefix}[${i}]`} />
                  ) : (
                    <span style={{ color: '#c8cad8' }}>{String(item)}</span>
                  )}
                </div>
              ))
            : data.__entries!.map((entry, idx) => (
                <div
                  key={entry.key}
                  className="flex items-start gap-2 py-[1px] leading-5"
                  style={{ marginLeft: 0 }}
                >
                  <span
                    className="shrink-0 font-mono text-[13px]"
                    style={{ color: getPropKeyColor(entry.key) }}
                  >
                    {entry.key}
                  </span>
                  <span style={{ color: '#636da0' }}>:</span>
                  {isSerializedArg(entry.value) ? (
                    <ObjectTreeNode data={entry.value} depth={depth + 1} pathPrefix={`${pathPrefix}.${entry.key}`} />
                  ) : (
                    <span style={{ color: '#c8cad8' }}>{String(entry.value)}</span>
                  )}
                </div>
              ))}
          <div className="text-[11px] mt-1" style={{ color: '#3a3d5e', paddingLeft: 0 }}>
            {data.__type === 'array'
              ? `length: ${data.__items!.length}`
              : `{${data.__entries!.length} ${data.__entries!.length === 1 ? 'property' : 'properties'}}`}
          </div>
        </div>
      )}
    </div>
  )
}

export default function ObjectTree({ args }: { args: unknown[] }) {
  return (
    <div className="font-mono text-[13px] leading-5 break-words">
      {args.map((arg, i) => (
        <span key={i} className={i > 0 ? 'ml-1' : ''}>
          {isSerializedArg(arg) ? (
            <ObjectTreeNode data={arg} depth={0} />
          ) : (
            <span style={{ color: '#c8cad8' }}>{String(arg)}</span>
          )}
        </span>
      ))}
    </div>
  )
}
