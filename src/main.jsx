import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
    Search,
    MapPin,
    ArrowUpRight,
    ArrowRight,
    ArrowLeft,
    ChevronDown,
    BookOpen,
    Monitor,
    CalendarDays,
    Baby,
    Users,
    Landmark,
    Newspaper,
    Menu,
    X,
    Clock3,
    Bookmark,
    Check,
    ChevronRight,
    Facebook,
    Instagram,
    Youtube,
    Accessibility,
    LibraryBig,
    Sparkles,
    Heart,
    ExternalLink,
    Sun,
    Moon
} from 'lucide-react';
import './styles.css';

const IMG = `${import.meta.env.BASE_URL}images/`;
const quickLinks = [
    { title: 'Katalog', icon: BookOpen, tint: 'lavender', section: 'knjige' },
    { title: 'Naše knjižnice', icon: Landmark, tint: 'sage', section: 'knjiznice' },
    { title: ' Programi', icon: CalendarDays, tint: 'rose', section: 'dogadanja' },
    { title: 'E-izvori', icon: Monitor, tint: 'mint', section: 'aktualno' },
    { title: 'Za djecu', icon: Baby, tint: 'blue', section: 'knjige' },
    { title: 'Za mlade', icon: Users, tint: 'peach', section: 'knjige' },
    { title: 'Novosti', icon: Newspaper, tint: 'violet', section: 'aktualno' }
];
const news = [
    { id: 1, tag: 'IZDVOJILI SMO', title: 'Mjesec hrvatske knjige 2026.: Od priča do otkrića', image: 'promo.webp', wide: true, description: 'Mjesec hrvatske knjige od 15. listopada do 15. studenoga posvećen je znanosti, znatiželji i novim spoznajama.' },
    { id: 2, tag: 'OBAVIJEST', title: 'Revizija u Knjižnici i čitaonici Bogdana Ogrizovića', image: 'clock.webp', description: 'Provjerite informacije o privremenim promjenama u radu knjižnice.' },
    { id: 3, tag: 'PROJEKT', title: 'Gradska knjižnica Paromlin', image: 'paromlin.webp', description: 'Izgradnja nove gradske knjižnice — prostora znanja i susreta.' }
];
const events = [
    { id: 4, date: '16', month: 'lis', title: 'Otisni svoju torbu!', place: 'Gradska knjižnica', time: '16.10.2026. · petak', image: 'tote.webp', description: 'Kreativna radionica u prostoru Gradske knjižnice.' },
    { id: 5, date: '07', month: 'lis', title: 'Konferencija za medije MHK', place: 'KGZ', time: '07.10. – 15.11.2026.', image: 'conference.webp', description: 'Počinje Mjesec hrvatske knjige 2026. — Od priča do otkrića.' },
    { id: 6, date: '04', month: 'stu', title: 'Digitalne zbirke', place: 'Online', time: 'Kulturna baština', image: 'postcard.webp', description: 'Razglednice s maturalnog putovanja Ivana Brlića poslance majci Ivani Brlić-Mažuranić.' }
];
const books = [
    { id: 1, title: 'Mama, ne vidim nebo', author: 'Ivana Bodrožić', image: 'book1.webp', group: 'Za odrasle' },
    { id: 2, title: 'Veličanstveni Golijat', author: 'Michael Crummey', image: 'book2.webp', group: 'Za odrasle' },
    { id: 3, title: 'Zov divljine', author: 'Jack London', image: 'book3.webp', group: 'Za mlade' },
    { id: 4, title: 'Živjeti', author: 'Yu Hua', image: 'book4.webp', group: 'Za odrasle' },
    { id: 5, title: 'Slučaj vlastite pogibelji', author: 'Kristian Novak', image: 'book5.webp', group: 'Za odrasle' },
    { id: 6, title: 'Birnamova šuma', author: 'Eleanor Catton', image: 'book6.webp', group: 'Za odrasle' },
    { id: 7, title: 'Zov divljine', author: 'Jack London', image: 'book3.webp', group: 'Za djecu' },
    { id: 8, title: 'Veličanstveni Golijat', author: 'Michael Crummey', image: 'book2.webp', group: 'Za mlade' },
    { id: 9, title: 'Mama, ne vidim nebo', author: 'Ivana Bodrožić', image: 'book1.webp', group: 'Za mlade' }
];
const navigation = [
    'Katalog',
    'Knjižnice',
    'Informacije',
    'Programi',
    'E-izvori',
    'Za djecu',
    'Za mlade',
    'Novosti',
    'O nama'
];
function scrollToId(id) { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
function Brand() {
    return <div className="brand" aria-label="Knjižnice grada Zagreba">
        <div className="brand-left">
            <span>K</span>
            <span>Knjižnice grada Zagreba</span>
        </div>
        <div className="brand-right">
            <span>G</span>
            <span>Z</span>
        </div>
    </div>
}
function App() {
    const [theme, setTheme] = useState(() => { try { return localStorage.getItem('kgz-theme') || 'dark'; } catch { return 'dark'; } });
    useEffect(() => { document.documentElement.dataset.theme = theme; document.documentElement.style.colorScheme = theme; try { localStorage.setItem('kgz-theme', theme); } catch { } }, [theme]);
    const [mobileOpen, setMobileOpen] = useState(false),
        [dropdown, setDropdown] = useState(''),
        [query, setQuery] = useState(''),
        [searchOpen, setSearchOpen] = useState(false),
        [tab, setTab] = useState('Za odrasle'),
        [slide, setSlide] = useState(0),
        [selected, setSelected] = useState(null),
        [saved, setSaved] = useState([]),
        [largeText, setLargeText] = useState(false);
    const visibleBooks = useMemo(() => books.filter(b => b.group === tab), [tab]);
    const searchResults = useMemo(() => [
        ...news,
        ...events,
        ...books
    ].filter(x => (x.title + ' ' + (x.description || '') + ' ' + (x.author || '')).toLocaleLowerCase('hr').includes(query.toLocaleLowerCase('hr'))).slice(0, 6), [query]);
    useEffect(() => { const fn = e => { if (e.key === 'Escape') { setSelected(null); setSearchOpen(false); setMobileOpen(false); setDropdown(''); } }; window.addEventListener('keydown', fn); return () => window.removeEventListener('keydown', fn); }, []);
    const selectCard = (item) => setSelected(item);
    const navAction = (name) => { setMobileOpen(false); setDropdown(''); scrollToId(name === 'Katalog' ? 'knjige' : name === 'Knjižnice' ? 'knjiznice' : name === 'Novosti' ? 'aktualno' : name === 'Naši programi' ? 'dogadanja' : 'home'); };
    return <div className={`site ${largeText ? 'large-text' : ''}`}>

        <div className="top-area" id="home">
            <div className="shell">
                <div className="utility">
                    <span>English</span>
                    <button className="theme-toggle" onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} aria-label={theme === 'dark' ? 'Uključi svijetlu temu' : 'Uključi tamnu temu'} aria-pressed={theme === 'dark'}>
                        {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
                        <span>
                            {theme === 'dark' ? 'Svijetla tema' : 'Tamna tema'}
                        </span>
                    </button>
                    <i />
                    <Facebook size={14} />
                    <Instagram size={15} />
                    <Youtube size={16} />
                    <span className="tik">♪</span>
                </div>

                <header className="header">
                    <Brand />
                    <nav className="desktop-nav" aria-label="Glavna navigacija">
                        {navigation.map(n => <button key={n} onClick={() => navAction(n)}>
                            {n}
                            {[
                                'Informacije',
                                'Naši programi',
                                'Za djecu'
                            ].includes(n) && <ChevronDown size={12} />}
                        </button>)}
                    </nav>
                    <div className="header-actions">
                        <button className="icon-button mobile-theme" onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} aria-label="Promijeni temu">
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <button className="icon-button search-trigger" aria-label="Pretraživanje" onClick={() => setSearchOpen(true)}>
                            <Search size={21} />
                        </button>
                        <button className="icon-button menu-trigger" aria-label="Izbornik" onClick={() => setMobileOpen(true)}>
                            <Menu size={23} />
                        </button>
                    </div>
                </header>

                <section className="hero">
                    <div className="hero-content">
                        <span className="eyebrow">GRAD ČITA, GRAD RASTE</span>
                        <h1>Knjižnice<br />grada Zagreba</h1>
                        <p>Mjesto znanja, kulture i susreta — za sve generacije.</p>
                        <div className="hero-actions">
                            <button className="primary-btn" onClick={() => setSearchOpen(true)}><Search size={18} />Pretraži katalog</button>
                            <button className="outline-btn" onClick={() => scrollToId('knjiznice')}><MapPin size={18} />Pronađi knjižnicu</button>
                        </div>
                    </div>
                    <div className="hero-quote">
                        <div className="quote-rule" />
                        <strong>Otvorene<br />knjige, povezan<br />grad.</strong>
                    </div>
                </section>

                <section className="quick-links" aria-label="Brzi pristup">
                    {quickLinks.map(item => {
                        const Icon = item.icon; return <button className={`quick ${item.tint}`} key={item.title} onClick={() => scrollToId(item.section)}>
                            <Icon strokeWidth={1.8} size={29} />
                            <span>
                                {item.title}
                            </span>
                        </button>
                    })}
                </section>

            </div>
        </div>

        <main className="shell main">
            <section id="aktualno" className="section">
                <div className="section-heading">
                    <h2>Aktualno<span className="heading-dot">.</span></h2>
                    <button className="text-link" onClick={() => setSelected({ title: 'Sve obavijesti', description: 'Ovdje bi se nalazio popis svih obavijesti s KGZ web stranice.' })}>Sve obavijesti <ArrowRight size={16} /></button>
                </div>
                <div className="news-grid">
                    {news.map((n, i) => <button key={n.id} onClick={() => selectCard(n)} className={`news-card news-${i + 1}`}>
                        <div className="news-image">
                            <img src={IMG + n.image} alt="" />
                        </div>
                        <div className="news-info">
                            <span className="card-tag">
                                {n.tag}
                            </span>
                            <h3>
                                {n.title}
                            </h3>
                            {i === 2 && <p>Izgradnja Gradske knjižnice Paromlin</p>}
                        </div>
                        <span className="round-arrow">
                            <ChevronRight size={18} />
                        </span>
                    </button>)}
                </div>
            </section>

            <section id="dogadanja" className="section">
                <div className="section-heading">
                    <h2>Događanja<span className="heading-dot">.</span></h2>
                    <button className="text-link" onClick={() => setSelected({ title: 'Sva događanja', description: 'Ovdje bi se prikazivao kalendar svih događanja.' })}>Sva događanja <ArrowRight size={16} /></button>
                </div>
                <div className="events-grid">
                    {events.map(e => <button className="event-card" key={e.id} onClick={() => selectCard(e)}>
                        <div className="event-image">
                            <img src={IMG + e.image} alt="" />
                            <span className="date-badge">
                                <b>{e.date}.</b>
                                <small>
                                    {e.month}
                                </small>
                            </span>
                        </div>
                        <div className="event-info">
                            <h3>
                                {e.title}
                            </h3>
                            <p>
                                <MapPin size={13} />
                                {e.place}
                            </p>
                            <p>
                                <Clock3 size={13} />
                                {e.time}
                            </p>
                            <span className="event-arrow">
                                <ArrowUpRight size={18} />
                            </span>
                        </div>
                    </button>)}
                </div>
            </section>

            <section id="knjige" className="section books-section">
                <div className="books-heading">
                    <h2>Preporučujemo za čitanje<span className="heading-dot">.</span></h2>
                    <div className="tabs" role="tablist" aria-label="Odabir književnosti">
                        {[
                            'Za odrasle',
                            'Za djecu',
                            'Za mlade'
                        ].map(t => <button role="tab" aria-selected={tab === t} key={t} className={tab === t ? 'active' : ''} onClick={() => { setTab(t); setSlide(0); }}>
                            {t}
                        </button>)}
                    </div>
                    <button className="text-link book-link" onClick={() => setSearchOpen(true)}>Pogledaj katalog <ArrowRight size={16} /></button>
                </div>
                <div className="book-row">
                    <button className="carousel-nav" disabled={slide === 0} onClick={() => setSlide(v => Math.max(0, v - 1))} aria-label="Prethodna knjiga">
                        <ArrowLeft size={20} />
                    </button>
                    <div className="book-viewport">
                        <div className="book-track" style={{ transform: `translateX(-${slide * 177}px)` }}>
                            {visibleBooks.map(b => <button className="book" key={b.id} onClick={() => selectCard(b)}>
                                <div className="book-cover">
                                    <img src={IMG + b.image} alt={b.title} />
                                </div>
                                <b>
                                    {b.title}
                                </b>
                                <span>
                                    {b.author}
                                </span>
                            </button>)}
                        </div>
                    </div>
                    <button className="carousel-nav" disabled={slide >= Math.max(0, visibleBooks.length - 3)} onClick={() => setSlide(v => Math.min(Math.max(0, visibleBooks.length - 3), v + 1))} aria-label="Sljedeća knjiga">
                        <ArrowRight size={20} />
                    </button>
                </div>
            </section>

            <section id="knjiznice" className="library-banner">
                <div className="library-content">
                    <span className="eyebrow">KNJIŽNICE U VAŠEM KVARTU</span>
                    <h2>Naše knjižnice<br />u cijelom gradu</h2>
                    <p>Mjesta susreta, programa i tisuće priča.</p>
                    <button className="primary-btn" onClick={() => setSelected({ title: 'Pronađi najbližu knjižnicu', description: 'U pravoj verziji ovdje bi bila interaktivna karta s lokacijama knjižnica grada Zagreba.' })}><MapPin size={17} />Pronađi najbližu knjižnicu</button>
                </div>
                <div className="map-art" aria-hidden="true">
                    {[
                        1,
                        2,
                        3,
                        4,
                        5,
                        6,
                        7
                    ].map((x) => <MapPin key={x} size={23} fill="#0c1338" stroke="#fff" />)}
                </div>
            </section>
        </main>

        <footer>
            <div className="shell footer-content">
                <Brand />
                <div>
                    <b>Istražite</b>
                    <span>O nama</span>
                    <span>Naši programi</span>
                    <span>Katalog</span>
                </div>
                <div>
                    <b>Informacije</b>
                    <span>Radno vrijeme</span>
                    <span>Članstvo</span>
                    <span>Kontakt</span>
                </div>
                <div>
                    <b>Pratite nas</b>
                    <div className="socials">
                        <Facebook />
                        <Instagram />
                        <Youtube />
                    </div>
                </div>
            </div>
            <div className="shell footer-bottom">
                <span>© 2026 Knjižnice grada Zagreba — koncept redizajna</span>
                <span>Izrađeno s ljubavlju prema knjigama ♡</span>
            </div>
        </footer>

        {mobileOpen && <div className="drawer-wrap" onMouseDown={e => { if (e.target === e.currentTarget) setMobileOpen(false); }}>
            <aside className="drawer">
                <div className="drawer-top">
                    <Brand />
                    <button className="icon-button" onClick={() => setMobileOpen(false)} aria-label="Zatvori">
                        <X />
                    </button>
                </div>
                <nav>
                    {navigation.map(n => <button key={n} onClick={() => navAction(n)}>
                        {n}
                        <ArrowUpRight size={16} />
                    </button>)}
                </nav>
            </aside>
        </div>}

        {searchOpen && <div className="overlay" onMouseDown={e => { if (e.target === e.currentTarget) setSearchOpen(false); }}>
            <div className="search-modal" role="dialog" aria-modal="true" aria-label="Pretraživanje">
                <div className="modal-title">
                    <h2>Što vas zanima?</h2>
                    <button className="icon-button" onClick={() => setSearchOpen(false)}>
                        <X />
                    </button>
                </div>
                <p>Pretražite događanja, novosti i knjige iz ovog demo prikaza.</p>
                <div className="search-field">
                    <Search size={21} />
                    <input autoFocus value={query} onChange={e => setQuery(e.target.value)} placeholder="Pokušajte: knjige, konferencija, Paromlin…" />
                </div>
                <div className="search-results">
                    {query ? searchResults.length ? searchResults.map((item, index) => <button key={index} onClick={() => { setSearchOpen(false); setSelected(item); }}>
                        <span>
                            {item.title}
                        </span>
                        <ArrowUpRight size={17} />
                    </button>) : <p>Nema rezultata za ovaj pojam.</p> : <div className="suggestions">
                        <span>Popularno:</span>
                        {[
                            'Mjesec hrvatske knjige',
                            'Paromlin',
                            'Zov divljine'
                        ].map(t => <button key={t} onClick={() => setQuery(t)}>
                            {t}
                        </button>)}
                    </div>}
                </div>
            </div>
        </div>}

        {selected && <div className="overlay" onMouseDown={e => { if (e.target === e.currentTarget) setSelected(null); }}>
            <div className="detail-modal" role="dialog" aria-modal="true" aria-label={selected.title}>
                <button className="close-detail icon-button" onClick={() => setSelected(null)} aria-label="Zatvori">
                    <X />
                </button>
                {selected.image && <img className="detail-image" src={IMG + selected.image} alt="" />}
                <div className="detail-body">
                    <span className="eyebrow">KNJIŽNICE GRADA ZAGREBA</span>
                    <h2>
                        {selected.title}
                    </h2>
                    {selected.author && <p className="detail-author">
                        {selected.author}
                    </p>}
                    <p>
                        {selected.description || 'Otkrijte više sadržaja i programa koje nude Knjižnice grada Zagreba.'}
                    </p>
                    <div className="detail-actions">
                        <button className="primary-btn" onClick={() => setSelected(null)}>Natrag na naslovnicu</button>
                        <button className="outline-btn" onClick={() => setSaved(v => v.includes(selected.title) ? v.filter(t => t !== selected.title) : [
                            ...v,
                            selected.title
                        ])}>
                            {saved.includes(selected.title) ? <Check size={16} /> : <Bookmark size={16} />}
                            {saved.includes(selected.title) ? 'Spremljeno' : 'Spremi'}
                        </button>
                    </div>
                </div>
            </div>
        </div>}

    </div>;
}

createRoot(document.getElementById('root')).render(<App />);
