import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  BookOpen,
  Bookmark,
  Check,
  ChevronRight,
  Clock3,
  GraduationCap,
  Heart,
  Library,
  Menu,
  Search,
      X,
} from "lucide-react";

type Story = {
  id: number;
  title: string;
  category: string;
  label: string;
  summary: string;
  image: string;
  color: string;
  time: string;
  rating: string;
  accent: string;
};

const stories: Story[] = [
  {
    id: 1,
    title: "The Midnight Library",
    category: "Fantasy",
    label: "Editor's pick",
    summary: "A quiet student discovers that every book in the old library contains a different version of tomorrow.",
    image: "/manus-storage/chapter-hero_445ab79b.jpg",
    color: "#ece5ff",
    time: "8 min read",
    rating: "4.9",
    accent: "#6951b5",
  },
  {
    id: 2,
    title: "Letters in the Rain",
    category: "Romance",
    label: "Soft & sweet",
    summary: "Two classmates leave letters between library pages, never realizing they already know each other.",
    image: "/manus-storage/starlit-feature_fa97bb16.jpg",
    color: "#ffe7ef",
    time: "6 min read",
    rating: "4.8",
    accent: "#cf6687",
  },
  {
    id: 3,
    title: "After the Last Bell",
    category: "Slice of life",
    label: "New chapter",
    summary: "A graduating class turns one ordinary afternoon into a memory they promise to carry forever.",
    image: "/manus-storage/classroom-reference_80cb2c66.jpg",
    color: "#e2f3f2",
    time: "5 min read",
    rating: "4.7",
    accent: "#3a8f8c",
  },
  {
    id: 4,
    title: "Clouds Over Class 3-A",
    category: "Coming of age",
    label: "Reader favorite",
    summary: "A sketchbook, a rooftop, and one last summer challenge bring four friends closer than ever.",
    image: "/manus-storage/sky-reference_31f3e587.jpg",
    color: "#e5efff",
    time: "7 min read",
    rating: "4.9",
    accent: "#4673bb",
  },
  {
    id: 5,
    title: "A Bookmark for Tomorrow",
    category: "Inspiration",
    label: "Feel-good",
    summary: "A tiny paper bookmark reminds a tired student that progress still counts, even on the slow days.",
    image: "/manus-storage/starlit-feature_fa97bb16.jpg",
    color: "#fff1d9",
    time: "4 min read",
    rating: "4.6",
    accent: "#bd7a37",
  },
  {
    id: 6,
    title: "The Window Seat Club",
    category: "School life",
    label: "Cozy read",
    summary: "Four readers claim the best window seat in school and accidentally start a tiny book club.",
    image: "/manus-storage/classroom-reference_80cb2c66.jpg",
    color: "#e8e6ff",
    time: "6 min read",
    rating: "4.8",
    accent: "#6965b8",
  },
];

const categories = ["All stories", "Fantasy", "Romance", "School life", "Inspiration"];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All stories");
  const [query, setQuery] = useState("");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [savedStories, setSavedStories] = useState<number[]>([1]);
  const [toast, setToast] = useState("");

  const filteredStories = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return stories.filter((story) => {
      const matchesCategory = activeCategory === "All stories" || story.category === activeCategory;
      const matchesQuery = !normalizedQuery || `${story.title} ${story.summary} ${story.category}`.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  const toggleSaved = (id: number) => {
    setSavedStories((current) => current.includes(id) ? current.filter((storyId) => storyId !== id) : [...current, id]);
    setToast(savedStories.includes(id) ? "Removed from your shelf" : "Saved to your shelf");
    window.setTimeout(() => setToast(""), 2200);
  };

  const scrollToStories = () => document.querySelector("#stories")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Starlit Shelf home">
          <span className="brand-mark"><Library size={19} strokeWidth={2.5} /></span>
          <span><strong>Starlit</strong><em>Shelf</em></span>
        </a>
        <nav className={`main-nav ${mobileNavOpen ? "is-open" : ""}`} aria-label="Main navigation">
          <a href="#top" onClick={() => setMobileNavOpen(false)}>Home</a>
          <a href="#stories" onClick={() => setMobileNavOpen(false)}>Collection</a>
          <a href="#about" onClick={() => setMobileNavOpen(false)}>About</a>
          <a href="#credits" onClick={() => setMobileNavOpen(false)}>Credits</a>
        </nav>
        <div className="topbar-actions">
          <button className="saved-pill" onClick={() => { setActiveCategory("All stories"); setQuery(""); document.querySelector("#stories")?.scrollIntoView({ behavior: "smooth" }); }}>
            <Bookmark size={15} fill="currentColor" /> <span>{savedStories.length}</span>
          </button>
          <button className="menu-toggle" aria-label="Toggle navigation" onClick={() => setMobileNavOpen((open) => !open)}>
            {mobileNavOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-content">
            <div className="eyebrow"><span className="eyebrow-dot" /> A personal reading corner by Bauzon Joshua</div>
            <h1>Stories worth<br /><span>keeping.</span></h1>
            <p className="hero-copy">A carefully curated bookmark for stories that make ordinary school days feel a little more magical.</p>
            <div className="hero-actions">
              <button className="primary-button" onClick={scrollToStories}>Explore the shelf <ArrowUpRight size={17} /></button>
              <a className="text-link" href="#about">Why this collection <ChevronRight size={16} /></a>
            </div>
            <div className="hero-meta">
              <div><strong>06</strong><span>stories saved</span></div>
              <div><strong>04</strong><span>genres to explore</span></div>
              <div><strong>∞</strong><span>places to imagine</span></div>
            </div>
          </div>
          <div className="hero-note note-one"><BookOpen size={14} /> good stories, good days</div>
          <div className="hero-note note-two">chapter 01</div>
          <div className="hero-scroll">Scroll to discover <span /></div>
        </section>

        <section className="intro-section" id="about">
          <div className="intro-image-wrap">
            <img src="/manus-storage/starlit-feature_fa97bb16.jpg" alt="Anime-inspired student reading beside a sunny classroom window" />
            <div className="image-caption"><span>01</span><span>A little space for<br />big imaginations.</span></div>
          </div>
          <div className="intro-copy">
            <div className="section-kicker">The idea behind the shelf</div>
            <h2>Made for the in-between moments.</h2>
            <p>Some stories are meant for long commutes. Others are for rainy lunch breaks, quiet study sessions, or the five minutes before the next class begins.</p>
            <p>Starlit Shelf is a small collection of those stories — handpicked to bring a little wonder, comfort, and color into your day.</p>
            <div className="signature"><span className="signature-line" /> <span>— Bauzon Joshua</span></div>
          </div>
        </section>

        <section className="collection-section" id="stories">
          <div className="section-heading-row">
            <div>
              <div className="section-kicker">The collection</div>
              <h2>Find your next <span>favorite.</span></h2>
            </div>
            <p className="section-side-note">Six little doors to<br />somewhere else <span>↘</span></p>
          </div>
          <div className="collection-tools">
            <div className="filter-row" role="tablist" aria-label="Filter stories">
              {categories.map((category) => (
                <button key={category} className={activeCategory === category ? "filter-chip active" : "filter-chip"} onClick={() => setActiveCategory(category)}>{category}</button>
              ))}
            </div>
            <label className="search-field">
              <Search size={17} />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search stories" aria-label="Search stories" />
            </label>
          </div>
          <div className="story-grid">
            {filteredStories.map((story, index) => {
              const isSaved = savedStories.includes(story.id);
              return (
                <article className="story-card" key={story.id} style={{ "--card-accent": story.accent, "--card-bg": story.color } as React.CSSProperties}>
                  <div className="story-art-wrap">
                    <img src={story.image} alt={`${story.title} story cover`} className="story-art" />
                    <div className="story-number">0{index + 1}</div>
                    <button className={`bookmark-button ${isSaved ? "is-saved" : ""}`} aria-label={isSaved ? `Remove ${story.title} from saved stories` : `Save ${story.title}`} onClick={() => toggleSaved(story.id)}>
                      <Bookmark size={16} fill={isSaved ? "currentColor" : "none"} />
                    </button>
                  </div>
                  <div className="story-body">
                    <div className="story-label"><span /> {story.label}</div>
                    <h3>{story.title}</h3>
                    <p>{story.summary}</p>
                    <div className="story-footer">
                      <span><Clock3 size={13} /> {story.time}</span>
                      <span><Heart size={13} fill="currentColor" /> {story.rating}</span>
                      <button onClick={() => setSelectedStory(story)}>Read more <ArrowUpRight size={14} /></button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          {filteredStories.length === 0 && <div className="empty-state"><Search size={22} /><strong>No stories found.</strong><span>Try another title or category.</span></div>}
        </section>

        <section className="quote-section">
          <div className="quote-mark">“</div>
          <blockquote>Every story is a place<br />you can return to.</blockquote>
          <div className="quote-line" />
          <span>— the Starlit Shelf note</span>
        </section>

        <section className="student-note" id="credits">
          <div className="note-icon"><GraduationCap size={28} /></div>
          <div><div className="section-kicker">School project / 2026</div><h2>Curated with curiosity.</h2><p>Designed and arranged by <strong>Bauzon Joshua</strong> — an enhanced bookmark experience inspired by the original Story Book layout.</p></div>
          <div className="note-badge"><Check size={15} /> ready to explore</div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand" href="#top"><span className="brand-mark"><Library size={17} /></span><span><strong>Starlit</strong><em>Shelf</em></span></a>
        <p>Keep a place for wonder.</p>
        <span className="footer-credit">Bauzon Joshua <span>·</span> ITE Bookmark</span>
      </footer>

      {selectedStory && <div className="modal-backdrop" role="presentation" onClick={() => setSelectedStory(null)}>
        <div className="story-modal" role="dialog" aria-modal="true" aria-labelledby="story-modal-title" onClick={(event) => event.stopPropagation()}>
          <button className="modal-close" aria-label="Close story details" onClick={() => setSelectedStory(null)}><X size={18} /></button>
          <img src={selectedStory.image} alt="" />
          <div className="modal-content"><div className="story-label"><span /> {selectedStory.label}</div><h2 id="story-modal-title">{selectedStory.title}</h2><p>{selectedStory.summary} This is a featured placeholder description for your school bookmark — you can replace it with the full story link or reading source later.</p><div className="modal-actions"><button className="primary-button" onClick={() => { toggleSaved(selectedStory.id); setSelectedStory(null); }}>{savedStories.includes(selectedStory.id) ? "Saved to shelf" : "Save to shelf"} <Bookmark size={16} /></button><button className="modal-text-button" onClick={() => setSelectedStory(null)}>Close</button></div></div>
        </div>
      </div>}

      {toast && <div className="toast"><Heart size={15} fill="currentColor" /> {toast}</div>}
    </div>
  );
}
