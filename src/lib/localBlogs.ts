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
    title: "How to Fix Slow Internet and Connectivity Issues",
    slug: "slow-internet-issues",
    image: "/images/1.jpg",
    date: "2025-02-10",
    category: "Networking",
    excerpt:
      "Slow internet can be frustrating. Start with a few quick checks before assuming your provider is at fault.",
    content: [
      paragraph(
        "Slow internet is usually caused by Wi-Fi interference, overloaded devices, outdated router settings, or a service problem upstream. A short diagnostic sequence helps you isolate the issue before you waste time rebooting everything repeatedly."
      ),
      section("Start with the simplest checks", [
        paragraph(
          "Run a speed test near the router, then again in the room where the problem is happening. If the first result is fine and the second is poor, the problem is probably coverage rather than your internet plan."
        ),
        list([
          "Restart the modem and router and wait until both are fully online.",
          "Pause large downloads, streaming sessions, or cloud backups on other devices.",
          "Move the router away from thick walls, microwaves, and cordless phone bases.",
        ]),
      ]),
      section("Improve router performance", [
        paragraph(
          "Routers often ship with conservative defaults. Switching to the 5 GHz band for nearby devices, updating firmware, and changing the Wi-Fi channel can improve consistency immediately."
        ),
        list([
          "Use WPA2 or WPA3 security and remove unknown devices from the network.",
          "Rename guest access separately so visitors do not compete with work devices.",
          "Replace older routers that cannot handle your current device count.",
        ]),
      ]),
      section("Know when to call for support", [
        paragraph(
          "If wired speeds are also poor, the issue may be with the ISP or modem line quality. Record your test results, times of day, and any outage symptoms so support can escalate quickly."
        ),
      ]),
    ].join(""),
  },
  {
    _id: "local-blog-2",
    title: "Common Computer Problems & How to Fix Them",
    slug: "common-computer-problems",
    aliases: ["computer-problem"],
    image: "/images/2.jpg",
    date: "2025-02-14",
    category: "PC Support",
    excerpt:
      "Freezes, blue screens, and sluggish startup usually point to a small set of repeatable causes.",
    content: [
      paragraph(
        "Most computer issues come from startup overload, storage pressure, failing updates, or hardware wear. You can solve a large share of them without a full rebuild if you diagnose the pattern first."
      ),
      section("If the computer is slow", [
        list([
          "Check startup apps and disable anything non-essential.",
          "Confirm that you still have free storage space available.",
          "Install pending operating system and driver updates.",
        ]),
        paragraph(
          "Machines that slow down gradually often benefit from disk cleanup and removing unused software. Machines that become slow suddenly usually point to a recent update, malware event, or failing hardware."
        ),
      ]),
      section("If the machine crashes or freezes", [
        paragraph(
          "Repeated crashes during the same task often indicate a driver or application issue. Random crashes during light use can suggest memory problems, overheating, or storage errors."
        ),
        list([
          "Check temperatures and dust buildup in vents.",
          "Run built-in memory and disk health diagnostics.",
          "Test whether Safe Mode behaves normally.",
        ]),
      ]),
      section("When replacement is the better choice", [
        paragraph(
          "If the device has an old hard drive, low memory, and recurring hardware faults, a repair may cost more in downtime than replacing it with a current system."
        ),
      ]),
    ].join(""),
  },
  {
    _id: "local-blog-3",
    title: "Protecting Your Devices from Viruses & Malware",
    slug: "protecting-devices-malware",
    aliases: ["protecting-your-devices-from-viruses-malware"],
    image: "/images/3.jpg",
    date: "2025-02-18",
    category: "Security",
    excerpt:
      "Good security habits reduce most malware risk before antivirus ever needs to step in.",
    content: [
      paragraph(
        "Malware usually gets in through phishing links, unsafe downloads, weak passwords, or outdated software. The most effective defense is a layered routine rather than one single tool."
      ),
      section("Build a basic protection baseline", [
        list([
          "Keep the operating system, browser, and common apps updated.",
          "Use reputable antivirus or endpoint protection and let it scan automatically.",
          "Turn on multi-factor authentication for email, banking, and work accounts.",
        ]),
      ]),
      section("Watch for suspicious behavior", [
        paragraph(
          "Unexpected pop-ups, browser redirects, new extensions, disabled security settings, and ransom notes are all strong indicators that something is wrong."
        ),
        list([
          "Disconnect the device from the internet if you suspect active malware.",
          "Scan in Safe Mode or with a bootable cleanup tool if needed.",
          "Change important passwords from a different trusted device.",
        ]),
      ]),
      section("Prevent the next incident", [
        paragraph(
          "Backups, staff awareness, and least-privilege access matter just as much as technical tools. Security gets easier when recovery and containment are already planned."
        ),
      ]),
    ].join(""),
  },
  {
    _id: "local-blog-4",
    title: "Remote Tech Support: How It Works & When You Need It",
    slug: "remote-tech-support",
    image: "/images/4.jpg",
    date: "2025-02-22",
    category: "Remote Support",
    excerpt:
      "Remote support can solve many issues faster than an on-site visit when the connection is secure and the symptoms are well described.",
    content: [
      paragraph(
        "Remote support lets a technician view your screen, diagnose the problem, and make approved changes without traveling onsite. It is ideal for software errors, account issues, printer setup, email troubleshooting, and guided training."
      ),
      section("What happens during a session", [
        list([
          "You explain the issue and authorize a secure remote session.",
          "The technician inspects logs, settings, and reproducible symptoms.",
          "Fixes are applied, tested, and explained before the session ends.",
        ]),
      ]),
      section("When remote support is the right choice", [
        paragraph(
          "Choose remote support when the device powers on, the internet connection is stable enough to maintain a session, and the issue is likely software-related."
        ),
      ]),
      section("When you still need onsite help", [
        paragraph(
          "Physical damage, battery swelling, hardware replacement, and complete network outages usually require an onsite visit or depot repair."
        ),
      ]),
    ].join(""),
  },
  {
    _id: "local-blog-5",
    title: "Best Tips to Optimize Your PC Performance",
    slug: "optimize-pc-performance",
    aliases: ["best-tips-to-optimize-your-pc-performance"],
    image: "/images/5.jpg",
    date: "2025-02-26",
    category: "PC Support",
    excerpt:
      "A few maintenance habits can make an aging PC feel materially faster without risky tweaks.",
    content: [
      paragraph(
        "Performance tuning works best when it targets the real bottleneck. Startup clutter, low memory, old storage, and thermal throttling create most everyday slowdowns."
      ),
      section("High-value improvements", [
        list([
          "Reduce startup applications and browser extensions.",
          "Keep at least 15 to 20 percent of storage free.",
          "Upgrade from a spinning hard drive to an SSD if the device still uses one.",
        ]),
      ]),
      section("Maintenance that actually helps", [
        paragraph(
          "Delete temporary files, update drivers carefully, and check fan airflow. Avoid aggressive registry cleaners and miracle optimization tools that create more instability than value."
        ),
      ]),
      section("For business devices", [
        paragraph(
          "If the machine is central to daily work, standardize images, monitor disk health, and replace devices before failures become a support burden."
        ),
      ]),
    ].join(""),
  },
  {
    _id: "local-blog-6",
    title: "How AI-Powered Chatbots Are Revolutionizing Tech Support in 2025",
    slug: "ai-powered-chatbots-tech-support",
    aliases: ["ai-powered"],
    image: "/images/6.jpg",
    date: "2025-04-02",
    category: "AI",
    excerpt:
      "AI chatbots are strongest when they handle repeatable support work and escalate cleanly when confidence drops.",
    content: [
      paragraph(
        "Modern support chatbots reduce queue volume by answering common questions instantly, collecting diagnostic details, and routing users to the right team before a human ever joins."
      ),
      section("Where AI adds value", [
        list([
          "Password reset guidance and account troubleshooting.",
          "Order status, intake forms, and appointment triage.",
          "Knowledge base lookup with consistent step-by-step responses.",
        ]),
      ]),
      section("What still needs humans", [
        paragraph(
          "Complex judgment calls, sensitive customer situations, and multi-system incidents still benefit from experienced technicians. AI should shorten the path to expert help, not replace it blindly."
        ),
      ]),
      section("How to deploy it well", [
        paragraph(
          "Measure containment, escalation quality, and customer satisfaction together. Fast but wrong answers damage trust quickly."
        ),
      ]),
    ].join(""),
  },
  {
    _id: "local-blog-7",
    title: "Millennials vs. Gen Z: How Their Customer Support Expectations Differ",
    slug: "tech-support-expectations",
    aliases: ["tech-support"],
    image: "/images/7.jpg",
    date: "2025-04-08",
    category: "Customer Support",
    excerpt:
      "Support preferences differ by channel, speed expectations, and tolerance for self-service.",
    content: [
      paragraph(
        "Different audiences do not just prefer different channels; they also define a good support experience differently. Some want immediate chat responses, while others still value a clear phone conversation with context."
      ),
      section("Patterns worth planning for", [
        list([
          "Gen Z often expects quick mobile-first support and proactive updates.",
          "Millennials tend to value convenience, transparency, and flexible escalation paths.",
          "Both groups lose trust quickly when they must repeat the same issue multiple times.",
        ]),
      ]),
      section("What teams should do", [
        paragraph(
          "Offer consistent support across chat, email, and phone, but unify the backend workflow so customers do not start over each time they switch channels."
        ),
      ]),
    ].join(""),
  },
  {
    _id: "local-blog-8",
    title: "The Most Frequent Questions We Get at Our Help Desk",
    slug: "help-desk-questions",
    image: "/images/8.jpg",
    date: "2025-04-14",
    category: "Help Desk",
    excerpt:
      "Recurring questions reveal where users need better documentation, automation, or training.",
    content: [
      paragraph(
        "Help desks usually see the same core themes repeatedly: passwords, device setup, email issues, printer access, software permissions, and connectivity problems."
      ),
      section("Why this matters", [
        paragraph(
          "High-frequency requests are not just noise. They highlight where onboarding, policy clarity, or self-service content is currently weak."
        ),
        list([
          "Create short guides for the top ten ticket types.",
          "Automate the highest-volume low-risk requests.",
          "Use ticket tagging to spot patterns before they become backlog.",
        ]),
      ]),
      section("A better support model", [
        paragraph(
          "The best help desks treat repeat tickets as a process improvement signal rather than an unavoidable cost."
        ),
      ]),
    ].join(""),
  },
  {
    _id: "local-blog-9",
    title: "How Artificial Intelligence Can Improve IT for Businesses",
    slug: "ai-in-it-support",
    image: "/images/9.jpg",
    date: "2025-05-06",
    category: "AI",
    excerpt:
      "AI in IT is most effective when it improves detection, triage, and operational consistency.",
    content: [
      paragraph(
        "Businesses use AI to reduce response times, improve monitoring, prioritize incidents, and automate repetitive service tasks. The practical value comes from faster decisions and more consistent operations."
      ),
      section("Useful business applications", [
        list([
          "Anomaly detection in logs, devices, and network traffic.",
          "Automated ticket classification and routing.",
          "Suggested resolutions based on prior incidents and knowledge articles.",
        ]),
      ]),
      section("Limits to respect", [
        paragraph(
          "AI systems still need oversight, especially where security, privacy, and access changes are involved. Human review should stay in the loop for higher-risk actions."
        ),
      ]),
    ].join(""),
  },
  {
    _id: "local-blog-10",
    title: "Standard Operating Procedures (SOPs) and Training",
    slug: "standard-operating-procedures",
    aliases: ["standard_operating_procedures"],
    image: "/images/sops.png",
    date: "2025-05-12",
    category: "Operations",
    excerpt:
      "SOPs turn tribal knowledge into repeatable service quality and reduce dependence on individual memory.",
    content: [
      paragraph(
        "Support teams perform better when common procedures are documented clearly and kept current. SOPs reduce variance, shorten training time, and make escalations cleaner."
      ),
      section("What good SOPs include", [
        list([
          "Trigger conditions and scope.",
          "Exact steps, validation checks, and rollback guidance.",
          "Ownership, revision dates, and escalation criteria.",
        ]),
      ]),
      section("Training matters as much as documentation", [
        paragraph(
          "Documentation that no one practices does not improve service. Short simulations, review sessions, and version-controlled updates keep procedures usable."
        ),
      ]),
    ].join(""),
  },
  {
    _id: "local-blog-11",
    title: "How Remote Support Works: Behind the Scenes of Fixing Tech Issues",
    slug: "how-remote-support-works",
    aliases: ["how_remote_support_works"],
    image: "/images/remote-support.jpg",
    date: "2025-06-09",
    category: "Remote Support",
    excerpt:
      "Behind every smooth remote fix is a repeatable workflow: intake, access, diagnosis, repair, validation, and closure.",
    content: [
      paragraph(
        "Remote support looks simple from the user side, but a well-run session follows a controlled process. That process keeps troubleshooting efficient while protecting the customer’s device and data."
      ),
      section("The support workflow", [
        list([
          "Confirm the issue, urgency, and business impact.",
          "Establish secure remote access with user permission.",
          "Reproduce the problem and inspect logs or settings.",
          "Apply the least risky fix first, then validate the result.",
        ]),
      ]),
      section("Why structure matters", [
        paragraph(
          "Without a clear workflow, remote sessions become guesswork. With a clear workflow, the technician can move faster and explain decisions with confidence."
        ),
      ]),
    ].join(""),
  },
  {
    _id: "local-blog-12",
    title: "How to Secure Your System During Remote Support Sessions",
    slug: "secure-remote-support-sessions",
    aliases: ["secure_remote_support_sessions"],
    image: "/images/secure.jpg",
    date: "2025-06-18",
    category: "Security",
    excerpt:
      "Remote support is safe when access is explicit, time-limited, and easy to revoke after the session ends.",
    content: [
      paragraph(
        "Customers should not have to choose between getting help and protecting their systems. A secure remote support process sets expectations clearly before access begins."
      ),
      section("Before the session", [
        list([
          "Verify the provider and the exact support request.",
          "Use approved remote tools and avoid unsolicited links.",
          "Close unrelated files or apps that expose sensitive data.",
        ]),
      ]),
      section("During and after the session", [
        list([
          "Watch what changes are being made and ask questions in real time.",
          "Remove temporary access after the issue is resolved.",
          "Rotate passwords if privileged accounts were used.",
        ]),
      ]),
      section("For organizations", [
        paragraph(
          "Session recording, approval workflows, and audit logs make remote support safer and easier to review later."
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
