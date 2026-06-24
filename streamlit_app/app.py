import os
from pathlib import Path

import pandas as pd
import streamlit as st
from dotenv import load_dotenv

try:
    from groq import Groq
except Exception:
    Groq = None

load_dotenv()

APP_DIR = Path(__file__).parent
DATA_PATH = APP_DIR / "data" / "style_database.csv"

st.set_page_config(
    page_title="StyleVerse AI Personal Stylist",
    page_icon="✨",
    layout="wide",
)

CUSTOM_CSS = """
<style>
    .stApp { background: linear-gradient(135deg, #190720 0%, #32164b 50%, #5b1635 100%); color: white; }
    .main-card { padding: 28px; border-radius: 28px; background: rgba(255,255,255,0.10); border: 1px solid rgba(255,255,255,0.20); box-shadow: 0 20px 60px rgba(0,0,0,.25); }
    .result-card { padding: 24px; border-radius: 24px; background: rgba(255,255,255,0.95); color: #20102f; margin-bottom: 16px; border: 1px solid rgba(255,255,255,0.3); }
    .pill { display: inline-block; padding: 8px 12px; border-radius: 999px; background: #ffe3ef; color: #9b1749; margin: 4px; font-weight: 700; }
    .small { color: #ead9ef; font-size: 15px; }
    h1, h2, h3 { font-weight: 800 !important; }
</style>
"""

st.markdown(CUSTOM_CSS, unsafe_allow_html=True)

@st.cache_data
def load_style_data():
    return pd.read_csv(DATA_PATH)

STYLE_DATA = load_style_data()

PALETTES = {
    "Classic": ["Ivory", "Black", "Navy", "Beige"],
    "Royal": ["Emerald", "Wine", "Gold", "Cream"],
    "Soft": ["Pastel Pink", "Lavender", "Powder Blue", "Pearl"],
    "Bold": ["Red", "Black", "Silver", "Electric Blue"],
    "Earthy": ["Olive", "Brown", "Rust", "Sand"],
}

WEATHER_TIPS = {
    "Hot": "Choose breathable fabrics like cotton, linen, georgette, or light blends. Avoid very heavy layering.",
    "Cold": "Add warm layers like blazer, cardigan, shawl, jacket, or thermal innerwear while keeping colors coordinated.",
    "Rainy": "Use darker shades, quick-dry fabrics, anti-slip footwear, and avoid long/heavy outfits that drag on the ground.",
    "Pleasant": "You can balance comfort and style with medium-weight fabrics and light layering.",
}

BUDGET_TIPS = {
    "Low": "Use existing basics and upgrade the look with one strong accessory like earrings, watch, scarf, or shoes.",
    "Medium": "Invest in one hero item such as blazer, saree, shoes, handbag, or jacket and keep the rest simple.",
    "High": "Focus on premium fabric, tailoring, coordinated accessories, footwear quality, and fragrance.",
}

def get_rule_based_recommendation(occasion, gender, mood, weather, budget, palette_name, body_fit, notes):
    row = STYLE_DATA[
        (STYLE_DATA["occasion"].str.lower() == occasion.lower())
        & (STYLE_DATA["gender"].str.lower() == gender.lower())
    ].iloc[0]

    palette = PALETTES[palette_name]
    return {
        "title": f"{mood} {occasion} Look",
        "summary": f"A {mood.lower()} outfit plan using {', '.join(palette)} tones, suitable for {weather.lower()} weather and {budget.lower()} budget.",
        "outfit": row["outfit"],
        "footwear": row["footwear"],
        "accessories": row["accessories"],
        "hair": row["hair"],
        "weather_tip": WEATHER_TIPS[weather],
        "budget_tip": BUDGET_TIPS[budget],
        "body_fit_tip": f"For {body_fit.lower()} preference, choose cuts that feel comfortable and confident instead of blindly following trends.",
        "style_note": row["style_note"],
        "palette": palette,
        "extra_notes": notes.strip() or "No special notes added.",
    }

def get_ai_recommendation(prompt):
    api_key = os.getenv("GROQ_API_KEY", "").strip()
    if not api_key or Groq is None:
        return None
    try:
        client = Groq(api_key=api_key)
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": "You are StyleVerse AI, a practical personal stylist. Give complete top-to-bottom outfit advice with outfit, footwear, accessories, hair/grooming, colors, and budget notes."},
                {"role": "user", "content": prompt},
            ],
            temperature=0.7,
            max_tokens=750,
        )
        return response.choices[0].message.content
    except Exception as exc:
        return f"AI styling failed, so rule-based styling is shown. Error: {exc}"

def render_result(result):
    st.markdown(f"""
    <div class='result-card'>
        <h2>{result['title']}</h2>
        <p>{result['summary']}</p>
        <p>{''.join([f'<span class="pill">{p}</span>' for p in result['palette']])}</p>
    </div>
    """, unsafe_allow_html=True)

    c1, c2 = st.columns(2)
    with c1:
        st.markdown("### 👗 Outfit")
        st.write(result["outfit"])
        st.markdown("### 👠 Footwear")
        st.write(result["footwear"])
        st.markdown("### 💍 Accessories")
        st.write(result["accessories"])
    with c2:
        st.markdown("### 💇 Hair / Grooming")
        st.write(result["hair"])
        st.markdown("### 🌦 Weather Tip")
        st.write(result["weather_tip"])
        st.markdown("### 💰 Budget Tip")
        st.write(result["budget_tip"])

    st.info(result["body_fit_tip"])
    st.success(result["style_note"])

st.markdown("""
<div class='main-card'>
    <h1>✨ StyleVerse AI — Personal Stylist</h1>
    <p class='small'>AI Personal Stylist • Outfit Designer • Wardrobe Planner</p>
    <p>Get complete top-to-bottom styling suggestions for men and women based on occasion, weather, budget, color palette, and personal mood.</p>
</div>
""", unsafe_allow_html=True)

st.write("")

left, right = st.columns([0.9, 1.1], gap="large")

with left:
    st.markdown("### 🧾 Your Styling Details")
    occasion = st.selectbox("Occasion", sorted(STYLE_DATA["occasion"].unique()), index=3)
    gender = st.radio("Styling Category", ["women", "men"], horizontal=True)
    mood = st.selectbox("Style Mood", ["Elegant", "Minimal", "Trendy", "Royal", "Comfortable", "Bold"])
    weather = st.selectbox("Weather", ["Hot", "Cold", "Rainy", "Pleasant"])
    budget = st.selectbox("Budget", ["Low", "Medium", "High"])
    palette_name = st.selectbox("Color Palette", list(PALETTES.keys()), index=1)
    body_fit = st.selectbox("Fit Preference", ["Relaxed", "Regular", "Slim", "Modest", "Statement"])
    notes = st.text_area("Any extra note?", placeholder="Example: I prefer simple jewelry, I want Telugu wedding look, avoid heels, etc.")
    use_ai = st.toggle("Use Groq AI explanation if API key is available", value=False)

with right:
    result = get_rule_based_recommendation(occasion, gender, mood, weather, budget, palette_name, body_fit, notes)
    render_result(result)

    if use_ai:
        prompt = f"""
        Create a complete styling plan with these inputs:
        Occasion: {occasion}
        Gender styling: {gender}
        Mood: {mood}
        Weather: {weather}
        Budget: {budget}
        Color palette: {palette_name} - {PALETTES[palette_name]}
        Fit preference: {body_fit}
        Extra note: {notes}
        Include outfit, footwear, jewelry/accessories, hair/grooming, colors, and final confidence tips.
        """
        ai_text = get_ai_recommendation(prompt)
        if ai_text:
            st.markdown("### 🤖 AI Stylist Explanation")
            st.write(ai_text)
        else:
            st.warning("Groq API key not found. Add GROQ_API_KEY in .env to enable AI explanation.")

st.divider()
st.markdown("### 🚀 Portfolio Points")
st.write("- Built an AI-powered fashion styling assistant with occasion, gender, weather, budget, color, and fit-aware recommendations.")
st.write("- Created both a React product website and Streamlit AI demo version for deployment-ready presentation.")
st.write("- Added optional Groq LLM integration with fallback rule-based logic for free usage.")
