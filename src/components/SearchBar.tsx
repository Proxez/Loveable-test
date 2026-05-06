import { Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { Sparkles, Loader2, Search as SearchIcon } from "lucide-react";
import { searchPermits } from "@/data/handbook";

type Props = {
  size?: "hero" | "compact";
  initialQuery?: string;
  autoFocus?: boolean;
  enableAi?: boolean;
};

type AiTurn = {
  question: string;
  answer: string;
  citations: { slug: string; title: string; ref: string }[];
};

export function SearchBar({ size = "hero", initialQuery = "", autoFocus, enableAi = false }: Props) {
  const [query, setQuery] = useState(initialQuery);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"search" | "ai">("search");
  const [aiTurns, setAiTurns] = useState<AiTurn[]>([]);
  const [aiLoading, setAiLoading] = useState(false);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => setQuery(initialQuery), [initialQuery]);
  const results = useMemo(() => searchPermits(query).slice(0, 6), [query]);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  async function submitAi(question: string) {
    const q = question.trim();
    if (!q || aiLoading) return;
    setAiLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const hits = searchPermits(q).slice(0, 4);
    const citations = hits.map((p) => ({ slug: p.slug, title: p.title, ref: p.ref }));
    let answer: string;
    if (hits.length === 0) {
      answer = "Jag hittade inga relevanta avsnitt. Prova att omformulera eller kontakta stadsbyggnadsförvaltningen.";
    } else {
      const top = hits[0];
      const extra = hits.slice(1).map((_, i) => `[${i + 2}]`).join(", ");
      answer = `Enligt ${top.ref} — ${top.title}: ${top.summary}` +
        (hits.length > 1 ? ` Se även ${extra} för relaterad information.` : "") +
        ` Ansvarig myndighet: ${top.authority}.`;
    }
    setAiTurns((prev) => [...prev, { question: q, answer, citations }]);
    setQuery("");
    setAiLoading(false);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    if (mode === "ai") { submitAi(query); return; }
    setOpen(false);
    navigate(`/sok?q=${encodeURIComponent(query.trim())}`);
  }

  const isHero = size === "hero";
  const isAi = enableAi && mode === "ai";

  return (
    <div ref={containerRef} className="relative w-full">
      {enableAi && (
        <div className="flex gap-1 mb-2 text-xs font-mono uppercase tracking-wider">
          <button type="button" onClick={() => setMode("search")}
            className={"px-3 py-1.5 rounded-sm border transition-colors flex items-center gap-1.5 " +
              (mode === "search" ? "bg-card border-border text-ink" : "bg-transparent border-transparent text-alum-dark hover:text-ink")}>
            <SearchIcon className="w-3 h-3" /> Sök
          </button>
          <button type="button" onClick={() => setMode("ai")}
            className={"px-3 py-1.5 rounded-sm border transition-colors flex items-center gap-1.5 " +
              (mode === "ai" ? "bg-card border-border text-primary" : "bg-transparent border-transparent text-alum-dark hover:text-primary")}>
            <Sparkles className="w-3 h-3" /> Fråga AI
          </button>
        </div>
      )}

      <form onSubmit={submit}
        className={isHero
          ? "bg-card border border-border shadow-sm ring-1 ring-alum-light/60 p-2 rounded-md"
          : "bg-card border border-border rounded-md"}>
        <div className="flex items-center px-3 bg-card rounded-sm">
          <span className={isHero ? "text-2xl text-alum-base mr-3 font-light" : "text-lg text-alum-base mr-2 font-light"} aria-hidden>
            {isAi ? "?" : "/"}
          </span>
          <input type="text" value={query} autoFocus={autoFocus}
            onChange={(e) => { setQuery(e.target.value); if (!isAi) setOpen(true); }}
            onFocus={() => !isAi && setOpen(true)}
            placeholder={isAi ? "Ställ en fråga om handboken…" : "Sök tillstånd, dispens eller riktlinje…"}
            className={isHero
              ? "w-full py-5 text-xl md:text-2xl font-heading font-medium bg-transparent outline-none placeholder:text-alum-base text-ink"
              : "w-full py-2.5 text-base font-medium bg-transparent outline-none placeholder:text-alum-base text-ink"} />
          <button type="submit" disabled={isAi && aiLoading}
            className={(isHero
              ? "shrink-0 text-sm font-medium bg-primary text-primary-foreground px-6 py-3 rounded-sm hover:opacity-90 transition-opacity"
              : "shrink-0 text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-sm hover:opacity-90 transition-opacity") +
              " disabled:opacity-60 flex items-center gap-2"}>
            {isAi && aiLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            {isAi ? "Fråga" : "Sök"}
          </button>
        </div>

        {isAi && (aiTurns.length > 0 || aiLoading) && (
          <div className="bg-card mt-2 rounded-sm px-2 py-3 space-y-4 max-h-96 overflow-y-auto">
            {aiTurns.map((t, i) => (
              <div key={i} className="space-y-2">
                <div className="text-sm font-medium text-ink px-2">
                  <span className="text-alum-dark font-mono text-xs mr-2">DU</span>{t.question}
                </div>
                <div className="text-sm text-ink leading-relaxed bg-surface border-l-2 border-primary px-3 py-2 mx-2">
                  {t.answer}
                  {t.citations.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <div className="text-xs font-mono uppercase tracking-wider text-alum-dark mb-2">Källor</div>
                      <ul className="space-y-1">
                        {t.citations.map((c, idx) => (
                          <li key={c.slug} className="text-xs">
                            <span className="text-alum-dark font-mono mr-2">[{idx + 1}]</span>
                            <Link to={`/handbok/${c.slug}`} className="text-primary hover:underline">{c.ref} — {c.title}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {aiLoading && (
              <div className="flex items-center gap-2 text-sm text-ink-muted px-2">
                <Loader2 className="w-4 h-4 animate-spin" /> Söker i handboken…
              </div>
            )}
          </div>
        )}

        {!isAi && open && query.trim() && (
          <div className={isHero ? "bg-card mt-2 rounded-sm" : "absolute left-0 right-0 top-full mt-1 bg-card border border-border rounded-md shadow-sm z-50"}>
            <div className="px-4 py-2 text-xs font-semibold text-alum-dark uppercase tracking-wider flex justify-between">
              <span>{results.length === 0 ? "Inga träffar" : `${results.length} dokumentträff${results.length === 1 ? "" : "ar"}`}</span>
              {results.length > 0 && <span className="font-mono normal-case tracking-normal">för "{query}"</span>}
            </div>
            {results.map((r, i) => (
              <Link key={r.slug} to={`/handbok/${r.slug}`} onClick={() => setOpen(false)}
                className={"group flex flex-col p-4 hover:bg-surface border-l-2 border-transparent hover:border-primary transition-all" +
                  (i > 0 ? " border-t border-alum-light/60" : "")}>
                <div className="flex justify-between items-baseline mb-1 gap-3">
                  <h4 className="text-base md:text-lg font-heading font-semibold text-primary group-hover:underline">{r.title}</h4>
                  <span className="text-xs text-alum-dark font-mono tabular-nums shrink-0">{r.ref}</span>
                </div>
                <p className="text-sm text-ink-muted line-clamp-1 mb-2">{r.summary}</p>
              </Link>
            ))}
          </div>
        )}
      </form>
    </div>
  );
}
