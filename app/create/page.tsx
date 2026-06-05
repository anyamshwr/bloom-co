'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

const TULIP_COLORS = [
  { label: 'Purple', main: '#9b59d4', light: '#cc99f5', dark: '#7a3db0', accent: '#b57bee', accentDark: '#8a4fcc' },
  { label: 'Pink', main: '#e8739a', light: '#f5b8cf', dark: '#c44d78', accent: '#f4a0c0', accentDark: '#d4709a' },
  { label: 'Red', main: '#e05050', light: '#f59090', dark: '#b83030', accent: '#ee7070', accentDark: '#c84040' },
  { label: 'Yellow', main: '#e8c840', light: '#f5e490', dark: '#c0a010', accent: '#f0d860', accentDark: '#d0b820' },
  { label: 'White', main: '#d8d4cc', light: '#f0eeea', dark: '#b0aca4', accent: '#e8e4de', accentDark: '#c8c4bc' },
  { label: 'Orange', main: '#e8843a', light: '#f5b880', dark: '#c05a10', accent: '#f0a060', accentDark: '#d07030' },
]

export default function CreatePage() {
  const [recipient, setRecipient] = useState('')
  const [message, setMessage] = useState('')
  const [signoff, setSignoff] = useState('')
  const [colorIdx, setColorIdx] = useState(0)
  const [link, setLink] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  async function handleCreate() {
    if (!recipient || !message || !signoff) return
    setLoading(true)
    const { data, error } = await supabase
      .from('messages')
      .insert({
        recipient_name: recipient,
        sender_name: signoff,
        message,
        flower_color: JSON.stringify(TULIP_COLORS[colorIdx])
      })
      .select('id')
      .single()
    setLoading(false)
    if (error) { alert('Something went wrong, try again'); return }
    setLink(`${window.location.origin}/to/${data.id}`)
  }

  function handleCopy() {
    navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const c = TULIP_COLORS[colorIdx]

  return (
    <main className="min-h-screen flex items-center justify-center p-6" style={{ background: '#ece9e3', fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=DM+Sans:wght@300;400&display=swap" rel="stylesheet" />

      <div style={{ background: '#f5f1eb', borderRadius: 16, padding: '36px 32px', width: '100%', maxWidth: 420, boxShadow: '0 6px 30px rgba(0,0,0,0.10)' }}>
        <h1 style={{ fontFamily: 'Caveat, cursive', fontSize: 30, fontWeight: 700, textAlign: 'center', marginBottom: 4, color: '#2a2a2a' }}>
          🌷 Bloom & Co.
        </h1>
        <p style={{ textAlign: 'center', color: '#888', fontSize: 14, marginBottom: 28 }}>send someone a little surprise</p>

        <label style={{ fontSize: 13, color: '#666', display: 'block', marginBottom: 6 }}>Pick up for...</label>
        <input value={recipient} onChange={e => setRecipient(e.target.value)}
          placeholder="Their name"
          style={{ width: '100%', border: '1px solid #ddd5c8', borderRadius: 10, padding: '10px 14px', fontSize: 16, fontFamily: 'Caveat, cursive', marginBottom: 18, background: 'white', outline: 'none', boxSizing: 'border-box' }} />

        <label style={{ fontSize: 13, color: '#666', display: 'block', marginBottom: 6 }}>Your message</label>
        <textarea value={message} onChange={e => setMessage(e.target.value)}
          placeholder="Write something sweet..."
          rows={4}
          style={{ width: '100%', border: '1px solid #ddd5c8', borderRadius: 10, padding: '10px 14px', fontSize: 16, fontFamily: 'Caveat, cursive', marginBottom: 18, background: 'white', outline: 'none', resize: 'none', boxSizing: 'border-box' }} />

        <label style={{ fontSize: 13, color: '#666', display: 'block', marginBottom: 6 }}>Sign off as</label>
        <input value={signoff} onChange={e => setSignoff(e.target.value)}
          placeholder="Your name + a little symbol ♡"
          style={{ width: '100%', border: '1px solid #ddd5c8', borderRadius: 10, padding: '10px 14px', fontSize: 16, fontFamily: 'Caveat, cursive', marginBottom: 24, background: 'white', outline: 'none', boxSizing: 'border-box' }} />

        <label style={{ fontSize: 13, color: '#666', display: 'block', marginBottom: 10 }}>Tulip colour</label>
        <div style={{ display: 'flex', gap: 10, marginBottom: 28, flexWrap: 'wrap' }}>
          {TULIP_COLORS.map((col, i) => (
            <button key={i} onClick={() => setColorIdx(i)} title={col.label}
              style={{ width: 34, height: 34, borderRadius: '50%', background: col.main, border: colorIdx === i ? '3px solid #2a2a2a' : '3px solid transparent', cursor: 'pointer', transform: colorIdx === i ? 'scale(1.15)' : 'scale(1)', transition: 'all 0.15s' }} />
          ))}
        </div>

        {/* Live tulip preview */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
          <svg width="120" height="120" viewBox="0 0 200 200" fill="none">
            <line x1="80" y1="160" x2="72" y2="90" stroke="#4a8c4a" strokeWidth="2.5"/>
            <line x1="100" y1="160" x2="100" y2="68" stroke="#4a8c4a" strokeWidth="2.5"/>
            <line x1="120" y1="160" x2="130" y2="88" stroke="#4a8c4a" strokeWidth="2.5"/>
            <ellipse cx="82" cy="125" rx="10" ry="5" fill="#5a9e5a" transform="rotate(-30 82 125)"/>
            <ellipse cx="118" cy="128" rx="10" ry="5" fill="#5a9e5a" transform="rotate(30 118 128)"/>
            <ellipse cx="72" cy="82" rx="9" ry="13" fill={c.accent} stroke={c.accentDark} strokeWidth="1"/>
            <path d={`M63 82 Q72 68 81 82`} fill={c.light} opacity="0.6"/>
            <ellipse cx="100" cy="60" rx="10" ry="14" fill={c.main} stroke={c.dark} strokeWidth="1.2"/>
            <path d={`M90 60 Q100 44 110 60`} fill={c.light} opacity="0.6"/>
            <ellipse cx="129" cy="80" rx="9" ry="12" fill={c.accent} stroke={c.accentDark} strokeWidth="1"/>
            <path d={`M120 80 Q129 66 138 80`} fill={c.light} opacity="0.6"/>
          </svg>
        </div>

        <button onClick={handleCreate} disabled={loading || !recipient || !message || !signoff}
          style={{ width: '100%', background: '#2a2a2a', color: 'white', border: 'none', borderRadius: 10, padding: '13px 0', fontSize: 16, fontFamily: 'Caveat, cursive', fontWeight: 600, cursor: loading || !recipient || !message || !signoff ? 'not-allowed' : 'pointer', opacity: loading || !recipient || !message || !signoff ? 0.4 : 1, transition: 'opacity 0.2s' }}>
          {loading ? 'Creating...' : 'Create surprise link ✦'}
        </button>

        {link && (
          <div style={{ marginTop: 20, padding: 16, background: '#ece9e3', borderRadius: 12 }}>
            <p style={{ fontSize: 13, color: '#888', marginBottom: 8 }}>Send this to {recipient}:</p>
            <p style={{ fontSize: 12, color: '#5a5040', wordBreak: 'break-all', fontFamily: 'monospace', marginBottom: 12 }}>{link}</p>
            <button onClick={handleCopy}
              style={{ width: '100%', background: 'white', border: '1px solid #ddd5c8', borderRadius: 10, padding: '10px 0', fontSize: 14, fontFamily: 'Caveat, cursive', cursor: 'pointer', color: '#5a5040' }}>
              {copied ? '✓ Copied!' : 'Copy link'}
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
