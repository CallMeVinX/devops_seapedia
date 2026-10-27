import Link from "next/link";
import { HelpCircle } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export default function SiteHeader() {
  return (
    <header className="border-b border-gray-200 bg-white dark:bg-slate-900 dark:border-slate-800 transition-colors">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-18">
        <Link href="/" className="text-xl font-bold text-seapedia-navy dark:text-blue-400">
          SEAPEDIA
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/help"
            className="flex items-center gap-1.5 text-sm font-medium text-seapedia-navy dark:text-slate-300 transition-colors hover:text-seapedia-navy-light dark:hover:text-blue-400"
          >
            <HelpCircle className="h-4 w-4" />
            Help
          </Link>
        </div>
      </div>
    </header>
  );
}
