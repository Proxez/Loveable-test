import { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, Send, Loader2 } from "lucide-react";
import { searchPermits } from "@/data/handbook";

type Citation = { slug: string; title: string; ref: string; category: string };
type Turn = { question: string; answer: string; citations: Citation[] };

const SUGGESTIONS = [
  "Behöver jag marklov om jag sänker marken 30 cm?",
  "Vad gäller inom strandskyddat område?",
  "Vem ansöker om TA-plan vid grävning?",
];

export function AskAssistant() {
  const [input, setInput] = useState("");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [loading, setLoading] = useState(false);

  async function submit(question: string) {
    const q = question.trim();
    if (!q || loading) return;
    setInput("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));

    const hits = searchPermits(q).slice(0, 4);
    const citations: Citation[] = hits.map((p) => ({ slug: p.slug, title: p.title, ref: p.ref, category: p.category }));
    let answer: string;

    if (hits.length === 0) {
      answer = "Jag hittade inga relevanta avsnitt i handboken. Prova att omformulera eller kontakta stadsbyggnadsförvaltningen direkt.";
    } else {
      const top = hits[0];
      const extra = hits.slice(1).map((_, i) => `[${i + 2}]`).join(", ");
      answer = `Enligt ${top.ref} — ${top.title}: ${top.summary}` +
        (hits.length > 1 ? ` Se även ${extra} för relaterad information.` : "") +
        ` Ansvarig myndighet: ${top.authority}.`;
    }

    setTurns((prev) => [...prev, { question: q, answer, citations }]);
    setLoading(false);
  }

  return (
    <aside className="bg-card border border-border rounded-md shadow-sm">
      <div className="px-5 py-4 border-b border-border flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-primary" aria-hidden />
        <h2 className="font-heading font-semibold text-sm uppercase tracking-wider text-alum-dark">Fråga handboken</h2>
        <span className="ml-auto text-xs text-alum-dark font-mono">Lokal sökning · demo</span>
      </div>
      <div className="px-5 py-4 space-y-4 max-h-[28rem] overflow-y-auto">
        {turns.length === 0 && (
          <div className="space-y-3">
            <p className="text-sm text-ink-muted">Ställ en fråga om tillstånd, dispenser eller riktlinjer.</p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button key={s} onClick={() => submit(s)}
                  className="text-xs text-left px-3 py-1.5 bg-surface border border-border hover:border-primary hover:text-primary rounded-sm transition-colors">
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        {turns.map((t, i) => (
          <div key={i} className="space-y-2">
            <div className="text-sm font-medium text-ink">
              <span className="text-alum-dark font-mono text-xs mr-2">DU</span>{t.question}
            </div>
            <div className="text-sm text-ink leading-relaxed bg-surface border-l-2 border-primary px-3 py-2">
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
        {loading && (
          <div className="flex items-center gap-2 text-sm text-ink-muted">
            <Loader2 className="w-4 h-4 animate-spin" /> Söker i handboken…
          </div>
        )}
      </div>
      <form onSubmit={(e) => { e.preventDefault(); submit(input); }} className="px-5 py-4 border-t border-border flex gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Skriv en fråga…" disabled={loading}
          className="flex-1 bg-surface border border-border rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-primary" />
        <button type="submit" disabled={loading || !input.trim()}
          className="px-3 py-2 bg-primary text-primary-foreground rounded-sm text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-1">
          <Send className="w-4 h-4" />
        </button>
      </form>
    </aside>
  );
}
