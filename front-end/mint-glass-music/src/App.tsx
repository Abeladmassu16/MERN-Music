import Layout from "./components/Layout";
import FilterBar from "./components/FilterBar";
import SongForm from "./components/SongForm";
import SongList from "./components/SongList";
import StatsPanel from "./components/StatsPanel";

export default function App() {
  return (
    <Layout>
      <div style={{ display: "grid", gap: 16, gridTemplateColumns: "2fr 1fr" }}>
        <div style={{ display: "grid", gap: 16 }}>
          <FilterBar />
          <SongForm />
          <SongList />
        </div>
        <div>
          <StatsPanel />
        </div>
      </div>
    </Layout>
  );
}
