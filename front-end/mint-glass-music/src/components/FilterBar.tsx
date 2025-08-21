import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setFilterGenre } from "../features/songs/songSlice";
import { selectFilterGenre, selectGenres } from "../features/songs/selectors";
import { GlassCard, Select } from "../features/ui/Glass";
import type { ChangeEvent } from "react";

export default function FilterBar() {
  const dispatch = useAppDispatch();
  const genre = useAppSelector(selectFilterGenre);
  const genres = useAppSelector(selectGenres);

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFilterGenre(e.target.value));
  };

  return (
    <GlassCard
      style={{ padding: 12, display: "flex", gap: 12, alignItems: "center" }}
    >
      <label style={{ fontWeight: 600 }}>Filter by genre:</label>
      <Select value={genre} onChange={onChange} style={{ minWidth: 180 }}>
        <option value="">All</option>
        {genres.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </Select>
    </GlassCard>
  );
}
