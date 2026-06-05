'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

type TulipColor = { label: string; main: string; light: string; dark: string; accent: string; accentDark: string }
type Message = { recipient_name: string; sender_name: string; message: string; flower_color: string }

type Screen = 'street' | 'shop' | 'note'

export default function ToPage() {
  const { id } = useParams()
  const [data, setData] = useState<Message | null>(null)
  const [loading, setLoading] = useState(true)
  const [screen, setScreen] = useState<Screen>('street')
  const [riding, setRiding] = useState(false)

  useEffect(() => {
    async function fetch() {
      const { data: msg } = await supabase.from('messages').select('*').eq('id', id).single()
      setData(msg)
      setLoading(false)
    }
    if (id) fetch()
  }, [id])

  function rideToShop() {
    setRiding(true)
    setTimeout(() => { setScreen('shop'); setRiding(false) }, 1050)
  }

  if (loading) return (
    <main style={{ minHeight: '100vh', background: '#ece9e3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Sans', sans-serif" }}>
      <p style={{ color: '#888', fontSize: 16 }}>opening your surprise...</p>
    </main>
  )

  if (!data) return (
    <main style={{ minHeight: '100vh', background: '#ece9e3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: '#888' }}>this bloom couldn't be found 🥀</p>
    </main>
  )

  let c: TulipColor
  try { c = JSON.parse(data.flower_color) }
  catch { c = { label: 'Purple', main: '#9b59d4', light: '#cc99f5', dark: '#7a3db0', accent: '#b57bee', accentDark: '#8a4fcc' } }

  const msgLines = data.message.split('\n').filter(Boolean)

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=DM+Sans:wght@300;400&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes bike-rock { 0%,100%{transform:rotate(-1deg)} 50%{transform:rotate(1deg)} }
        @keyframes bike-ride { 0%{transform:translateX(0) rotate(0deg)} 60%{transform:translateX(120px) rotate(1deg)} 80%{transform:translateX(145px) rotate(-1deg)} 100%{transform:translateX(160px) rotate(0deg);opacity:0} }
        @keyframes pulse { 0%,100%{transform:translateX(-50%) scale(1);opacity:1} 50%{transform:translateX(-50%) scale(1.8);opacity:0.3} }
        @keyframes hint-fade { 0%,100%{opacity:1} 50%{opacity:0.5} }
        @keyframes bubble-bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
        @keyframes card-rise { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes bouquet-in { from{opacity:0;transform:translateY(40px) scale(0.8)} to{opacity:1;transform:translateY(0) scale(1)} }
        .bike-anim { animation: bike-rock 3s ease-in-out infinite; }
        .bike-riding { animation: bike-ride 1s ease-in forwards !important; }
        .shop-pulse { position:absolute;top:-8px;left:50%;transform:translateX(-50%);width:12px;height:12px;background:#c9a96e;border-radius:50%;animation:pulse 1.5s ease-in-out infinite; }
        .tap-hint { font-family:'Caveat',cursive;font-size:22px;color:#5a5040;text-align:center;display:flex;align-items:center;justify-content:center;gap:10px;animation:hint-fade 2s ease-in-out infinite; }
        .dialogue-bubble { background:white;border-radius:18px;padding:10px 18px;font-family:'Caveat',cursive;font-size:19px;color:#2a2a2a;box-shadow:0 3px 14px rgba(0,0,0,0.10);position:relative;margin-bottom:10px;cursor:pointer;animation:bubble-bounce 2s ease-in-out infinite; }
        .dialogue-bubble::after { content:'';position:absolute;bottom:-10px;left:50%;transform:translateX(-50%);border-left:8px solid transparent;border-right:8px solid transparent;border-top:10px solid white; }
        .note-card-wrap { animation: card-rise 0.5s ease-out; }
        .bouquet-wrap { display:flex;justify-content:center;margin-top:-10px;animation:bouquet-in 0.6s 0.2s ease-out both; }
      `}</style>

      <main style={{ minHeight: '100vh', background: '#ece9e3', fontFamily: "'DM Sans', sans-serif", color: '#2a2a2a', overflowX: 'hidden' }}>

        {/* ── SCREEN 1: STREET ── */}
        {screen === 'street' && (
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px 40px', position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 40, width: '100%', maxWidth: 380, marginBottom: 32 }}>
              {/* BIKE */}
              <div className={riding ? 'bike-riding' : 'bike-anim'} style={{ flexShrink: 0, position: 'relative', zIndex: 2 }}>
                <svg width="130" height="110" viewBox="0 0 130 110" fill="none">
                  <circle cx="28" cy="78" r="24" stroke="#2a2a2a" strokeWidth="2.5" fill="none"/>
                  <circle cx="102" cy="78" r="24" stroke="#2a2a2a" strokeWidth="2.5" fill="none"/>
                  <line x1="28" y1="54" x2="28" y2="102" stroke="#2a2a2a" strokeWidth="1.2"/>
                  <line x1="4" y1="78" x2="52" y2="78" stroke="#2a2a2a" strokeWidth="1.2"/>
                  <line x1="11" y1="61" x2="45" y2="95" stroke="#2a2a2a" strokeWidth="1.2"/>
                  <line x1="45" y1="61" x2="11" y2="95" stroke="#2a2a2a" strokeWidth="1.2"/>
                  <line x1="102" y1="54" x2="102" y2="102" stroke="#2a2a2a" strokeWidth="1.2"/>
                  <line x1="78" y1="78" x2="126" y2="78" stroke="#2a2a2a" strokeWidth="1.2"/>
                  <line x1="85" y1="61" x2="119" y2="95" stroke="#2a2a2a" strokeWidth="1.2"/>
                  <line x1="119" y1="61" x2="85" y2="95" stroke="#2a2a2a" strokeWidth="1.2"/>
                  <line x1="28" y1="78" x2="65" y2="42" stroke="#2a2a2a" strokeWidth="2.5"/>
                  <line x1="65" y1="42" x2="102" y2="78" stroke="#2a2a2a" strokeWidth="2.5"/>
                  <line x1="28" y1="78" x2="65" y2="78" stroke="#2a2a2a" strokeWidth="2.5"/>
                  <line x1="65" y1="42" x2="65" y2="78" stroke="#2a2a2a" strokeWidth="2.5"/>
                  <line x1="102" y1="78" x2="95" y2="44" stroke="#2a2a2a" strokeWidth="2.5"/>
                  <path d="M88 40 Q95 36 103 40" stroke="#2a2a2a" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                  <line x1="65" y1="42" x2="72" y2="38" stroke="#2a2a2a" strokeWidth="2.5"/>
                  <path d="M68 35 Q72 32 79 35" stroke="#2a2a2a" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                  <circle cx="28" cy="78" r="3" fill="#2a2a2a"/>
                  <circle cx="102" cy="78" r="3" fill="#2a2a2a"/>
                  <circle cx="65" cy="78" r="3" fill="#2a2a2a"/>
                </svg>
              </div>

              {/* FLOWER SHOP */}
              <div onClick={!riding ? rideToShop : undefined} style={{ cursor: 'pointer', flexShrink: 0, position: 'relative', transition: 'transform 0.15s' }}>
                <div className="shop-pulse"/>
                <svg width="150" height="140" viewBox="0 0 150 140" fill="none">
                  <rect x="10" y="8" width="130" height="28" rx="4" fill="#2a2a2a"/>
                  <path d="M10 36 Q18 44 26 36 Q34 44 42 36 Q50 44 58 36 Q66 44 74 36 Q82 44 90 36 Q98 44 106 36 Q114 44 122 36 Q130 44 140 36" stroke="#2a2a2a" strokeWidth="2" fill="none"/>
                  <rect x="10" y="36" width="130" height="90" rx="0" fill="#f5f1eb" stroke="#2a2a2a" strokeWidth="2"/>
                  <rect x="38" y="44" width="74" height="22" rx="4" fill="white" stroke="#2a2a2a" strokeWidth="1.5"/>
                  <text x="75" y="59" textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize="11" fontWeight="500" fill="#2a2a2a">FLOWERS</text>
                  <rect x="16" y="74" width="118" height="5" rx="2" fill="#2a2a2a"/>
                  <rect x="22" y="56" width="26" height="18" rx="2" fill="#ddd5c8"/>
                  <line x1="30" y1="56" x2="28" y2="44" stroke="#4a8c4a" strokeWidth="2"/>
                  <ellipse cx="28" cy="41" rx="5" ry="7" fill={c.main} stroke={c.dark} strokeWidth="1"/>
                  <line x1="35" y1="56" x2="35" y2="40" stroke="#4a8c4a" strokeWidth="2"/>
                  <ellipse cx="35" cy="37" rx="5" ry="7" fill={c.main} stroke={c.dark} strokeWidth="1"/>
                  <rect x="102" y="56" width="26" height="18" rx="2" fill="#ddd5c8"/>
                  <line x1="110" y1="56" x2="108" y2="44" stroke="#4a8c4a" strokeWidth="2"/>
                  <ellipse cx="108" cy="41" rx="5" ry="7" fill={c.main} stroke={c.dark} strokeWidth="1"/>
                  <line x1="118" y1="56" x2="118" y2="40" stroke="#4a8c4a" strokeWidth="2"/>
                  <ellipse cx="118" cy="37" rx="5" ry="7" fill={c.main} stroke={c.dark} strokeWidth="1"/>
                  <rect x="16" y="79" width="118" height="42" rx="0" fill="#e8e2d8" stroke="#2a2a2a" strokeWidth="1"/>
                  <line x1="42" y1="79" x2="42" y2="121" stroke="#2a2a2a" strokeWidth="1"/>
                  <line x1="68" y1="79" x2="68" y2="121" stroke="#2a2a2a" strokeWidth="1"/>
                  <line x1="94" y1="79" x2="94" y2="121" stroke="#2a2a2a" strokeWidth="1"/>
                  <line x1="120" y1="79" x2="120" y2="121" stroke="#2a2a2a" strokeWidth="1"/>
                  <line x1="0" y1="125" x2="150" y2="125" stroke="#2a2a2a" strokeWidth="2"/>
                </svg>
              </div>
            </div>
            <div className="tap-hint">
              <span style={{ color: '#c9a96e' }}>✦</span>
              tap the flower shop
              <span style={{ color: '#c9a96e' }}>✦</span>
            </div>
          </div>
        )}

        {/* ── SCREEN 2: SHOP COUNTER ── */}
        {screen === 'shop' && (
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div onClick={() => setScreen('street')} style={{ padding: '18px 20px 14px', cursor: 'pointer' }}>
              <span style={{ fontSize: 14, color: '#666', fontFamily: 'Caveat, cursive' }}>← back to flowers</span>
            </div>
            <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
              <div style={{ width: '100%', maxWidth: 360, margin: '0 auto 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className="dialogue-bubble" onClick={() => setScreen('note')}>
                  📦 Pick up for {data.recipient_name}
                </div>
                <div style={{ width: '100%', maxWidth: 340 }}>
                  <svg width="100%" viewBox="0 0 340 220" fill="none">
                    <rect x="20" y="120" width="300" height="18" rx="4" fill="#c8b99a" stroke="#a89070" strokeWidth="1.5"/>
                    <rect x="30" y="138" width="280" height="60" rx="3" fill="#d9c9ae" stroke="#a89070" strokeWidth="1.5"/>
                    <line x1="110" y1="138" x2="110" y2="198" stroke="#a89070" strokeWidth="1"/>
                    <line x1="230" y1="138" x2="230" y2="198" stroke="#a89070" strokeWidth="1"/>
                    <rect x="110" y="70" width="120" height="52" rx="6" fill="#3a3530" stroke="#2a2520" strokeWidth="1.5"/>
                    <rect x="118" y="76" width="104" height="28" rx="3" fill="#7ec8a0"/>
                    <line x1="124" y1="82" x2="214" y2="82" stroke="#5aaf82" strokeWidth="1"/>
                    <line x1="124" y1="87" x2="190" y2="87" stroke="#5aaf82" strokeWidth="1"/>
                    <line x1="124" y1="92" x2="200" y2="92" stroke="#5aaf82" strokeWidth="1"/>
                    <text x="170" y="97" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#2a6040">WELCOME</text>
                    <rect x="118" y="108" width="104" height="12" rx="2" fill="#2a2520"/>
                    <rect x="122" y="110" width="8" height="8" rx="1" fill="#555"/>
                    <rect x="133" y="110" width="8" height="8" rx="1" fill="#555"/>
                    <rect x="144" y="110" width="8" height="8" rx="1" fill="#555"/>
                    <rect x="155" y="110" width="8" height="8" rx="1" fill="#555"/>
                    <rect x="166" y="110" width="8" height="8" rx="1" fill="#555"/>
                    <rect x="177" y="110" width="8" height="8" rx="1" fill="#e05050"/>
                    <rect x="188" y="110" width="8" height="8" rx="1" fill="#555"/>
                    <rect x="199" y="110" width="15" height="8" rx="1" fill="#4a8c4a"/>
                    <rect x="118" y="120" width="104" height="4" rx="1" fill="#2a2520"/>
                    <circle cx="170" cy="122" r="2" fill="#555"/>
                    <rect x="106" y="118" width="128" height="6" rx="3" fill="#2a2520"/>
                    <rect x="158" y="62" width="24" height="12" rx="1" fill="white" stroke="#ddd" strokeWidth="0.5"/>
                    <line x1="162" y1="65" x2="178" y2="65" stroke="#ccc" strokeWidth="0.8"/>
                    <line x1="162" y1="68" x2="174" y2="68" stroke="#ccc" strokeWidth="0.8"/>
                    <line x1="162" y1="71" x2="176" y2="71" stroke="#ccc" strokeWidth="0.8"/>
                    <rect x="50" y="100" width="28" height="20" rx="3" fill="#d9c9ae" stroke="#a89070" strokeWidth="1"/>
                    <rect x="54" y="112" width="20" height="10" rx="1" fill="#c8b99a"/>
                    <line x1="58" y1="100" x2="52" y2="78" stroke="#4a8c4a" strokeWidth="2"/>
                    <ellipse cx="52" cy="73" rx="7" ry="9" fill={c.accent}/>
                    <line x1="64" y1="100" x2="64" y2="72" stroke="#4a8c4a" strokeWidth="2"/>
                    <ellipse cx="64" cy="67" rx="7" ry="9" fill={c.light}/>
                    <line x1="70" y1="100" x2="76" y2="78" stroke="#4a8c4a" strokeWidth="2"/>
                    <ellipse cx="76" cy="73" rx="7" ry="9" fill={c.accent}/>
                    <rect x="258" y="90" width="52" height="30" rx="3" fill="white" stroke="#a89070" strokeWidth="1.2"/>
                    <text x="284" y="103" textAnchor="middle" fontFamily="Caveat, cursive" fontSize="9" fill="#5a5040">Bloom &amp;</text>
                    <text x="284" y="114" textAnchor="middle" fontFamily="Caveat, cursive" fontSize="9" fill="#5a5040">Co. ♡</text>
                    <line x1="284" y1="120" x2="284" y2="126" stroke="#a89070" strokeWidth="1.5"/>
                    <line x1="275" y1="126" x2="293" y2="126" stroke="#a89070" strokeWidth="1.5"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── SCREEN 3: NOTE CARD ── */}
        {screen === 'note' && (
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div onClick={() => setScreen('shop')} style={{ padding: '18px 20px 14px', cursor: 'pointer', width: '100%' }}>
              <span style={{ fontSize: 14, color: '#666', fontFamily: 'Caveat, cursive' }}>← back to flowers</span>
            </div>
            <div className="note-card-wrap" style={{ width: '100%', maxWidth: 420, padding: '0 20px', margin: '0 auto' }}>
              <div style={{ background: '#f5f1eb', borderRadius: 8, padding: '36px 32px 28px', boxShadow: '0 6px 30px rgba(0,0,0,0.10)' }}>
                <div style={{ fontFamily: 'Caveat, cursive', fontSize: 32, fontWeight: 700, color: '#1a1a1a', textAlign: 'center', marginBottom: 24 }}>
                  Dear {data.recipient_name},
                </div>
                <div style={{ fontFamily: 'Caveat, cursive', fontSize: 20, color: '#2a2a2a', lineHeight: 1.8, marginBottom: 8 }}>
                  {msgLines.map((line, i) => <p key={i} style={{ marginBottom: 18 }}>{line}</p>)}
                </div>
                <div style={{ fontFamily: 'Caveat, cursive', fontSize: 21, fontWeight: 600, color: '#2a2a2a', textAlign: 'right', marginTop: 8 }}>
                  Yours lovingly,<br />{data.sender_name}
                </div>
                <div style={{ fontSize: 20, color: '#888', marginTop: 14 }}>♡</div>
              </div>
            </div>

            {/* TULIP BOUQUET */}
            <div className="bouquet-wrap">
              <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
                <polygon points="60,160 140,160 110,200 90,200" fill="#f5f1eb" stroke="#d5cfc5" strokeWidth="1.5"/>
                <line x1="90" y1="200" x2="100" y2="160" stroke="#d5cfc5" strokeWidth="1"/>
                <line x1="110" y1="200" x2="100" y2="160" stroke="#d5cfc5" strokeWidth="1"/>
                <line x1="80" y1="160" x2="72" y2="90" stroke="#4a8c4a" strokeWidth="2.5"/>
                <line x1="90" y1="160" x2="90" y2="75" stroke="#4a8c4a" strokeWidth="2.5"/>
                <line x1="100" y1="160" x2="100" y2="68" stroke="#4a8c4a" strokeWidth="2.5"/>
                <line x1="110" y1="160" x2="112" y2="75" stroke="#4a8c4a" strokeWidth="2.5"/>
                <line x1="120" y1="160" x2="130" y2="88" stroke="#4a8c4a" strokeWidth="2.5"/>
                <line x1="85" y1="130" x2="68" y2="100" stroke="#4a8c4a" strokeWidth="2"/>
                <line x1="115" y1="130" x2="134" y2="102" stroke="#4a8c4a" strokeWidth="2"/>
                <ellipse cx="82" cy="125" rx="10" ry="5" fill="#5a9e5a" transform="rotate(-30 82 125)"/>
                <ellipse cx="118" cy="128" rx="10" ry="5" fill="#5a9e5a" transform="rotate(30 118 128)"/>
                <ellipse cx="95" cy="110" rx="9" ry="4" fill="#5a9e5a" transform="rotate(-15 95 110)"/>
                <ellipse cx="107" cy="112" rx="9" ry="4" fill="#5a9e5a" transform="rotate(20 107 112)"/>
                <ellipse cx="65" cy="82" rx="9" ry="13" fill={c.accent} stroke={c.accentDark} strokeWidth="1"/>
                <path d={`M56 82 Q65 68 74 82`} fill={c.light} opacity="0.6"/>
                <ellipse cx="82" cy="68" rx="9" ry="13" fill={c.main} stroke={c.dark} strokeWidth="1"/>
                <path d={`M73 68 Q82 54 91 68`} fill={c.light} opacity="0.6"/>
                <ellipse cx="100" cy="60" rx="10" ry="14" fill={c.main} stroke={c.dark} strokeWidth="1.2"/>
                <path d={`M90 60 Q100 44 110 60`} fill={c.light} opacity="0.6"/>
                <ellipse cx="118" cy="66" rx="9" ry="13" fill={c.main} stroke={c.dark} strokeWidth="1"/>
                <path d={`M109 66 Q118 52 127 66`} fill={c.light} opacity="0.6"/>
                <ellipse cx="134" cy="80" rx="9" ry="12" fill={c.accent} stroke={c.accentDark} strokeWidth="1"/>
                <path d={`M125 80 Q134 66 143 80`} fill={c.light} opacity="0.6"/>
                <ellipse cx="60" cy="94" rx="8" ry="11" fill={c.light} stroke={c.dark} strokeWidth="1"/>
                <ellipse cx="140" cy="95" rx="8" ry="11" fill={c.light} stroke={c.dark} strokeWidth="1"/>
              </svg>
            </div>
          </div>
        )}
      </main>
    </>
  )
}
