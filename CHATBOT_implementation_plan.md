# Content-Aware AI Chatbot (Powered by Gemini)

Implement a premium, "content-aware" AI chatbot for the Teleiosis Mandate website. The chatbot will be powered by Google Gemini and will serve as an interactive guide for visitors, answering questions about the mandate, teachings, events, and leadership.

## User Review Required

> [!IMPORTANT]
> **API Key Required**: I will need a Google AI Studio API key (`GEMINI_API_KEY`) to enable the Gemini functionality. I can set up the framework, but it will only be functional once the key is provided in the `.env` file.

> [!TIP]
> **Persona**: The chatbot will be named "Teleiosis Assistant" and will follow a professional, insightful, and spiritually grounded persona aligned with the ministry's mission.

## Proposed Changes

### [Backend] API Integration

#### [NEW] [route.ts](file:///c:/Users/kondw/Desktop/repos/church/teleiosis/app/api/chat/route.ts)
- Implement a Next.js Route Handler using `@google/generative-ai`.
- Secure the API with environment variables.
- Handle streaming responses if possible, or standard JSON for simplicity.

#### [NEW] [chatbot-context.ts](file:///c:/Users/kondw/Desktop/repos/church/teleiosis/lib/ai/chatbot-context.ts)
- Store a compiled "Knowledge Base" of the site's content.
- This includes mandate details, team members, teaching series, and event schedules.
- System prompt definition to guide the AI.

### [Frontend] Chatbot UI Component

#### [NEW] [ChatBot/index.tsx](file:///c:/Users/kondw/Desktop/repos/church/teleiosis/app/components/ChatBot/index.tsx)
- Main wrapper component managing open/close state.
- Floating action button in the bottom-right corner.

#### [NEW] [ChatBot/ChatWindow.tsx](file:///c:/Users/kondw/Desktop/repos/church/teleiosis/app/components/ChatBot/ChatWindow.tsx)
- Primary chat interface with a premium glassmorphism aesthetic (`backdrop-blur-md`, `bg-white/80`).
- Message list (User vs. AI) with smooth entry animations using `framer-motion`.
- Input field with loading states.

#### [NEW] [ChatBot/ChatButton.tsx](file:///c:/Users/kondw/Desktop/repos/church/teleiosis/app/components/ChatBot/ChatButton.tsx)
- Separate floating button component with hover effects and icons.

### [Frontend] Global Integration

#### [MODIFY] [layout.tsx](file:///c:/Users/kondw/Desktop/repos/church/teleiosis/app/layout.tsx)
- Add the `<ChatBot />` component to the root layout so it is available on every page.

---

## Technical Stack
- **AI Model**: Gemini 1.5 Flash (via `@google/generative-ai`).
- **Animations**: Framer Motion.
- **Icons**: Lucide React.
- **Styling**: Tailwind CSS (Glassmorphism utilities).

## Verification Plan

### Automated Tests
- Test API route locally with `curl` or Postman once API key is added.
- Verify `ChatBot` component visibility and interactivity across different viewports.

### Manual Verification
- Deploy to a preview branch and test conversation flow.
- Ensure "content-awareness" by asking specific questions like "Who is Rhema Nyambe?" or "What are the Saturday classes?".
