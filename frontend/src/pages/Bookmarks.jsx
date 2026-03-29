import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "@/App";
import { useAuth } from "@/App";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Bookmark, BookmarkX, ExternalLink, Clock, Newspaper, LogIn } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const CATEGORY_STYLES = {
  CONTRACT:    "bg-emerald-50 text-emerald-700 border-emerald-200",
  TECHNOLOGY:  "bg-purple-50 text-purple-700 border-purple-200",
  CONFLICT:    "bg-red-50 text-red-700 border-red-200",
  POLICY:      "bg-amber-50 text-amber-700 border-amber-200",
  GEOPOLITICS: "bg-sky-50 text-sky-700 border-sky-200",
  "M&A":       "bg-blue-50 text-blue-700 border-blue-200",
  INDUSTRY:    "bg-slate-100 text-slate-600 border-slate-200",
};

export default function Bookmarks() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) { setLoading(false); return; }
    axios
      .get(`${API}/bookmarks`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => setBookmarks(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [token]);

  const removeBookmark = async (url) => {
    // Optimistic
    setBookmarks((prev) => prev.filter((b) => b.article?.url !== url));
    try {
      await axios.delete(`${API}/bookmarks`, {
        params: { url },
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {
      // Silently ignore — the item is already removed from UI
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4 text-slate-500">
        <Bookmark className="w-10 h-10 opacity-30" />
        <p className="font-medium">Connectez-vous pour accéder à vos sauvegardes</p>
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 px-4 py-2 bg-purple-700 text-white rounded-lg text-sm font-medium hover:bg-purple-800 transition-colors"
        >
          <LogIn className="w-4 h-4" /> Se connecter
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-slate-900 tracking-tight">
            Sauvegardes
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Articles mis de côté depuis la veille — {bookmarks.length} article{bookmarks.length !== 1 ? "s" : ""}
          </p>
        </div>
        {bookmarks.length > 0 && (
          <div className="flex items-center gap-2 text-xs text-slate-400 bg-white border border-slate-200 rounded-lg px-3 py-2">
            <Clock className="w-3.5 h-3.5" />
            <span>Sauvegardé{bookmarks.length > 1 ? "s" : ""} récemment en premier</span>
          </div>
        )}
      </div>

      {/* Empty state */}
      {bookmarks.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-slate-400">
          <Bookmark className="w-12 h-12 opacity-25" />
          <p className="font-medium text-slate-500">Aucun article sauvegardé</p>
          <p className="text-sm text-center max-w-xs">
            Depuis la page <strong className="text-slate-600">Actualités</strong>, cliquez sur l'icône
            marque-page d'un article pour le retrouver ici.
          </p>
          <button
            onClick={() => navigate("/announcements")}
            className="mt-2 flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-100 transition-colors border border-purple-200"
          >
            <Newspaper className="w-4 h-4" /> Aller aux actualités
          </button>
        </div>
      )}

      {/* Bookmarks list */}
      {bookmarks.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {bookmarks.map((bookmark) => {
            const art = bookmark.article ?? {};
            const catStyle = CATEGORY_STYLES[art.category] ?? CATEGORY_STYLES.INDUSTRY;
            const savedAgo = bookmark.bookmarkedAt
              ? formatDistanceToNow(new Date(bookmark.bookmarkedAt), { addSuffix: true })
              : null;

            return (
              <Card
                key={bookmark.id}
                className="bg-white border-slate-200 shadow-sm hover:shadow-md hover:border-purple-200 transition-all duration-200 group"
              >
                <CardContent className="p-4 flex flex-col gap-3 h-full">
                  {/* Article image */}
                  {art.image && (
                    <div className="w-full h-32 rounded-md overflow-hidden bg-slate-100 flex-shrink-0">
                      <img
                        src={art.image}
                        alt=""
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.parentElement.style.display = "none"; }}
                      />
                    </div>
                  )}

                  {/* Category + source */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {art.category && (
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border uppercase ${catStyle}`}>
                        {art.category}
                      </span>
                    )}
                    {art.source && (
                      <span className="text-[10px] text-slate-400">{art.source}</span>
                    )}
                  </div>

                  {/* Title */}
                  <p className="text-sm font-semibold text-slate-900 leading-snug flex-1 line-clamp-3">
                    {art.title || "Article sans titre"}
                  </p>

                  {/* Summary */}
                  {art.summary && (
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {art.summary}
                    </p>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Bookmark className="w-3 h-3" />
                      {savedAgo ?? "—"}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => removeBookmark(art.url)}
                        title="Retirer la sauvegarde"
                        className="p-1.5 rounded-md text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-colors"
                      >
                        <BookmarkX className="w-3.5 h-3.5" />
                      </button>
                      {art.url && (
                        <a
                          href={art.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-md text-slate-300 hover:text-purple-600 hover:bg-purple-50 transition-colors"
                          title="Ouvrir l'article"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
