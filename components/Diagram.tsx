"use client";

import { useEffect, useId, useRef, useState } from "react";
import { currentTheme, onThemeChange } from "./ThemeToggle";

const THEMES = {
  light: {
    background: "transparent",
    primaryColor: "#FFFFFF",
    primaryBorderColor: "#0A6A93",
    nodeBorder: "#0A6A93",
    mainBkg: "#FFFFFF",
    primaryTextColor: "#151515",
    secondaryColor: "#EFEEE8",
    secondaryBorderColor: "#57564F",
    secondaryTextColor: "#151515",
    tertiaryColor: "#F1F0EB",
    tertiaryBorderColor: "#0A6A93",
    tertiaryTextColor: "#151515",
    lineColor: "#0A6A93",
    textColor: "#151515",
    clusterBkg: "#F1F0EB",
    clusterBorder: "#8C8A82",
    edgeLabelBackground: "#F8F7F3",
    noteBkgColor: "#EFEEE8",
    noteBorderColor: "#57564F",
    noteTextColor: "#151515",
    actorBkg: "#FFFFFF",
    actorBorder: "#0A6A93",
    signalColor: "#151515",
    signalTextColor: "#151515",
    labelBoxBkgColor: "#FFFFFF",
    activationBkgColor: "#E3F1F8",
    pie1: "#0A6A93", pie2: "#B8235A", pie3: "#4D6B00", pie4: "#57564F", pie5: "#8C8A82", pie6: "#63C7F5",
    pieStrokeColor: "#FFFFFF", pieOuterStrokeColor: "#151515", pieSectionTextColor: "#FFFFFF", pieTitleTextColor: "#151515", pieLegendTextColor: "#151515",
  },
  dark: {
    darkMode: true,
    background: "transparent",
    primaryColor: "#17191C",
    primaryBorderColor: "#63C7F5",
    nodeBorder: "#63C7F5",
    mainBkg: "#17191C",
    primaryTextColor: "#EDEBE5",
    secondaryColor: "#202327",
    secondaryBorderColor: "#A6A49D",
    secondaryTextColor: "#EDEBE5",
    tertiaryColor: "#131518",
    tertiaryBorderColor: "#63C7F5",
    tertiaryTextColor: "#EDEBE5",
    lineColor: "#63C7F5",
    textColor: "#EDEBE5",
    clusterBkg: "#131518",
    clusterBorder: "#4A4E55",
    edgeLabelBackground: "#0F1012",
    noteBkgColor: "#202327",
    noteBorderColor: "#A6A49D",
    noteTextColor: "#EDEBE5",
    actorBkg: "#17191C",
    actorBorder: "#63C7F5",
    signalColor: "#EDEBE5",
    signalTextColor: "#EDEBE5",
    labelBoxBkgColor: "#17191C",
    activationBkgColor: "#1B2A33",
    pie1: "#63C7F5", pie2: "#FF7AA2", pie3: "#D4F55A", pie4: "#A6A49D", pie5: "#4A4E55", pie6: "#2E7FA6",
    pieStrokeColor: "#0F1012", pieOuterStrokeColor: "#EDEBE5", pieSectionTextColor: "#0F1012", pieTitleTextColor: "#EDEBE5", pieLegendTextColor: "#EDEBE5",
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
