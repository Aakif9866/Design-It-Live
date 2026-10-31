import type { MDXComponents } from "mdx/types";
import type { ReactNode } from "react";
import { Children, isValidElement } from "react";
import { Callout, Decision, Interview, Takeaways } from "@/components/content";
import { Diagram } from "@/components/Diagram";
import { Quiz } from "@/components/Quiz";
import { slugify } from "@/lib/slug";

function textOf(node: ReactNode): string {
  return Children.toArray(node)
    .map((c) => (typeof c === "string" || typeof c === "number" ? String(c) : isValidElement<{ children?: ReactNode }>(c) ? textOf(c.props.children) : ""))
    .join("");
}

const components: MDXComponents = {
  h2: ({ children }) => {
    const id = slugify(textOf(children));
    return (
      <h2 id={id}>
        <a href={`#${id}`} className="heading-anchor">
          {children}
        </a>
      </h2>
    );
  },
  table: (props) => (
    <div className="table-wrap" tabIndex={0} role="region" aria-label="Table">
      <table {...props} />
    </div>
  ),
  Diagram,
  Decision,
  Interview,
  Takeaways,
  Callout,
  Quiz,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
