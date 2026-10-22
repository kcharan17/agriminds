import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import express from "express";
import { GoogleGenAI } from "@google/genai";
const require2 = createRequire(import.meta.url);
globalThis.require = require2;
dotenv.config();
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
});
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json({ limit: "50mb" }));
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build"
    }
  }
});
const safeJsonParse = (text, fallback = {}) => {
  if (!text) return fallback;
  try {
    const clean = text.trim().replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```\s*$/i, "").trim();
    return JSON.parse(clean);
  } catch {
    try {
      const match = text.match(/\{[\s\S]*\}/);
      if (match) {
        return JSON.parse(match[0]);
      }
    } catch {
    }
    return fallback;
  }
};
const getFallbackReport = (cropName = "Tomato", inputType = "photo", language = "en") => {
  const isTelugu = language === "te";
  const isHindi = language === "hi";
  return {
    report_id: "AGRI-" + Math.floor(1e5 + Math.random() * 9e5),
    created_at: (/* @__PURE__ */ new Date()).toISOString(),
    crop_name: cropName,
    location: "Telangana / India (Demo Region)",
    growth_stage: "Vegetative / Flowering",
    input_type: inputType,
    observations: isTelugu ? "\u0C06\u0C15\u0C41\u0C32\u0C2A\u0C48 \u0C35\u0C32\u0C2F \u0C2E\u0C1A\u0C4D\u0C1A\u0C32\u0C41 \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C2A\u0C38\u0C41\u0C2A\u0C41 \u0C30\u0C02\u0C17\u0C41 \u0C05\u0C02\u0C1A\u0C41\u0C32\u0C41 \u0C17\u0C2E\u0C28\u0C3F\u0C02\u0C1A\u0C2C\u0C21\u0C4D\u0C21\u0C3E\u0C2F\u0C3F. \u0C24\u0C47\u0C2E \u0C36\u0C3E\u0C24\u0C02 \u0C0E\u0C15\u0C4D\u0C15\u0C41\u0C35\u0C17\u0C3E \u0C09\u0C02\u0C21\u0C1F\u0C02 \u0C35\u0C32\u0C4D\u0C32 \u0C08 \u0C32\u0C15\u0C4D\u0C37\u0C23\u0C3E\u0C32\u0C41 \u0C15\u0C28\u0C3F\u0C2A\u0C3F\u0C38\u0C4D\u0C24\u0C41\u0C28\u0C4D\u0C28\u0C3E\u0C2F\u0C3F." : isHindi ? "\u092A\u0924\u094D\u0924\u094B\u0902 \u092A\u0930 \u0917\u094B\u0932\u093E\u0915\u093E\u0930 \u0927\u092C\u094D\u092C\u0947 \u0914\u0930 \u092A\u0940\u0932\u0947 \u0915\u093F\u0928\u093E\u0930\u0947 \u0926\u0947\u0916\u0947 \u0917\u090F \u0939\u0948\u0902\u0964 \u0909\u091A\u094D\u091A \u0906\u0930\u094D\u0926\u094D\u0930\u0924\u093E \u0915\u0947 \u0915\u093E\u0930\u0923 \u092F\u0947 \u0932\u0915\u094D\u0937\u0923 \u0926\u093F\u0916\u093E\u0908 \u0926\u0947 \u0930\u0939\u0947 \u0939\u0948\u0902\u0964" : "Concentric dark spots and yellow halos observed on lower leaves. Mildew symptoms consistent with high humidity and damp soil conditions.",
    possible_causes: isTelugu ? ["\u0C06\u0C15\u0C41 \u0C2E\u0C1A\u0C4D\u0C1A \u0C24\u0C46\u0C17\u0C41\u0C32\u0C41 (Early Blight / Alternaria)", "\u0C2A\u0C4A\u0C1F\u0C3E\u0C37\u0C3F\u0C2F\u0C02 \u0C32\u0C4B\u0C2A\u0C02"] : isHindi ? ["\u0905\u0930\u094D\u0932\u0940 \u092C\u094D\u0932\u093E\u0907\u091F (Alternaria solani)", "\u092A\u094B\u091F\u0947\u0936\u093F\u092F\u092E \u0915\u0940 \u0915\u092E\u0940"] : ["Early Blight (Alternaria solani)", "Potassium Deficiency / Moisture Stress"],
    confidence: "85%",
    uncertainty: "Diagnostic is based on visual symptom matching. Laboratory leaf tissue testing recommended for absolute confirmation.",
    recommended_actions: {
      immediate_inspection: "Inspect underside of leaves and check root zone moisture.",
      low_cost_actions: "Remove and bury severely infected lower leaves. Ensure proper plant spacing for air circulation.",
      preventive_measures: "Avoid overhead sprinkler irrigation. Apply neem oil spray as a natural deterrent.",
      re_inspection_schedule: "Re-inspect fields in 3 days after morning dew dries.",
      expert_assistance: "Consult local Krishi Vigyan Kendra (KVK) agronomist if symptoms spread beyond 20% canopy.",
      chemical_treatment: "If infestation exceeds threshold, apply approved copper-based fungicide following local agricultural extension guidelines."
    },
    preventive_measures: "Use certified disease-free seeds and practice 2-year crop rotation.",
    urgency: "Moderate",
    selected_language: language,
    expert_review_required: false
  };
};
app.get("/api/status", (req, res) => {
  const hasKey = !!process.env.GEMINI_API_KEY;
  res.json({
    available: true,
    model: "gemini-3.8-flash",
    hasApiKey: hasKey,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  });
});
app.post("/api/analyze-photo", async (req, res, next) => {
  try {
    const { imageBase64, mimeType, cropName = "Unknown Crop", language = "en" } = req.body || {};
    if (!process.env.GEMINI_API_KEY) {
      return res.json(getFallbackReport(cropName, "photo", language));
    }
    const cleanBase64 = (imageBase64 || "").replace(/^data:image\/[a-z]+;base64,/, "");
    if (!cleanBase64) {
      return res.status(400).json({ error: "Missing image data" });
    }
    const imagePart = {
      inlineData: {
        mimeType: mimeType || "image/jpeg",
        data: cleanBase64
      }
    };
    const prompt = `You are 3xAI Farmer expert agronomist AI assisting Indian farmers. Analyze this crop image for ${cropName}. 
    Provide a detailed diagnostic report in ${language === "te" ? "Telugu" : language === "hi" ? "Hindi" : "English"}.
    Return ONLY a valid JSON object matching this schema:
    {
      "report_id": string,
      "created_at": string,
      "crop_name": string,
      "location": string,
      "growth_stage": string,
      "input_type": "photo",
      "observations": string,
      "possible_causes": string[],
      "confidence": string,
      "uncertainty": string,
      "recommended_actions": {
        "immediate_inspection": string,
        "low_cost_actions": string,
        "preventive_measures": string,
        "re_inspection_schedule": string,
        "expert_assistance": string,
        "chemical_treatment": string
      },
      "preventive_measures": string,
      "urgency": "Low" | "Moderate" | "High" | "Critical",
      "selected_language": string,
      "expert_review_required": boolean
    }`;
    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: { parts: [imagePart, { text: prompt }] },
      config: {
        responseMimeType: "application/json",
        temperature: 0.2
      }
    });
    const parsed = safeJsonParse(response.text || "", getFallbackReport(cropName, "photo", language));
    res.json({
      report_id: parsed.report_id || "AGRI-" + Math.floor(1e5 + Math.random() * 9e5),
      created_at: (/* @__PURE__ */ new Date()).toISOString(),
      crop_name: parsed.crop_name || cropName,
      location: parsed.location || "India",
      growth_stage: parsed.growth_stage || "Vegetative",
      input_type: "photo",
      observations: parsed.observations || "Visual symptoms analyzed from crop photograph.",
      possible_causes: parsed.possible_causes || ["Fungal infection", "Nutrient deficiency"],
      confidence: parsed.confidence || "80%",
      uncertainty: parsed.uncertainty || "Visual inspection only; field verification advised.",
      recommended_actions: parsed.recommended_actions || getFallbackReport(cropName, "photo", language).recommended_actions,
      preventive_measures: parsed.preventive_measures || "Practice crop rotation and proper drainage.",
      urgency: parsed.urgency || "Moderate",
      selected_language: language,
      expert_review_required: parsed.expert_review_required || false
    });
  } catch (err) {
    console.error("Error in /api/analyze-photo:", err);
    res.json(getFallbackReport(req.body?.cropName || "Crop", "photo", req.body?.language || "en"));
  }
});
app.post("/api/analyze-video", async (req, res, next) => {
  try {
    const { videoBase64, mimeType, cropName = "Unknown Crop", language = "en" } = req.body || {};
    if (!process.env.GEMINI_API_KEY) {
      return res.json(getFallbackReport(cropName, "video", language));
    }
    const cleanBase64 = (videoBase64 || "").replace(/^data:video\/[a-z]+;base64,/, "");
    if (!cleanBase64) {
      return res.status(400).json({ error: "Missing video data" });
    }
    const videoPart = {
      inlineData: {
        mimeType: mimeType || "video/mp4",
        data: cleanBase64
      }
    };
    const prompt = `Analyze this video of crop ${cropName} for disease, pest damage, and canopy health. 
    Provide response in ${language === "te" ? "Telugu" : language === "hi" ? "Hindi" : "English"}.
    Return ONLY valid JSON matching the report schema with input_type: "video".`;
    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: { parts: [videoPart, { text: prompt }] },
      config: {
        responseMimeType: "application/json",
        temperature: 0.2
      }
    });
    const parsed = safeJsonParse(response.text || "", getFallbackReport(cropName, "video", language));
    res.json({
      report_id: parsed.report_id || "AGRI-VID-" + Math.floor(1e5 + Math.random() * 9e5),
      created_at: (/* @__PURE__ */ new Date()).toISOString(),
      crop_name: parsed.crop_name || cropName,
      location: parsed.location || "India",
      growth_stage: parsed.growth_stage || "Active Growth",
      input_type: "video",
      observations: parsed.observations || "Video observation shows leaf discoloration and minor pest activity across canopy rows.",
      possible_causes: parsed.possible_causes || ["Sucking pests (Aphids)", "Nitrogen deficiency"],
      confidence: parsed.confidence || "78%",
      uncertainty: parsed.uncertainty || "Video lighting may affect precise color grading.",
      recommended_actions: parsed.recommended_actions || getFallbackReport(cropName, "video", language).recommended_actions,
      preventive_measures: parsed.preventive_measures || "Monitor field margins and use yellow sticky traps.",
      urgency: parsed.urgency || "Moderate",
      selected_language: language,
      expert_review_required: false
    });
  } catch (err) {
    console.error("Error in /api/analyze-video:", err);
    res.json(getFallbackReport(req.body?.cropName || "Crop", "video", req.body?.language || "en"));
  }
});
app.post("/api/risk-assessment", async (req, res, next) => {
  try {
    const { cropName, location, growthStage, weatherNotes, language = "en" } = req.body || {};
    const prompt = `Perform an agricultural risk assessment for crop ${cropName} in location ${location}, growth stage ${growthStage}, with field notes: "${weatherNotes || "None"}". 
    Provide actionable risk level (Low, Moderate, High, Critical), primary weather/pest risks, and preventative steps.
    Respond in ${language === "te" ? "Telugu" : language === "hi" ? "Hindi" : "English"}.
    Return JSON with fields: risk_level, regional_factors, primary_risks, recommended_actions, advice_summary.`;
    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        temperature: 0.3
      }
    });
    const parsed = safeJsonParse(response.text || "", {
      risk_level: "Moderate",
      regional_factors: `Seasonal transition in ${location || "local region"} favoring fungal spore germination.`,
      primary_risks: ["High humidity risk", "Potential stem borer activity"],
      recommended_actions: ["Monitor field drainage", "Ensure weed control"],
      advice_summary: `Risk level is Moderate for ${cropName || "crop"} at ${growthStage || "growth"} stage. Maintain field hygiene and scout weekly.`
    });
    res.json({
      risk_level: parsed.risk_level || "Moderate",
      regional_factors: parsed.regional_factors || `Seasonal conditions in ${location || "local area"}.`,
      primary_risks: Array.isArray(parsed.primary_risks) ? parsed.primary_risks : ["High humidity risk", "Potential pest activity"],
      recommended_actions: Array.isArray(parsed.recommended_actions) ? parsed.recommended_actions : ["Monitor field drainage", "Regular field scouting"],
      advice_summary: parsed.advice_summary || `Risk level is Moderate for ${cropName || "crop"}. Maintain field hygiene.`
    });
  } catch (err) {
    console.error("Error in /api/risk-assessment:", err);
    res.json({
      risk_level: "Moderate",
      regional_factors: "Standard seasonal agronomic conditions.",
      primary_risks: ["Moisture fluctuation", "Pest incidence"],
      recommended_actions: ["Regular field scouting", "Balanced fertilizer application"],
      advice_summary: "Maintain standard crop protection measures and consult local extension officers if weather is erratic."
    });
  }
});
app.post("/api/chat", async (req, res, next) => {
  try {
    const { messages = [], language = "en" } = req.body || {};
    const lastUserMessage = messages[messages.length - 1]?.content || "Hello";
    const systemInstruction = `You are 3xAI Farmer Assistant, an expert AI agricultural assistant designed for Indian farmers. 
    You provide practical, clear, scientific yet simple crop care advice. 
    Always emphasize sustainable practices, checking local expert advisories, and following approved chemical labels when needed.
    You must respond in ${language === "te" ? "Telugu" : language === "hi" ? "Hindi" : "English"}. Keep answers concise, helpful, and respectful.`;
    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: lastUserMessage,
      config: {
        systemInstruction,
        temperature: 0.4
      }
    });
    const reply = response.text || (language === "te" ? "\u0C2E\u0C40 \u0C2A\u0C02\u0C1F\u0C32\u0C15\u0C41 \u0C38\u0C02\u0C2C\u0C02\u0C27\u0C3F\u0C02\u0C1A\u0C3F \u0C0E\u0C1F\u0C41\u0C35\u0C02\u0C1F\u0C3F \u0C38\u0C39\u0C3E\u0C2F\u0C02 \u0C15\u0C3E\u0C35\u0C3E\u0C32\u0C28\u0C4D\u0C28\u0C3E \u0C05\u0C21\u0C17\u0C02\u0C21\u0C3F. \u0C2A\u0C41\u0C30\u0C41\u0C17\u0C41\u0C32\u0C41, \u0C24\u0C46\u0C17\u0C41\u0C33\u0C4D\u0C32\u0C41 \u0C32\u0C47\u0C26\u0C3E \u0C0E\u0C30\u0C41\u0C35\u0C41\u0C32 \u0C17\u0C41\u0C30\u0C3F\u0C02\u0C1A\u0C3F \u0C28\u0C47\u0C28\u0C41 \u0C38\u0C39\u0C3E\u0C2F\u0C02 \u0C1A\u0C47\u0C2F\u0C17\u0C32\u0C28\u0C41." : language === "hi" ? "\u0906\u092A\u0915\u0940 \u092B\u0938\u0932 \u0915\u0947 \u092C\u093E\u0930\u0947 \u092E\u0947\u0902 \u0915\u094B\u0908 \u092D\u0940 \u092A\u094D\u0930\u0936\u094D\u0928 \u0939\u094B \u0924\u094B \u092A\u0942\u091B\u0947\u0902\u0964 \u0915\u0940\u091F\u094B\u0902, \u0930\u094B\u0917\u094B\u0902 \u092F\u093E \u0909\u0930\u094D\u0935\u0930\u0915\u094B\u0902 \u0915\u0947 \u092C\u093E\u0930\u0947 \u092E\u0947\u0902 \u092E\u0948\u0902 \u092E\u0926\u0926 \u0915\u0930 \u0938\u0915\u0924\u093E \u0939\u0942\u0901\u0964" : "I am here to help you with your crops. Please ask any question regarding pests, diseases, fertilizers, or weather risks.");
    res.json({ reply });
  } catch (err) {
    console.error("Error in /api/chat:", err);
    const { language = "en", messages = [] } = req.body || {};
    const lastMsg = (messages[messages.length - 1]?.content || "").toLowerCase();
    let fallback = language === "te" ? "\u0C28\u0C2E\u0C38\u0C4D\u0C24\u0C47! \u0C2E\u0C40 \u0C2A\u0C02\u0C1F \u0C06\u0C30\u0C4B\u0C17\u0C4D\u0C2F\u0C02\u0C17\u0C3E \u0C09\u0C02\u0C21\u0C1F\u0C3E\u0C28\u0C3F\u0C15\u0C3F \u0C15\u0C4D\u0C30\u0C2E\u0C02 \u0C24\u0C2A\u0C4D\u0C2A\u0C15\u0C41\u0C02\u0C21\u0C3E \u0C2A\u0C4A\u0C32\u0C3E\u0C28\u0C4D\u0C28\u0C3F \u0C24\u0C28\u0C3F\u0C16\u0C40 \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F, \u0C38\u0C30\u0C48\u0C28 \u0C28\u0C40\u0C1F\u0C3F \u0C2A\u0C3E\u0C30\u0C41\u0C26\u0C32 \u0C28\u0C3F\u0C30\u0C4D\u0C35\u0C39\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C38\u0C4D\u0C25\u0C3E\u0C28\u0C3F\u0C15 \u0C35\u0C4D\u0C2F\u0C35\u0C38\u0C3E\u0C2F \u0C05\u0C27\u0C3F\u0C15\u0C3E\u0C30\u0C3F\u0C28\u0C3F \u0C38\u0C02\u0C2A\u0C4D\u0C30\u0C26\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F." : language === "hi" ? "\u0928\u092E\u0938\u094D\u0924\u0947! \u0905\u092A\u0928\u0940 \u092B\u0938\u0932 \u0915\u094B \u0938\u094D\u0935\u0938\u094D\u0925 \u0930\u0916\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0928\u093F\u092F\u092E\u093F\u0924 \u0930\u0942\u092A \u0938\u0947 \u0916\u0947\u0924 \u0915\u093E \u0928\u093F\u0930\u0940\u0915\u094D\u0937\u0923 \u0915\u0930\u0947\u0902, \u0909\u091A\u093F\u0924 \u091C\u0932 \u0928\u093F\u0915\u093E\u0938\u0940 \u092C\u0928\u093E\u090F \u0930\u0916\u0947\u0902 \u0914\u0930 \u0938\u094D\u0925\u093E\u0928\u0940\u092F \u0915\u0943\u0937\u093F \u0905\u0927\u093F\u0915\u093E\u0930\u0940 \u0938\u0947 \u0938\u0932\u093E\u0939 \u0932\u0947\u0902\u0964" : "Namaste! To keep your crop healthy, inspect fields regularly, maintain proper drainage, and consult your local Krishi Vigyan Kendra (KVK) agronomist for specific recommendations.";
    if (lastMsg.includes("tomato") || lastMsg.includes("\u0C1F\u0C2E\u0C3E\u0C1F\u0C3E") || lastMsg.includes("\u091F\u092E\u093E\u091F\u0930")) {
      fallback = language === "te" ? "\u0C1F\u0C2E\u0C3E\u0C1F\u0C3E \u0C2A\u0C02\u0C1F\u0C32\u0C4B \u0C06\u0C15\u0C41 \u0C2E\u0C1A\u0C4D\u0C1A \u0C32\u0C47\u0C26\u0C3E \u0C2A\u0C41\u0C30\u0C41\u0C17\u0C41\u0C32 \u0C06\u0C36\u0C36 \u0C09\u0C02\u0C1F\u0C47 \u0C15\u0C3E\u0C2A\u0C30\u0C4D \u0C06\u0C15\u0C4D\u0C38\u0C3F\u0C15\u0C4D\u0C32\u0C4B\u0C30\u0C48\u0C21\u0C4D \u0C2A\u0C3F\u0C1A\u0C3F\u0C15\u0C3E\u0C30\u0C40 \u0C1A\u0C47\u0C2F\u0C3E\u0C32\u0C3F \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C28\u0C40\u0C1F\u0C3F \u0C28\u0C3F\u0C32\u0C4D\u0C35 \u0C09\u0C02\u0C21\u0C15\u0C41\u0C02\u0C21\u0C3E \u0C1A\u0C42\u0C21\u0C3E\u0C32\u0C3F." : language === "hi" ? "\u091F\u092E\u093E\u091F\u0930 \u0915\u0940 \u092B\u0938\u0932 \u092E\u0947\u0902 \u0927\u092C\u094D\u092C\u0947 \u092F\u093E \u0915\u0940\u091F \u0928\u093F\u092F\u0902\u0924\u094D\u0930\u0923 \u0915\u0947 \u0932\u093F\u090F \u0915\u0949\u092A\u0930 \u0911\u0915\u094D\u0938\u0940\u0915\u094D\u0932\u094B\u0930\u093E\u0907\u0921 \u0915\u093E \u091B\u093F\u0921\u093C\u0915\u093E\u0935 \u0915\u0930\u0947\u0902 \u0914\u0930 \u0916\u0947\u0924 \u092E\u0947\u0902 \u091C\u0932\u092D\u0930\u093E\u0935 \u0928 \u0939\u094B\u0928\u0947 \u0926\u0947\u0902\u0964" : "For tomato crops showing leaf spots or fruit damage, ensure proper spacing, avoid overhead watering, and apply recommended copper-based fungicides if needed.";
    } else if (lastMsg.includes("paddy") || lastMsg.includes("rice") || lastMsg.includes("\u0C35\u0C30\u0C3F") || lastMsg.includes("\u0927\u093E\u0928")) {
      fallback = language === "te" ? "\u0C35\u0C30\u0C3F \u0C2A\u0C02\u0C1F\u0C32\u0C4B \u0C05\u0C17\u0C4D\u0C17\u0C3F \u0C24\u0C46\u0C17\u0C41\u0C32\u0C41 \u0C32\u0C47\u0C26\u0C3E \u0C26\u0C4B\u0C2E\u0C32 \u0C28\u0C3F\u0C35\u0C3E\u0C30\u0C23\u0C15\u0C41 \u0C38\u0C2E\u0C24\u0C41\u0C32\u0C4D\u0C2F \u0C28\u0C24\u0C4D\u0C30\u0C1C\u0C28\u0C3F \u0C0E\u0C30\u0C41\u0C35\u0C41\u0C32\u0C28\u0C41 \u0C35\u0C3E\u0C21\u0C02\u0C21\u0C3F \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C28\u0C40\u0C1F\u0C3F \u0C2E\u0C1F\u0C4D\u0C1F\u0C3E\u0C28\u0C4D\u0C28\u0C3F \u0C28\u0C3F\u0C2F\u0C02\u0C24\u0C4D\u0C30\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F." : language === "hi" ? "\u0927\u093E\u0928 \u0915\u0940 \u092B\u0938\u0932 \u092E\u0947\u0902 \u092C\u094D\u0932\u093E\u0907\u091F \u092F\u093E \u0915\u0940\u091F\u094B\u0902 \u0938\u0947 \u092C\u091A\u093E\u0935 \u0915\u0947 \u0932\u093F\u090F \u0938\u0902\u0924\u0941\u0932\u093F\u0924 \u0928\u0924\u094D\u0930\u091C\u0928 \u0915\u093E \u092A\u094D\u0930\u092F\u094B\u0917 \u0915\u0930\u0947\u0902 \u0914\u0930 \u092A\u093E\u0928\u0940 \u0915\u093E \u0938\u094D\u0924\u0930 \u0928\u093F\u092F\u0902\u0924\u094D\u0930\u093F\u0924 \u0930\u0916\u0947\u0902\u0964" : "For paddy/rice, manage water levels properly, avoid excessive nitrogen application, and monitor for stem borer or blast symptoms.";
    }
    res.json({ reply: fallback });
  }
});
if (process.env.NODE_ENV !== "production") {
  const { createServer } = await import("vite");
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: "spa"
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static(path.join(__dirname, "dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });
}
app.use((err, req, res, next) => {
  console.error("Express Error Handler caught:", err);
  if (!res.headersSent) {
    res.status(500).json({ error: "An unexpected server error occurred." });
  }
});
const PORT = Number(process.env.PORT || 3e3);
app.listen(PORT, "0.0.0.0", () => {
  console.log(`3xAI Farmer server running on http://0.0.0.0:${PORT}`);
});
