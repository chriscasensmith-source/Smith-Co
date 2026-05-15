// ─────────────────────────────────────────────────────────────────────────
//  Page sections for the Restaurant Passport
// ─────────────────────────────────────────────────────────────────────────

// ============ HERO ============
function Hero({ data, stats }) {
  return (
    <header className="wrap hero" style={{
      position: 'relative',
      padding: '64px 40px 40px',
    }}>
      {/* top meta bar */}
      <div className="hero-meta" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 56, gap: 16, flexWrap: 'wrap' }}>
        <div className="mono" style={{ fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--ink-mute)' }}>
          Smith Restaurant Co. · Est. for two
        </div>
        <div className="mono" style={{ fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--ink-mute)' }}>
          Vol. I · {stats.total} entries
        </div>
      </div>

      {/* Main hero layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 48, alignItems: 'end' }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: 18 }}>— A private dining archive</div>
          <h1 className="serif hero-title" style={{
            fontSize: 'clamp(48px, 11vw, 168px)',
            lineHeight: 0.88,
            letterSpacing: '-0.025em',
            margin: 0,
            fontWeight: 400,
          }}>
            Chris &amp;<br/>
            <span style={{ fontStyle: 'italic', color: 'var(--oxblood)' }}>Charlotte's</span><br/>
            Restaurant<br/>
            Passport.
          </h1>
          <p className="hero-lead" style={{
            fontSize: 19,
            lineHeight: 1.5,
            maxWidth: 560,
            color: 'var(--ink-soft)',
            marginTop: 32,
          }}>
            Every table we&rsquo;ve pulled out a chair at, every dish worth remembering, and every
            neighborhood we&rsquo;ve called &ldquo;our spot.&rdquo; Five hundred and counting.
          </p>
        </div>
      </div>

      {/* Stat strip */}
      <div className="hero-stats" style={{
        marginTop: 64,
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        gap: 14,
      }}>
        <StatCard big value={stats.total} label="Restaurants" sub="Visited together" accent="oxblood" />
        <StatCard value={stats.cities} label="Cities" sub="Across the map" accent="forest" />
        <StatCard value={stats.neighborhoods} label="Neighborhoods" sub="On the record" accent="saffron" />
        <StatCard value={stats.withItems} label="Food notes" sub="Dishes remembered" accent="terracotta" />
        <StatCard value={stats.closed} label="Gone" sub="But not forgotten" accent="oxblood" />
        <StatCard value={stats.mainRegion} label="Home base" sub={`${Math.round(stats.mainRegionPct)}% of all entries`} accent="forest" />
      </div>

      <style>{`
        .hero { padding-left: 40px; padding-right: 40px; }
        @media (max-width: 1100px) {
          .hero-stats { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 900px) {
          .hero { padding: 40px 24px 24px !important; }
          .hero-meta { margin-bottom: 36px !important; }
        }
        @media (max-width: 600px) {
          .hero { padding: 28px 18px 18px !important; }
          .hero-stats { grid-template-columns: repeat(2, 1fr) !important; gap: 10px !important; margin-top: 44px !important; }
          .hero-meta { margin-bottom: 24px !important; gap: 6px !important; }
          .hero-meta > div { font-size: 10px !important; }
          .hero-lead { font-size: 16px !important; margin-top: 20px !important; }
          .hero-title { font-size: clamp(42px, 14vw, 84px) !important; }
        }
      `}</style>
    </header>
  );
}

// ============ CITIES & TRAVEL ============
function CitiesSection({ data, stats }) {
  const cityCounts = stats.cityCounts;
  const home = cityCounts[0]; // DFW
  const travel = cityCounts.slice(1);

  // pick stamp rotation per city
  const rotations = [-8, 5, -3, 9, -6, 4, -10, 7, -4, 2, -7, 6, -2, 8, -5, 3, -9, 1, -6, 4, -3];

  return (
    <Section
      id="cities"
      eyebrow="Section 01"
      title="Where the table sat."
      sub="One home base, twenty-one passport stamps. Each stamp earned with a fork."
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 1.4fr', gap: 48, alignItems: 'start' }} className="cities-grid">
        {/* Home base card */}
        <div className="home-base-card" style={{
          background: 'var(--ink)',
          color: 'var(--paper)',
          borderRadius: 18,
          padding: '36px 36px 32px',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-card)',
          minHeight: 480,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          <div>
            <div className="mono" style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(251,246,234,0.55)' }}>
              Home Base · DFW
            </div>
            <div className="serif home-base-number" style={{
              fontSize: 'clamp(96px, 12vw, 168px)',
              lineHeight: 0.85,
              letterSpacing: '-0.03em',
              margin: '28px 0 0',
              color: 'var(--saffron)',
            }}>{home.count}</div>
            <div style={{ marginTop: 12, fontSize: 16, color: 'rgba(251,246,234,0.75)', maxWidth: 320 }}>
              spots between Dallas, Fort Worth, and everywhere in between &mdash; {Math.round((home.count / stats.total) * 100)}% of the whole archive.
            </div>
          </div>

          {/* mini bar chart of top neighborhoods inside DFW */}
          <div style={{ marginTop: 32 }}>
            <div className="mono" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(251,246,234,0.45)', marginBottom: 12 }}>
              Top DFW neighborhoods
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {stats.dfwNeighborhoods.slice(0, 6).map(([name, count]) => {
                const max = stats.dfwNeighborhoods[0][1];
                return (
                  <div key={name} style={{ display: 'grid', gridTemplateColumns: '110px 1fr 28px', alignItems: 'center', gap: 12 }}>
                    <div style={{ fontSize: 12.5, color: 'var(--paper)' }}>{name}</div>
                    <div style={{ height: 6, background: 'rgba(251,246,234,0.12)', borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{ width: `${(count / max) * 100}%`, height: '100%', background: 'var(--saffron)' }}></div>
                    </div>
                    <div className="mono" style={{ fontSize: 11, color: 'rgba(251,246,234,0.7)', textAlign: 'right' }}>{count}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Travel stamps grid */}
        <div>
          <div className="mono" style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-mute)', marginBottom: 24 }}>
            The travel stamps · {travel.length} cities
          </div>
          <div className="stamps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '32px 16px', justifyItems: 'center' }}>
            {travel.map((c, i) => (
              <PassportStamp
                key={c.city}
                city={c.city}
                count={c.count}
                rotation={rotations[i % rotations.length]}
                color={i % 3 === 0 ? 'var(--oxblood)' : i % 3 === 1 ? 'var(--forest)' : 'var(--saffron-deep)'}
              />
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 1000px) { .cities-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </Section>
  );
}

// ============ NEIGHBORHOOD EXPLORER ============
function NeighborhoodSection({ data, stats }) {
  const topN = stats.topNeighborhoods.slice(0, 16);
  const max = topN[0][1];

  return (
    <Section
      id="neighborhoods"
      eyebrow="Section 02"
      title={<>The neighborhoods <em style={{ fontStyle: 'italic', color: 'var(--oxblood)' }}>we know by heart.</em></>}
      sub="Where the regulars regular. Listed by frequency, not preference — though there's overlap."
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }} className="nb-grid">
        {topN.map(([name, count], i) => {
          const accents = ['var(--oxblood)', 'var(--saffron-deep)', 'var(--forest)', 'var(--terracotta)'];
          const accent = accents[i % 4];
          return (
            <div key={name} style={{
              background: 'var(--paper)',
              border: '1px solid var(--rule-soft)',
              borderRadius: 10,
              padding: '18px 18px 16px',
              boxShadow: 'var(--shadow)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div className="mono" style={{ fontSize: 9.5, letterSpacing: '0.2em', color: 'var(--ink-mute)' }}>
                №{String(i + 1).padStart(2, '0')}
              </div>
              <div className="serif" style={{ fontSize: 24, lineHeight: 1.1, margin: '6px 0 12px', fontWeight: 400, letterSpacing: '-0.005em' }}>
                {name}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span className="serif" style={{ fontSize: 38, color: accent, fontWeight: 400, lineHeight: 1 }}>{count}</span>
                <span style={{ fontSize: 12, color: 'var(--ink-mute)' }}>spots</span>
              </div>
              {/* mini bar */}
              <div style={{ height: 3, background: 'var(--cream-2)', borderRadius: 2, marginTop: 14, overflow: 'hidden' }}>
                <div style={{ width: `${(count / max) * 100}%`, height: '100%', background: accent }}></div>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: 24, textAlign: 'center', color: 'var(--ink-mute)', fontSize: 13, fontStyle: 'italic' }}>
        · plus {stats.totalNeighborhoods - topN.length} more neighborhoods with one or two visits ·
      </div>
      <style>{`
        @media (max-width: 1000px) { .nb-grid { grid-template-columns: repeat(2, 1fr) !important; } }
      `}</style>
    </Section>
  );
}

// ============ RESTAURANT CARDS + FILTERS ============
function RestaurantsSection({ data, stats, accent }) {
  const [city, setCity] = useState('All');
  const [neighborhood, setNeighborhood] = useState('All');
  const [status, setStatus] = useState('All'); // All | Open | Closed
  const [hasNotes, setHasNotes] = useState(false);
  const [tag, setTag] = useState('All');
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(24);

  const allCities = useMemo(() => ['All', ...stats.cityCounts.map(c => c.city)], [stats]);
  const allNeighborhoods = useMemo(() => {
    if (city === 'All') return ['All', ...stats.topNeighborhoods.map(([n]) => n)];
    const set = new Set();
    for (const r of data) {
      if (r.city === city && r.neighborhood) set.add(r.neighborhood);
    }
    return ['All', ...[...set].sort()];
  }, [city, data, stats]);

  const filtered = useMemo(() => {
    return data.filter(r => {
      if (city !== 'All' && r.city !== city) return false;
      if (neighborhood !== 'All' && r.neighborhood !== neighborhood) return false;
      if (status === 'Open' && /closed/i.test(r.status)) return false;
      if (status === 'Closed' && !/closed/i.test(r.status)) return false;
      if (hasNotes && !r.items) return false;
      if (tag !== 'All') {
        const tdef = FOOD_TAGS.find(t => t.tag === tag);
        if (!tdef || !tdef.match.test(r.items || '')) return false;
      }
      if (query) {
        const q = query.toLowerCase();
        const hay = (r.name + ' ' + r.items + ' ' + r.city + ' ' + r.neighborhood).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [data, city, neighborhood, status, hasNotes, tag, query]);

  useEffect(() => { setLimit(24); }, [city, neighborhood, status, hasNotes, tag, query]);
  useEffect(() => { setNeighborhood('All'); }, [city]);

  return (
    <Section
      id="restaurants"
      eyebrow="Section 03"
      title={<>The book of <em style={{ fontStyle: 'italic', color: 'var(--oxblood)' }}>every place.</em></>}
      sub={`Each tile is a memory we filed away. Filter by city, by what's still open, or by the dish you're craving.`}
    >
      {/* Filter bar */}
      <div className="filter-bar" style={{
        background: 'var(--paper)',
        border: '1px solid var(--rule-soft)',
        borderRadius: 14,
        padding: '18px 20px 18px',
        boxShadow: 'var(--shadow)',
        marginBottom: 28,
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
      }}>
        {/* Row 1: search + status */}
        <div className="filter-row-1" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: '1 1 240px', position: 'relative' }}>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search restaurants, dishes, neighborhoods…"
              style={{
                width: '100%',
                background: 'var(--cream)',
                border: '1px solid var(--rule-soft)',
                borderRadius: 10,
                padding: '10px 14px 10px 38px',
                fontSize: 14,
                fontFamily: 'inherit',
                color: 'var(--ink)',
                outline: 'none',
              }}
            />
            <svg width="14" height="14" viewBox="0 0 14 14" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>
              <circle cx="6" cy="6" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
              <line x1="9.5" y1="9.5" x2="12.5" y2="12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </div>
          <div className="filter-segmented">
            <SegmentedControl
              options={['All', 'Open', 'Closed']}
              value={status}
              onChange={setStatus}
            />
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--ink-soft)', cursor: 'pointer', userSelect: 'none' }}>
            <input
              type="checkbox"
              checked={hasNotes}
              onChange={e => setHasNotes(e.target.checked)}
              style={{ accentColor: 'var(--oxblood)', width: 16, height: 16, margin: 0 }}
            />
            Has food notes
          </label>
          <div className="mono results-count" style={{ marginLeft: 'auto', fontSize: 13, color: 'var(--ink-mute)' }}>
            <span style={{ color: 'var(--ink)' }}>{filtered.length}</span> / {data.length} results
          </div>
        </div>
        {/* Row 2: cities chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {allCities.map(c => (
            <Chip
              key={c}
              active={city === c}
              onClick={() => setCity(c)}
              count={c === 'All' ? data.length : stats.cityCounts.find(x => x.city === c)?.count}
            >{c}</Chip>
          ))}
        </div>
        {/* Row 3: neighborhood (if applicable) */}
        {allNeighborhoods.length > 2 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
            <span className="eyebrow" style={{ marginRight: 6 }}>Neighborhood</span>
            {allNeighborhoods.map(n => (
              <Chip key={n} active={neighborhood === n} onClick={() => setNeighborhood(n)}>{n}</Chip>
            ))}
          </div>
        )}
        {/* Row 4: food tag chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
          <span className="eyebrow" style={{ marginRight: 6 }}>Craving</span>
          <Chip active={tag === 'All'} onClick={() => setTag('All')}>Any dish</Chip>
          {FOOD_TAGS
            .map(t => ({ ...t, count: data.filter(r => t.match.test(r.items || '')).length }))
            .filter(t => t.count >= 4)
            .sort((a, b) => b.count - a.count)
            .map(t => (
              <Chip key={t.tag} active={tag === t.tag} onClick={() => setTag(t.tag)} count={t.count}>
                {t.tag}
              </Chip>
            ))}
        </div>
      </div>

      {/* Cards grid */}
      {filtered.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '64px 20px',
          background: 'var(--paper)',
          border: '1px dashed var(--rule)',
          borderRadius: 14,
          color: 'var(--ink-mute)',
        }}>
          <div className="serif" style={{ fontSize: 32, color: 'var(--ink)', marginBottom: 6 }}>No matching spots.</div>
          <div style={{ fontSize: 14 }}>Try loosening the filters — or maybe it's time for a new restaurant.</div>
        </div>
      ) : (
        <>
          <div className="rest-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
            gap: 14,
          }}>
            {filtered.slice(0, limit).map((r, i) => (
              <RestaurantCard key={r.name + i} r={r} idx={i} accent={accent} />
            ))}
          </div>
          {filtered.length > limit && (
            <div style={{ marginTop: 28, display: 'flex', justifyContent: 'center' }}>
              <button
                onClick={() => setLimit(l => l + 36)}
                style={{
                  background: 'var(--ink)',
                  color: 'var(--paper)',
                  border: 'none',
                  borderRadius: 999,
                  padding: '12px 24px',
                  fontSize: 13,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  fontFamily: 'JetBrains Mono, monospace',
                  cursor: 'pointer',
                }}
              >
                Show {Math.min(36, filtered.length - limit)} more · {filtered.length - limit} remaining
              </button>
            </div>
          )}
        </>
      )}
    </Section>
  );
}

function SegmentedControl({ options, value, onChange }) {
  return (
    <div style={{
      display: 'inline-flex',
      background: 'var(--cream-2)',
      borderRadius: 999,
      padding: 3,
      gap: 2,
    }}>
      {options.map(o => (
        <button
          key={o}
          onClick={() => onChange(o)}
          style={{
            border: 'none',
            background: value === o ? 'var(--paper)' : 'transparent',
            color: value === o ? 'var(--ink)' : 'var(--ink-mute)',
            fontSize: 12.5,
            fontWeight: 500,
            padding: '6px 14px',
            borderRadius: 999,
            cursor: 'pointer',
            fontFamily: 'inherit',
            transition: 'all 0.15s ease',
            boxShadow: value === o ? '0 1px 2px rgba(31,26,20,0.1)' : 'none',
          }}
        >{o}</button>
      ))}
    </div>
  );
}

// ============ FOOD MEMORIES ============
function FoodMemoriesSection({ data, stats }) {
  // Tag count list with sizing
  const tagList = FOOD_TAGS
    .map(t => ({ ...t, count: data.filter(r => t.match.test(r.items || '')).length }))
    .filter(t => t.count > 0)
    .sort((a, b) => b.count - a.count);

  const maxCount = tagList[0]?.count || 1;

  // Pull some random standout dish snippets
  const dishSnippets = useMemo(() => {
    const all = data.filter(r => r.items && r.items.length > 30 && r.items.length < 200);
    const picks = [];
    const used = new Set();
    // Seed: try to grab a variety of cities
    const cities = [...new Set(all.map(r => r.city))];
    for (const c of cities) {
      const candidates = all.filter(r => r.city === c);
      if (candidates.length && picks.length < 8) {
        const r = candidates[Math.floor(candidates.length / 2)];
        if (!used.has(r.name)) {
          picks.push(r);
          used.add(r.name);
        }
      }
    }
    return picks;
  }, [data]);

  return (
    <Section
      id="memories"
      eyebrow="Section 04"
      title={<>The dishes <em style={{ fontStyle: 'italic', color: 'var(--oxblood)' }}>we couldn't shut up about.</em></>}
      sub={`Pulled straight from the "Items Eaten" column — every bite worth writing down.`}
    >
      {/* Tag cloud */}
      <div style={{
        background: 'var(--paper)',
        border: '1px solid var(--rule-soft)',
        borderRadius: 16,
        padding: '36px 32px 32px',
        marginBottom: 32,
        boxShadow: 'var(--shadow)',
      }}>
        <div className="mono" style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-mute)', marginBottom: 22 }}>
          The cravings index · ranked by mentions
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 14px', alignItems: 'baseline' }}>
          {tagList.map(t => {
            const scale = 0.55 + (t.count / maxCount) * 1.35;
            return (
              <span key={t.tag} className="serif" style={{
                fontSize: `${scale}em`,
                lineHeight: 1.1,
                color: t.count > maxCount * 0.5 ? 'var(--oxblood)' : t.count > maxCount * 0.2 ? 'var(--ink)' : 'var(--ink-soft)',
                fontStyle: t.count > maxCount * 0.6 ? 'italic' : 'normal',
                marginRight: 6,
                position: 'relative',
              }}>
                {t.tag}
                <sup className="mono" style={{
                  fontSize: '10px',
                  color: 'var(--ink-mute)',
                  marginLeft: 4,
                  fontStyle: 'normal',
                  fontWeight: 500,
                  verticalAlign: 'super',
                }}>{t.count}</sup>
              </span>
            );
          })}
        </div>
      </div>

      {/* "Pulled quotes" — a few dish memories */}
      <div className="eyebrow" style={{ marginBottom: 18 }}>— Postcards from the table</div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
        gap: 14,
      }}>
        {dishSnippets.map((r, i) => {
          const colors = ['var(--oxblood)', 'var(--forest)', 'var(--saffron-deep)', 'var(--terracotta)'];
          const color = colors[i % colors.length];
          return (
            <div key={r.name + i} style={{
              background: 'var(--paper)',
              border: '1px solid var(--rule-soft)',
              borderRadius: 10,
              padding: '20px 22px 20px',
              boxShadow: 'var(--shadow)',
              borderTop: `4px solid ${color}`,
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              minHeight: 180,
            }}>
              <div className="serif" style={{ fontSize: 16, lineHeight: 1.4, color: 'var(--ink)', fontStyle: 'italic' }}>
                &ldquo;{r.items}&rdquo;
              </div>
              <div style={{ marginTop: 'auto', paddingTop: 10, borderTop: '1px dashed var(--rule)' }}>
                <div className="serif" style={{ fontSize: 18, color, fontWeight: 400 }}>{r.name}</div>
                <div className="mono" style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-mute)', marginTop: 2 }}>
                  {r.city}{r.neighborhood ? ' · ' + r.neighborhood : ''}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

// ============ GONE BUT NOT FORGOTTEN ============
function ClosedSection({ data, stats }) {
  const closed = data.filter(r => /closed/i.test(r.status));
  // group by city
  const byCity = {};
  for (const r of closed) {
    (byCity[r.city] = byCity[r.city] || []).push(r);
  }
  const groups = Object.entries(byCity).sort((a, b) => b[1].length - a[1].length);

  return (
    <Section
      id="closed"
      eyebrow="Section 05"
      title={<>Gone but <em style={{ fontStyle: 'italic', color: 'var(--saffron)' }}>not forgotten.</em></>}
      sub={`${closed.length} restaurants that have shuttered, packed up, or moved on. We poured one out for each.`}
      dark
    >
      <div className="closed-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
        gap: 14,
      }}>
        {groups.map(([city, list]) => (
          <div key={city} style={{
            background: 'rgba(251,246,234,0.04)',
            border: '1px solid rgba(251,246,234,0.12)',
            borderRadius: 12,
            padding: '20px 22px 18px',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <div className="serif" style={{ fontSize: 22, color: 'var(--paper)', fontWeight: 400 }}>{city}</div>
              <div className="mono" style={{ fontSize: 10, letterSpacing: '0.2em', color: 'rgba(251,246,234,0.5)' }}>
                ×{list.length}
              </div>
            </div>
            <div style={{ height: 1, background: 'rgba(251,246,234,0.12)' }}></div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {list.map((r, i) => (
                <li key={r.name + i} style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'baseline' }}>
                  <span style={{
                    color: 'rgba(251,246,234,0.85)',
                    fontSize: 14,
                    fontStyle: 'italic',
                    textDecoration: 'line-through',
                    textDecorationColor: 'rgba(212,155,44,0.5)',
                    textDecorationThickness: '1px',
                  }}>{r.name}</span>
                  {r.neighborhood && (
                    <span className="mono" style={{ fontSize: 9.5, letterSpacing: '0.14em', color: 'rgba(251,246,234,0.4)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                      {r.neighborhood}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ============ HALL OF FAME (placeholders) ============
function HallOfFameSection() {
  const slots = [
    { title: 'Best Overall', sub: 'The forever favorite', icon: '★' },
    { title: 'Best Date Night', sub: 'Low lights, good wine', icon: '♥' },
    { title: 'Best Casual Bite', sub: 'Tuesday-night easy', icon: '◐' },
    { title: 'Best Brunch', sub: 'Mimosa-required', icon: '☼' },
    { title: 'Best Sushi', sub: 'Omakase contender', icon: '⌘' },
    { title: 'Best Cocktail Spot', sub: 'Bartender knows us', icon: '♢' },
    { title: 'Worth a Return', sub: 'Going back soon', icon: '↻' },
    { title: 'One and Done', sub: 'Once was enough', icon: '✕' },
    { title: 'Hidden Gem', sub: 'The under-the-radar one', icon: '◇' },
  ];
  return (
    <Section
      id="hall-of-fame"
      eyebrow="Section 06"
      title={<>The Hall of Fame, <em style={{ fontStyle: 'italic', color: 'var(--oxblood)' }}>awaiting nominations.</em></>}
      sub="Nine plaques mounted on the wall — but the brass is blank until ratings start coming in. Drop a star into your spreadsheet and we'll engrave the rest."
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 14,
      }} className="hof-grid">
        {slots.map((s, i) => (
          <div key={s.title} style={{
            background: 'var(--paper)',
            border: '1px dashed var(--rule)',
            borderRadius: 12,
            padding: '26px 24px 24px',
            position: 'relative',
            minHeight: 200,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            boxShadow: 'var(--shadow)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div className="mono" style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-mute)' }}>
                Award №{String(i + 1).padStart(2, '0')}
              </div>
              <div className="serif" style={{ fontSize: 30, color: 'var(--oxblood)', lineHeight: 1, opacity: 0.5 }}>{s.icon}</div>
            </div>
            <div>
              <h3 className="serif" style={{ fontSize: 28, lineHeight: 1.05, margin: '0 0 4px', fontWeight: 400, letterSpacing: '-0.005em' }}>
                {s.title}
              </h3>
              <div style={{ fontSize: 13, color: 'var(--ink-mute)' }}>{s.sub}</div>
            </div>
            {/* engraving placeholder */}
            <div style={{
              marginTop: 'auto',
              padding: '14px 16px',
              background: 'var(--cream-2)',
              borderRadius: 8,
              border: '1px solid var(--rule-soft)',
              fontSize: 12,
              color: 'var(--ink-mute)',
              fontStyle: 'italic',
              textAlign: 'center',
              fontFamily: 'Instrument Serif, serif',
            }}>
              — to be engraved —
            </div>
          </div>
        ))}
      </div>
      <style>{`
        @media (max-width: 900px) { .hof-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </Section>
  );
}

// ============ DATA CLEANUP RECOMMENDATIONS ============
function CleanupSection({ data, cleanupIssues }) {
  const newColumns = [
    { col: 'Visit Date', why: 'Anchor every memory in time. Enables a "this month last year" timeline.', priority: 1 },
    { col: 'Cuisine', why: 'Right now we infer cuisine from food notes — a proper column unlocks accurate filters.', priority: 1 },
    { col: 'Occasion', why: 'Birthday, anniversary, random Tuesday — context turns a meal into a memory.', priority: 2 },
    { col: 'Vibe', why: 'Date night / casual / special / business / brunchy. The mood of the room.', priority: 2 },
    { col: 'Would Return?', why: 'A one-question filter that surfaces "where should we eat tonight?"', priority: 1 },
    { col: 'Charlotte Rating', why: 'Her score, her stars. (1–10 or 1–5.)', priority: 1 },
    { col: 'Chris Rating', why: 'Your score. Pair these and you can spot the disagreements.', priority: 1 },
    { col: 'Overall Rating', why: 'Average of the two — powers the Hall of Fame.', priority: 1 },
    { col: 'Best Dish', why: 'One standout item per visit. Becomes a "Greatest Hits" gallery.', priority: 2 },
    { col: 'Cocktail Rating', why: 'Separate from food — the bar program is its own thing.', priority: 3 },
    { col: 'Service Rating', why: 'Worth tracking; pairs nicely with the existing Staff column.', priority: 3 },
    { col: 'Price Range', why: '$ / $$ / $$$ / $$$$. Filters by budget. Important for big-night planning.', priority: 2 },
    { col: 'Reservation Needed', why: 'Quick toggle. Saves us a phone call.', priority: 3 },
    { col: 'Patio?', why: 'Useful 9 months a year in Texas.', priority: 3 },
    { col: 'Memory or Story', why: 'The "what happened that night" field. Personal column gets richer over time.', priority: 2 },
    { col: 'Photo Link', why: 'Drop a Drive/Photos URL — the dashboard could render thumbnails per entry.', priority: 2 },
  ];

  return (
    <Section
      id="cleanup"
      eyebrow="Section 07"
      title={<>How to make this <em style={{ fontStyle: 'italic', color: 'var(--oxblood)' }}>even better.</em></>}
      sub="The spreadsheet is already rich — but a handful of new columns would unlock entire new sections of this dashboard."
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24, alignItems: 'start' }} className="cleanup-grid">
        {/* New columns to add */}
        <div className="cleanup-card" style={{
          background: 'var(--paper)',
          border: '1px solid var(--rule-soft)',
          borderRadius: 14,
          padding: '28px 28px 24px',
          boxShadow: 'var(--shadow)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14, flexWrap: 'wrap', gap: 8 }}>
            <h3 className="serif" style={{ fontSize: 28, margin: 0, fontWeight: 400 }}>Columns worth adding</h3>
            <div className="mono" style={{ fontSize: 10, letterSpacing: '0.2em', color: 'var(--ink-mute)', textTransform: 'uppercase' }}>
              16 suggestions
            </div>
          </div>
          <div style={{ display: 'flex', gap: 6, marginBottom: 16, fontSize: 11.5, flexWrap: 'wrap' }}>
            <span className="mono" style={{ color: 'var(--oxblood)' }}>● High</span>
            <span className="mono" style={{ color: 'var(--saffron-deep)' }}>● Medium</span>
            <span className="mono" style={{ color: 'var(--ink-mute)' }}>● Nice-to-have</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {newColumns.map((c, i) => (
              <div key={c.col} className="cleanup-row" style={{
                display: 'grid',
                gridTemplateColumns: '14px 180px 1fr',
                gap: 14,
                alignItems: 'baseline',
                padding: '12px 0',
                borderTop: i === 0 ? '1px solid var(--rule-soft)' : '1px solid var(--rule-soft)',
                borderBottom: i === newColumns.length - 1 ? '1px solid var(--rule-soft)' : 'none',
              }}>
                <span className="cleanup-dot" style={{
                  width: 8, height: 8, borderRadius: 99,
                  background: c.priority === 1 ? 'var(--oxblood)' : c.priority === 2 ? 'var(--saffron-deep)' : 'var(--ink-mute)',
                  marginTop: 6,
                }}></span>
                <span className="serif cleanup-col" style={{ fontSize: 18, fontWeight: 400 }}>{c.col}</span>
                <span className="cleanup-why" style={{ fontSize: 13.5, color: 'var(--ink-soft)', lineHeight: 1.45 }}>{c.why}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Issues flagged */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
        }}>
          <div style={{
            background: 'var(--ink)',
            color: 'var(--paper)',
            borderRadius: 14,
            padding: '24px 26px 22px',
          }}>
            <div className="eyebrow" style={{ color: 'rgba(251,246,234,0.55)', marginBottom: 10 }}>— Cleanup flags</div>
            <h3 className="serif" style={{ fontSize: 24, margin: '0 0 14px', fontWeight: 400 }}>What I noticed</h3>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {cleanupIssues.map((iss, i) => (
                <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 13.5, lineHeight: 1.5, color: 'rgba(251,246,234,0.8)' }}>
                  <span className="mono" style={{ color: 'var(--saffron)', fontSize: 11, marginTop: 2, flexShrink: 0 }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{iss}</span>
                </li>
              ))}
            </ul>
          </div>

          <div style={{
            background: 'var(--paper)',
            border: '1px solid var(--rule-soft)',
            borderRadius: 14,
            padding: '24px 26px 22px',
          }}>
            <div className="eyebrow" style={{ marginBottom: 10 }}>— What today's data supports</div>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13.5, color: 'var(--ink-soft)', lineHeight: 1.5 }}>
              <li>✓ Restaurant count, city coverage, and travel patterns</li>
              <li>✓ Neighborhood density and "regulars" heatmap</li>
              <li>✓ Dish-level food tags via fuzzy match on Items Eaten</li>
              <li>✓ Closed-restaurant memorial wall</li>
              <li>– Ratings, awards, dined-with: too sparse to power dashboards yet</li>
              <li>– No dates yet: timeline / "first visit" features pending</li>
            </ul>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1000px) { .cleanup-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </Section>
  );
}

// ============ FOOTER ============
function Footer() {
  return (
    <footer className="om-footer" style={{
      padding: '64px 40px 56px',
      maxWidth: 1280,
      margin: '0 auto',
      borderTop: '1px solid var(--rule)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      flexWrap: 'wrap',
      gap: 20,
    }}>
      <div>
        <div className="serif" style={{ fontSize: 32, lineHeight: 1, fontWeight: 400 }}>
          Smith &amp; <span style={{ fontStyle: 'italic', color: 'var(--oxblood)' }}>Co.</span>
        </div>
        <div className="mono" style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-mute)', marginTop: 8 }}>
          A private dining archive · Vol. I
        </div>
      </div>
      <div className="mono" style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-mute)' }}>
        Compiled with love · Keep adding tables
      </div>
    </footer>
  );
}

Object.assign(window, {
  Hero, CitiesSection, NeighborhoodSection, RestaurantsSection,
  FoodMemoriesSection, ClosedSection, HallOfFameSection, CleanupSection, Footer,
});
