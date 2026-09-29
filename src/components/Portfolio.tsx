import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Briefcase } from "lucide-react";
import { Code2 } from "lucide-react";
import { Mail } from "lucide-react";
import { MessageCircle } from "lucide-react";
import { Link as LinkIcon } from "lucide-react";
import { Palette } from "lucide-react";
import { ShoppingBag } from "lucide-react";
import { Wrench } from "lucide-react";
import { Bot, Workflow, Mic, Zap, Sparkles } from "lucide-react";
import { CodeBackdrop } from "./CodeBackdrop";
import healthcareAiChatbotSrc from "@/assets/skin-center-ai-workflow.png";
import googleDriveRagVideoSrc from "@/assets/skin-center-ai-assistant.mp4";
import vapiVoiceAgentWorkflowSrc from "@/assets/vapi-full-workflow.png";
import vapiAppointmentCancelledVideoSrc from "@/assets/vapi-appointment-cancelled.mp4";
import youtubeCourseGeneratorSrc from "@/assets/youtube-course-generator.png";
import youtubeCourseGeneratorVideoSrc from "@/assets/youtube-course-generator.mp4";
import resumeUrl from "@/assets/Kanwal_Azeem_AI_Engineer.pdf?url";
import meetingWorkflowImg from "@/assets/ai-meeting-assistant-workflow.png";
import meetingTrelloImg from "@/assets/ai-meeting-assistant-trello.png";
import meetingDashboardVideo from "@/assets/ai-meeting-assistant-dashboard.mp4";
import certMatalogics from "@/assets/cert-matalogics-ai-automation.png";
import certZapierIntermediate from "@/assets/cert-zapier-intermediate-zaps.png";
import certZapierJumpstart from "@/assets/cert-zapier-jumpstart.png";
import certZapierBasic from "@/assets/cert-zapier-basic-zaps.png";
import certAgentSkills from "@/assets/cert-anthropic-agent-skills.png";
import certMcp from "@/assets/cert-anthropic-mcp.png";
import certAiFluency from "@/assets/cert-anthropic-ai-fluency.png";
import { Download } from "lucide-react";

const aiServices = [
  { icon: Bot, title: "AI Agents", desc: "Custom AI employees that handle support, sales, and ops 24/7 without breaks." },
  { icon: Mic, title: "Voice AI", desc: "Voice agents for receptionists, restaurants, and clinics using Vapi & ElevenLabs." },
  { icon: Workflow, title: "Workflow Automation", desc: "End-to-end automations with n8n, Make, and Zapier — from lead capture to CRM." },
  { icon: Zap, title: "No-Code Solutions", desc: "Rapid business automations wiring together APIs, sheets, email, and LLMs." },
];

const aiPipelines = [
  { flow: "Lead → Apollo → AI Qualifier → CRM → Email", tag: "LEAD GEN" },
  { flow: "Voice Call → STT → LLM → Calendar Booking", tag: "VOICE AI" },
  { flow: "Restaurant → Voice Agent → Menu → Order", tag: "RESTAURANT" },
  { flow: "Invoice → OCR → AI Extract → ERP Sync", tag: "FINANCE" },
];

const aiProjectTypes = [
  {
    title: "AI Email Automation",
    desc: "Intelligent email assistants that read, analyze, draft professional responses, and save email drafts for review before sending.",
  },
  {
    title: "WhatsApp Business Automation (Meta API)",
    desc: "Development of intelligent WhatsApp solutions using the Meta WhatsApp Business API for customer support, automated replies, lead qualification, appointment booking, notifications, and conversational AI.",
  },
  {
    title: "AI Customer Support Chatbots",
    desc: "Context-aware AI assistants powered by Retrieval-Augmented Generation (RAG) that answer customer queries using company knowledge bases while integrating with business tools and CRMs.",
  },
  {
    title: "LinkedIn Content Automation",
    desc: "Automated discovery of industry-relevant content, AI-assisted post generation, and publishing workflows to maintain an active professional presence.",
  },
  {
    title: "AI Lead Generation",
    desc: "Automated collection of high-quality business leads, company information, contact details, and market intelligence using web scraping and data extraction tools.",
  },
  {
    title: "AI Video & Reel Generation",
    desc: "Automated creation of engaging marketing videos and short-form social media content using AI-powered video generation platforms.",
  },
  {
    title: "Speech-to-Text Automation",
    desc: "AI-powered transcription workflows that convert voice messages, meetings, interviews, and audio recordings into accurate, searchable text for documentation and analysis.",
  },
  {
    title: "Customer Feedback Analysis",
    desc: "Intelligent collection and categorization of customer feedback, automatically identifying complaints, appreciation, suggestions, and overall sentiment for actionable insights.",
  },
  {
    title: "Financial & Stock Intelligence",
    desc: "AI assistants capable of retrieving reliable market information, analyzing public stock data, and providing real-time financial insights through conversational interfaces.",
  },
  {
    title: "Appointment & CRM Automation",
    desc: "End-to-end appointment scheduling, lead capture, CRM synchronization, and automated follow-up workflows.",
  },
  {
    title: "Document & Data Processing",
    desc: "AI-driven extraction, classification, summarization, and processing of PDFs, spreadsheets, forms, and other business documents.",
  },
  {
    title: "Custom Business Process Automation",
    desc: "End-to-end workflow automation connecting multiple applications, APIs, databases, and cloud services to optimize business operations and reduce manual intervention.",
  },
];

const projects = [
  { id: "001", title: "Values of Golf", tag: "LARAVEL", year: "2025", stack: "Laravel · PHP · MVC", desc: "Full-featured golf platform with performance-driven design.", url: "https://valuesofgolf.com/" },
  { id: "002", title: "AlertMate UK", tag: "LARAVEL", year: "2025", stack: "Laravel · Blade", desc: "Modern alert & notification management platform.", url: "https://www.alertmate.co.uk/" },
  { id: "003", title: "DontGuess UK", tag: "LARAVEL", year: "2024", stack: "Laravel · CSS3", desc: "Clean professional web app for the UK market.", url: "https://dontguess.co.uk/" },
  { id: "005", title: "Boutique Luxury Retreats", tag: "WORDPRESS", year: "2024", stack: "WordPress · Elementor", desc: "Luxury travel & hospitality site with bespoke design.", url: "https://boutiqueluxuryretreats.co.uk/" },
  { id: "006", title: "Smallpeice Trust", tag: "WORDPRESS", year: "2024", stack: "WordPress · WPBakery", desc: "Corporate site for a UK engineering education charity.", url: "https://www.smallpeice.com/" },
  { id: "007", title: "5D Thinking", tag: "WORDPRESS", year: "2023", stack: "WordPress", desc: "Thought leadership platform with custom UI.", url: "https://5dthinking.org/" },
  { id: "008", title: "Panetta Lawyers", tag: "WORDPRESS", year: "2023", stack: "WordPress · Elementor", desc: "Legal services site for an Australian law firm.", url: "https://panettalawyers.com/" },
  { id: "009", title: "Vizita AE", tag: "SHOPIFY", year: "2024", stack: "Shopify · Liquid", desc: "Polished e-commerce store for the UAE market.", url: "https://vizita.ae/" },
  { id: "010", title: "Custom GPT Solutions", tag: "WIX", year: "2024", stack: "Wix · AI", desc: "Modern AI solutions platform optimised for conversions.", url: "https://customgptsolutions.ai/" },
  { id: "011", title: "Khebrati", tag: "FINTECH", year: "2024", stack: "Fintech · Web App", desc: "Fintech platform for expert financial services.", url: "https://www.khebrati.com/" },
];

const capabilities = [
  { icon: Bot, title: "AI Automation", desc: "AI Agents, Voice AI, n8n, Make, Zapier, Vapi, ElevenLabs, OpenAI APIs." },
  { icon: Code2, title: "Frontend Development", desc: "React, Next.js, Tailwind CSS, JavaScript, TypeScript, Responsive Design." },
  { icon: Palette, title: "Design & Workflow", desc: "Figma, Adobe XD, PSD to HTML, Pixel-Perfect UI, Jira, Trello, SEO." },
  { icon: ShoppingBag, title: "CMS & E-Commerce", desc: "WordPress, Shopify, WooCommerce, Wix, Webflow, Squarespace." },
  { icon: Wrench, title: "Backend & Tools", desc: "Laravel, PHP, MySQL, Git, REST APIs, Server Management." },
];

const experience = [
  {
    period: "Feb 2024 — Present",
    role: "Associate Frontend Developer",
    company: "Tafsol Technologies, Karachi",
    points: [
      "Progressed from intern to full-time Associate Frontend Developer.",
      "Built responsive websites & dashboards using Next.js, Laravel, WordPress, Shopify, Wix, Webflow and Squarespace.",
      "Converted Figma designs into pixel-perfect responsive HTML/CSS layouts.",
      "Collaborated with QA teams to troubleshoot bugs and ensure high-quality deliverables.",
      "Liaised with clients to understand requirements and deliver tailored solutions.",
    ],
  },
  {
    period: "Sep 2021 — Dec 2021",
    role: "Frontend Developer",
    company: "Axcore Solutions",
    points: [
      "Delivered custom and WordPress-based website projects for national and international clients.",
      "Converted PSD and Figma designs into responsive HTML, CSS, and WordPress layouts.",
    ],
  },
  {
    period: "Nov 2020 — Dec 2020",
    role: "Frontend Developer Intern",
    company: "AL-FAHAD IT Consultant Company",
    points: [
      "Contributed to projects for ZOHO, customising CRM and Books applications to meet client requirements.",
    ],
  },
];

const skills = [
  "React.js", "Next.js", "WordPress", "Shopify", "Tailwind CSS",
  "Laravel", "Webflow", "Wix", "Figma", "WooCommerce", "Git",
  "n8n", "Make", "Zapier", "Vapi", "OpenAI", "AI Agents",
];

const certifications = [
  { title: "AI Automation: No-Code & Low-Code Systems Engineering", issuer: "MATalogics", date: "Aug 2026", img: certMatalogics },
  { title: "Zapier Jumpstart", issuer: "Zapier Academy", date: "Aug 2026", img: certZapierJumpstart },
  { title: "Building Basic Zaps", issuer: "Zapier Academy", date: "Aug 2026", img: certZapierBasic },
  { title: "Building Intermediate Zaps", issuer: "Zapier Academy", date: "Aug 2026", img: certZapierIntermediate },
  { title: "Introduction to Agent Skills", issuer: "Anthropic", date: "Aug 2026", img: certAgentSkills },
  { title: "Introduction to Model Context Protocol", issuer: "Anthropic", date: "Aug 2026", img: certMcp },
  { title: "AI Fluency: Framework & Foundations", issuer: "Anthropic", date: "Aug 2026", img: certAiFluency },
];

const marquee = ["WORDPRESS", "SHOPIFY", "LARAVEL", "WIX", "REACT", "NEXT.JS", "AI AGENTS", "N8N", "VOICE AI", "AUTOMATION", "•"];

function Clock() {
  const [time, setTime] = useState<string>("");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const h = d.getUTCHours().toString().padStart(2, "0");
      const m = d.getUTCMinutes().toString().padStart(2, "0");
      const s = d.getUTCSeconds().toString().padStart(2, "0");
      setTime(`${h}:${m}:${s} UTC`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="font-mono text-xs">
      {time || "--:--:-- UTC"}<span className="animate-blink ml-0.5">_</span>
    </span>
  );
}

export function Portfolio() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 px-6 py-4">
        <nav className="mx-auto max-w-7xl flex items-center justify-between rounded-full border border-border bg-background/70 backdrop-blur-xl px-5 py-2.5">
          <a href="#" className="flex items-center gap-2 font-mono text-sm font-medium">
            <span className="h-2 w-2 rounded-full bg-ember animate-pulse" />
            kanwal.dev
          </a>
          <div className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <a href="#skills" className="hover:text-foreground transition">Skills</a>
            <a href="#ai-projects" className="hover:text-foreground transition">Areas of Expertise</a>
            <a href="#experience" className="hover:text-foreground transition">Experience</a>
            <a href="#case-study" className="hover:text-foreground transition">AI Projects</a>
            <a href="#work" className="hover:text-foreground transition">FE Projects</a>
            <a href="#certifications" className="hover:text-foreground transition">Certifications</a>
            <a href="#contact" className="hover:text-foreground transition">Contact</a>
            <a href={resumeUrl} download="Kanwal_Azeem_AI_Engineer.pdf" className="inline-flex items-center gap-1 text-foreground hover:text-ember transition">Resume <Download className="h-3 w-3" /></a>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center px-6 pt-24 pb-12 z-10">
        <div className="absolute inset-0 grid-lines opacity-50 pointer-events-none" />

        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0 pointer-events-none">
          <CodeBackdrop />
        </motion.div>

        <div className="relative z-10 mx-auto max-w-7xl w-full grid md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 backdrop-blur px-3 py-1 font-mono text-xs uppercase tracking-widest"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-ember" />
              Available for new projects
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display mt-6 text-5xl sm:text-6xl md:text-7xl leading-[0.95]"
            >
              Kanwal
              <br />
              <span className="italic text-ember">Azeem</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-6 max-w-2xl text-lg sm:text-xl text-foreground leading-snug font-medium"
            >
              Building AI Employees & Modern Web Solutions That Scale Businesses.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-3 max-w-xl text-sm text-muted-foreground leading-relaxed"
            >
              AI Agents • Voice AI • Workflow Automation • Full-Stack Web Development
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-6 max-w-xl text-sm text-muted-foreground leading-relaxed"
            >
              I build intelligent systems and modern web applications that automate operations, improve customer experiences, and help businesses scale efficiently.
            </motion.p>


            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <a href="#work" className="inline-flex items-center gap-2 rounded-full bg-ink text-ink-fg px-5 py-2.5 font-mono text-xs uppercase tracking-widest hover:bg-ember transition-colors">
                View Projects <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 font-mono text-xs uppercase tracking-widest hover:border-ember hover:text-ember transition-colors">
                Get in touch
              </a>
              <a href={resumeUrl} download="Kanwal_Azeem_AI_Engineer.pdf" className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 font-mono text-xs uppercase tracking-widest hover:border-ember hover:text-ember transition-colors">
                Download Resume <Download className="h-3.5 w-3.5" />
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="md:col-span-5 space-y-3 font-mono text-xs"
          >
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">NAME</span>
              <span>KANWAL AZEEM</span>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">ROLE</span>
              <span>AI AUTOMATION DEVELOPER</span>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">BASE</span>
              <span>KARACHI, PK</span>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">PHONE</span>
              <span>+92 322 3376892</span>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">YEARS</span>
              <span>2+</span>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">SHIPPED</span>
              <span>20+ PROJECTS</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">STATUS</span>
              <span className="text-ember">● OPEN TO FREELANCE</span>
            </div>

            <div className="pt-6 flex flex-wrap gap-1.5">
              {skills.map((s) => (
                <span key={s} className="rounded-full border border-border px-2.5 py-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-xs uppercase tracking-widest text-muted-foreground"
        >
          ↓ scroll
        </motion.div>
      </section>

      {/* INTRO / HEADLINE */}
      <section className="relative z-10 px-6 py-24 border-t border-border">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-3xl md:text-5xl leading-tight"
          >
            Transforming Businesses with AI Automation & Modern Web Development
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto"
          >
            From intelligent AI employees and workflow automation to responsive websites and custom web applications, I create digital solutions that save time and increase revenue.
          </motion.p>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="relative z-10 border-y border-border bg-ink text-ink-fg py-5 overflow-hidden">
        <div className="flex animate-scroll-x whitespace-nowrap font-display text-2xl italic">
          {[...marquee, ...marquee, ...marquee, ...marquee].map((w, i) => (
            <span key={i} className="mx-8">{w}</span>
          ))}
        </div>
      </section>

      {/* SKILLS / CAPABILITIES */}
      <section id="skills" className="relative z-10 px-6 py-32 border-t border-border bg-card/50">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">[01] / Expertise</p>
          <h2 className="font-display text-3xl md:text-5xl mt-3 mb-16">
            Technical <span className="italic text-ember">skills</span>.
          </h2>

          <div className="max-w-5xl mx-auto">
            {/* Top row: 3 items */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
              {capabilities.slice(0, 3).map((c, i) => (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  whileHover={{ backgroundColor: "var(--ink)", color: "var(--background)" }}
                  className="group bg-background p-8 transition-colors"
                >
                  <div className="flex items-start justify-between mb-12">
                    <c.icon className="h-6 w-6" />
                    <span className="font-mono text-xs text-muted-foreground group-hover:text-background/60">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl mb-2">{c.title}</h3>
                  <p className="text-sm text-muted-foreground group-hover:text-background/70 leading-relaxed">
                    {c.desc}
                  </p>
                </motion.div>
              ))}
            </div>
            {/* Bottom row: 2 items centered */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border border-t-0 lg:w-2/3 mx-auto">
              {capabilities.slice(3).map((c, i) => (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (i + 3) * 0.06 }}
                  whileHover={{ backgroundColor: "var(--ink)", color: "var(--background)" }}
                  className="group bg-background p-8 transition-colors"
                >
                  <div className="flex items-start justify-between mb-12">
                    <c.icon className="h-6 w-6" />
                    <span className="font-mono text-xs text-muted-foreground group-hover:text-background/60">
                      0{i + 4}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl mb-2">{c.title}</h3>
                  <p className="text-sm text-muted-foreground group-hover:text-background/70 leading-relaxed">
                    {c.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI AUTOMATION */}
      <section id="ai" className="relative z-10 px-6 py-32 border-t border-border">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">[02] / New Chapter</p>
            <h2 className="font-display text-3xl md:text-5xl mt-3">
              AI <span className="italic text-ember">automation</span>.
            </h2>
            <p className="mt-6 text-base text-muted-foreground leading-relaxed">
              I build AI employees that work 24/7 — AI Agents, Voice AI systems, and
              end-to-end workflow automation for startups, agencies, healthcare, restaurants,
              real estate and e-commerce. Less hiring, more scaling.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border mb-16">
            {aiServices.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="group bg-background p-8 hover:bg-ink hover:text-background transition-colors"
              >
                <s.icon className="h-6 w-6 mb-10" />
                <h3 className="font-display text-2xl mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground group-hover:text-background/70 leading-relaxed">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">
              → Sample automation pipelines
            </p>
            <div className="border-t border-border">
              {aiPipelines.map((p, i) => (
                <motion.div
                  key={p.tag + i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex items-center justify-between gap-4 py-5 border-b border-border font-mono text-sm"
                >
                  <span className="text-foreground">{p.flow}</span>
                  <span className="text-ember text-xs uppercase tracking-widest whitespace-nowrap">{p.tag}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI PROJECTS */}
      <section id="case-study" className="relative z-10 px-6 py-32 border-t border-border">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">[02.1] / AI Projects</p>
            <h2 className="font-display text-3xl md:text-5xl mt-3">
              AI <span className="italic text-ember">projects</span>.
            </h2>
          </div>
          <div className="mb-12 max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">[02.1] / Case study</p>
            <h2 className="font-display text-3xl md:text-5xl mt-3">
              Healthcare AI Customer Support &{" "}
              <span className="italic text-ember">Appointment Booking</span> Chatbot.
            </h2>
            <p className="mt-6 text-base text-muted-foreground leading-relaxed">
              A Google Drive RAG pipeline built in n8n — documents auto-embed into a Supabase
              Vector Store, and an AI Agent (Groq + Memory) answers patient queries and books
              appointments straight into Google Sheets.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl overflow-hidden border border-border bg-card"
            >
              <img
                src={healthcareAiChatbotSrc}
                alt="Healthcare AI Customer Support and Appointment Booking Chatbot workflow"
                className="w-full h-auto block"
                loading="lazy"
              />
              <div className="p-4 font-mono text-xs uppercase tracking-widest text-muted-foreground border-t border-border">
                n8n workflow · Google Drive → Supabase Vector Store → AI Agent
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl overflow-hidden border border-border bg-card"
            >
              <video
                src={googleDriveRagVideoSrc}
                controls
                playsInline
                preload="metadata"
                className="w-full h-auto block bg-ink"
              />
              <div className="p-4 font-mono text-xs uppercase tracking-widest text-muted-foreground border-t border-border">
                Live demo · Chatbot answering & booking appointments
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* VOICE AGENT CASE STUDY */}
      <section id="voice-agent" className="relative z-10 px-6 py-32 border-t border-border">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">[02.2] / Case study</p>
            <h2 className="font-display text-3xl md:text-5xl mt-3">
              AI Voice Agent —{" "}
              <span className="italic text-ember">Appointment Scheduler</span> and Customer Care.
            </h2>
            <p className="mt-6 text-base text-muted-foreground leading-relaxed">
              A Vapi-powered voice agent wired through n8n — checks calendar availability in
              real time, schedules appointments on Google Calendar, and logs every booking into
              Google Sheets for the care team.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl overflow-hidden border border-border bg-card"
            >
              <img
                src={vapiVoiceAgentWorkflowSrc}
                alt="n8n workflow: check availability and schedule appointment via Google Calendar and Sheets"
                className="w-full h-auto block"
                loading="lazy"
              />
              <div className="p-4 font-mono text-xs uppercase tracking-widest text-muted-foreground border-t border-border">
                n8n workflow · Check Availability → Schedule → Update → Cancel/Delete
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl overflow-hidden border border-border bg-card"
            >
              <video
                src={vapiAppointmentCancelledVideoSrc}
                controls
                playsInline
                preload="metadata"
                className="w-full h-auto block bg-ink"
              />
              <div className="p-4 font-mono text-xs uppercase tracking-widest text-muted-foreground border-t border-border">
                Live demo · Vapi voice agent updating & cancelling appointments
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* YOUTUBE COURSE GENERATOR CASE STUDY */}
      <section id="youtube-course-generator" className="relative z-10 px-6 py-32 border-t border-border">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">[02.3] / Case study</p>
            <h2 className="font-display text-3xl md:text-5xl mt-3">
              YouTube Course <span className="italic text-ember">Generator</span> Agent.
            </h2>
            <p className="mt-6 text-base text-muted-foreground leading-relaxed">
              An n8n agent that turns a topic into a complete learning roadmap: it searches YouTube,
              ranks videos, fetches channel stats, builds a structured curriculum, generates a PDF,
              and emails it — all automatically.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl overflow-hidden border border-border bg-card"
            >
              <img
                src={youtubeCourseGeneratorSrc}
                alt="n8n YouTube Course Generator Agent workflow"
                className="w-full h-auto block"
                loading="lazy"
              />
              <div className="p-4 font-mono text-xs uppercase tracking-widest text-muted-foreground border-t border-border">
                n8n workflow · Form Trigger → Search YouTube → Rank Videos → AI Agent → PDF → Email
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl overflow-hidden border border-border bg-card"
            >
              <video
                src={youtubeCourseGeneratorVideoSrc}
                controls
                playsInline
                preload="metadata"
                className="w-full h-auto block bg-ink"
              />
              <div className="p-4 font-mono text-xs uppercase tracking-widest text-muted-foreground border-t border-border">
                Live demo · YouTube Course Generator Agent in action
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI MEETING ASSISTANT CASE STUDY */}
      <section id="ai-meeting-assistant" className="relative z-10 px-6 py-32 border-t border-border">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">[02.4] / Case study</p>
            <h2 className="font-display text-3xl md:text-5xl mt-3">
              AI Meeting <span className="italic text-ember">Assistant</span>.
            </h2>
            <p className="mt-6 text-base text-muted-foreground leading-relaxed">
              A multi-flow n8n system that turns a meeting recording into finished work. It transcribes
              the audio with OpenAI Whisper, summarizes the discussion and extracts action items, creates
              a Trello card for each task assigned to the right owner, emails the minutes to attendees,
              books a follow-up on Google Calendar when one is mentioned, and archives everything in
              Google Sheets. Daily deadline reminders, searchable meeting history and a live status
              dashboard complete the setup, with an admin alert if summarizing ever fails.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2 rounded-2xl overflow-hidden border border-border bg-card"
            >
              <img
                src={meetingWorkflowImg}
                alt="n8n AI Meeting Assistant workflow: transcription, summary, Trello, email, calendar and archive"
                className="w-full h-auto block"
                loading="lazy"
              />
              <div className="p-4 font-mono text-xs uppercase tracking-widest text-muted-foreground border-t border-border">
                n8n workflow · Webhook → Whisper → OpenAI Summary → Trello · Email · Calendar · Sheets
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl overflow-hidden border border-border bg-card"
            >
              <video
                src={meetingDashboardVideo}
                controls
                playsInline
                preload="metadata"
                className="w-full h-auto block bg-ink"
              />
              <div className="p-4 font-mono text-xs uppercase tracking-widest text-muted-foreground border-t border-border">
                Live demo · Dashboard tracking each step of a meeting in real time
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-2xl overflow-hidden border border-border bg-card"
            >
              <img
                src={meetingTrelloImg}
                alt="Trello board with action items created automatically from meetings"
                className="w-full h-auto block"
                loading="lazy"
              />
              <div className="p-4 font-mono text-xs uppercase tracking-widest text-muted-foreground border-t border-border">
                Trello board · Action items created automatically and assigned to owners
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI PROJECTS */}
      <section id="ai-projects" className="relative z-10 px-6 py-32 border-t border-border bg-card/50">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">[03] / Areas of expertise</p>
            <h2 className="font-display text-3xl md:text-5xl mt-3">
              Areas of <span className="italic text-ember">Expertise</span>.
            </h2>
            <p className="mt-6 text-base text-muted-foreground leading-relaxed">
              My expertise includes building intelligent systems that automate work, analyze data, and deliver results for businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {aiProjectTypes.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group bg-background p-8 hover:bg-ink hover:text-background transition-colors"
              >
                <Sparkles className="h-5 w-5 mb-8 text-ember group-hover:text-background" />
                <h3 className="font-display text-xl mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground group-hover:text-background/70 leading-relaxed">
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="relative z-10 px-6 py-32 border-t border-border bg-card/50">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">[04] / Career</p>
            <h2 className="font-display text-3xl md:text-5xl mt-3">
              Work <span className="italic text-ember">experience</span>
            </h2>
          </div>

          <div className="space-y-12">
            {experience.map((e, i) => (
              <motion.div
                key={e.role + i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="grid md:grid-cols-12 gap-6 pb-12 border-b border-border last:border-b-0"
              >
                <div className="md:col-span-3">
                  <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    <Briefcase className="h-3.5 w-3.5" />
                    {e.period}
                  </div>
                </div>
                <div className="md:col-span-9">
                  <h3 className="font-display text-2xl md:text-3xl">{e.role}</h3>
                  <p className="font-mono text-sm text-ember mt-1">{e.company}</p>
                  <ul className="mt-5 space-y-2 text-sm text-muted-foreground leading-relaxed">
                    {e.points.map((p, j) => (
                      <li key={j} className="flex gap-3">
                        <span className="text-ember mt-1.5">→</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="relative z-10 px-6 py-32 border-t border-border">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-baseline justify-between mb-16">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">[05] / Work</p>
              <h2 className="font-display text-3xl md:text-5xl mt-3">
                Live <span className="italic text-ember">projects</span>
              </h2>
            </div>
          </div>

          <div className="border-t border-border">
            {projects.map((p, i) => (
              <motion.a
                key={p.id}
                href={p.url || "#"}
                target={p.url ? "_blank" : undefined}
                rel={p.url ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                whileHover={{ x: 12 }}
                className="group grid grid-cols-12 gap-4 items-center py-8 border-b border-border cursor-pointer"
              >
                <div className="col-span-2 md:col-span-1 font-mono text-xs text-muted-foreground">{p.id}</div>
                <div className="col-span-10 md:col-span-4">
                  <div className="font-display text-2xl md:text-3xl group-hover:text-ember transition-colors">{p.title}</div>
                  <div className="font-mono text-xs text-muted-foreground mt-1 hidden md:block">{p.desc}</div>
                </div>
                <div className="col-span-6 md:col-span-2 font-mono text-xs text-muted-foreground">{p.tag}</div>
                <div className="col-span-4 md:col-span-3 font-mono text-xs text-muted-foreground hidden md:block">{p.stack}</div>
                <div className="col-span-2 md:col-span-2 flex items-center justify-end font-mono text-xs">
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section id="certifications" className="relative z-10 px-6 py-32 border-t border-border bg-card/50">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">[06] / Credentials</p>
            <h2 className="font-display text-3xl md:text-5xl mt-3">
              <span className="italic text-ember">Certifications</span>.
            </h2>
            <p className="mt-6 text-base text-muted-foreground leading-relaxed">
              Formal training in AI automation, agents and workflow tooling, completed alongside hands-on project work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                className="rounded-2xl overflow-hidden border border-border bg-card"
              >
                <img
                  src={c.img}
                  alt={`${c.title} certificate from ${c.issuer}`}
                  className="w-full aspect-[4/3] object-contain bg-background block"
                  loading="lazy"
                />
                <div className="p-5 border-t border-border">
                  <h3 className="font-display text-lg leading-snug">{c.title}</h3>
                  <p className="mt-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    {c.issuer} · <span className="text-ember">{c.date}</span>
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative z-10 px-6 py-32 border-t border-border bg-ink text-ink-fg">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-xs uppercase tracking-widest text-background/50">[07] / Get in touch</p>
          <h2 className="font-display text-4xl md:text-6xl mt-6 leading-[1]">
            Let's
            <br />
            <span className="italic text-ember">connect.</span>
          </h2>

          <div className="mt-20 grid md:grid-cols-3 gap-6">
            <a
              href="https://wa.me/923223376892"
              target="_blank"
              rel="noreferrer"
              className="group rounded-2xl border border-background/15 p-8 hover:border-ember transition-colors"
            >
              <MessageCircle className="h-6 w-6 mb-8" />
              <h3 className="font-display text-2xl">WhatsApp</h3>
              <p className="font-mono text-xs text-background/50 mt-2">Chat with me directly</p>
              <p className="font-mono text-xs mt-6 group-hover:text-ember transition-colors">
                Connect now →
              </p>
            </a>

            <a
              href="https://www.linkedin.com/in/kanwal-azeem-87a7732a3/"
              target="_blank"
              rel="noreferrer"
              className="group rounded-2xl border border-background/15 p-8 hover:border-ember transition-colors"
            >
              <LinkIcon className="h-6 w-6 mb-8" />
              <h3 className="font-display text-2xl">LinkedIn</h3>
              <p className="font-mono text-xs text-background/50 mt-2">Connect professionally</p>
              <p className="font-mono text-xs mt-6 group-hover:text-ember transition-colors">
                View profile →
              </p>
            </a>

            <a
              href="mailto:kanwalazeem99@gmail.com"
              className="group rounded-2xl border border-background/15 p-8 hover:border-ember transition-colors"
            >
              <Mail className="h-6 w-6 mb-8" />
              <h3 className="font-display text-2xl">Email</h3>
              <p className="font-mono text-xs text-background/50 mt-2">kanwalazeem99@gmail.com</p>
              <p className="font-mono text-xs mt-6 group-hover:text-ember transition-colors">
                Send email →
              </p>
            </a>
          </div>

          <div className="mt-20 flex items-end justify-between flex-wrap gap-4 text-xs font-mono text-background/50">
            <div>© 2025 KANWAL AZEEM — FRONTEND DEVELOPER, KARACHI</div>
            <a href="#certifications" className="hover:text-ember transition-colors">VIEW CERTIFICATIONS ↑</a>
          </div>
        </div>
      </section>
    </div>
  );
}
