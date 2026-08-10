export type LocalBlog = {
  _id: string;
  title: string;
  slug: string;
  aliases?: string[];
  image: string;
  date: string;
  category: string;
  excerpt: string;
  content: string;
};

function paragraph(text: string) {
  return `<p>${text}</p>`;
}

function section(title: string, body: string[]) {
  return `<h2>${title}</h2>${body.join("")}`;
}

function list(items: string[]) {
  return `<ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
}

const localBlogs: LocalBlog[] = [
  {
    _id: "local-blog-1",
    title: "How to Compare Financial Options Before You Commit",
    slug: "slow-internet-issues",
    image: "/images/1.jpg",
    date: "2025-02-10",
    category: "Financial Assistance",
    excerpt:
      "A simple comparison framework can keep short-term convenience from becoming a long-term financial regret.",
    content: [
      paragraph(
        "People often commit too quickly when comparing loans, subscriptions, savings products, or payment plans. A short comparison process helps you see the real tradeoffs before emotion or urgency takes over."
      ),
      section("Start with the non-negotiables", [
        paragraph(
          "List what matters most before you compare options. That might include total cost, flexibility, cancellation terms, waiting periods, or how quickly you need access."
        ),
        list([
          "Write down the total cost, not just the monthly number.",
          "Check deadlines, penalties, and renewal conditions.",
          "Separate must-haves from nice-to-haves.",
        ]),
      ]),
      section("Compare the fine print", [
        paragraph(
          "Two offers can look similar until hidden fees, eligibility rules, or support terms are added back in. Make those details visible before you decide."
        ),
      ]),
      section("Use a decision checkpoint", [
        paragraph(
          "If you still feel uncertain, pause and summarize the best case, worst case, and likely case for each option. That quick exercise usually reveals which choice is actually safer."
        ),
      ]),
    ].join(""),
  },
  {
    _id: "local-blog-2",
    title: "Questions to Ask Before Booking Travel and Accommodation",
    slug: "common-computer-problems",
    aliases: ["computer-problem"],
    image: "/images/2.jpg",
    date: "2025-02-14",
    category: "Travel & Transportation",
    excerpt:
      "A smoother trip usually starts with better questions before you book, not after something goes wrong.",
    content: [
      paragraph(
        "Travel plans fall apart when people focus only on price and overlook timing, flexibility, location, and refund terms. A little planning upfront saves money and stress later."
      ),
      section("Review the full booking picture", [
        list([
          "Confirm change, cancellation, and refund conditions.",
          "Check transport time between the airport, hotel, and planned activities.",
          "Review baggage limits, check-in windows, and policy exceptions.",
        ]),
      ]),
      section("Think beyond the headline price", [
        paragraph(
          "Taxes, resort fees, transfers, insurance, and seat selection can materially change the final cost. Compare the all-in number, not the advertised number."
        ),
      ]),
      section("Plan for disruptions", [
        paragraph(
          "Weather, delays, and schedule changes happen. Keep a backup option in mind for transportation, arrival timing, and accommodation contact details."
        ),
      ]),
    ].join(""),
  },
  {
    _id: "local-blog-3",
    title: "A Simple Checklist for Major Life and Service Decisions",
    slug: "protecting-devices-malware",
    aliases: ["protecting-your-devices-from-viruses-malware"],
    image: "/images/3.jpg",
    date: "2025-02-18",
    category: "Personal Planning",
    excerpt:
      "Big decisions feel easier when you reduce them to criteria, timing, cost, and risk.",
    content: [
      paragraph(
        "Whether you are choosing a provider, applying for something important, or comparing paid services, the same structured checklist helps prevent rushed decisions."
      ),
      section("Define the goal clearly", [
        paragraph(
          "Write one sentence explaining what success looks like. If the goal is vague, every option looks plausible and the comparison becomes harder than it needs to be."
        ),
      ]),
      section("Use a practical checklist", [
        list([
          "What is the total cost and timeline?",
          "What documents, approvals, or follow-ups are required?",
          "What are the main risks if the choice goes badly?",
        ]),
      ]),
      section("Make the next step obvious", [
        paragraph(
          "A good decision process ends with a clear next action, not more ambiguity. Decide what you will do first, who needs to respond, and what deadline matters most."
        ),
      ]),
    ].join(""),
  },
  {
    _id: "local-blog-4",
    title: "When a Consultation Saves Time, Money, and Stress",
    slug: "remote-tech-support",
    image: "/images/4.jpg",
    date: "2025-02-22",
    category: "Consultation",
    excerpt:
      "The right consultation is not about adding one more conversation. It is about shortening the path to a clear outcome.",
    content: [
      paragraph(
        "People often wait too long before asking for help because they assume they should figure it out alone. In many cases, a focused consultation saves hours of rework and reduces avoidable mistakes."
      ),
      section("When it helps most", [
        list([
          "When several options all seem reasonable on the surface.",
          "When the process involves forms, deadlines, or coordination.",
          "When a wrong step could become expensive or hard to reverse.",
        ]),
      ]),
      section("What a useful consultation includes", [
        paragraph(
          "A strong consultation clarifies the goal, identifies the constraints, and ends with practical next steps. It should reduce confusion rather than add jargon."
        ),
      ]),
      section("What to bring to the conversation", [
        paragraph(
          "Gather the relevant documents, dates, priorities, and questions before you ask for help. Better inputs usually produce better guidance."
        ),
      ]),
    ].join(""),
  },
  {
    _id: "local-blog-5",
    title: "How to Organize Personal Records and Deadlines",
    slug: "optimize-pc-performance",
    aliases: ["best-tips-to-optimize-your-pc-performance"],
    image: "/images/5.jpg",
    date: "2025-02-26",
    category: "Personal Planning",
    excerpt:
      "A clear system for records and deadlines can prevent last-minute mistakes across finance, travel, and applications.",
    content: [
      paragraph(
        "Important tasks often become urgent because information is scattered. A lightweight system for records and reminders can make everyday administration far easier to manage."
      ),
      section("Create one reliable structure", [
        list([
          "Keep related documents together by category.",
          "Track deadlines in one calendar or reminder system.",
          "Add a short note explaining what each deadline affects.",
        ]),
      ]),
      section("Review before it becomes urgent", [
        paragraph(
          "Weekly review works better than waiting until the final day. It gives you time to notice missing details, approval delays, or questions that still need answers."
        ),
      ]),
      section("Make it easy to hand off", [
        paragraph(
          "If someone else needs to help you later, your records should be understandable without a long explanation. That alone can save time during stressful situations."
        ),
      ]),
    ].join(""),
  },
  {
    _id: "local-blog-6",
    title: "How AI Assistants Can Improve Everyday Research",
    slug: "ai-powered-chatbots-tech-support",
    aliases: ["ai-powered"],
    image: "/images/6.jpg",
    date: "2025-04-02",
    category: "AI",
    excerpt:
      "AI is most useful when it accelerates research, summarization, and comparison without replacing judgment.",
    content: [
      paragraph(
        "AI assistants can help people compare options faster, summarize long material, and surface useful questions they may not have considered. The value comes from speed and structure, not blind automation."
      ),
      section("Where AI adds value", [
        list([
          "Summarizing forms, policies, and long explanations.",
          "Generating comparison tables for services or options.",
          "Drafting question lists before a decision or appointment.",
        ]),
      ]),
      section("Where human judgment still matters", [
        paragraph(
          "AI can organize information, but people still need to decide what matters most, verify key details, and weigh personal priorities."
        ),
      ]),
      section("Use it as a thought partner", [
        paragraph(
          "The strongest results come when AI supports a human decision-maker rather than pretending to replace one."
        ),
      ]),
    ].join(""),
  },
  {
    _id: "local-blog-7",
    title: "Millennials vs. Gen Z: How Service Expectations Differ",
    slug: "tech-support-expectations",
    aliases: ["tech-support"],
    image: "/images/7.jpg",
    date: "2025-04-08",
    category: "Consumer & Shopping Assistance",
    excerpt:
      "Different age groups often define a good service experience in different ways, especially around speed and communication.",
    content: [
      paragraph(
        "People do not just want fast service. They want a style of communication that fits how they make decisions, ask questions, and evaluate trust."
      ),
      section("Common patterns", [
        list([
          "Gen Z often prefers concise updates and mobile-first interactions.",
          "Millennials often value convenience, transparency, and strong follow-through.",
          "Both groups dislike repeating the same context across channels.",
        ]),
      ]),
      section("What providers should learn from this", [
        paragraph(
          "Clear expectations, good response timing, and consistent communication matter as much as the actual answer being delivered."
        ),
      ]),
    ].join(""),
  },
  {
    _id: "local-blog-8",
    title: "The Most Common Questions People Ask Before They Commit",
    slug: "help-desk-questions",
    image: "/images/8.jpg",
    date: "2025-04-14",
    category: "Consultation",
    excerpt:
      "Most people ask the same few questions before they pay, apply, book, or sign. Those questions are usually the right ones.",
    content: [
      paragraph(
        "Good questions reduce bad decisions. Before people commit, they usually want clarity on cost, timeline, flexibility, hidden conditions, and who is responsible if things change."
      ),
      section("The core questions", [
        list([
          "What is the full cost over time?",
          "What changes if I need to cancel, reschedule, or switch?",
          "What paperwork or follow-up will this require from me?",
        ]),
      ]),
      section("Why these questions matter", [
        paragraph(
          "They reveal whether the option is truly manageable, not just attractive on the surface."
        ),
      ]),
    ].join(""),
  },
  {
    _id: "local-blog-9",
    title: "How AI Can Improve Decision-Making for Small Businesses",
    slug: "ai-in-it-support",
    image: "/images/9.jpg",
    date: "2025-05-06",
    category: "AI",
    excerpt:
      "For small businesses, AI is often most valuable when it improves research speed, consistency, and prioritization.",
    content: [
      paragraph(
        "Small teams make decisions quickly, often with limited time and limited staff. AI can help by organizing information faster and supporting better prioritization."
      ),
      section("Useful applications", [
        list([
          "Comparing vendors, offers, and service terms.",
          "Summarizing long documents into practical action points.",
          "Drafting communication, outlines, and decision criteria.",
        ]),
      ]),
      section("Use it carefully", [
        paragraph(
          "The most important facts should still be checked before money, contracts, or customer commitments are involved."
        ),
      ]),
    ].join(""),
  },
  {
    _id: "local-blog-10",
    title: "Standard Operating Procedures and Training for Service Teams",
    slug: "standard-operating-procedures",
    aliases: ["standard_operating_procedures"],
    image: "/images/sops.png",
    date: "2025-05-12",
    category: "Operations",
    excerpt:
      "Strong SOPs turn good intentions into repeatable service quality, especially when teams are busy.",
    content: [
      paragraph(
        "Teams deliver more consistent service when common tasks are documented clearly and reviewed regularly. SOPs reduce dependence on memory and make onboarding simpler."
      ),
      section("What good SOPs include", [
        list([
          "Scope, ownership, and trigger conditions.",
          "The exact steps, checkpoints, and escalation path.",
          "Review dates and version control.",
        ]),
      ]),
      section("Training completes the system", [
        paragraph(
          "Documentation alone is not enough. Practice, review, and feedback keep procedures relevant and usable."
        ),
      ]),
    ].join(""),
  },
  {
    _id: "local-blog-11",
    title: "What a Good Consultation Process Looks Like Behind the Scenes",
    slug: "how-remote-support-works",
    aliases: ["how_remote_support_works"],
    image: "/images/remote-support.jpg",
    date: "2025-06-09",
    category: "Consultation",
    excerpt:
      "A good consultation process feels smooth to the client because the structure behind it is deliberate.",
    content: [
      paragraph(
        "The best consultations do not rely on improvisation. They move through a clear sequence so the client gets clarity, context, and an actionable outcome."
      ),
      section("A strong workflow", [
        list([
          "Clarify the problem and the desired outcome.",
          "Identify constraints, deadlines, and missing information.",
          "Review options, tradeoffs, and likely next steps.",
          "Close with a short action plan.",
        ]),
      ]),
      section("Why structure matters", [
        paragraph(
          "People feel more confident when the process is easy to follow and the advice is tied to practical action."
        ),
      ]),
    ].join(""),
  },
  {
    _id: "local-blog-12",
    title: "How to Protect Sensitive Information When Sharing Documents",
    slug: "secure-remote-support-sessions",
    aliases: ["secure_remote_support_sessions"],
    image: "/images/secure.jpg",
    date: "2025-06-18",
    category: "Privacy & Security",
    excerpt:
      "Sharing documents is often necessary, but it should still be deliberate, limited, and easy to review later.",
    content: [
      paragraph(
        "Whether you are sending identification, financial records, application forms, or personal details, it helps to treat document sharing as a controlled step rather than a casual one."
      ),
      section("Before you share", [
        list([
          "Confirm who is receiving the document and why.",
          "Review whether every field is actually necessary.",
          "Keep a copy of what you shared and when you shared it.",
        ]),
      ]),
      section("After you share", [
        list([
          "Track any follow-up steps or confirmations.",
          "Store the final version in a place you can find later.",
          "Remove unnecessary duplicates if they create risk or confusion.",
        ]),
      ]),
      section("Use a simple rule", [
        paragraph(
          "Share only what is needed, keep a record of it, and make sure you can explain the next step at any time."
        ),
      ]),
    ].join(""),
  },
];

const bySlug = new Map<string, LocalBlog>();

for (const blog of localBlogs) {
  bySlug.set(blog.slug.toLowerCase(), blog);
  for (const alias of blog.aliases || []) {
    bySlug.set(alias.toLowerCase(), blog);
  }
}

export function getLocalBlogs() {
  return [...localBlogs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function findLocalBlogBySlug(slug: string) {
  return bySlug.get(slug.toLowerCase()) || null;
}

export function searchLocalBlogs(query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return getLocalBlogs().map(stripAliases).slice(0, 10);
  }

  return getLocalBlogs()
    .filter((blog) => {
      return (
        blog.title.toLowerCase().includes(normalized) ||
        blog.category.toLowerCase().includes(normalized) ||
        blog.excerpt.toLowerCase().includes(normalized)
      );
    })
    .slice(0, 10)
    .map(stripAliases);
}

export function stripAliases(blog: LocalBlog) {
  const { aliases, ...publicBlog } = blog;
  void aliases;
  return publicBlog;
}

export function canUseMongoBlogs() {
  return Boolean(process.env.MONGODB_URI);
}
