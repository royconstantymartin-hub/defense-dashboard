import { FALLBACK_API_DATA } from "@/data/fallbackApiData";

const players = [...FALLBACK_API_DATA.defense_players]
  .sort((a, b) => b.market_cap - a.market_cap)
  .slice(0, 30);

const expenditures = [...FALLBACK_API_DATA.expenditures]
  .filter((entry) => entry.year === 2024)
  .sort((a, b) => b.expenditure - a.expenditure)
  .slice(0, 30);

const announcements = [...FALLBACK_API_DATA.announcements].slice(0, 12);

export const FALLBACK_DASHBOARD_DATA = {
  stats: {
    total_market_cap: players.reduce((sum, player) => sum + player.market_cap, 0),
    total_expenditure: expenditures.reduce((sum, row) => sum + row.expenditure, 0),
    expenditure_year: 2024,
    players_count: players.length,
    ma_count: FALLBACK_API_DATA.ma_activities.length,
  },
  players,
  announcements,
  expenditures,
  dataQuality: {
    source_provider: FALLBACK_API_DATA.data_quality.source_provider,
    dataset_policy: FALLBACK_API_DATA.data_quality.dataset_policy,
    coverage: {
      products: FALLBACK_API_DATA.products.length,
      defense_players: players.length,
      announcements: announcements.length,
    },
  },
};
