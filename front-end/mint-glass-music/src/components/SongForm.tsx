import type { FormEvent, ChangeEvent } from "react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  addSongRequested,
  setEditingSong,
  updateSongRequested,
} from "../features/songs/songSlice";
import { GlassCard, Input, Button } from "../features/ui/Glass";

export default function SongForm() {
  const dispatch = useAppDispatch();
  const editing = useAppSelector((s) => s.songs.editing);

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [genre, setGenre] = useState("");
  const [album, setAlbum] = useState("");
  const [durationSec, setDurationSec] = useState<number | "">("");

  useEffect(() => {
    if (editing) {
      setTitle(editing.title);
      setArtist(editing.artist);
      setGenre(editing.genre);
      setAlbum(editing.album ?? "");
      setDurationSec(editing.durationSec ?? "");
    } else {
      setTitle("");
      setArtist("");
      setGenre("");
      setAlbum("");
      setDurationSec("");
    }
  }, [editing]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const payload = {
      title: title.trim(),
      artist: artist.trim(),
      genre: genre.trim(),
      album: album.trim() || undefined,
      durationSec: durationSec === "" ? undefined : Number(durationSec),
    };
    if (!payload.title || !payload.artist || !payload.genre) return;

    if (editing) {
      dispatch(updateSongRequested({ id: editing.id, data: payload }));
      dispatch(setEditingSong(null));
    } else {
      dispatch(addSongRequested(payload));
    }
  }

  return (
    <GlassCard style={{ padding: 16 }}>
      <form
        onSubmit={onSubmit}
        style={{
          display: "grid",
          gap: 10,
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
        }}
      >
        <label>Title</label>
        <Input
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          placeholder="Song title"
        />

        <label>Artist</label>
        <Input
          value={artist}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setArtist(e.target.value)
          }
          placeholder="Artist name"
        />

        <label>Genre</label>
        <Input
          value={genre}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setGenre(e.target.value)
          }
          placeholder="e.g. Pop"
        />

        <label>Album</label>
        <Input
          value={album}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setAlbum(e.target.value)
          }
          placeholder="(optional)"
        />

        <label>Duration (sec)</label>
        <Input
          type="number"
          min={0}
          value={durationSec}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setDurationSec(e.target.value === "" ? "" : Number(e.target.value))
          }
          placeholder="e.g. 240"
        />

        <div />
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          {editing && (
            <Button
              type="button"
              onClick={() => dispatch(setEditingSong(null))}
            >
              Cancel edit
            </Button>
          )}
          <Button type="submit">{editing ? "Update" : "Add"} song</Button>
        </div>
      </form>
    </GlassCard>
  );
}
