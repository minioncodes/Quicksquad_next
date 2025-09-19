"use client";
import { useEffect } from "react";

declare global {
  interface Window {
    QuickSquadChat?: {
      init: (config: {
        endpoint: string;
        title: string;
        subtitle: string;
        brand: { primary: string };
        quickPrompts: string[];
      }) => void;
    };
  }
}

export default function ChatWidget() {
  useEffect(() => {
    // Ensure a container exists
    let container = document.getElementById("quicksquad-chat-root");
    if (!container) {
      container = document.createElement("div");
      container.id = "quicksquad-chat-root";
      document.body.appendChild(container);
    }

    // Inject script
    const script = document.createElement("script");
    script.src =
      "https://chatgpt-widget-test-production.up.railway.app/quicksquad-chat-widget.js";
    script.async = true;
    script.onload = () => {
      if (window.QuickSquadChat) {
        window.QuickSquadChat.init({
          endpoint:
            "https://chatgpt-widget-test-production.up.railway.app/quicksquad-ai",
          title: "QuickSquad",
          subtitle: "AI Assistant",
          brand: { primary: "#0ea5e9" },
          quickPrompts: [
            "Open a bank account online",
            "Fix Wi-Fi that keeps dropping",
            "Reset my email password",
            "Find the nearest DMV",
            "Explain Roth IRA vs 401(k)",
          ],
        });
      } else {
        console.error("QuickSquadChat not found on window");
      }
    };

    document.body.appendChild(script);

    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  return null; // Widget renders itself
}
