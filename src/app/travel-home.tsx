"use client";

import Image from "next/image";
import { FormEvent, useEffect, useMemo, useState } from "react";

type IconName = "arrow" | "search" | "calendar" | "clock" | "users" | "star" | "map" | "menu" | "close" | "play" | "quote" | "instagram" | "facebook";

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>,
    star: <path d="m12 2 3 6 6.5.9-4.7 4.6 1.1 6.5-5.9-3.1L6.1 20l1.1-6.5L2.5 8.9 9 8z"/>,
    map: <><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3z"/><path d="M9 3v15M15 6v15"/></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
    close: <><path d="m6 6 12 12M18 6 6 18"/></>,
    play: <path d="m9 7 8 5-8 5z"/>,
    quote: <path d="M7 17H3v-5a7 7 0 0 1 7-7v3a4 4 0 0 0-4 4h4v5m10 0h-4v-5a7 7 0 0 1 7-7v3a4 4 0 0 0-4 4h4v5"/>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/></>,
    facebook: <path d="M14 8h3V4h-3a5 5 0 0 0-5 5v3H6v4h3v6h4v-6h3l1-4h-4V9a1 1 0 0 1 1-1z"/>,
  };
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill={name === "star" ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

const heroes = [
  { place: "Kathmandu Valley", eyebrow: "Culture & Heritage", title: <>Ancient soul.<br/><em>Living city.</em></>, desc: "Temple courtyards, vibrant streets and centuries of stories—experienced with the people who call the valley home.", image: "/images/kathmandu.jpg", pos: "center 55%" },
  { place: "Pokhara", eyebrow: "Lakes & Adventure", title: <>Find your own<br/><em>rhythm.</em></>, desc: "Drift across Phewa Lake, take to the skies, and slow down beside Nepal’s most captivating waterside city.", image: "/images/pokhara.jpg", pos: "center" },
  { place: "Chitwan", eyebrow: "Jungle & Wildlife", title: <>Go where the<br/><em>wild things are.</em></>, desc: "Enter the tall grass with expert naturalists and discover one-horned rhinos, elephants and remarkable birdlife.", image: "/images/chitwan.jpg", pos: "center 40%" },
  { place: "Himalayan Journey", eyebrow: "Trekking & Landscapes", title: <>Walk beyond<br/><em>the ordinary.</em></>, desc: "Thoughtfully paced trails, trusted local guides and the landscapes that made Nepal legendary.", image: "/images/himalaya.jpg", pos: "center 46%" },
  { place: "Lumbini", eyebrow: "Spirituality & Heritage", title: <>Travel inward.<br/><em>Journey slowly.</em></>, desc: "Find stillness among monasteries, gardens and the sacred birthplace of Buddha.", image: "/images/lumbini.jpg", pos: "center 42%" },
  { place: "Upper Mustang", eyebrow: "Culture & Exploration", title: <>A kingdom<br/><em>beyond time.</em></>, desc: "Travel ancient trade paths through ochre canyons, cliff villages and living Tibetan culture.", image: "/images/mustang.jpg", pos: "center 54%" },
];

const destinations = [
  { name: "Kathmandu", meta: "Heritage · Culture · Food", trips: 18, image: "/images/boudha.jpg" },
  { name: "Pokhara", meta: "Lakes · Adventure · Ease", trips: 12, image: "/images/lake-boats.jpg" },
  { name: "Chitwan", meta: "Wildlife · Jungle · Safari", trips: 8, image: "/images/rhino.jpg" },
  { name: "Mustang", meta: "Culture · Landscapes · Remote", trips: 7, image: "/images/mustang-monastery.jpg" },
  { name: "Lumbini", meta: "Spirituality · Heritage", trips: 6, image: "/images/lumbini.jpg" },
  { name: "Everest Region", meta: "Trekking · Mountains · Adventure", trips: 15, image: "/images/himalaya.jpg" },
];

const packages = [
  { title: "Pokhara Adventure Escape", place: "Pokhara", days: "4 days", style: "Adventure & relaxation", price: "NPR 24,500", image: "/images/paragliding.jpg", rating: "4.9", featured: true },
  { title: "Kathmandu Heritage Journey", place: "Kathmandu Valley", days: "3 days", style: "Culture & heritage", price: "NPR 18,900", image: "/images/kathmandu.jpg", rating: "4.8" },
  { title: "Chitwan Wildlife Adventure", place: "Chitwan", days: "5 days", style: "Safari & wildlife", price: "NPR 34,000", image: "/images/chitwan.jpg", rating: "4.9" },
  { title: "Annapurna Circuit Journey", place: "Annapurna", days: "12 days", style: "Trekking · Moderate", price: "NPR 89,500", image: "/images/annapurna.jpg", rating: "4.9" },
  { title: "Mustang Discovery", place: "Upper Mustang", days: "10 days", style: "Culture & exploration", price: "NPR 112,000", image: "/images/mustang.jpg", rating: "4.8" },
];

const activities = [
  { title: "Trekking", place: "Himalayan trails", image: "/images/annapurna.jpg" },
  { title: "Paragliding", place: "Pokhara", image: "/images/paragliding.jpg" },
  { title: "Jungle Safari", place: "Chitwan & Bardia", image: "/images/rhino.jpg" },
  { title: "Cultural Tours", place: "Kathmandu Valley", image: "/images/kathmandu-street.jpg" },
  { title: "River Rafting", place: "Trishuli & Seti", image: "/images/rafting.jpg" },
];

const experienceModes = [
  { name: "Culture", place: "Kathmandu Valley", detail: "Temple courtyards · Artisans · Festivals", image: "/images/kathmandu.jpg", color: "#a74d38" },
  { name: "Adventure", place: "Pokhara", detail: "Paragliding · Rafting · Canyoning", image: "/images/paragliding.jpg", color: "#cb5c35" },
  { name: "Wildlife", place: "Chitwan", detail: "Safari · Birding · River journeys", image: "/images/rhino.jpg", color: "#52614d" },
  { name: "Nature", place: "Phewa & Begnas", detail: "Lakes · Forests · Slow mornings", image: "/images/lake-boats.jpg", color: "#315c66" },
  { name: "Heritage", place: "Lumbini", detail: "Monasteries · Sacred gardens · History", image: "/images/lumbini.jpg", color: "#856442" },
  { name: "Food", place: "Kathmandu", detail: "Momo trails · Markets · Home kitchens", image: "/images/food.jpg", color: "#a64d35" },
  { name: "Relaxation", place: "Pokhara", detail: "Lakeside stays · Wellness · Sunsets", image: "/images/pokhara.jpg", color: "#3a6c6b" },
  { name: "Trekking", place: "Annapurna", detail: "Village trails · High passes · Big skies", image: "/images/himalaya.jpg", color: "#59667a" },
];

const tripStyles: Record<string, { heading: string; places: string; package: string; image: string }> = {
  Adventure: { heading: "Take the scenic way down", places: "Pokhara · Trishuli · The Last Resort", package: "7 active journeys", image: "/images/rafting.jpg" },
  Culture: { heading: "Meet Nepal through its people", places: "Kathmandu · Bhaktapur · Bandipur", package: "12 cultural journeys", image: "/images/boudha.jpg" },
  Wildlife: { heading: "A quieter kind of wild", places: "Chitwan · Bardia · Koshi Tappu", package: "8 wildlife journeys", image: "/images/rhino.jpg" },
  Relaxation: { heading: "Slow days, beautifully spent", places: "Pokhara · Namo Buddha · Dhulikhel", package: "6 restorative escapes", image: "/images/lake-boats.jpg" },
  Family: { heading: "Big stories for little explorers", places: "Kathmandu · Pokhara · Chitwan", package: "9 family journeys", image: "/images/chitwan.jpg" },
  Photography: { heading: "Follow the extraordinary light", places: "Mustang · Bhaktapur · Annapurna", package: "5 photo journeys", image: "/images/mustang.jpg" },
  Luxury: { heading: "Nepal, considered in every detail", places: "Kathmandu · Pokhara · Everest", package: "8 private journeys", image: "/images/pokhara.jpg" },
  Trekking: { heading: "Walk into a bigger world", places: "Everest · Annapurna · Manaslu", package: "16 guided treks", image: "/images/annapurna.jpg" },
};

const seasons: Record<string, { temp: string; title: string; text: string; places: string; image: string }> = {
  Spring: { temp: "MAR—MAY", title: "Trails in full colour", text: "Warm days, blooming rhododendrons and superb wildlife sightings make spring wonderfully varied.", places: "Annapurna · Chitwan · Kathmandu", image: "/images/annapurna.jpg" },
  Summer: { temp: "JUN—AUG", title: "Nepal, lush and alive", text: "Rain-fed valleys, vivid rice terraces and quieter cultural sites reward curious off-season travellers.", places: "Mustang · Bandipur · Kathmandu", image: "/images/mustang.jpg" },
  Autumn: { temp: "SEP—NOV", title: "Clear skies, festive spirit", text: "Crisp mountain views and Nepal’s greatest festivals bring energy to every kind of journey.", places: "Everest · Kathmandu · Pokhara", image: "/images/kathmandu-street.jpg" },
  Winter: { temp: "DEC—FEB", title: "Golden light, quieter roads", text: "Ideal for wildlife, heritage and lower-altitude walks, with cool days and beautifully clear horizons.", places: "Chitwan · Lumbini · Pokhara", image: "/images/lumbini.jpg" },
};

function Brand({ light = false }: { light?: boolean }) {
  return <a href="#top" className={`brand ${light ? "brand-light" : ""}`} aria-label="Aayo Nepal home"><span className="brand-mark"><i/><i/><i/></span><span><b>AAYO</b><small>NEPAL JOURNEYS</small></span></a>;
}

export default function TravelHome() {
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [experience, setExperience] = useState(0);
  const [style, setStyle] = useState("Wildlife");
  const [season, setSeason] = useState("Autumn");
  const [search, setSearch] = useState("");
  const [searchNote, setSearchNote] = useState("");

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => setSlide((n) => (n + 1) % heroes.length), 6500);
    return () => window.clearInterval(timer);
  }, [paused]);

  const activeStyle = tripStyles[style];
  const activeSeason = seasons[season];
  const currentHero = heroes[slide];
  const progress = useMemo(() => `${((slide + 1) / heroes.length) * 100}%`, [slide]);

  function submitSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSearchNote(search.trim() ? `Showing journeys for “${search.trim()}”` : "Showing our most-loved journeys");
    document.querySelector("#packages")?.scrollIntoView({ behavior: "smooth" });
  }

  function goHero(direction: number) {
    setSlide((slide + direction + heroes.length) % heroes.length);
  }

  return (
    <main id="top">
      <header className="nav-wrap">
        <Brand light />
        <nav className={`main-nav ${mobileNav ? "open" : ""}`} aria-label="Main navigation">
          <a href="#destinations" onClick={() => setMobileNav(false)}>Destinations</a>
          <a href="#packages" onClick={() => setMobileNav(false)}>Packages</a>
          <a href="#activities" onClick={() => setMobileNav(false)}>Activities</a>
          <a href="#discover" onClick={() => setMobileNav(false)}>Experiences</a>
          <a href="#stories" onClick={() => setMobileNav(false)}>Travel Journal</a>
          <a href="#why" onClick={() => setMobileNav(false)}>About Us</a>
        </nav>
        <div className="nav-actions">
          <a className="nav-search" href="#trip-finder" aria-label="Search"><Icon name="search" /></a>
          <a className="plan-link" href="#trip-finder">Plan your trip</a>
          <a className="book-btn" href="#packages">Book now <Icon name="arrow" size={16}/></a>
          <button className="menu-btn" aria-label="Toggle menu" onClick={() => setMobileNav(!mobileNav)}><Icon name={mobileNav ? "close" : "menu"}/></button>
        </div>
      </header>

      <section className="hero" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        {heroes.map((item, i) => <div key={item.place} className={`hero-bg ${i === slide ? "active" : ""}`} style={{ backgroundImage: `linear-gradient(90deg,rgba(19,22,18,.72) 0%,rgba(19,22,18,.20) 64%,rgba(19,22,18,.35) 100%),url(${item.image})`, backgroundPosition: item.pos }}/>) }
        <div className="hero-content" key={currentHero.place}>
          <div className="hero-place"><span>{currentHero.eyebrow}</span><b>{currentHero.place}</b></div>
          <h1>{currentHero.title}</h1>
          <p>{currentHero.desc}</p>
          <div className="hero-buttons"><a className="btn btn-light" href="#destinations">Explore destinations <Icon name="arrow"/></a><a className="btn btn-ghost" href="#packages">View packages</a></div>
        </div>
        <div className="hero-sidecopy"><span>27.7172° N</span><span>85.3240° E</span></div>
        <div className="hero-nav">
          <button onClick={() => goHero(-1)} aria-label="Previous slide"><Icon name="arrow"/></button>
          <div className="slide-count"><b>{String(slide + 1).padStart(2,"0")}</b><span>/ {String(heroes.length).padStart(2,"0")}</span></div>
          <div className="hero-progress"><i style={{ width: progress }}/></div>
          <button onClick={() => goHero(1)} aria-label="Next slide"><Icon name="arrow"/></button>
        </div>
        <a className="hero-scroll" href="#trip-finder"><span/> SCROLL TO EXPLORE</a>
      </section>

      <section className="trip-finder shell" id="trip-finder">
        <div className="finder-heading"><span className="eyebrow dark">Your journey, your way</span><h2>Where will your next<br/><em>journey take you?</em></h2></div>
        <form className="finder-form" onSubmit={submitSearch}>
          <label className="search-main"><Icon name="search" size={23}/><span>Search journeys</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Destination, package or experience" /></label>
          <div className="filter-row">
            <label><span>Destination</span><select defaultValue=""><option value="" disabled>Anywhere in Nepal</option><option>Kathmandu</option><option>Pokhara</option><option>Chitwan</option><option>Mustang</option></select></label>
            <label><span>Travel date</span><select defaultValue=""><option value="" disabled>Choose a month</option><option>March–May</option><option>June–August</option><option>September–November</option><option>December–February</option></select></label>
            <label><span>Duration</span><select defaultValue=""><option value="" disabled>Any length</option><option>1–4 days</option><option>5–8 days</option><option>9–14 days</option><option>15+ days</option></select></label>
            <label><span>Travel style</span><select defaultValue=""><option value="" disabled>All styles</option>{Object.keys(tripStyles).map(s=><option key={s}>{s}</option>)}</select></label>
            <button type="submit">Find your journey <Icon name="arrow"/></button>
          </div>
          {searchNote && <p className="search-note" role="status">{searchNote}</p>}
        </form>
      </section>

      <section className="section shell" id="destinations">
        <div className="section-heading"><div><span className="eyebrow">Places to begin</span><h2>Explore <em>Nepal</em></h2></div><p>Discover places shaped by culture, nature, adventure and extraordinary landscapes.</p><a href="#packages" className="text-link">View all destinations <Icon name="arrow"/></a></div>
        <div className="destination-grid">
          {destinations.map((d,i)=><a href="#packages" className={`destination-card destination-${i+1}`} key={d.name}>
            <Image src={d.image} alt={`${d.name}, Nepal`} fill sizes="(max-width: 700px) 82vw, 33vw"/>
            <div className="image-shade"/><div className="destination-copy"><span>{String(i+1).padStart(2,"0")}</span><h3>{d.name}</h3><p>{d.meta}</p><div><b>{d.trips} experiences</b><i><Icon name="arrow"/></i></div></div>
          </a>)}
        </div>
      </section>

      <section className="section packages-section" id="packages">
        <div className="shell">
          <div className="section-heading"><div><span className="eyebrow">Curated by local experts</span><h2>Featured <em>packages</em></h2></div><p>Journeys designed to help you experience the best of Nepal, with every important detail considered.</p><a href="#travelers-picks" className="text-link">View all packages <Icon name="arrow"/></a></div>
          <div className="package-layout">
            <article className="package-feature">
              <div className="package-image"><Image src={packages[0].image} alt={packages[0].title} fill sizes="(max-width: 900px) 100vw, 50vw"/><span className="package-tag">Featured escape</span></div>
              <div className="package-info"><div><span>{packages[0].place}</span><h3>{packages[0].title}</h3><p>{packages[0].style}</p></div><div className="package-meta"><span><Icon name="clock"/> {packages[0].days}</span><span><Icon name="star"/> {packages[0].rating}</span><div><small>FROM / PERSON</small><b>{packages[0].price}</b></div><a href="#final-cta" aria-label={`View ${packages[0].title}`}><Icon name="arrow"/></a></div></div>
            </article>
            <div className="package-list">
              {packages.slice(1).map((p,i)=><article className="package-row" key={p.title}>
                <div className="package-thumb"><Image src={p.image} alt={p.title} fill sizes="150px"/><span>0{i+2}</span></div>
                <div className="package-row-copy"><span>{p.place}</span><h3>{p.title}</h3><p><Icon name="clock"/> {p.days} <i/> {p.style}</p><div><b>{p.price}</b><small> / person</small></div></div>
                <a href="#final-cta" className="circle-arrow" aria-label={`View ${p.title}`}><Icon name="arrow"/></a>
              </article>)}
            </div>
          </div>
          <div className="mobile-center"><a className="btn btn-dark" href="#travelers-picks">View all packages <Icon name="arrow"/></a></div>
        </div>
      </section>

      <section className="section activities shell" id="activities">
        <div className="section-heading compact"><div><span className="eyebrow">Move. Meet. Wonder.</span><h2>Choose your <em>adventure</em></h2></div><a href="#discover" className="text-link">Explore all activities <Icon name="arrow"/></a></div>
        <div className="activity-scroll">{activities.map((a,i)=><a href="#packages" className={`activity-card ${i===0?"wide":""}`} key={a.title}><Image src={a.image} alt={a.title} fill sizes="(max-width: 700px) 75vw, 24vw"/><div className="image-shade"/><span>0{i+1}</span><div><small>{a.place}</small><h3>{a.title}</h3><p>Explore experiences <Icon name="arrow"/></p></div></a>)}</div>
      </section>

      <section className="discover" id="discover" style={{"--accent": experienceModes[experience].color} as React.CSSProperties}>
        <div className="discover-image" key={experienceModes[experience].image}><Image src={experienceModes[experience].image} alt={experienceModes[experience].name} fill sizes="50vw" priority={false}/><div className="discover-number">{String(experience+1).padStart(2,"0")}</div></div>
        <div className="discover-copy"><span className="eyebrow light">Our signature collection</span><h2>Discover your<br/><em>Nepal.</em></h2><p>Nepal is not one experience. It is many journeys—each with a different rhythm, landscape and story.</p>
          <div className="mode-tabs">{experienceModes.map((m,i)=><button className={i===experience?"active":""} onClick={()=>setExperience(i)} key={m.name}><span>{m.name}</span><i/></button>)}</div>
          <div className="mode-detail" key={experienceModes[experience].name}><small>{experienceModes[experience].name}</small><h3>{experienceModes[experience].place}</h3><p>{experienceModes[experience].detail}</p><a href="#packages">Explore {experienceModes[experience].name.toLowerCase()} trips <Icon name="arrow"/></a></div>
        </div>
      </section>

      <section className="section picks shell" id="travelers-picks">
        <div className="section-heading"><div><span className="eyebrow">Loved by our travelers</span><h2>Travelers’ <em>picks</em></h2></div><p>The journeys people return from talking about—and their friends book next.</p></div>
        <div className="picks-grid">
          {packages.slice(1,4).map((p,i)=><article className="pick-card" key={p.title}><div className="pick-image"><Image src={p.image} alt={p.title} fill sizes="(max-width: 700px) 82vw, 33vw"/><span>{["Best seller","Family favorite","Adventure pick"][i]}</span><button aria-label="Save trip">♡</button></div><div className="pick-body"><div className="rating"><Icon name="star"/> {p.rating} <span>({34+i*17} reviews)</span></div><small>{p.place} · {p.days}</small><h3>{p.title}</h3><div><p>From <b>{p.price}</b> / person</p><a href="#final-cta">View trip <Icon name="arrow"/></a></div></div></article>)}
        </div>
      </section>

      <section className="trip-style section">
        <div className="shell"><div className="style-title"><span className="eyebrow">Make it yours</span><h2>How do you want to<br/><em>experience Nepal?</em></h2></div>
          <div className="style-tabs">{Object.keys(tripStyles).map(s=><button key={s} className={s===style?"active":""} onClick={()=>setStyle(s)}>{s}</button>)}</div>
          <div className="style-result" key={style}><div className="style-photo"><Image src={activeStyle.image} alt={`${style} in Nepal`} fill sizes="(max-width: 800px) 100vw, 55vw"/></div><div className="style-copy"><span>{style} journeys</span><h3>{activeStyle.heading}</h3><p>{activeStyle.places}</p><small>{activeStyle.package}</small><a href="#packages" className="btn btn-dark">Explore {style.toLowerCase()} trips <Icon name="arrow"/></a></div></div>
        </div>
      </section>

      <section className="why section shell" id="why">
        <div className="why-intro"><div className="why-image"><Image src="/images/kathmandu-street.jpg" alt="A lively Kathmandu street with prayer flags" fill sizes="(max-width: 800px) 100vw, 40vw"/><div className="years"><b>18</b><span>YEARS<br/>IN NEPAL</span></div></div><div><span className="eyebrow">Travel well, travel deeper</span><h2>Local roots.<br/><em>World-class journeys.</em></h2><p>We began in Kathmandu with one clear belief: the best journeys are personal. Today, our local team designs thoughtful Nepal experiences from first idea to final farewell.</p><a href="#final-cta" className="text-link">Meet the people behind Aayo <Icon name="arrow"/></a></div></div>
        <div className="benefit-grid">{[
          ["01","Local expertise","Travel with people who know Nepal beyond the usual routes—and love sharing it."],
          ["02","Carefully designed","Real experiences, thoughtful pacing and stays we would choose for ourselves."],
          ["03","Trusted network","Guides, transport and hosts managed through relationships built over years."],
          ["04","Personal support","A real person by your side before, during and after your journey."],
        ].map(b=><div className="benefit" key={b[0]}><span>{b[0]}</span><h3>{b[1]}</h3><p>{b[2]}</p></div>)}</div>
      </section>

      <section className="season-section section">
        <div className="shell"><div className="season-head"><div><span className="eyebrow light">Nepal through the year</span><h2>Every season holds<br/><em>a different journey.</em></h2></div><p>There is no single “best time” to visit Nepal—only the right time for what you want to experience.</p></div>
          <div className="season-tabs">{Object.keys(seasons).map(s=><button key={s} className={s===season?"active":""} onClick={()=>setSeason(s)}><span>{seasons[s].temp}</span>{s}</button>)}</div>
          <div className="season-result" key={season}><div><span>{activeSeason.temp}</span><h3>{activeSeason.title}</h3><p>{activeSeason.text}</p><small>BEST FOR</small><b>{activeSeason.places}</b><a href="#packages">Explore trips by season <Icon name="arrow"/></a></div><div className="season-image"><Image src={activeSeason.image} alt={`${season} travel in Nepal`} fill sizes="(max-width: 800px) 100vw, 55vw"/></div></div>
        </div>
      </section>

      <section className="stories section shell" id="stories">
        <div className="section-heading compact"><div><span className="eyebrow">Ideas from the road</span><h2>Stories from <em>Nepal</em></h2></div><a href="#stories" className="text-link">Explore travel stories <Icon name="arrow"/></a></div>
        <div className="stories-grid">
          <article className="story-main"><div><Image src="/images/food.jpg" alt="Nepalese momo dumplings" fill sizes="(max-width: 800px) 100vw, 55vw"/><span>Food & culture</span></div><small>8 MINUTE GUIDE</small><h3>Kathmandu, one plate at a time</h3><p>A local’s route through hidden courtyards, steaming momo shops and the flavours that make the valley home.</p></article>
          <div className="story-side"><article><Image src="/images/mustang-monastery.jpg" alt="Upper Mustang monastery" width={220} height={150}/><div><small>FIELD NOTES · 6 MIN</small><h3>The road to Lo Manthang</h3><a href="#stories">Explore story <Icon name="arrow"/></a></div></article><article><Image src="/images/lake-boats.jpg" alt="Boats on Phewa Lake" width={220} height={150}/><div><small>LOCAL GUIDE · 5 MIN</small><h3>A slower side of Pokhara</h3><a href="#stories">Explore story <Icon name="arrow"/></a></div></article></div>
        </div>
      </section>

      <section className="reviews section">
        <div className="shell review-inner"><div className="review-photo"><Image src="/images/pokhara.jpg" alt="Traveler in Pokhara" fill sizes="(max-width: 800px) 100vw, 38vw"/><div className="review-rating"><Icon name="star"/><Icon name="star"/><Icon name="star"/><Icon name="star"/><Icon name="star"/></div></div><div className="review-copy"><Icon name="quote" size={48}/><blockquote>“Some journeys become memories. Nepal became a story we still tell.”</blockquote><p>Aayo understood the balance we wanted—adventure, comfort and enough time to simply be there. Every local guide made us feel like guests, not tourists.</p><div><span className="avatar">ML</span><p><b>Maya & Lucas</b><small>Melbourne, Australia · Pokhara Adventure Journey</small></p></div><div className="review-nav"><button aria-label="Previous review"><Icon name="arrow"/></button><span>01 / 03</span><button aria-label="Next review"><Icon name="arrow"/></button></div></div></div>
      </section>

      <section className="final-cta" id="final-cta"><Image src="/images/kathmandu.jpg" alt="Kathmandu at sunset" fill sizes="100vw"/><div className="image-shade"/><div><span className="eyebrow light">Ready when you are</span><h2>Your Nepal journey<br/><em>starts here.</em></h2><p>Choose a destination, find your perfect experience, and let us help you plan the rest.</p><div><a href="#destinations" className="btn btn-light">Explore destinations <Icon name="arrow"/></a><a href="#packages" className="btn btn-ghost">View packages</a></div></div></section>

      <footer><div className="shell footer-top"><div className="footer-brand"><Brand light/><p>Nepal is not one experience.<br/>It is many journeys.</p><div className="social"><a href="#" aria-label="Instagram"><Icon name="instagram"/></a><a href="#" aria-label="Facebook"><Icon name="facebook"/></a></div></div><div><h3>Explore</h3><a href="#destinations">Destinations</a><a href="#packages">Packages</a><a href="#activities">Activities</a><a href="#discover">Experiences</a></div><div><h3>Plan</h3><a href="#trip-finder">Trip finder</a><a href="#why">Why Aayo</a><a href="#stories">Travel guide</a><a href="#final-cta">Contact us</a></div><div className="footer-contact"><h3>Start a conversation</h3><a href="mailto:journeys@aayonepal.com">journeys@aayonepal.com</a><a href="tel:+97714521234">+977 1 452 1234</a><p>Thamel, Kathmandu<br/>Nepal</p></div></div><div className="shell footer-bottom"><span>© 2026 Aayo Nepal Journeys</span><span>Licensed Nepal tour operator · Reg. 28471</span><div><a href="#">Privacy</a><a href="#">Terms</a></div></div></footer>
      <a href="#trip-finder" className="mobile-sticky">Plan my Nepal trip <Icon name="arrow"/></a>
    </main>
  );
}
