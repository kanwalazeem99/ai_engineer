import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const codeLines = [
  { t: "const", k: " developer", s: " = ", v: "{" },
  { t: "  name:", k: "", s: " ", v: "'Kanwal Azeem'," },
  { t: "  roles:", k: "", s: " ", v: "['Frontend Developer', 'AI Automation Developer']," },
  { t: "  stack:", k: "", s: " ", v: "['WordPress', 'Shopify', 'Laravel']," },
  { t: "  tools:", k: "", s: " ", v: "['React', 'Next.js', 'Tailwind']," },
  { t: "  ai:", k: "", s: " ", v: "['n8n', 'Make', 'Zapier', 'Vapi']," },
  { t: "  base:", k: "", s: " ", v: "'Karachi, PK'," },
  { t: "  available:", k: "", s: " ", v: "true," },
  { t: "}", k: "", s: "", v: "" },
  { t: "", k: "", s: "", v: "" },
  { t: "function", k: " ship", s: "() {", v: "" },
  { t: "  return", k: "", s: " ", v: "roles.flatMap(automate)" },
  { t: "}", k: "", s: "", v: "" },
];

const floatingTokens = [
  { text: "<Component />", x: "8%", y: "18%", delay: 0 },
  { text: "useEffect()", x: "78%", y: "12%", delay: 0.4 },
  { text: "{ ...props }", x: "5%", y: "72%", delay: 0.8 },
  { text: "async/await", x: "82%", y: "68%", delay: 1.2 },
  { text: "n8n.trigger()", x: "70%", y: "40%", delay: 1.6 },
  { text: "<Suspense />", x: "12%", y: "44%", delay: 2 },
  { text: "ai.agent()", x: "88%", y: "85%", delay: 2.4 },
  { text: "vapi.call()", x: "30%", y: "8%", delay: 2.8 },
];

function TypingCode() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [charProgress, setCharProgress] = useState(0);

  useEffect(() => {
    if (visibleLines >= codeLines.length) {
      const reset = setTimeout(() => {
        setVisibleLines(0);
        setCharProgress(0);
      }, 4000);
      return () => clearTimeout(reset);
    }
    const line = codeLines[visibleLines];
    const fullLen = (line.t + line.k + line.s + line.v).length;
    if (charProgress < fullLen) {
      const id = setTimeout(() => setCharProgress((c) => c + 1), 28);
      return () => clearTimeout(id);
    } else {
      const id = setTimeout(() => {
        setVisibleLines((v) => v + 1);
        setCharProgress(0);
      }, 180);
      return () => clearTimeout(id);
    }
  }, [visibleLines, charProgress]);

  return (
    <div className="font-mono text-[13px] leading-relaxed text-foreground/55">
      {codeLines.slice(0, visibleLines).map((line, i) => (
        <div key={i}>
          <span className="text-ember">{line.t}</span>
          <span className="text-foreground/70">{line.k}</span>
          <span>{line.s}</span>
          <span className="text-foreground/45">{line.v}</span>
        </div>
      ))}
      {visibleLines < codeLines.length && (
        <div>
          {(() => {
            const line = codeLines[visibleLines];
            const full = line.t + line.k + line.s + line.v;
            const shown = full.slice(0, charProgress);
            return (
              <>
                <span>{shown}</span>
                <span className="animate-blink text-ember">▍</span>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
}

export function CodeBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Terminal window — hidden on small screens to keep hero readable */}
      <motion.div
        initial={{ opacity: 0, y: 30, rotate: -2 }}
        animate={{ opacity: 1, y: 0, rotate: -2 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="hidden lg:block absolute right-[-2%] top-[18%] w-[480px] xl:w-[560px] rounded-xl border border-border bg-card/85 backdrop-blur shadow-[0_30px_80px_-30px_rgba(0,0,0,0.25)]"
      >
        <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-border">
          <span className="h-2.5 w-2.5 rounded-full bg-ember/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/30" />
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/30" />
          <span className="ml-3 font-mono text-[11px] text-muted-foreground">
            kanwal@portfolio: ~/src/developer.ts
          </span>
        </div>
        <div className="p-5 min-h-[280px]">
          <TypingCode />
        </div>
      </motion.div>

      {/* Floating code tokens scattered around */}
      {floatingTokens.map((tok, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: [0, 0.55, 0.55, 0],
            y: [10, -8, -8, -20],
          }}
          transition={{
            duration: 6,
            delay: tok.delay,
            repeat: Infinity,
            repeatDelay: 1.5,
            ease: "easeInOut",
          }}
          style={{ left: tok.x, top: tok.y }}
          className="absolute font-mono text-xs text-foreground/40 pointer-events-none select-none"
        >
          {tok.text}
        </motion.div>
      ))}

      {/* Console prompt bottom-left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-24 left-6 hidden md:flex items-center gap-2 font-mono text-xs text-muted-foreground"
      >
        <span className="text-ember">›</span>
        <span>npm run dev</span>
        <span className="text-foreground/50">— ready in 412ms</span>
        <span className="animate-blink text-ember">▍</span>
      </motion.div>
    </div>
  );
}
