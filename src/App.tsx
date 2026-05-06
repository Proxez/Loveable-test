import { Routes, Route, Link, useParams, useSearchParams } from "react-router-dom";
import { categories, permits, searchPermits, type Permit, type Category } from "@/data/handbook";
import { SearchBar } from "@/components/SearchBar";
import { AskAssistant } from "@/components/AskAssistant";
import { BookOpen, ArrowLeft, FileText, Scale } from "lucide-react";

function SiteHeader() {
  return (
    <header className="bg-card border-b border-border">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
          <Scale className="w-5 h-5" />
          <span className="font-heading font-semibold text-lg tracking-tight">Teknisk Handbok</span>
        </Link>
        <span className="text-xs font-mono text-alum-dark">Helsingborgs stad · demo</span>
      </div>
    </header>
  );
}

function HomePage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="text-center mb-10">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-ink mb-3 tracking-tight">
          Teknisk Handbok
        </h1>
        <p className="text-ink-muted text-lg max-w-2xl mx-auto">
          Regler, riktlinjer och tillstånd för byggprojekt, markarbeten och naturvård i Helsingborgs stad.
        </p>
      </div>

      <div className="max-w-3xl mx-auto mb-12">
        <SearchBar size="hero" enableAi />
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            to={`/kategori/${cat.slug}`}
            className="group bg-card border border-border rounded-md p-6 hover:border-primary transition-colors"
          >
            <div className="text-xs font-mono text-alum-dark mb-2">{cat.number}</div>
            <h3 className="font-heading font-semibold text-lg text-ink group-hover:text-primary mb-2 transition-colors">
              {cat.title}
            </h3>
            <p className="text-sm text-ink-muted leading-relaxed">{cat.description}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {cat.tags.map((tag) => (
                <span key={tag} className="text-xs px-2 py-0.5 bg-surface border border-border rounded-sm text-alum-dark">
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      <div className="max-w-md mx-auto">
        <AskAssistant />
      </div>
    </div>
  );
}

function KategoriPage() {
  const { slug } = useParams<{ slug: string }>();
  const cat = categories.find((c) => c.slug === slug);
  const docs = permits.filter((p) => p.categorySlug === slug);

  if (!cat) return <div className="max-w-5xl mx-auto px-6 py-12">Kategorin hittades inte.</div>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <Link to="/" className="inline-flex items-center gap-1 text-sm text-primary hover:underline mb-6">
        <ArrowLeft className="w-4 h-4" /> Tillbaka
      </Link>
      <div className="mb-8">
        <div className="text-xs font-mono text-alum-dark mb-1">{cat.number}</div>
        <h1 className="font-heading text-3xl font-bold text-ink mb-2">{cat.title}</h1>
        <p className="text-ink-muted">{cat.description}</p>
      </div>
      <div className="space-y-4">
        {docs.map((doc) => (
          <Link
            key={doc.slug}
            to={`/handbok/${doc.slug}`}
            className="group block bg-card border border-border rounded-md p-5 hover:border-primary transition-colors"
          >
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="font-heading font-semibold text-lg text-primary group-hover:underline">{doc.title}</h3>
              <span className="text-xs font-mono text-alum-dark">{doc.ref}</span>
            </div>
            <p className="text-sm text-ink-muted">{doc.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

function HandbokPage() {
  const { slug } = useParams<{ slug: string }>();
  const doc = permits.find((p) => p.slug === slug);

  if (!doc) return <div className="max-w-5xl mx-auto px-6 py-12">Dokumentet hittades inte.</div>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <Link to="/" className="inline-flex items-center gap-1 text-sm text-primary hover:underline mb-6">
        <ArrowLeft className="w-4 h-4" /> Tillbaka
      </Link>
      <article>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-mono text-alum-dark bg-surface px-2 py-0.5 rounded-sm border border-border">{doc.ref}</span>
            <span className="text-xs text-alum-dark">{doc.category}</span>
          </div>
          <h1 className="font-heading text-3xl font-bold text-ink mb-2">{doc.title}</h1>
          <p className="text-ink-muted text-lg leading-relaxed">{doc.summary}</p>
        </div>
        <div className="bg-card border border-border rounded-md p-6 space-y-4">
          {doc.body.map((para, i) => (
            <p key={i} className="text-ink leading-relaxed">{para}</p>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-4 text-sm text-alum-dark">
          <div className="flex items-center gap-1">
            <FileText className="w-4 h-4" />
            <span>Ansvarig: {doc.authority}</span>
          </div>
          <div>Uppdaterad: {doc.updated}</div>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {doc.tags.map((tag) => (
            <span key={tag} className="text-xs px-2 py-0.5 bg-surface border border-border rounded-sm text-alum-dark">{tag}</span>
          ))}
        </div>
      </article>
    </div>
  );
}

function SokPage() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") || "";
  const results = searchPermits(q);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <Link to="/" className="inline-flex items-center gap-1 text-sm text-primary hover:underline mb-6">
        <ArrowLeft className="w-4 h-4" /> Tillbaka
      </Link>
      <div className="max-w-3xl mb-8">
        <SearchBar size="compact" initialQuery={q} autoFocus />
      </div>
      <div className="text-sm text-alum-dark mb-4">
        {results.length === 0
          ? `Inga träffar för "${q}"`
          : `${results.length} träff${results.length === 1 ? "" : "ar"} för "${q}"`}
      </div>
      <div className="space-y-4">
        {results.map((doc) => (
          <Link
            key={doc.slug}
            to={`/handbok/${doc.slug}`}
            className="group block bg-card border border-border rounded-md p-5 hover:border-primary transition-colors"
          >
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="font-heading font-semibold text-lg text-primary group-hover:underline">{doc.title}</h3>
              <span className="text-xs font-mono text-alum-dark">{doc.ref}</span>
            </div>
            <p className="text-sm text-ink-muted mb-2">{doc.summary}</p>
            <div className="flex gap-3 text-xs text-alum-dark">
              <span>{doc.category}</span>
              <span>•</span>
              <span>{doc.authority}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function App() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/kategori/:slug" element={<KategoriPage />} />
        <Route path="/handbok/:slug" element={<HandbokPage />} />
        <Route path="/sok" element={<SokPage />} />
      </Routes>
    </div>
  );
}
