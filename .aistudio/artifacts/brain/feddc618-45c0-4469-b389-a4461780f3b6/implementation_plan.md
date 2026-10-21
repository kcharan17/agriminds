# AgriMinds — AI-Powered Crop Health Assistant

AgriMinds is a production-grade, mobile-first web application built for the AgriTech Hackathon 2026, empowering farmers with multimodal AI diagnostics (crop photo & video analysis), crop risk assessment, expert recommendations ("What should I do now?"), multi-language support (English, Telugu, Hindi), Google Search Grounding for up-to-date agricultural insights, and an intelligent Gemini Chatbot assistant.

## User Review & Critical Decisions

> [!IMPORTANT]
> - **Language Support**: English, Telugu, and Hindi are fully supported with a top-bar language selector (defaulting to English on startup per user preference).
> - **AI Capabilities**: Uses Gemini server-side SDK (`@google/genai`) with `gemini-4-argon` / `gemini-3.8-flash` for multimodal image/video analysis, structured JSON reporting, search grounding, and interactive chat.
> - **Data Persistence**: Uses local state and localStorage for report history, structured for seamless expansion to Firebase/Google Sheets.

## 1. Overview & Core Concept

- **What It Does**: Identifies crop diseases, pests, and nutrient deficiencies from photos and videos, assesses local risk factors, provides structured actionable steps ("What should I do now?"), and answers agronomic questions via a dedicated Gemini chatbot with search grounding.
- **Target Audience**: Indian farmers, agronomists, and agricultural extension workers needing fast, reliable field diagnostics in local languages.
- **Key Value**: Bridges the gap between symptom observation and practical, timely crop care with zero technical friction.

## 2. User Experience & Visual Design

- **Key User Flows**:
  1. Dashboard view with language switcher, AI service status, and 3 primary actions (Check Crop Photo, Analyze Crop Video, Check Crop Risk), plus Recent Reports and Gemini AgriChat.
  2. Crop Photo Analysis modal/view: Upload/take photo -> Gemini analysis -> structured findings (symptoms, causes, confidence, recommendations).
  3. Crop Video Analysis view: Upload video -> frame/video understanding -> observations & next steps.
  4. Crop Risk Assessment form: Location, crop name, growth stage, weather inputs -> risk score & advisory.
  5. Action Advisor section: Step-by-step guidance ("What should I do now?").
  6. AgriChat: Multilingual conversational AI assistant with Google Search grounding for real-time agricultural advisories.
- **Visual Identity & Theme**:
  - *Palette*: Forest green (`#245C3A`), secondary green (`#4F8A45`), off-white background (`#F8F7F0`), white cards (`#FFFFFF`), wood brown accent (`#8B6548`).
  - *Typography*: Clean sans-serif with tabular numerals for data.
  - *UI Principles*: Mobile-first, zero-pill metadata, single-elevation cards,WCAG AA contrast, no AI slop/fake counters.

## 3. Key Product Decisions & Trade-Offs

- **Server-Side Gemini Integration**: All `@google/genai` calls routed through Express backend endpoints (`/api/analyze-photo`, `/api/analyze-video`, `/api/risk-assessment`, `/api/chat`) to protect API keys.
- **Client Resilience**: Robust fallback handling for offline or rate-limited AI responses with simulated demo data fallback if API keys are unconfigured.

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────┐
│                        React SPA                       │
│  (Dashboard, Photo Upload, Video Upload, Risk Form,   │
│   Action Advisor, AgriChat, Recent Reports, i18n)     │
└───────────────────────────┬────────────────────────────┘
                            │ REST / JSON
                            ▼
┌────────────────────────────────────────────────────────┐
│                   Express Backend                      │
│                  (server.ts / /api/*)                  │
└───────────────────────────┬────────────────────────────┘
                            │ @google/genai SDK
                            ▼
┌────────────────────────────────────────────────────────┐
│                     Google Gemini                      │
│     (gemini-4-argon / gemini-3.8-flash + Search)       │
└────────────────────────────────────────────────────────┘
```

- **Data Model (Crop Report)**:
  - `report_id`, `created_at`, `crop_name`, `location`, `growth_stage`, `input_type`, `observations`, `possible_causes`, `confidence`, `uncertainty`, `recommended_actions`, `preventive_measures`, `urgency`, `selected_language`, `expert_review_required`.
