"use client";

import { useEffect, useId, useRef, useState } from "react";

const THEMES = {
  light: {
    background: "transparent",
    primaryColor: "#FFFFFF",
    primaryBorderColor: "#1F4FBF",
    nodeBorder: "#1F4FBF",
    mainBkg: "#FFFFFF",
    primaryTextColor: "#1A2332",
    secondaryColor: "#FBEFD2",
    secondaryBorderColor: "#B37A06",
    secondaryTextColor: "#1A2332",
    tertiaryColor: "#E8EEFA",
    tertiaryBorderColor: "#1F4FBF",
    tertiaryTextColor: "#1A2332",
    lineColor: "#1F4FBF",
    textColor: "#1A2332",
    clusterBkg: "#EDF1F8",
    clusterBorder: "#8FA6D6",
    edgeLabelBackground: "#F4F6F7",
    noteBkgColor: "#FBEFD2",
    noteBorderColor: "#B37A06",
    noteTextColor: "#1A2332",
    actorBkg: "#FFFFFF",
    actorBorder: "#1F4FBF",
    signalColor: "#1A2332",
    signalTextColor: "#1A2332",
    labelBoxBkgColor: "#FFFFFF",
    activationBkgColor: "#E8EEFA",
    pie1: "#1F4FBF", pie2: "#A86F00", pie3: "#2C7A4B", pie4: "#C2333A", pie5: "#7A8899", pie6: "#8FA6D6",
    pieStrokeColor: "#FFFFFF", pieOuterStrokeColor: "#1A2332", pieSectionTextColor: "#FFFFFF", pieTitleTextColor: "#1A2332", pieLegendTextColor: "#1A2332",
  },
  dark: {
    darkMode: true,
    background: "transparent",
    primaryColor: "#132A4A",
    primaryBorderColor: "#7FB2F0",
    nodeBorder: "#7FB2F0",
    mainBkg: "#132A4A",
    primaryTextColor: "#E4ECF4",
    secondaryColor: "#3A2F14",
    secondaryBorderColor: "#F0B84A",
    secondaryTextColor: "#E4ECF4",
    tertiaryColor: "#183559",
    tertiaryBorderColor: "#7FB2F0",
    tertiaryTextColor: "#E4ECF4",
    lineColor: "#7FB2F0",
    textColor: "#E4ECF4",
    clusterBkg: "#102440",
    clusterBorder: "#4F7FB8",
    edgeLabelBackground: "#0E1B2E",
    noteBkgColor: "#3A2F14",
    noteBorderColor: "#F0B84A",
    noteTextColor: "#E4ECF4",
    actorBkg: "#132A4A",
    actorBorder: "#7FB2F0",
    signalColor: "#E4ECF4",
    signalTextColor: "#E4ECF4",
    labelBoxBkgColor: "#132A4A",
    activationBkgColor: "#183559",
    pie1: "#7FB2F0", pie2: "#F0B84A", pie3: "#6CCB94", pie4: "#FF8F86", pie5: "#A7B6C8", pie6: "#4F7FB8",
    pieStrokeColor: "#0E1B2E", pieOuterStrokeColor: "#E4ECF4", pieSectionTextColor: "#0E1B2E", pieTitleTextColor: "#E4ECF4", pieLegendTextColor: "#E4ECF4",
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
    const dark = window.matchMedia("(prefers-color-scheme: dark)");

    async function draw() {
      const { default: mermaid } = await import("mermaid");
      await document.fonts.ready;
      const fontFamily = getComputedStyle(document.documentElement).getPropertyValue("--font-head").trim() || "sans-serif";
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: "strict",
        theme: "base",
        fontFamily,
        themeVariables: { ...(dark.matches ? THEMES.dark : THEMES.light), fontFamily, fontSize: "15px" },
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
    dark.addEventListener("change", draw);
    return () => {
      cancelled = true;
      dark.removeEventListener("change", draw);
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
