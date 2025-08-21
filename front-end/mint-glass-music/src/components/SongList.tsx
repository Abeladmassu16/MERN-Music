import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  deleteSongRequested,
  fetchSongsRequested,
  setEditingSong,
} from "../features/songs/songSlice";
import { selectFilteredSongs } from "../features/songs/selectors";
import { GlassCard, Button } from "../features/ui/Glass";

export default function SongList() {
  const dispatch = useAppDispatch();
  const songs = useAppSelector(selectFilteredSongs);
  const loading = useAppSelector((s) => s.songs.loading);
  const error = useAppSelector((s) => s.songs.error);

  useEffect(() => {
    dispatch(fetchSongsRequested());
  }, [dispatch]);

  return (
    <GlassCard style={{ padding: 16 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <h2 style={{ margin: 0 }}>Songs</h2>
        {loading && <span>Loading…</span>}
      </div>
      {error && (
        <div style={{ color: "#b91c1c", marginBottom: 10 }}>Error: {error}</div>
      )}
      <div style={{ display: "grid", gap: 10 }}>
        {songs.map((s, idx) => (
          <div
            key={s.id || (s as any)._id || `row-${idx}`} // ✅ stable key
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 120px 160px",
              gap: 8,
              alignItems: "center",
              padding: 12,
              borderRadius: 12,
              background: "rgba(255,255,255,0.66)",
            }}
          >
            <div>
              <strong>{s.title}</strong>{" "}
              <span style={{ opacity: 0.7 }}>— {s.artist}</span>
              {s.album ? (
                <div style={{ opacity: 0.6, fontSize: 12 }}>{s.album}</div>
              ) : null}
            </div>
            <div>{s.genre}</div>
            <div style={{ opacity: 0.7 }}>
              {s.durationSec ? `${s.durationSec}s` : "—"}
            </div>
            <div
              style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}
            >
              <Button onClick={() => dispatch(setEditingSong(s))}>Edit</Button>
              <Button
                style={{ background: "#fecaca" }}
                onClick={() =>
                  dispatch(deleteSongRequested({ id: s.id || (s as any)._id }))
                }
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
        {songs.length === 0 && (
          <div style={{ opacity: 0.7 }}>No songs found.</div>
        )}
      </div>
    </GlassCard>
  );
}
