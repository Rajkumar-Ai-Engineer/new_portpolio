import json
import csv
import os

with open("docs/audit/images_audit.json") as f:
    images = json.load(f)

with open("docs/audit/project_access_results.json", encoding="utf-8") as f:
    projects = json.load(f)

# Update P027
for p in projects:
    if p["project_id"] == "P027":
        p["repo_status"] = "Accessible (Public)"
        p["is_accessible"] = "Yes"
        p["primary_language"] = "Python"
        p["notes"] = "Default branch: main"

# Re-save project-access-inventory.csv
fieldnames_p = ["project_id", "title", "standardized_category", "raw_technology", "tier", "status", "year", "github_url", "repo_status", "is_accessible", "primary_language", "notes"]
with open("docs/audit/project-access-inventory.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=fieldnames_p)
    writer.writeheader()
    writer.writerows(projects)

# Now define mapping logic for all 45 images
# We know the 3 exact duplicate pairs:
# 1. aegisai-system-overview.webp == aegisai-system-overview-alt.webp
# 2. developer-cli-flow-alt.webp == mcp-developer-cli-flow.webp
# 3. network-security-data-flow-alt.webp == network-security-data-flow.webp
# And 1 aspect ratio variant:
# unsupervised-clustering-pipeline.webp (1800x1129) vs unsupervised-clustering-pipeline-alt.webp (1800x1005)

image_mapping_rules = {
    "aegisai-system-overview.webp": ("P031", "AegisAI", "Architecture", "Original 16:9 diagram", "Identical to aegisai-system-overview-alt.webp", "High", "Use as primary architecture diagram"),
    "aegisai-system-overview-alt.webp": ("P031", "AegisAI", "Architecture", "Identical duplicate", "Identical duplicate of aegisai-system-overview.webp (same SHA256)", "High", "Preserve asset; use canonical"),
    "agent-layer-architecture.webp": ("P010", "Multi-Agent Streamlit App", "Architecture", "Multi-agent architecture layers", "Matches multi-agent orchestration architecture", "High", "Use on project detail page"),
    "agentic-rag.webp": ("P011", "AgenticRag", "Architecture", "Agentic RAG workflow diagram", "Matches P011 AgenticRag", "High", "Use as project architecture diagram"),
    "agentic-system-workflow.webp": ("P001", "Prescription verification agent", "Supporting Visual", "Agentic system workflow", "Supporting agent workflow visual", "High", "Use on detail page"),
    "animal-image-classification.webp": ("P008", "Animal-Img-Classification", "Architecture", "DL classification pipeline", "Matches P008 Animal image classification", "High", "Use as project architecture diagram"),
    "architecture-workflow-unmatched.webp": ("P013", "End-to-End RAG", "Supporting Visual", "Generic workflow visual", "Complementary to RAG workflows", "Medium", "Supporting architecture visual"),
    "bank-customer-churn.webp": ("P024", "CustomerChurnPrediction", "Architecture", "ML churn classification pipeline", "Matches P024 Customer Churn Prediction", "High", "Use as project architecture diagram"),
    "BasicRagApplication.png": ("P005", "BasicRagApplication", "Cover", "UI Screenshot of Streamlit app", "Direct screenshot of BasicRagApplication", "High", "Use as project cover image"),
    "book-recommendation-system.webp": ("P019", "Book Recommendation System", "Architecture", "ML recommendation system pipeline", "Matches P019 Book Recommendation", "High", "Use as project architecture diagram"),
    "DeepAgents.png": ("P002", "Deep_agents_practice", "Cover", "UI Screenshot of DeepAgents app", "Direct screenshot of DeepAgents interface", "High", "Use as project cover image"),
    "deepfake-audio-video-fusion.webp": ("P016", "Deepfake Detector — Audio + Video Fusion", "Architecture", "Multimodal deepfake fusion pipeline", "Matches P016 Deepfake detector", "High", "Use as project architecture diagram"),
    "devbot-app-architecture.webp": ("P032", "devbotapp", "Architecture", "DevBot app architecture diagram", "Matches P032 devbotapp", "High", "Use as project architecture diagram"),
    "developer-cli-flow-alt.webp": ("P032", "devbotapp", "Workflow", "Identical duplicate of mcp-developer-cli-flow.webp", "Identical duplicate (same SHA256)", "High", "Preserve asset; use canonical"),
    "document-ingestion-workflow.webp": ("P012", "VectorlessRag", "Architecture", "Document chunking and ingestion workflow", "Matches vectorless RAG ingestion", "High", "Use as architecture diagram"),
    "dvc-git-ml-pipeline.webp": ("P025", "DVC", "Architecture", "DVC Git pipeline architecture", "Matches P025 DVC repository", "High", "Use as project architecture diagram"),
    "email-assistant-architecture.webp": ("P003", "E_mail_assistant_(deep_agents)", "Architecture", "Gmail + Calendar agent architecture", "Matches P003 Email Assistant", "High", "Use as project architecture diagram"),
    "end-to-end-rag.webp": ("P013", "End-to-End RAG", "Architecture", "End-to-end RAG architecture diagram", "Matches P013 End-to-End RAG", "High", "Use as project architecture diagram"),
    "face-recognition-attendance.webp": ("P007", "FaceAttendanceSystem", "Architecture", "Face attendance pipeline diagram", "Matches P007 Face Attendance System", "High", "Use as project architecture diagram"),
    "fake_news_detection_v1.png": ("P014", "fake_news_detection_v1", "Cover", "Screenshot of winning hackathon app", "Matches P014 Fake news detection app", "High", "Use as project cover image"),
    "FinancialPortpolio.png": ("P030", "FinancialPortpolio", "Cover", "UI Screenshot of Financial Portfolio app", "Direct screenshot of Financial Portfolio UI", "High", "Use as project cover image"),
    "gmail-calendar-mcp-orchestration.webp": ("P015", "MCP Agent Orchestration — Gmail + Google Calendar", "Architecture", "MCP Gmail + Calendar orchestration", "Matches P015 MCP Agent Orchestration", "High", "Use as project architecture diagram"),
    "healthcare-orchestration-layers.webp": ("P023", "Heltech", "Architecture", "Healthcare agent layers architecture", "Matches P023 Heltech Patient Navigation", "High", "Use as primary architecture diagram"),
    "healthcare-user-flow.webp": ("P023", "Heltech", "Workflow", "Healthcare user journey flow", "Matches P023 Heltech patient journey", "High", "Use in project detail page gallery"),
    "Heltech.png": ("P023", "Heltech", "Cover", "UI Screenshot of HelTech patient app", "Direct screenshot of Heltech UI", "High", "Use as project cover image"),
    "holiday-trip-planner.webp": ("P021", "Holiday Trip Planner", "Architecture", "Holiday planner agent workflow", "Matches P021 Holiday Trip Planner", "High", "Use as project architecture diagram"),
    "mcp-developer-cli-flow.webp": ("P028", "Mcpdemo", "Architecture", "Developer CLI MCP flow diagram", "Canonical diagram for MCP flow", "High", "Use as project architecture diagram"),
    "MCPDemo.png": ("P028", "Mcpdemo", "Cover", "UI Screenshot of MCP Demo app", "Direct screenshot of MCP Demo interface", "High", "Use as project cover image"),
    "MLFlow.png": ("P026", "MLFlow", "Cover", "UI Screenshot of MLflow dashboard", "Direct screenshot of MLFlow runs", "High", "Use as project cover image"),
    "multi-agent-streamlit.webp": ("P010", "Multi-Agent Streamlit App", "Architecture", "Streamlit multi-agent UI workflow", "Matches P010 Multi-Agent Streamlit App", "High", "Use as project architecture diagram"),
    "network-security-data-flow-alt.webp": ("P027", "NetworkSecurity prediction", "Architecture", "Identical duplicate", "Identical duplicate of network-security-data-flow.webp (same SHA256)", "High", "Preserve asset; use canonical"),
    "network-security-data-flow.webp": ("P027", "NetworkSecurity prediction", "Architecture", "Network security ML pipeline", "Matches P027 NetworkSecurity prediction", "High", "Use as project architecture diagram"),
    "player-face-recognition.webp": ("P009", "Player-face-recognition", "Architecture", "Player face recognition pipeline", "Matches P009 Player Face Recognition", "High", "Use as project architecture diagram"),
    "PokemonAnalysis.png": ("P006", "PokemonDataAnalysis", "Cover", "UI Screenshot of Pokemon Analysis dashboard", "Direct screenshot of Pokemon Data Analysis", "High", "Use as project cover image"),
    "prescription-agent.webp": ("P001", "Prescription verification agent", "Architecture", "Prescription agent architecture", "Matches P001 Prescription verification agent", "High", "Use as project architecture diagram"),
    "resume-intelligence-parser.webp": ("P034", "Resume Intelligence and Parser Pipeline", "Architecture", "Resume parser pipeline diagram", "Matches P034 Resume Intelligence", "High", "Use as project architecture diagram"),
    "sirex-medical-assistant.webp": ("P004", "Sirax", "Architecture", "Sirex medical assistant architecture", "Matches P004 Sirax/Sirex", "High", "Use as project architecture diagram"),
    "Smart Housing Assistant.png": ("P020", "Smart Housing Assistant", "Cover", "UI Screenshot of Smart Housing Assistant", "Direct screenshot of Smart Housing UI", "High", "Use as project cover image"),
    "student-performance-prediction.webp": ("P029", "End-to-End-student performance prediction", "Architecture", "Student performance ML pipeline", "Matches P029 Student Performance", "High", "Use as project architecture diagram"),
    "Tamil Flower Classifier.png": ("P018", "Tamil Flower Classifier", "Cover", "UI Screenshot of Tamil Flower Classifier", "Direct screenshot of Tamil Flower Classifier UI", "High", "Use as project cover image"),
    "tamil-literature-flowers.webp": ("P017", "Tamil Literature Flowers — Full Stack Web App", "Architecture", "Full-stack Tamil flower app architecture", "Matches P017 Tamil Literature Flowers", "High", "Use as project architecture diagram"),
    "unsupervised-clustering-pipeline-alt.webp": ("P033", "unsupervised learning and clustering analysis", "Architecture", "16:9 crop variant (1800x1005)", "Crop variant of unsupervised clustering pipeline", "High", "Use 16:9 variant for card/web display"),
    "unsupervised-clustering-pipeline.webp": ("P033", "unsupervised learning and clustering analysis", "Architecture", "Full aspect ratio diagram (1800x1129)", "Original aspect ratio diagram", "High", "Use for detailed pan/zoom viewer"),
    "URLSummarizer.png": ("P022", "URLSummarizer", "Cover", "UI Screenshot of URL Summarizer app", "Direct screenshot of URL Summarizer UI", "High", "Use as project cover image"),
    "vectorless-rag.webp": ("P012", "VectorlessRag", "Architecture", "Vectorless RAG retrieval architecture", "Matches P012 VectorlessRag", "High", "Use as project architecture diagram")
}

mapping_rows = []
for img in images:
    fname = img["filename"]
    rule = image_mapping_rules.get(fname, ("UNKNOWN", "Unknown", "Supporting", "Unmapped visual", "No rule", "Low", "Review"))
    mapping_rows.append({
        "filename": fname,
        "format": img["format"],
        "dimensions": f"{img['width']}x{img['height']}",
        "size_bytes": img["size_bytes"],
        "sha256": img["sha256"],
        "project_id": rule[0],
        "project_title": rule[1],
        "intended_use": rule[2],
        "visual_description": rule[3],
        "duplicate_or_variant_status": rule[4],
        "confidence": rule[5],
        "required_action": rule[6]
    })

csv_img = "docs/audit/project-image-mapping.csv"
fieldnames_img = ["filename", "format", "dimensions", "size_bytes", "sha256", "project_id", "project_title", "intended_use", "visual_description", "duplicate_or_variant_status", "confidence", "required_action"]

with open(csv_img, "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=fieldnames_img)
    writer.writeheader()
    writer.writerows(mapping_rows)

print(f"Saved {csv_img} with {len(mapping_rows)} rows.")
