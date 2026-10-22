import React, { useState, useEffect, useRef, Component, ErrorInfo, ReactNode } from "react";
import { 
  Sprout, 
  Camera, 
  Video, 
  ShieldAlert, 
  FileText, 
  MessageSquare, 
  Globe, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Upload, 
  RefreshCw, 
  Send, 
  X, 
  Info, 
  ChevronRight,
  Activity,
  Layers,
  MapPin,
  Calendar,
  Sparkles,
  Mic,
  MicOff,
  Volume2
} from "lucide-react";

// Error Boundary Component to catch any render-time unhandled rejections or errors
interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, errorMessage: error.message || "An unexpected error occurred" };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F8F7F0] flex items-center justify-center p-6 text-center">
          <div className="max-w-md bg-white p-8 rounded-3xl shadow-lg border border-slate-200 space-y-4">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Something went wrong</h2>
            <p className="text-sm text-slate-600">The application encountered an issue. Click below to reload.</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-[#245C3A] text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#1d4b2f] transition-all"
            >
              Reload 3xAI Farmer
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Translations dictionary
const translations: Record<string, Record<string, string>> = {
  en: {
    title: "3xAI Farmer — Your Intelligent Crop Care Assistant",
    subtitle: "Identify crop problems. Understand the risk. Take the right action at the right time.",
    checkPhoto: "Check Crop Photo",
    checkPhotoDesc: "Upload a photograph of your crop leaf, stem, or fruit for instant AI health analysis.",
    analyzeVideo: "Analyze Crop Video",
    analyzeVideoDesc: "Record or upload a short video showing symptom distribution across plants in the field.",
    checkRisk: "Check Crop Risk",
    checkRiskDesc: "Assess regional and seasonal crop disease risk based on your location and crop stage.",
    previousCropAnalysis: "Previous Crop Analysis",
    noReports: "No reports yet. Choose an action above to start your first crop diagnosis.",
    aiStatus: "AI Service Operational",
    chatTitle: "3xAI Farmer Assistant",
    chatSubtitle: "Ask anything about crop health, pests, or fertilizers",
    askPlaceholder: "Type or click mic to speak...",
    listening: "Listening in Telugu / Hindi / English...",
    send: "Send",
    close: "Close",
    analyze: "Analyze Crop",
    analyzing: "Analyzing with Gemini AI...",
    whatToDo: "What should I do now?",
    immediateInspection: "1. Immediate Inspection",
    lowCostActions: "2. Practical Low-Cost Actions",
    preventiveMeasures: "3. Preventive Measures",
    reInspection: "4. Re-inspection Schedule",
    expertAssistance: "5. Expert Assistance Required",
    chemicalGuidance: "6. Chemical Treatment Guidance",
    confidence: "Confidence",
    urgency: "Urgency",
    possibleCauses: "Possible Causes",
    observations: "Observations",
    backToDashboard: "← Back to Dashboard",
    cropNameLabel: "Crop Name (e.g. Tomato, Paddy, Cotton)",
    locationLabel: "District / Location",
    growthStageLabel: "Crop Growth Stage",
    weatherNotesLabel: "Recent Weather / Pest Notes (Optional)",
    assessRiskBtn: "Assess Crop Risk",
    riskAssessmentTitle: "Crop Health Risk Assessment",
  },
  te: {
    title: "3xAI Farmer — మీ ఇంటెలిజెంట్ పంట సంరక్షణ సహాయకుడు",
    subtitle: "పంట సమస్యలను గుర్తించండి. రిస్క్ తెలుసుకోండి. సరైన సమయంలో సరైన చర్య తీసుకోండి.",
    checkPhoto: "పంట ఫోటోను తనిఖీ చేయండి",
    checkPhotoDesc: "తక్షణ AI ఆరోగ్య విశ్లేషణ కోసం మీ పంట ఆకు, కాండం లేదా కాయ ఫోటోను అప్‌లోడ్ చేయండి.",
    analyzeVideo: "పంట వీడియోను విశ్లేషించండి",
    analyzeVideoDesc: "పొలంలో మొక్కల లక్షణాలను చూపించే చిన్న వీడియోను రికార్డ్ చేయండి లేదా అప్‌లోడ్ చేయండి.",
    checkRisk: "పంట ముప్పును తనిఖీ చేయండి",
    checkRiskDesc: "మీ ప్రాంతం మరియు పంట దశ ఆధారంగా ప్రాంతీయ మరియు కాలానుగుణ పంట వ్యాధి ముప్పును అంచనా వేయండి.",
    previousCropAnalysis: "మునుపటి పంట విశ్లేషణ",
    noReports: "ఇంకా నివేదికలు లేవు. మీ మొదటి పంట విశ్లేషణను ప్రారంభించడానికి పైన ఒక చర్యను ఎంచుకోండి.",
    aiStatus: "AI సేవ అందుబాటులో ఉంది",
    chatTitle: "3xAI ఫార్మర్ అసిస్టెంట్",
    chatSubtitle: "పంట ఆరోగ్యం, పురుగులు లేదా ఎరువుల గురించి ఏమైనా అడగండి",
    askPlaceholder: "టైప్ చేయండి లేదా మాట్లాడటానికి మైక్ నొక్కండి...",
    listening: "వింటున్నాను (తెలుగు / హిందీ / ఇంగ్లీష్)...",
    send: "పంపు",
    close: "మూసివేయి",
    analyze: "పంటను విశ్లేషించండి",
    analyzing: "జెమిని AI ద్వారా విశ్లేషిస్తోంది...",
    whatToDo: "ఇప్పుడు నేను ఏమి చేయాలి?",
    immediateInspection: "1. తక్షణ తనిఖీ",
    lowCostActions: "2. తక్కువ ఖర్చుతో కూడిన ఆచరణాత్మక చర్యలు",
    preventiveMeasures: "3. నివారణ చర్యలు",
    reInspection: "4. పునః-తనిఖీ షెడ్యూల్",
    expertAssistance: "5. నిపుణుల సహాయం అవసరం",
    chemicalGuidance: "6. రసాయన చికిత్స మార్గదర్శకం",
    confidence: "విశ్వాస స్థాయి",
    urgency: "అత్యవసరత",
    possibleCauses: "సాధ్యమైన కారణాలు",
    observations: "పరిశీలనలు",
    backToDashboard: "← డాష్‌బోర్డ్‌కి తిరిగి వెళ్ళు",
    cropNameLabel: "పంట పేరు (ఉదా. టమాటా, వరి, పత్తి)",
    locationLabel: "జిల్లా / ప్రదేశం",
    growthStageLabel: "పంట పెరుగుదల దశ",
    weatherNotesLabel: "ఇటీవలి వాతావరణం / తెగులు గమనికలు (ఐచ్ఛికం)",
    assessRiskBtn: "పంట ముప్పును అంచనా వేయండి",
    riskAssessmentTitle: "పంట ఆరోగ్య ముప్పు అంచనా",
  },
  hi: {
    title: "3xAI Farmer — आपका बुद्धिमान फसल देखभाल सहायक",
    subtitle: "फसल की समस्याओं की पहचान करें। जोखिम को समझें। सही समय पर सही कदम उठाएं।",
    checkPhoto: "फसल की फोटो जांचें",
    checkPhotoDesc: "तत्काल एआई स्वास्थ्य विश्लेषण के लिए अपनी फसल के पत्ते, तने या फल की फोटो अपलोड करें।",
    analyzeVideo: "फसल का वीडियो विश्लेषण करें",
    analyzeVideoDesc: "खेत में पौधों के लक्षणों को दिखाने वाला एक छोटा वीडियो रिकॉर्ड या अपलोड करें।",
    checkRisk: "फसल जोखिम जांचें",
    checkRiskDesc: "अपने स्थान और फसल के चरण के आधार पर क्षेत्रीय और मौसमी फसल रोग जोखिम का आकलन करें।",
    previousCropAnalysis: "पिछला फसल विश्लेषण",
    noReports: "अभी तक कोई रिपोर्ट नहीं। अपना पहला फसल निदान शुरू करने के लिए ऊपर कोई कार्रवाई चुनें।",
    aiStatus: "एआई सेवा सक्रिय है",
    chatTitle: "3xAI फार्मर असिस्टेंट",
    chatSubtitle: "फसल के स्वास्थ्य, कीटों या उर्वरकों के बारे में कुछ भी पूछें",
    askPlaceholder: "टाइप करें या बोलने के लिए माइक दबाएं...",
    listening: "सुन रहे हैं (తెలుగు / हिन्दी / English)...",
    send: "भेजें",
    close: "बंद करें",
    analyze: "फसल का विश्लेषण करें",
    analyzing: "जेमिनी एआई द्वारा विश्लेषण किया जा रहा है...",
    whatToDo: "अब मुझे क्या करना चाहिए?",
    immediateInspection: "1. तत्काल निरीक्षण",
    lowCostActions: "2. कम लागत वाले व्यावहारिक कदम",
    preventiveMeasures: "3. निवारक उपाय",
    reInspection: "4. पुन: निरीक्षण अनुसूची",
    expertAssistance: "5. कृषि विशेषज्ञ सहायता आवश्यक",
    chemicalGuidance: "6. रासायनिक उपचार मार्गदर्शन",
    confidence: "विश्वास स्तर",
    urgency: "तात्कालिकता",
    possibleCauses: "संभावित कारण",
    observations: "अवलोकन",
    backToDashboard: "← डैशबोर्ड पर वापस जाएं",
    cropNameLabel: "फसल का नाम (जैसे टमाटर, धान, कपास)",
    locationLabel: "जिला / स्थान",
    growthStageLabel: "फसल की वृद्धि का चरण",
    weatherNotesLabel: "हाल का मौसम / कीट नोट्स (वैकल्पिक)",
    assessRiskBtn: "फसल जोखिम का आकलन करें",
    riskAssessmentTitle: "फसल स्वास्थ्य जोखिम आकलन",
  }
};

interface Report {
  report_id: string;
  created_at: string;
  crop_name: string;
  location: string;
  growth_stage: string;
  input_type: string;
  observations: string;
  possible_causes: string[];
  confidence: string;
  uncertainty: string;
  recommended_actions: {
    immediate_inspection: string;
    low_cost_actions: string;
    preventive_measures: string;
    re_inspection_schedule: string;
    expert_assistance: string;
    chemical_treatment: string;
  };
  preventive_measures: string;
  urgency: string;
  selected_language: string;
  expert_review_required: boolean;
}

const DEFAULT_REPORTS: Report[] = [
  {
    report_id: "AGRI-TOM-2024-8841",
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    crop_name: "Tomato (Solanum lycopersicum)",
    location: "Warangal, Telangana",
    growth_stage: "Fruiting",
    input_type: "photo",
    observations: "The ripe tomato fruit displays a large, dark brown, sunken, leathery rot lesion on one side with apparent puncture/entry holes characteristic of insect damage followed by secondary rot. Adjacent mature foliage...",
    possible_causes: ["Fruit Borer (Helicoverpa armigera)", "Secondary Bacterial/Fungal Rot"],
    confidence: "85%",
    uncertainty: "Visual inspection; field scouting recommended.",
    recommended_actions: {
      immediate_inspection: "Check all ripening fruits for entry holes and larval presence.",
      low_cost_actions: "Handpick and destroy infested damaged fruits away from fields.",
      preventive_measures: "Install pheromone traps (5 per acre) for adult moth monitoring.",
      re_inspection_schedule: "Inspect field every 2 days.",
      expert_assistance: "Contact local agricultural extension officer if damage exceeds 10%.",
      chemical_treatment: "Apply recommended eco-friendly biopesticides (Bt or neem-based formulations) following safety guidelines."
    },
    preventive_measures: "Maintain field sanitation.",
    urgency: "High",
    selected_language: "en",
    expert_review_required: false
  },
  {
    report_id: "AGRI-984210",
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
    crop_name: "Tomato",
    location: "Warangal, Telangana",
    growth_stage: "Flowering & Fruiting",
    input_type: "photo",
    observations: "Concentric rings on lower leaves with yellow halos. Early blight symptoms observed.",
    possible_causes: ["Alternaria solani (Early Blight)", "High leaf wetness duration"],
    confidence: "88%",
    uncertainty: "Visual assessment; laboratory confirmation recommended if spreading.",
    recommended_actions: {
      immediate_inspection: "Check lower canopy leaves for dark brown target spots.",
      low_cost_actions: "Prune heavily infected lower leaves to improve air circulation.",
      preventive_measures: "Apply drip irrigation to keep foliage dry.",
      re_inspection_schedule: "Check plants again in 3 days.",
      expert_assistance: "Consult District Agricultural Officer if spots appear on upper fruits.",
      chemical_treatment: "Copper hydroxide or chlorothalonil spray if infection exceeds 15%."
    },
    preventive_measures: "Practice 2-year crop rotation with non-solanaceous crops.",
    urgency: "Moderate",
    selected_language: "en",
    expert_review_required: false
  }
];

function MainApp() {
  const [lang, setLang] = useState<string>("en");
  const [view, setView] = useState<"dashboard" | "photo" | "video" | "risk" | "report" | "history">("dashboard");
  
  // Safe localStorage initialization
  const [reports, setReports] = useState<Report[]>(() => {
    try {
      const saved = localStorage.getItem("3xai_farmer_reports") || localStorage.getItem("agriminds_reports");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (err) {
      console.warn("Could not load reports from localStorage:", err);
    }
    return DEFAULT_REPORTS;
  });
  
  const [activeReport, setActiveReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Photo analysis state
  const [photoCropName, setPhotoCropName] = useState("Tomato");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // Video analysis state
  const [videoCropName, setVideoCropName] = useState("Paddy / Rice");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  // Risk assessment state
  const [riskCropName, setRiskCropName] = useState("Cotton");
  const [riskLocation, setRiskLocation] = useState("Adilabad, Telangana");
  const [riskStage, setRiskStage] = useState("Square formation");
  const [riskNotes, setRiskNotes] = useState("Frequent evening showers, high humidity.");
  const [riskResult, setRiskResult] = useState<any | null>(null);

  // Chatbot state
  const [chatMessages, setChatMessages] = useState<Array<{role: string; content: string}>>([
    { role: "model", content: "Namaste! I am your 3xAI Farmer assistant. Ask me anything about crop diseases, pest control, or fertilizers in Telugu, Hindi, or English." }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const recognitionRef = useRef<any>(null);
  const t = translations[lang] || translations.en;

  // Safe localStorage save
  useEffect(() => {
    try {
      localStorage.setItem("3xai_farmer_reports", JSON.stringify(reports));
    } catch (e) {
      console.warn("Storage quota exceeded or unavailable:", e);
    }
  }, [reports]);

  // Clean up recognition on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {}
      }
    };
  }, []);

  // Handle Photo Upload with size validation and error handling
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg("");
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 15 * 1024 * 1024) {
        setErrorMsg("Photo size exceeds 15MB. Please choose a smaller photo.");
        return;
      }
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setPhotoPreview(uploadEvent.target?.result as string);
      };
      reader.onerror = () => {
        setErrorMsg("Failed to read image file. Please try another image.");
      };
      try {
        reader.readAsDataURL(file);
      } catch (err) {
        setErrorMsg("Error opening photo file.");
      }
    }
  };

  // Submit Photo Analysis
  const submitPhotoAnalysis = async () => {
    if (!photoPreview) {
      setErrorMsg("Please upload or select a crop photo first.");
      return;
    }
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/analyze-photo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: photoPreview,
          mimeType: photoFile?.type || "image/jpeg",
          cropName: photoCropName || "Crop",
          language: lang
        })
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data = await res.json();
      if (data && data.report_id) {
        setReports(prev => [data, ...prev]);
        setActiveReport(data);
        setView("report");
      } else {
        throw new Error("Invalid response format received from server.");
      }
    } catch (err) {
      console.error("Photo analysis error:", err);
      setErrorMsg("Failed to complete photo analysis. Please check your network and try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Video Upload with size validation
  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg("");
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 50 * 1024 * 1024) {
        setErrorMsg("Video size exceeds 50MB. Please choose a shorter clip.");
        return;
      }
      setVideoFile(file);
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setVideoPreview(uploadEvent.target?.result as string);
      };
      reader.onerror = () => {
        setErrorMsg("Failed to read video file. Please try another video.");
      };
      try {
        reader.readAsDataURL(file);
      } catch (err) {
        setErrorMsg("Error opening video file.");
      }
    }
  };

  // Submit Video Analysis
  const submitVideoAnalysis = async () => {
    if (!videoPreview) {
      setErrorMsg("Please upload a short crop video first.");
      return;
    }
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/analyze-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          videoBase64: videoPreview,
          mimeType: videoFile?.type || "video/mp4",
          cropName: videoCropName || "Crop",
          language: lang
        })
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data = await res.json();
      if (data && data.report_id) {
        setReports(prev => [data, ...prev]);
        setActiveReport(data);
        setView("report");
      } else {
        throw new Error("Invalid video diagnostic report format.");
      }
    } catch (err) {
      console.error("Video analysis error:", err);
      setErrorMsg("Failed to analyze video. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Submit Risk Assessment
  const submitRiskAssessment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/risk-assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cropName: riskCropName,
          location: riskLocation,
          growthStage: riskStage,
          weatherNotes: riskNotes,
          language: lang
        })
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data = await res.json();
      setRiskResult(data);
    } catch (err) {
      console.error("Risk assessment error:", err);
      setErrorMsg("Failed to fetch risk assessment.");
    } finally {
      setLoading(false);
    }
  };

  // Click-to-Talk Voice Input (Safe Speech Recognition)
  const toggleListen = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setErrorMsg("Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.");
      return;
    }

    if (isListening && recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.lang = lang === 'te' ? 'te-IN' : lang === 'hi' ? 'hi-IN' : 'en-IN';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        if (event.results && event.results[0] && event.results[0][0]) {
          const speechToText = event.results[0][0].transcript;
          setChatInput(speechToText);
        }
        setIsListening(false);
      };

      recognition.onerror = (e: any) => {
        console.warn("Speech recognition error:", e);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      console.warn("Could not start speech recognition:", err);
      setIsListening(false);
    }
  };

  // Safe Text-to-Speech playback
  const speakText = (text: string) => {
    if (typeof window !== "undefined" && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang === 'te' ? 'te-IN' : lang === 'hi' ? 'hi-IN' : 'en-IN';
        utterance.onerror = (e) => {
          console.warn("SpeechSynthesis error:", e);
        };
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.warn("Speech synthesis error:", err);
      }
    }
  };

  // Send Chat Message
  const sendChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;

    const userMsg = chatInput.trim();
    setChatInput("");
    const newMsgs = [...chatMessages, { role: "user", content: userMsg }];
    setChatMessages(newMsgs);
    setChatLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMsgs, language: lang })
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data = await res.json();
      const reply = data.reply || "I am here to help you with your crops.";
      setChatMessages([...newMsgs, { role: "model", content: reply }]);
      speakText(reply);
    } catch (err) {
      console.error("Chat error:", err);
      const fallbackReply = lang === 'te' 
        ? "మీ పంట ప్రశ్నను స్వీకరించాను. దయచేసి కాసేపటి తర్వాత మళ్లీ ప్రయత్నించండి."
        : lang === 'hi'
        ? "आपकी फसल का प्रश्न प्राप्त हुआ। कृपया कुछ क्षणों बाद पुनः प्रयास करें।"
        : "I received your farming question. Please check field drainage and contact your local agronomist.";
      setChatMessages([...newMsgs, { role: "model", content: fallbackReply }]);
      speakText(fallbackReply);
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F7F0] text-slate-900 font-sans flex flex-col selection:bg-[#245C3A] selection:text-white">
      {/* Top Header */}
      <header className="bg-[#245C3A] text-white px-6 py-4 shadow-md sticky top-0 z-40 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView("dashboard")}>
          <div className="bg-[#4F8A45] p-2 rounded-xl text-white shadow-sm">
            <Sprout className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-bold tracking-tight">3xAI Farmer</h1>
            <p className="text-xs text-emerald-100/80 font-medium">AgriTech Hackathon 2026</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Previous Crop Analysis Nav Link */}
          <button 
            onClick={() => setView("history")}
            className="hidden sm:flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors border border-white/20"
          >
            <FileText className="w-4 h-4 text-emerald-200" />
            <span>{t.previousCropAnalysis}</span>
          </button>

          {/* AI Operational Indicator */}
          <div className="hidden md:flex items-center gap-2 bg-[#4F8A45]/40 px-3 py-1 rounded-full text-xs font-medium text-emerald-50 border border-emerald-400/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>{t.aiStatus}</span>
          </div>

          {/* Language Selector */}
          <div className="flex items-center gap-1 bg-white/10 p-1 rounded-lg border border-white/20">
            <Globe className="w-4 h-4 text-emerald-200 ml-1.5 hidden md:block" />
            <button 
              onClick={() => setLang("en")} 
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${lang === 'en' ? 'bg-white text-[#245C3A] shadow' : 'text-white hover:bg-white/10'}`}
            >
              English
            </button>
            <button 
              onClick={() => setLang("te")} 
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${lang === 'te' ? 'bg-white text-[#245C3A] shadow' : 'text-white hover:bg-white/10'}`}
            >
              తెలుగు
            </button>
            <button 
              onClick={() => setLang("hi")} 
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${lang === 'hi' ? 'bg-white text-[#245C3A] shadow' : 'text-white hover:bg-white/10'}`}
            >
              हिन्दी
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {/* Error Banner */}
        {errorMsg && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center justify-between text-sm shadow-sm">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
              <span>{errorMsg}</span>
            </div>
            <button onClick={() => setErrorMsg("")} className="text-red-500 hover:text-red-700 font-bold text-base leading-none">×</button>
          </div>
        )}

        {/* DASHBOARD VIEW */}
        {view === "dashboard" && (
          <div className="space-y-10 animate-fade-in">
            {/* Hero Banner */}
            <div className="bg-gradient-to-r from-[#245C3A] to-[#4F8A45] rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
              <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-10 translate-y-10">
                <Sprout className="w-96 h-96 text-white" />
              </div>
              <div className="max-w-2xl relative z-10 space-y-4">
                <span className="bg-white/20 text-emerald-100 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                  AgriTech Hackathon 2026 Prototype
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                  {t.title}
                </h2>
                <p className="text-emerald-100 text-base sm:text-lg leading-relaxed">
                  {t.subtitle}
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <button 
                    onClick={() => setView("photo")}
                    className="bg-white text-[#245C3A] font-semibold px-5 py-2.5 rounded-xl shadow hover:bg-emerald-50 transition-all flex items-center gap-2 text-sm"
                  >
                    <Camera className="w-4 h-4" /> {t.checkPhoto}
                  </button>
                  <button 
                    onClick={() => setView("history")}
                    className="bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-2.5 rounded-xl shadow transition-all flex items-center gap-2 text-sm border border-white/30 sm:hidden"
                  >
                    <FileText className="w-4 h-4" /> {t.previousCropAnalysis}
                  </button>
                  <button 
                    onClick={() => setView("risk")}
                    className="bg-[#8B6548] text-white font-semibold px-5 py-2.5 rounded-xl shadow hover:bg-[#73523a] transition-all flex items-center gap-2 text-sm"
                  >
                    <ShieldAlert className="w-4 h-4" /> {t.checkRisk}
                  </button>
                </div>
              </div>
            </div>

            {/* 3 Prominent Actions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Check Crop Photo */}
              <div 
                onClick={() => setView("photo")}
                className="bg-white rounded-2xl p-6 shadow-sm border border-emerald-900/10 hover:shadow-md hover:border-[#245C3A]/30 transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#245C3A] flex items-center justify-center mb-4 group-hover:bg-[#245C3A] group-hover:text-white transition-colors">
                    <Camera className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[#245C3A] transition-colors">
                    {t.checkPhoto}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {t.checkPhotoDesc}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-[#245C3A] font-semibold text-sm">
                  <span>Start Diagnosis</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Card 2: Analyze Crop Video */}
              <div 
                onClick={() => setView("video")}
                className="bg-white rounded-2xl p-6 shadow-sm border border-emerald-900/10 hover:shadow-md hover:border-[#245C3A]/30 transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#245C3A] flex items-center justify-center mb-4 group-hover:bg-[#245C3A] group-hover:text-white transition-colors">
                    <Video className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[#245C3A] transition-colors">
                    {t.analyzeVideo}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {t.analyzeVideoDesc}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-[#245C3A] font-semibold text-sm">
                  <span>Upload Video</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Card 3: Check Crop Risk */}
              <div 
                onClick={() => setView("risk")}
                className="bg-white rounded-2xl p-6 shadow-sm border border-emerald-900/10 hover:shadow-md hover:border-[#245C3A]/30 transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#8B6548] flex items-center justify-center mb-4 group-hover:bg-[#8B6548] group-hover:text-white transition-colors">
                    <ShieldAlert className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[#8B6548] transition-colors">
                    {t.checkRisk}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {t.checkRiskDesc}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-[#8B6548] font-semibold text-sm">
                  <span>Calculate Risk</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PREVIOUS CROP ANALYSIS VIEW (HISTORY) */}
        {view === "history" && (
          <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
            <button onClick={() => setView("dashboard")} className="text-xs font-bold text-[#245C3A] hover:underline flex items-center gap-1">
              {t.backToDashboard}
            </button>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">{t.previousCropAnalysis}</h2>
                <p className="text-sm text-slate-600 mt-1">Review all your previous crop health diagnoses and expert advice.</p>
              </div>
              <span className="text-xs bg-emerald-100 text-[#245C3A] px-3.5 py-1.5 rounded-full font-bold">
                {reports.length} Reports Saved
              </span>
            </div>

            {reports.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
                <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-600 font-medium">{t.noReports}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reports.map((rep) => (
                  <div 
                    key={rep.report_id}
                    onClick={() => { setActiveReport(rep); setView("report"); }}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:border-[#245C3A] transition-all cursor-pointer space-y-4"
                  >
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="font-semibold text-[#245C3A]">{rep.report_id}</span>
                      <span>{new Date(rep.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-900 text-lg">{rep.crop_name}</h4>
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                        rep.urgency === 'High' ? 'bg-red-100 text-red-800' :
                        rep.urgency === 'Critical' ? 'bg-red-200 text-red-900 font-bold' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {rep.urgency} Urgency
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">{rep.observations}</p>
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#245C3A]">
                      <span>Confidence: {rep.confidence}</span>
                      <span className="flex items-center gap-1 hover:underline">View Full Advice <ChevronRight className="w-3.5 h-3.5" /></span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* PHOTO ANALYSIS VIEW */}
        {view === "photo" && (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6 animate-fade-in">
            <button onClick={() => setView("dashboard")} className="text-xs font-bold text-[#245C3A] hover:underline flex items-center gap-1">
              {t.backToDashboard}
            </button>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{t.checkPhoto}</h2>
              <p className="text-sm text-slate-600 mt-1">Upload a clear photo of the affected leaf, stem, fruit, or root for AI diagnosis.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">{t.cropNameLabel}</label>
                <input 
                  type="text" 
                  value={photoCropName} 
                  onChange={(e) => setPhotoCropName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#245C3A] focus:outline-none text-sm"
                  placeholder="e.g. Tomato, Paddy, Cotton, Chili"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Crop Photo</label>
                <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center hover:border-[#245C3A] transition-colors relative bg-[#F8F7F0]">
                  {photoPreview ? (
                    <div className="space-y-4">
                      <img 
                        src={photoPreview} 
                        alt="Crop photo preview" 
                        referrerPolicy="no-referrer"
                        className="max-h-64 mx-auto rounded-xl shadow object-contain" 
                      />
                      <button onClick={() => { setPhotoPreview(null); setPhotoFile(null); }} className="text-xs text-red-600 font-semibold underline">
                        Remove / Choose Another
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer space-y-2 block">
                      <Upload className="w-10 h-10 text-[#245C3A] mx-auto" />
                      <p className="text-sm font-semibold text-slate-800">Click to upload photo or take picture</p>
                      <p className="text-xs text-slate-500">Supports JPG, PNG up to 15MB</p>
                      <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                    </label>
                  )}
                </div>
              </div>

              <button 
                onClick={submitPhotoAnalysis}
                disabled={loading || !photoPreview}
                className="w-full bg-[#245C3A] text-white font-bold py-3.5 rounded-xl shadow hover:bg-[#1d4b2f] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>{t.analyzing}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>{t.analyze}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* VIDEO ANALYSIS VIEW */}
        {view === "video" && (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6 animate-fade-in">
            <button onClick={() => setView("dashboard")} className="text-xs font-bold text-[#245C3A] hover:underline flex items-center gap-1">
              {t.backToDashboard}
            </button>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{t.analyzeVideo}</h2>
              <p className="text-sm text-slate-600 mt-1">Upload a short walkthrough video of your crop to analyze symptom distribution across plants.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">{t.cropNameLabel}</label>
                <input 
                  type="text" 
                  value={videoCropName} 
                  onChange={(e) => setVideoCropName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#245C3A] focus:outline-none text-sm"
                  placeholder="e.g. Paddy, Chili, Groundnut"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Crop Video File</label>
                <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center hover:border-[#245C3A] transition-colors relative bg-[#F8F7F0]">
                  {videoPreview ? (
                    <div className="space-y-4">
                      <video src={videoPreview} controls className="max-h-64 mx-auto rounded-xl shadow" />
                      <button onClick={() => { setVideoPreview(null); setVideoFile(null); }} className="text-xs text-red-600 font-semibold underline">
                        Remove / Choose Another
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer space-y-2 block">
                      <Video className="w-10 h-10 text-[#245C3A] mx-auto" />
                      <p className="text-sm font-semibold text-slate-800">Click to upload crop video</p>
                      <p className="text-xs text-slate-500">Supports MP4, MOV up to 50MB</p>
                      <input type="file" accept="video/*" onChange={handleVideoChange} className="hidden" />
                    </label>
                  )}
                </div>
              </div>

              <button 
                onClick={submitVideoAnalysis}
                disabled={loading || !videoPreview}
                className="w-full bg-[#245C3A] text-white font-bold py-3.5 rounded-xl shadow hover:bg-[#1d4b2f] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>{t.analyzing}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>{t.analyze}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* RISK ASSESSMENT VIEW */}
        {view === "risk" && (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6 animate-fade-in">
            <button onClick={() => setView("dashboard")} className="text-xs font-bold text-[#245C3A] hover:underline flex items-center gap-1">
              {t.backToDashboard}
            </button>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{t.riskAssessmentTitle}</h2>
              <p className="text-sm text-slate-600 mt-1">Check potential pest and disease outbreaks based on your location and crop growth stage.</p>
            </div>

            <form onSubmit={submitRiskAssessment} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">{t.cropNameLabel}</label>
                <input 
                  type="text" 
                  value={riskCropName} 
                  onChange={(e) => setRiskCropName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#8B6548] focus:outline-none text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">{t.locationLabel}</label>
                <input 
                  type="text" 
                  value={riskLocation} 
                  onChange={(e) => setRiskLocation(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#8B6548] focus:outline-none text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">{t.growthStageLabel}</label>
                <input 
                  type="text" 
                  value={riskStage} 
                  onChange={(e) => setRiskStage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#8B6548] focus:outline-none text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">{t.weatherNotesLabel}</label>
                <textarea 
                  value={riskNotes} 
                  onChange={(e) => setRiskNotes(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#8B6548] focus:outline-none text-sm resize-none"
                />
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-[#8B6548] text-white font-bold py-3.5 rounded-xl shadow hover:bg-[#73523a] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <ShieldAlert className="w-5 h-5" />}
                <span>{t.assessRiskBtn}</span>
              </button>
            </form>

            {riskResult && (
              <div className="mt-8 bg-[#F8F7F0] rounded-2xl p-6 border border-[#8B6548]/20 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-lg">Risk Assessment Results</h3>
                  <span className={`text-xs px-3 py-1 rounded-full font-bold ${
                    riskResult.risk_level === 'High' || riskResult.risk_level === 'Critical' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    Risk Level: {riskResult.risk_level}
                  </span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{riskResult.advice_summary}</p>
                
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">Primary Regional Risks</h4>
                  <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                    {riskResult.primary_risks?.map((r: string, idx: number) => (
                      <li key={idx}>{r}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">Recommended Preventive Actions</h4>
                  <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                    {riskResult.recommended_actions?.map((a: string, idx: number) => (
                      <li key={idx}>{a}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}

        {/* REPORT / ACTION ADVISOR VIEW */}
        {view === "report" && activeReport && (
          <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
            <button onClick={() => setView("history")} className="text-xs font-bold text-[#245C3A] hover:underline flex items-center gap-1">
              ← Back to Previous Crop Analysis
            </button>

            {/* Report Header Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-semibold text-[#245C3A]">{activeReport.report_id}</span>
                  <h2 className="text-2xl font-extrabold text-slate-900 mt-0.5">{activeReport.crop_name} Diagnostic Report</h2>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-3 py-1 rounded-full font-bold ${
                    activeReport.urgency === 'High' ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    Urgency: {activeReport.urgency}
                  </span>
                  <span className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-semibold">
                    Confidence: {activeReport.confidence}
                  </span>
                </div>
              </div>

              {/* Observations & Causes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">{t.observations}</h3>
                  <p className="text-sm text-slate-800 bg-[#F8F7F0] p-4 rounded-xl leading-relaxed border border-slate-200">
                    {activeReport.observations}
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">{t.possibleCauses}</h3>
                  <div className="bg-[#F8F7F0] p-4 rounded-xl border border-slate-200 space-y-1">
                    {activeReport.possible_causes?.map((cause, idx) => (
                      <div key={idx} className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#245C3A]"></span>
                        <span>{cause}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-xs text-slate-500 italic bg-amber-50 p-3 rounded-xl border border-amber-200">
                <strong>Diagnostic Limitation Note:</strong> {activeReport.uncertainty}
              </div>
            </div>

            {/* WHAT SHOULD I DO NOW? (ACTION ADVISOR) */}
            <div className="bg-[#245C3A] text-white rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
              <div className="flex items-center gap-3 border-b border-emerald-600 pb-4">
                <div className="bg-[#4F8A45] p-2.5 rounded-xl">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{t.whatToDo}</h3>
                  <p className="text-xs text-emerald-100">Step-by-step practical crop care guidance</p>
                </div>
              </div>

              <div className="space-y-4 text-emerald-50 text-sm">
                <div className="bg-emerald-900/40 p-4 rounded-2xl border border-emerald-700/50 space-y-1">
                  <span className="font-bold text-white text-xs uppercase tracking-wider">{t.immediateInspection}</span>
                  <p>{activeReport.recommended_actions?.immediate_inspection}</p>
                </div>

                <div className="bg-emerald-900/40 p-4 rounded-2xl border border-emerald-700/50 space-y-1">
                  <span className="font-bold text-white text-xs uppercase tracking-wider">{t.lowCostActions}</span>
                  <p>{activeReport.recommended_actions?.low_cost_actions}</p>
                </div>

                <div className="bg-emerald-900/40 p-4 rounded-2xl border border-emerald-700/50 space-y-1">
                  <span className="font-bold text-white text-xs uppercase tracking-wider">{t.preventiveMeasures}</span>
                  <p>{activeReport.recommended_actions?.preventive_measures}</p>
                </div>

                <div className="bg-emerald-900/40 p-4 rounded-2xl border border-emerald-700/50 space-y-1">
                  <span className="font-bold text-white text-xs uppercase tracking-wider">{t.reInspection}</span>
                  <p>{activeReport.recommended_actions?.re_inspection_schedule}</p>
                </div>

                <div className="bg-emerald-900/40 p-4 rounded-2xl border border-emerald-700/50 space-y-1">
                  <span className="font-bold text-white text-xs uppercase tracking-wider">{t.expertAssistance}</span>
                  <p>{activeReport.recommended_actions?.expert_assistance}</p>
                </div>

                <div className="bg-amber-900/40 p-4 rounded-2xl border border-amber-500/40 space-y-1 text-amber-100">
                  <span className="font-bold text-white text-xs uppercase tracking-wider">{t.chemicalGuidance}</span>
                  <p>{activeReport.recommended_actions?.chemical_treatment}</p>
                  <p className="text-xs italic opacity-90 mt-1">Always verify that chemical products are registered for your crop and follow approved label instructions.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Floating Gemini Chatbot Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isChatOpen ? (
          <button 
            onClick={() => setIsChatOpen(true)}
            className="bg-[#245C3A] text-white p-4 rounded-full shadow-2xl hover:bg-[#1d4b2f] transition-all flex items-center gap-2 group"
          >
            <MessageSquare className="w-6 h-6" />
            <span className="text-xs font-bold pr-2 hidden sm:inline group-hover:inline">3xAI Chat</span>
          </button>
        ) : (
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-80 sm:w-96 flex flex-col h-[520px] overflow-hidden animate-fade-in">
            {/* Chat Header */}
            <div className="bg-[#245C3A] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                <div>
                  <h4 className="font-bold text-sm">{t.chatTitle}</h4>
                  <p className="text-[10px] text-emerald-100">{t.chatSubtitle}</p>
                </div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="text-white hover:text-emerald-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#F8F7F0]">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.role === 'user' ? 'bg-[#245C3A] text-white rounded-br-none' : 'bg-white text-slate-800 shadow-sm rounded-bl-none border border-slate-200'
                  }`}>
                    {msg.content}
                  </div>
                  {msg.role === 'model' && (
                    <button 
                      onClick={() => speakText(msg.content)}
                      className="mt-1 text-[10px] text-[#245C3A] hover:underline flex items-center gap-1 font-semibold px-1"
                    >
                      <Volume2 className="w-3 h-3" /> Listen
                    </button>
                  )}
                </div>
              ))}
              {chatLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-2xl text-xs text-slate-500 shadow-sm border border-slate-200 flex items-center gap-2">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Thinking...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Listening Indicator */}
            {isListening && (
              <div className="bg-amber-100 border-t border-amber-200 px-3 py-1.5 text-xs text-amber-900 font-medium flex items-center gap-2 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
                <span>{t.listening}</span>
              </div>
            )}

            {/* Chat Input */}
            <form onSubmit={sendChatMessage} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
              <button 
                type="button"
                onClick={toggleListen}
                title="Click to talk (Telugu, Hindi, English)"
                className={`p-2.5 rounded-xl transition-colors ${isListening ? 'bg-red-600 text-white animate-pulse' : 'bg-emerald-100 text-[#245C3A] hover:bg-emerald-200'}`}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
              <input 
                type="text" 
                value={chatInput} 
                onChange={(e) => setChatInput(e.target.value)}
                placeholder={isListening ? t.listening : t.askPlaceholder}
                className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#245C3A]"
              />
              <button 
                type="submit"
                disabled={chatLoading || !chatInput.trim()}
                className="bg-[#245C3A] text-white p-2.5 rounded-xl hover:bg-[#1d4b2f] transition-colors disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500 mt-12">
        <p>3xAI Farmer — AgriTech Hackathon 2026. Empowering farmers with Gemini multimodal AI and Google Search Grounding.</p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <MainApp />
    </ErrorBoundary>
  );
}
