# StyleVerse AI — Personal Stylist

StyleVerse AI is an AI-powered personal styling project that recommends complete outfits from top to bottom for men and women based on occasion, style mood, weather, budget, color preferences, body fit preference, and accessories.

This ZIP contains two versions:

1. **React Website Version** — polished frontend portfolio/product website.
2. **Streamlit AI Version** — interactive AI styling assistant with optional Groq API support.

---

## Folder Structure

```text
styleverse_ai_full_project/
├── react_website/
│   ├── package.json
│   ├── index.html
│   ├── src/
│   │   ├── main.jsx
│   │   ├── App.jsx
│   │   └── App.css
│   └── README.md
├── streamlit_app/
│   ├── app.py
│   ├── requirements.txt
│   ├── .env.example
│   ├── README.md
│   └── data/
│       └── style_database.csv
└── README.md
```

---

## React Website Setup

```bash
cd react_website
npm install
npm run dev
```

For deployment on Vercel:
- Framework: Vite
- Build command: `npm run build`
- Output folder: `dist`

---

## Streamlit App Setup

```bash
cd streamlit_app
pip install -r requirements.txt
streamlit run app.py
```

Optional Groq setup:
1. Copy `.env.example` to `.env`
2. Add your Groq API key
3. Restart Streamlit

Without Groq key, the app still works using rule-based styling logic.

---

## Suggested GitHub Repo Name

`styleverse-ai-personal-stylist`

---

## Project Highlights

- Occasion-based outfit recommendations
- Men and women styling support
- Jewelry, footwear, hairstyle, and accessory suggestions
- Budget-aware styling
- Weather-aware outfit advice
- Color palette suggestions
- AI-generated styling explanation
- Portfolio-ready UI
