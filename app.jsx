// ─────────────────────────────────────────────────────────────────────────
//  Main App — computes stats and assembles sections
// ─────────────────────────────────────────────────────────────────────────

function computeStats(data) {
  const cityCounts = {};
  const neighborhoods = {};
  const dfwNeighborhoods = {};
  let withItems = 0, closed = 0;

  for (const r of data) {
    if (r.city) cityCounts[r.city] = (cityCounts[r.city] || 0) + 1;
    if (r.neighborhood) {
      neighborhoods[r.neighborhood] = (neighborhoods[r.neighborhood] || 0) + 1;
      if (r.city === 'DFW') {
        dfwNeighborhoods[r.neighborhood] = (dfwNeighborhoods[r.neighborhood] || 0) + 1;
      }
    }
    if (r.items && r.items.length > 0) withItems++;
    if (/closed/i.test(r.status)) closed++;
  }

  const cityCountsArr = Object.entries(cityCounts)
    .map(([city, count]) => ({ city, count }))
    .sort((a, b) => b.count - a.count);
  const topNeighborhoods = Object.entries(neighborhoods).sort((a, b) => b[1] - a[1]);
  const dfwNh = Object.entries(dfwNeighborhoods).sort((a, b) => b[1] - a[1]);

  return {
    total: data.length,
    cities: cityCountsArr.length,
    neighborhoods: Object.keys(neighborhoods).length,
    totalNeighborhoods: Object.keys(neighborhoods).length,
    withItems,
    closed,
    mainRegion: cityCountsArr[0].city,
    mainRegionPct: (cityCountsArr[0].count / data.length) * 100,
    cityCounts: cityCountsArr,
    topNeighborhoods,
    dfwNeighborhoods: dfwNh,
  };
}

function findCleanupIssues(data) {
  const issues = [];
  // Inconsistent status labels
  const statusVariants = {};
  for (const r of data) {
    const s = r.status;
    if (s) statusVariants[s] = (statusVariants[s] || 0) + 1;
  }
  const sList = Object.entries(statusVariants);
  if (sList.length > 1) {
    issues.push(`Status column uses ${sList.length} variants: ${sList.map(([s, n]) => `"${s}" (${n})`).join(', ')}. Pick one casing — e.g. "Closed" — and convert.`);
  }
  // Trailing-space restaurant names
  const trailing = data.filter(r => r.name && r.name !== r.name.trim());
  if (trailing.length) issues.push(`${trailing.length} restaurant names have trailing whitespace (e.g. "Anamia's ").`);
  // Duplicate restaurant names (case-insensitive, trimmed)
  const seen = {};
  for (const r of data) {
    const k = r.name.toLowerCase().trim();
    if (!k) continue;
    (seen[k] = seen[k] || []).push(r);
  }
  const dupes = Object.entries(seen).filter(([, arr]) => arr.length > 1).slice(0, 5);
  if (dupes.length) {
    const examples = dupes.map(([k, arr]) => `"${arr[0].name.trim()}" (${arr.length}×)`).join(', ');
    issues.push(`Possible duplicate names — same restaurant listed more than once: ${examples}. May be intentional (multiple visits) but worth a glance.`);
  }
  // Capitalization issues — restaurant names with all lowercase first letter
  const lower = data.filter(r => r.name && /^[a-z]/.test(r.name));
  if (lower.length) issues.push(`${lower.length} restaurant names start lowercase (e.g. "${lower[0].name}"). Consider title-casing for consistency.`);
  // Missing neighborhood
  const noNh = data.filter(r => !r.neighborhood);
  issues.push(`${noNh.length} of ${data.length} entries (${Math.round(100 * noNh.length / data.length)}%) are missing a Neighborhood — biggest gap to fill.`);
  // Empty Dined With / Rating / Awards
  issues.push(`The Dined With, Rating, and Awards columns are essentially empty across all ${data.length} rows — they unlock the Hall of Fame once filled.`);
  // City typos
  const cityVariants = ['Fredricksburg', 'Nola', 'OKC', 'San Fran'];
  const found = [...new Set(data.map(r => r.city))].filter(c => cityVariants.includes(c));
  if (found.length) {
    issues.push(`A few city names use shorthand/spelling that could be standardized — e.g. "Fredricksburg" → "Fredericksburg", "Nola" → "New Orleans", "San Fran" → "San Francisco".`);
  }
  return issues;
}

function App() {
  const data = window.RESTAURANT_DATA;
  const stats = useMemo(() => computeStats(data), [data]);
  const cleanupIssues = useMemo(() => findCleanupIssues(data), [data]);

  // Tweaks
  const [t, setTweak] = useTweaks({
    accent: '#7B2C1F',
    showCleanup: true,
    paperGrain: true,
  });

  // apply density to body
  useEffect(() => {
    document.body.style.background = ''; // ensure inherits
    document.body.style.backgroundImage = t.paperGrain
      ? 'radial-gradient(rgba(31,26,20,0.025) 1px, transparent 1px), radial-gradient(rgba(31,26,20,0.018) 1px, transparent 1px)'
      : 'none';
  }, [t.paperGrain]);

  // apply accent to a CSS var
  useEffect(() => {
    document.documentElement.style.setProperty('--oxblood', t.accent);
  }, [t.accent]);

  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
    }}>
      <Hero data={data} stats={stats} />
      <CitiesSection data={data} stats={stats} />
      <SectionDivider />
      <NeighborhoodSection data={data} stats={stats} />
      <SectionDivider />
      <RestaurantsSection data={data} stats={stats} accent={t.accent} />
      <SectionDivider />
      <FoodMemoriesSection data={data} stats={stats} />
      <ClosedSection data={data} stats={stats} />
      <HallOfFameSection />
      {t.showCleanup && (
        <>
          <SectionDivider />
          <CleanupSection data={data} cleanupIssues={cleanupIssues} />
        </>
      )}
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection title="Accent">
          <TweakColor
            label="Primary accent"
            value={t.accent}
            options={['#7B2C1F', '#3C5A3C', '#A8761B', '#C97A50', '#5B4A8E', '#2D5470']}
            onChange={v => setTweak('accent', v)}
          />
        </TweakSection>
        <TweakSection title="Atmosphere">
          <TweakToggle label="Paper grain texture" value={t.paperGrain} onChange={v => setTweak('paperGrain', v)} />
          <TweakToggle label="Show data-cleanup section" value={t.showCleanup} onChange={v => setTweak('showCleanup', v)} />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

function SectionDivider() {
  return (
    <div className="wrap">
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <span style={{ flex: 1, height: 1, background: 'var(--rule)' }}></span>
        <span className="serif" style={{ fontSize: 22, color: 'var(--oxblood)', lineHeight: 1 }}>·</span>
        <span style={{ width: 60, height: 1, background: 'var(--rule)' }}></span>
        <span className="serif" style={{ fontSize: 22, color: 'var(--oxblood)', lineHeight: 1 }}>·</span>
        <span style={{ flex: 1, height: 1, background: 'var(--rule)' }}></span>
      </div>
    </div>
  );
}

// Mount
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
