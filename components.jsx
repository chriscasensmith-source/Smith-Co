// ─────────────────────────────────────────────────────────────────────────
//  Shared components for the Restaurant Passport
// ─────────────────────────────────────────────────────────────────────────

const { useState, useEffect, useMemo, useRef } = React;

// ---------- Tag definitions (used by sections.jsx & for filtering) ----
const FOOD_TAGS = [
  { tag: 'Sushi',         match: /\b(sushi|sashimi|nigiri|maki|roll|hamachi|toro|yellowtail|uni|tempura roll|cali roll|crispy rice)\b/i, emoji: '🍣' },
  { tag: 'Ramen',         match: /\bramen\b/i, emoji: '🍜' },
  { tag: 'Tacos',         match: /\b(tacos?|al pastor|carnitas|barbacoa)\b/i, emoji: '🌮' },
  { tag: 'Pizza',         match: /\bpizza\b/i, emoji: '🍕' },
  { tag: 'Burgers',       match: /\bburger(s)?\b/i, emoji: '🍔' },
  { tag: 'BBQ',           match: /\b(brisket|barbecue|bbq|smoked ribs|pulled pork)\b/i, emoji: '🔥' },
  { tag: 'Oysters',       match: /\boysters?\b/i, emoji: '🦪' },
  { tag: 'Seafood',       match: /\b(shrimp|crab|lobster|seafood|scallop|fish|snapper|cod|halibut|mussels|calamari)\b/i, emoji: '🐟' },
  { tag: 'Steak',         match: /\b(steak|ribeye|filet|new york strip|wagyu|prime rib)\b/i, emoji: '🥩' },
  { tag: 'Brunch',        match: /\b(brunch|benedict|eggs benny|mimosa|chilaquiles|biscuit|bloody mary)\b/i, emoji: '🍳' },
  { tag: 'Cocktails',     match: /\b(cocktail|martini|old fashioned|negroni|margarita|paloma|spritz|manhattan|highball)\b/i, emoji: '🍸' },
  { tag: 'Wine',          match: /\b(wine|rosé|rose|champagne|sangria|prosecco)\b/i, emoji: '🍷' },
  { tag: 'Italian',       match: /\b(pasta|spaghetti|lasagna|carbonara|gnocchi|ravioli|risotto|tagliatelle|bolognese)\b/i, emoji: '🍝' },
  { tag: 'Dumplings',     match: /\b(dumpling|gyoza|bao|baozi|xiao long bao|potsticker)\b/i, emoji: '🥟' },
  { tag: 'Curry',         match: /\b(curry|masala|tikka|biryani|saag)\b/i, emoji: '🍛' },
  { tag: 'Dessert',       match: /\b(dessert|cake|pie|ice cream|gelato|tiramisu|cookie|crème brûlée|crème brulee|donut|cheesecake|toffee)\b/i, emoji: '🍰' },
  { tag: 'Fried Chicken', match: /\b(fried chicken|chicken tender|chicken sandwich|nashville|chicken wings|wings)\b/i, emoji: '🍗' },
  { tag: 'Salads',        match: /\bsalad\b/i, emoji: '🥗' },
  { tag: 'Tex-Mex',       match: /\b(fajitas?|queso|enchilada|chimichanga|nachos)\b/i, emoji: '🌶️' },
  { tag: 'Sandwich',      match: /\b(sandwich|panini|sub|hoagie|reuben|cuban)\b/i, emoji: '🥪' },
  { tag: 'Charcuterie',   match: /\b(charcuterie|cheese board|cheese plate|burrata|prosciutto)\b/i, emoji: '🧀' },
  { tag: 'Soup',          match: /\b(soup|chowder|bisque|broth|matzah ball|matzo ball|french onion)\b/i, emoji: '🥣' },
];

function tagsFor(items) {
  if (!items) return [];
  return FOOD_TAGS.filter(t => t.match.test(items)).map(t => t.tag);
}

// ---------- Section wrapper ----------
function Section({ id, eyebrow, title, sub, children, tight, dark }) {
  return (
    <section
      id={id}
      data-screen-label={eyebrow ? `${eyebrow}` : title}
      className={`om-section${tight ? ' tight' : ''}`}
      style={{
        background: dark ? 'var(--ink)' : 'transparent',
        color: dark ? 'var(--paper)' : 'var(--ink)',
      }}
    >
      <div className="wrap">
        <div className="section-head" style={{ marginBottom: 36, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ maxWidth: 720 }}>
            {eyebrow && <div className="eyebrow" style={{ color: dark ? 'rgba(251,246,234,0.6)' : 'var(--ink-mute)' }}>— {eyebrow}</div>}
            {title && (
              <h2 className="serif section-title" style={{
                fontSize: 'clamp(34px, 5vw, 64px)',
                lineHeight: 1.02,
                margin: '10px 0 0',
                letterSpacing: '-0.01em',
                fontWeight: 400,
              }}>{title}</h2>
            )}
            {sub && <p className="section-sub" style={{ margin: '14px 0 0', fontSize: 17, color: dark ? 'rgba(251,246,234,0.7)' : 'var(--ink-soft)', maxWidth: 620 }}>{sub}</p>}
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}

// ---------- Tag chip ----------
function Chip({ children, onClick, active, count, kind }) {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '7px 12px 6px',
    border: '1px solid ' + (active ? 'var(--ink)' : 'var(--rule)'),
    borderRadius: 999,
    background: active ? 'var(--ink)' : 'transparent',
    color: active ? 'var(--paper)' : 'var(--ink)',
    fontSize: 13,
    fontWeight: 500,
    letterSpacing: '0.01em',
    cursor: onClick ? 'pointer' : 'default',
    transition: 'all 0.15s ease',
    whiteSpace: 'nowrap',
    fontFamily: 'inherit',
  };
  return (
    <button onClick={onClick} style={base} type="button">
      {children}
      {count != null && (
        <span style={{
          fontSize: 11,
          fontFamily: 'JetBrains Mono, monospace',
          opacity: active ? 0.7 : 0.55,
          marginLeft: 2,
        }}>{count}</span>
      )}
    </button>
  );
}

// ---------- StatCard ----------
function StatCard({ value, label, sub, big, accent }) {
  const accentColor = {
    oxblood: 'var(--oxblood)',
    saffron: 'var(--saffron-deep)',
    forest: 'var(--forest)',
    terracotta: 'var(--terracotta)',
  }[accent] || 'var(--ink)';
  return (
    <div style={{
      background: 'var(--paper)',
      border: '1px solid var(--rule-soft)',
      borderRadius: 14,
      padding: big ? '28px 28px 24px' : '22px 22px 18px',
      boxShadow: 'var(--shadow)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      minHeight: big ? 180 : 140,
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div className="eyebrow" style={{ color: 'var(--ink-mute)' }}>{label}</div>
      <div>
        <div className="serif" style={{
          fontSize: big ? 'clamp(64px, 7vw, 96px)' : 'clamp(40px, 4vw, 56px)',
          lineHeight: 0.95,
          color: accentColor,
          fontWeight: 400,
          letterSpacing: '-0.02em',
        }}>{value}</div>
        {sub && <div style={{ marginTop: 8, color: 'var(--ink-soft)', fontSize: 13 }}>{sub}</div>}
      </div>
    </div>
  );
}

// ---------- Restaurant card ----------
function RestaurantCard({ r, idx, accent }) {
  const isClosed = /closed/i.test(r.status);
  const tags = tagsFor(r.items);
  const accentColor = accent || 'var(--oxblood)';

  // Snippet of items eaten
  const items = r.items || '';
  const snippet = items.length > 180 ? items.slice(0, 180).trim() + '…' : items;

  return (
    <article style={{
      background: 'var(--paper)',
      border: '1px solid var(--rule-soft)',
      borderRadius: 12,
      padding: '20px 22px 22px',
      boxShadow: 'var(--shadow)',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      position: 'relative',
      opacity: isClosed ? 0.92 : 1,
    }}>
      {/* top row: city / neighborhood / closed pill */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
        <div className="mono" style={{ fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-mute)' }}>
          {r.city}{r.neighborhood ? ' · ' + r.neighborhood : ''}
        </div>
        {isClosed && (
          <span className="mono" style={{
            fontSize: 9.5, letterSpacing: '0.18em', padding: '3px 6px 2px', border: '1px solid var(--oxblood)',
            color: 'var(--oxblood)', borderRadius: 3, textTransform: 'uppercase',
          }}>{r.status.toLowerCase().includes('temp') ? 'Temp Closed' : 'Closed'}</span>
        )}
      </div>

      {/* name */}
      <h3 className="serif" style={{
        margin: 0,
        fontSize: 26,
        lineHeight: 1.05,
        letterSpacing: '-0.005em',
        fontWeight: 400,
        color: isClosed ? 'var(--ink-soft)' : 'var(--ink)',
      }}>
        {r.name || <span style={{ fontStyle: 'italic', color: 'var(--ink-mute)' }}>Untitled spot</span>}
      </h3>

      {/* items eaten */}
      {snippet && (
        <div style={{
          color: 'var(--ink-soft)',
          fontSize: 14,
          lineHeight: 1.45,
          borderLeft: '2px solid ' + accentColor,
          paddingLeft: 12,
          margin: '2px 0 2px',
        }}>{snippet}</div>
      )}

      {/* staff note if present */}
      {r.staff && (
        <div style={{ fontSize: 12.5, color: 'var(--ink-mute)' }}>
          <span className="mono" style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', marginRight: 8 }}>Staff</span>
          {r.staff}
        </div>
      )}

      {/* tags */}
      {tags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 'auto', paddingTop: 4 }}>
          {tags.slice(0, 5).map(t => (
            <span key={t} className="mono" style={{
              fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase',
              padding: '3px 7px 2px',
              background: 'var(--cream-2)',
              borderRadius: 999,
              color: 'var(--ink-soft)',
            }}>{t}</span>
          ))}
          {tags.length > 5 && (
            <span className="mono" style={{ fontSize: 10, color: 'var(--ink-mute)', padding: '3px 4px' }}>+{tags.length - 5}</span>
          )}
        </div>
      )}

      {/* tiny corner index (passport entry no.) */}
      <span className="mono" style={{
        position: 'absolute', top: 14, right: 14, fontSize: 9, color: 'var(--ink-mute)', opacity: isClosed ? 0 : 0.5,
      }}>{String(idx + 1).padStart(3, '0')}</span>
    </article>
  );
}

// ---------- Passport stamp (decorative circular) ----------
function PassportStamp({ city, count, rotation = -8, size = 130, color = 'var(--oxblood)' }) {
  const date = new Date();
  return (
    <div style={{
      width: size, height: size,
      transform: `rotate(${rotation}deg)`,
      display: 'inline-block',
      flexShrink: 0,
    }}>
      <svg viewBox="0 0 130 130" width={size} height={size} style={{ display: 'block' }}>
        <defs>
          <path id={`circle-${city.replace(/\s/g,'')}-${rotation}`} d="M 65, 65 m -48, 0 a 48,48 0 1,1 96,0 a 48,48 0 1,1 -96,0" />
        </defs>
        <circle cx="65" cy="65" r="58" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
        <circle cx="65" cy="65" r="52" fill="none" stroke={color} strokeWidth="2.2" />
        <circle cx="65" cy="65" r="34" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
        <text fill={color} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, letterSpacing: '0.3em', textTransform: 'uppercase' }}>
          <textPath href={`#circle-${city.replace(/\s/g,'')}-${rotation}`} startOffset="0%">VISITED · DINED · LOVED ·</textPath>
        </text>
        <text x="65" y="58" textAnchor="middle" fill={color} style={{ fontFamily: "'Instrument Serif', serif", fontSize: 22, fontWeight: 400 }}>
          {city.toUpperCase()}
        </text>
        <text x="65" y="76" textAnchor="middle" fill={color} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.2em' }}>
          ×{count}
        </text>
        <line x1="35" y1="84" x2="95" y2="84" stroke={color} strokeWidth="0.8" opacity="0.5" />
        <text x="65" y="95" textAnchor="middle" fill={color} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 6.5, letterSpacing: '0.25em' }}>
          C &amp; C
        </text>
      </svg>
    </div>
  );
}

// expose
Object.assign(window, {
  Section, Chip, StatCard, RestaurantCard, PassportStamp, FOOD_TAGS, tagsFor,
});
