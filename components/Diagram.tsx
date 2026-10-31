"use client";

import { useEffect, useId, useRef, useState } from "react";
import { currentTheme, onThemeChange } from "./ThemeToggle";

const THEMES = {
  light: {
    background: "transparent",
    primaryColor: "#FFFFFF",
    primaryBorderColor: "#0D9488",
    nodeBorder: "#0D9488",
    mainBkg: "#FFFFFF",
    primaryTextColor: "#111827",
    secondaryColor: "#F3F4F6",
    secondaryBorderColor: "#9333EA",
    secondaryTextColor: "#111827",
    tertiaryColor: "#F9FAFB",
    tertiaryBorderColor: "#0D9488",
    tertiaryTextColor: "#111827",
    lineColor: "#0F766E",
    textColor: "#111827",
    clusterBkg: "#F9FAFB",
    clusterBorder: "#9CA3AF",
    edgeLabelBackground: "#FFFFFF",
    noteBkgColor: "#F3F4F6",
    noteBorderColor: "#9333EA",
    noteTextColor: "#111827",
    actorBkg: "#FFFFFF",
    actorBorder: "#0D9488",
    signalColor: "#111827",
    signalTextColor: "#111827",
    labelBoxBkgColor: "#FFFFFF",
    activationBkgColor: "#CCFBF1",
    pie1: "#0F766E", pie2: "#4F46E5", pie3: "#9333EA", pie4: "#DB2777", pie5: "#B45309", pie6: "#6B7280",
    pieStrokeColor: "#FFFFFF", pieOuterStrokeColor: "#111827", pieSectionTextColor: "#FFFFFF", pieTitleTextColor: "#111827", pieLegendTextColor: "#111827",
  },
  dark: {
    darkMode: true,
    background: "transparent",
    primaryColor: "#141414",
    primaryBorderColor: "#2DD4BF",
    nodeBorder: "#2DD4BF",
    mainBkg: "#141414",
    primaryTextColor: "#E5E7EB",
    secondaryColor: "#1C1C1C",
    secondaryBorderColor: "#C084FC",
    secondaryTextColor: "#E5E7EB",
    tertiaryColor: "#101010",
    tertiaryBorderColor: "#2DD4BF",
    tertiaryTextColor: "#E5E7EB",
    lineColor: "#2DD4BF",
    textColor: "#E5E7EB",
    clusterBkg: "#101010",
    clusterBorder: "#3F3F46",
    edgeLabelBackground: "#0A0A0A",
    noteBkgColor: "#1C1C1C",
    noteBorderColor: "#C084FC",
    noteTextColor: "#E5E7EB",
    actorBkg: "#141414",
    actorBorder: "#2DD4BF",
    signalColor: "#E5E7EB",
    signalTextColor: "#E5E7EB",
    labelBoxBkgColor: "#141414",
    activationBkgColor: "#123430",
    pie1: "#2DD4BF", pie2: "#818CF8", pie3: "#C084FC", pie4: "#F472B6", pie5: "#FBBF24", pie6: "#9CA3AF",
    pieStrokeColor: "#0A0A0A", pieOuterStrokeColor: "#E5E7EB", pieSectionTextColor: "#0A0A0A", pieTitleTextColor: "#E5E7EB", pieLegendTextColor: "#E5E7EB",
  },
};

let renderCount = 0;

export function Diagram({ chart, fig, caption, label }: { chart: string; fig: string; caption: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const baseId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const [error, setError] = useState<string | null>(null);
  const [wide, setWide] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function draw() {
      const { default: mermaid } = await import("mermaid");
      await document.fonts.ready;
      const fontFamily = getComputedStyle(document.documentElement).getPropertyValue("--font-head").trim() || "sans-serif";
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: "strict",
        theme: "base",
        fontFamily,
        themeVariables: { ...THEMES[currentTheme()], fontFamily, fontSize: "15px" },
        flowchart: { curve: "basis", padding: 12 },
        sequence: { mirrorActors: false },
      });
      try {
        const { svg } = await mermaid.render(`mmd-${baseId}-${renderCount++}`, chart.trim());
        if (!cancelled && ref.current) {
          ref.current.innerHTML = svg;
          // Keep labels readable on phones: never shrink below the natural width (capped), scroll instead.
          const el = ref.current.querySelector("svg");
          const natural = el?.viewBox.baseVal?.width ?? 0;
          if (el && natural) el.style.minWidth = `${Math.min(natural, 560)}px`;
          setWide(Math.min(natural, 560) > ref.current.clientWidth + 4);
        }
      } catch (e) {
        console.error(`Diagram ${fig} failed`, e);
        if (!cancelled) setError(e instanceof Error ? e.message : String(e));
      }
    }

    draw();
    const off = onThemeChange(draw);
    return () => {
      cancelled = true;
      off();
    };
  }, [chart, baseId, fig]);

  return (
    <figure className="diagram">
      <div className="diagram-sheet">
        <div ref={ref} className="diagram-canvas" role="img" aria-label={label}>
          <p className="diagram-loading">{label}</p>
        </div>
        {error && (
          <p className="diagram-error" role="alert">
            This diagram could not be drawn. {label}
          </p>
        )}
      </div>
      <figcaption>
        <span className="diagram-fig">Fig {fig}</span> {caption}
        {wide && <span className="diagram-hint"> Scroll sideways to see all of it.</span>}
      </figcaption>
    </figure>
  );
}
