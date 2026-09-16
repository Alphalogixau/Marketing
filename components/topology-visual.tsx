'use client'

import { motion, useReducedMotion } from 'motion/react'

/**
 * The platform's actual shape: processing happens on a node at each site;
 * the portal aggregates status centrally. Pulses travel site → core because
 * that is the real direction of travel (the edge is authoritative; the portal
 * reads).
 *
 * Abstract on purpose. No video frames, no bounding boxes, no human figures —
 * Guardian ships no recognition and the marketing must not imply it does.
 * See docs/MARKETING_GUARDRAILS.md
 */

const SITES = [
  { id: 'a', x: 60, y: 60, label: 'Site' },
  { id: 'b', x: 60, y: 160, label: 'Site' },
  { id: 'c', x: 60, y: 260, label: 'Site' },
]

const CORE = { x: 320, y: 160 }

export function TopologyVisual() {
  const reduced = useReducedMotion()

  return (
    <svg
      viewBox="0 0 420 320"
      className="h-auto w-full max-w-lg"
      role="img"
      aria-label="Each site runs its own Guardian node which processes video locally; the Nexus portal reads status from every site to give one portfolio view."
    >
      <defs>
        <linearGradient id="link" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ceeb59" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#93e4ff" stopOpacity="0.35" />
        </linearGradient>
        <radialGradient id="coreGlow">
          <stop offset="0%" stopColor="#93e4ff" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#93e4ff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx={CORE.x} cy={CORE.y} r="72" fill="url(#coreGlow)" />

      {/* Links */}
      {SITES.map((s, i) => {
        const d = `M ${s.x + 26} ${s.y} C ${s.x + 130} ${s.y}, ${CORE.x - 110} ${CORE.y}, ${CORE.x - 30} ${CORE.y}`
        return (
          <g key={s.id}>
            <path d={d} stroke="url(#link)" strokeWidth="1.5" fill="none" />
            {!reduced && (
              <motion.circle
                r="3"
                fill="#93e4ff"
                initial={{ offsetDistance: '0%', opacity: 0 }}
                animate={{ offsetDistance: '100%', opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: 2.6,
                  delay: i * 0.85,
                  repeat: Infinity,
                  repeatDelay: 1.1,
                  ease: 'easeInOut',
                }}
                style={{ offsetPath: `path("${d}")`, offsetRotate: '0deg' }}
              />
            )}
          </g>
        )
      })}

      {/* Site nodes — each one processes locally */}
      {SITES.map((s, i) => (
        <g key={s.id}>
          {!reduced && (
            <motion.circle
              cx={s.x}
              cy={s.y}
              r="26"
              fill="none"
              stroke="#ceeb59"
              strokeWidth="1"
              initial={{ opacity: 0.35, scale: 1 }}
              animate={{ opacity: 0, scale: 1.8 }}
              transition={{
                duration: 2.4,
                delay: i * 0.85,
                repeat: Infinity,
                ease: 'easeOut',
              }}
              style={{ transformOrigin: `${s.x}px ${s.y}px` }}
            />
          )}
          <rect
            x={s.x - 22}
            y={s.y - 22}
            width="44"
            height="44"
            rx="12"
            fill="#0b1725"
            stroke="#ceeb59"
            strokeOpacity="0.5"
            strokeWidth="1.5"
          />
          {/* Abstract node glyph: three stacked processing lanes */}
          {[-7, 0, 7].map((dy, j) => (
            <motion.rect
              key={dy}
              x={s.x - 9}
              y={s.y + dy - 1.5}
              width="18"
              height="3"
              rx="1.5"
              fill="#ceeb59"
              initial={{ opacity: 0.3 }}
              animate={reduced ? { opacity: 0.6 } : { opacity: [0.25, 0.9, 0.25] }}
              transition={{
                duration: 1.8,
                delay: i * 0.4 + j * 0.18,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
          <text
            x={s.x}
            y={s.y + 40}
            textAnchor="middle"
            className="fill-navy-400 font-mono text-[9px] uppercase tracking-widest"
          >
            Guardian
          </text>
        </g>
      ))}

      {/* Core — the portal */}
      <rect
        x={CORE.x - 30}
        y={CORE.y - 30}
        width="60"
        height="60"
        rx="16"
        fill="#0b1725"
        stroke="#93e4ff"
        strokeOpacity="0.6"
        strokeWidth="1.5"
      />
      <circle cx={CORE.x} cy={CORE.y} r="9" fill="none" stroke="#93e4ff" strokeWidth="1.5" />
      <circle cx={CORE.x} cy={CORE.y} r="3" fill="#93e4ff" />
      <text
        x={CORE.x}
        y={CORE.y + 50}
        textAnchor="middle"
        className="fill-navy-400 font-mono text-[9px] uppercase tracking-widest"
      >
        Nexus
      </text>
    </svg>
  )
}
