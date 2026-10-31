import { Sidebar } from "@/components/Sidebar";
import { allHeadings } from "@/lib/headings";

export default function CourseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="shell">
      <Sidebar headings={allHeadings()} />
      <main id="main" className="main">
        {children}
      </main>
    </div>
  );
}
