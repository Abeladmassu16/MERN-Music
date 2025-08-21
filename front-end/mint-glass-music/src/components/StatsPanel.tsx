import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchStatsRequested } from "../features/stats/statsSlice";
import { GlassCard } from "../features/ui/Glass";

export default function StatsPanel() {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((s) => s.stats);

  useEffect(() => {
    dispatch(fetchStatsRequested());
  }, [dispatch]);

  const byGenre = data?.byGenre ?? {}; // ✅ guard against null/undefined

  return (
    <GlassCard style={{ padding: 16 }}>
      <h2 style={{ marginTop: 0 }}>Statistics</h2>
      {loading && <div>Loading…</div>}
      {error && <div style={{ color: "#b91c1c" }}>Error: {error}</div>}
      {data && (
        <div
          style={{
            display: "grid",
            gap: 12,
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          }}
        >
          <Stat label="Total songs" value={data.totalSongs ?? 0} />
          {typeof data.avgDurationSec === "number" && (
            <Stat
              label="Avg duration"
              value={`${Math.round(data.avgDurationSec)}s`}
            />
          )}
          {Object.entries(byGenre).map(([g, n]) => (
            <Stat key={g} label={`# ${g}`} value={n as number} />
          ))}
        </div>
      )}
    </GlassCard>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.7)",
        borderRadius: 14,
        padding: 12,
        display: "grid",
        gap: 2,
      }}
    >
      <div style={{ fontSize: 12, opacity: 0.7 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 800 }}>{value}</div>
    </div>
  );
}
