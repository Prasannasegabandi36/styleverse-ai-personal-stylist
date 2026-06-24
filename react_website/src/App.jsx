import React, { useMemo, useState } from 'react';
import { Sparkles, Shirt, Gem, Footprints, Camera, Wand2, Palette, CloudSun, IndianRupee, CheckCircle2 } from 'lucide-react';

const styleRules = {
  Wedding: {
    women: {
      outfit: 'Elegant silk saree, lehenga, or anarkali with premium embroidery',
      footwear: 'Embellished heels or ethnic juttis',
      jewelry: 'Statement earrings, bangles, layered necklace, small clutch',
      hair: 'Soft curls, bun with flowers, or polished half-up style',
    },
    men: {
      outfit: 'Sherwani, kurta set with Nehru jacket, or tailored bandhgalas',
      footwear: 'Mojaris, loafers, or polished formal shoes',
      jewelry: 'Watch, brooch, pocket square, subtle bracelet',
      hair: 'Clean side-part, textured quiff, or neatly styled natural hair',
    },
  },
  Interview: {
    women: {
      outfit: 'Solid shirt or blouse with blazer, trousers, formal kurti, or pencil skirt',
      footwear: 'Closed-toe flats, formal heels, or loafers',
      jewelry: 'Minimal studs, watch, thin chain, structured handbag',
      hair: 'Neat ponytail, bun, or clean open hairstyle',
    },
    men: {
      outfit: 'Crisp shirt with trousers, blazer, or formal suit depending on company culture',
      footwear: 'Oxford shoes, derbies, or clean loafers',
      jewelry: 'Watch, belt matching shoes, minimal accessories',
      hair: 'Neat haircut, trimmed beard, fresh grooming',
    },
  },
  College: {
    women: {
      outfit: 'Comfortable jeans, kurti, crop shirt, oversized tee, or casual dress',
      footwear: 'Sneakers, flats, or sandals',
      jewelry: 'Hoops, minimal chain, tote bag, smartwatch',
      hair: 'Claw clip, ponytail, braids, or natural open hair',
    },
    men: {
      outfit: 'Casual shirt, graphic tee, denim, chinos, or overshirt layering',
      footwear: 'Sneakers, casual loafers, or sandals',
      jewelry: 'Watch, cap, simple chain, backpack',
      hair: 'Textured casual style or neat low-maintenance look',
    },
  },
  Party: {
    women: {
      outfit: 'Statement dress, satin shirt with trousers, jumpsuit, or shimmer top',
      footwear: 'Heels, boots, or stylish flats',
      jewelry: 'Bold earrings, clutch, rings, layered necklace',
      hair: 'Glossy waves, sleek bun, or high ponytail',
    },
    men: {
      outfit: 'Smart casual shirt, black jeans, blazer, bomber jacket, or monochrome fit',
      footwear: 'Chelsea boots, sneakers, or loafers',
      jewelry: 'Watch, chain, bracelet, perfume',
      hair: 'Styled quiff, messy texture, or sleek side part',
    },
  },
  Travel: {
    women: {
      outfit: 'Breathable co-ord set, cargo pants, loose tee, shrug, or travel dress',
      footwear: 'Comfort sneakers or cushioned sandals',
      jewelry: 'Sunglasses, sling bag, cap, minimal earrings',
      hair: 'Braids, ponytail, or easy claw-clip hairstyle',
    },
    men: {
      outfit: 'Cargo pants, breathable tee, overshirt, hoodie, or light jacket',
      footwear: 'Comfort sneakers or walking shoes',
      jewelry: 'Cap, sunglasses, smartwatch, crossbody bag',
      hair: 'Low-maintenance travel-friendly style',
    },
  },
};

const palettes = {
  Classic: ['Ivory', 'Black', 'Navy', 'Beige'],
  Royal: ['Emerald', 'Wine', 'Gold', 'Cream'],
  Soft: ['Pastel Pink', 'Lavender', 'Powder Blue', 'Pearl'],
  Bold: ['Red', 'Black', 'Silver', 'Electric Blue'],
  Earthy: ['Olive', 'Brown', 'Rust', 'Sand'],
};

function buildAdvice({ occasion, gender, mood, weather, budget, color }) {
  const selected = styleRules[occasion][gender];
  const palette = palettes[color] || palettes.Classic;
  const weatherTip = weather === 'Hot'
    ? 'Choose breathable fabrics like cotton, linen, georgette, or light blends.'
    : weather === 'Cold'
    ? 'Add layering with jackets, shawls, blazers, cardigans, or warm innerwear.'
    : weather === 'Rainy'
    ? 'Avoid heavy fabrics and prefer darker shades, anti-slip footwear, and compact layers.'
    : 'Balance comfort and style with medium-weight fabrics.';

  const budgetTip = budget === 'Low'
    ? 'Use existing basics and upgrade the look with one strong accessory.'
    : budget === 'Medium'
    ? 'Invest in one hero item like blazer, saree, shoes, or handbag.'
    : 'Go for premium tailoring, fabric quality, and coordinated accessories.';

  return {
    selected,
    palette,
    weatherTip,
    budgetTip,
    confidence: Math.floor(87 + Math.random() * 10),
    summary: `${mood} ${occasion.toLowerCase()} styling with ${palette.join(', ')} tones, balanced for ${weather.toLowerCase()} weather and ${budget.toLowerCase()} budget.`,
  };
}

function App() {
  const [form, setForm] = useState({
    occasion: 'Wedding',
    gender: 'women',
    mood: 'Elegant',
    weather: 'Hot',
    budget: 'Medium',
    color: 'Royal',
  });

  const advice = useMemo(() => buildAdvice(form), [form]);

  const update = (key, value) => setForm((old) => ({ ...old, [key]: value }));

  return (
    <main>
      <section className="hero">
        <nav className="nav">
          <div className="brand"><Sparkles size={24} /> StyleVerse AI</div>
          <a href="#stylist">Try Stylist</a>
        </nav>
        <div className="hero-grid">
          <div>
            <p className="eyebrow">AI Personal Stylist • Outfit Designer • Wardrobe Planner</p>
            <h1>Complete top-to-bottom styling for every occasion.</h1>
            <p className="subtitle">StyleVerse AI suggests outfits, jewelry, footwear, hairstyle, colors, and styling notes for men and women using occasion, weather, budget, and mood.</p>
            <div className="hero-actions">
              <a className="primary" href="#stylist"><Wand2 size={18} /> Generate Look</a>
              <a className="secondary" href="#features">Explore Features</a>
            </div>
          </div>
          <div className="fashion-card floating">
            <div className="model-orb">SV</div>
            <h3>Today’s Look</h3>
            <p>Royal festive fit with emerald, gold and cream palette.</p>
            <div className="chips"><span>Elegant</span><span>Premium</span><span>Weather-aware</span></div>
          </div>
        </div>
      </section>

      <section id="features" className="features">
        <Feature icon={<Shirt />} title="Outfit Planner" text="Full outfit ideas for college, wedding, interview, party, travel, and casual looks." />
        <Feature icon={<Gem />} title="Accessory Match" text="Jewelry, bags, watches, perfume, hairstyle, and finishing details." />
        <Feature icon={<Palette />} title="Color Palette" text="Classic, royal, soft, bold, and earthy palettes to match your vibe." />
        <Feature icon={<CloudSun />} title="Weather Fit" text="Fabric and layer suggestions based on hot, cold, rainy, or pleasant weather." />
      </section>

      <section id="stylist" className="stylist">
        <div className="section-head">
          <p className="eyebrow">Live Demo</p>
          <h2>Generate your AI styling plan</h2>
        </div>
        <div className="stylist-grid">
          <div className="panel controls">
            <Select label="Occasion" value={form.occasion} onChange={(v) => update('occasion', v)} options={Object.keys(styleRules)} />
            <Select label="Gender Styling" value={form.gender} onChange={(v) => update('gender', v)} options={[['women','Women'], ['men','Men']]} />
            <Select label="Style Mood" value={form.mood} onChange={(v) => update('mood', v)} options={['Elegant', 'Minimal', 'Trendy', 'Royal', 'Comfortable']} />
            <Select label="Weather" value={form.weather} onChange={(v) => update('weather', v)} options={['Hot', 'Cold', 'Rainy', 'Pleasant']} />
            <Select label="Budget" value={form.budget} onChange={(v) => update('budget', v)} options={['Low', 'Medium', 'High']} />
            <Select label="Color Theme" value={form.color} onChange={(v) => update('color', v)} options={Object.keys(palettes)} />
          </div>

          <div className="panel result">
            <div className="score"><CheckCircle2 size={20} /> Match Score: {advice.confidence}%</div>
            <h3>{form.mood} {form.occasion} Look</h3>
            <p className="summary">{advice.summary}</p>
            <ResultItem icon={<Shirt />} label="Outfit" text={advice.selected.outfit} />
            <ResultItem icon={<Footprints />} label="Footwear" text={advice.selected.footwear} />
            <ResultItem icon={<Gem />} label="Accessories" text={advice.selected.jewelry} />
            <ResultItem icon={<Camera />} label="Hair & Grooming" text={advice.selected.hair} />
            <ResultItem icon={<CloudSun />} label="Weather Note" text={advice.weatherTip} />
            <ResultItem icon={<IndianRupee />} label="Budget Tip" text={advice.budgetTip} />
            <div className="palette-row">
              {advice.palette.map((p) => <span key={p}>{p}</span>)}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Feature({ icon, title, text }) {
  return <div className="feature">{icon}<h3>{title}</h3><p>{text}</p></div>;
}

function Select({ label, value, onChange, options }) {
  const normalized = options.map((item) => Array.isArray(item) ? item : [item, item]);
  return <label>{label}<select value={value} onChange={(e) => onChange(e.target.value)}>{normalized.map(([v,l]) => <option key={v} value={v}>{l}</option>)}</select></label>;
}

function ResultItem({ icon, label, text }) {
  return <div className="result-item"><div>{icon}</div><div><strong>{label}</strong><p>{text}</p></div></div>;
}

export default App;
