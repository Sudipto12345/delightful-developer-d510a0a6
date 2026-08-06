import { Link } from "@tanstack/react-router";
import { Facebook, GraduationCap, Mail, MapPin, Phone, Youtube } from "lucide-react";

import { categories } from "@/data/courses";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-surface/40">
      <div className="container-eh grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-spark">
              <GraduationCap className="h-5 w-5 text-accent-foreground" />
            </span>
            <span className="text-lg font-bold">ElevateHub Ltd</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            বাংলাদেশের তরুণদের জন্য দক্ষতাভিত্তিক অনলাইন লার্নিং প্ল্যাটফর্ম। বাংলায় শিখুন, দক্ষ হোন, ক্যারিয়ার
            গড়ুন।
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href="https://facebook.com"
              aria-label="ফেসবুক"
              className="grid h-9 w-9 place-items-center rounded-lg border border-border hover:bg-secondary"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="https://youtube.com"
              aria-label="ইউটিউব"
              className="grid h-9 w-9 place-items-center rounded-lg border border-border hover:bg-secondary"
            >
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide uppercase">ক্যাটাগরি</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  to="/categories/$slug"
                  params={{ slug: c.slug }}
                  className="hover:text-foreground"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide uppercase">প্রতিষ্ঠান</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li>
              <Link to="/about" className="hover:text-foreground">
                আমাদের সম্পর্কে
              </Link>
            </li>
            <li>
              <Link to="/instructors" className="hover:text-foreground">
                মেন্টর প্যানেল
              </Link>
            </li>
            <li>
              <Link to="/corporate" className="hover:text-foreground">
                কর্পোরেট ট্রেনিং
              </Link>
            </li>
            <li>
              <Link to="/pricing" className="hover:text-foreground">
                প্রাইসিং
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-foreground">
                সাধারণ প্রশ্ন
              </Link>
            </li>
            <li>
              <Link to="/consultation" className="hover:text-foreground">
                ফ্রি কনসালটেশন
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide uppercase">যোগাযোগ</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>বাড়ি ৪২, রোড ৭, ধানমন্ডি, ঢাকা ১২০৯</span>
            </li>
            <li className="flex gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <a href="tel:+8809611000000">০৯৬১১-০০০০০০</a>
            </li>
            <li className="flex gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <a href="mailto:hello@elevatehubltd.com">hello@elevatehubltd.com</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="container-eh flex flex-col gap-3 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© ২০২৬ ElevateHub Ltd. সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex flex-wrap gap-4">
            <Link to="/terms" className="hover:text-foreground">
              শর্তাবলি
            </Link>
            <Link to="/privacy" className="hover:text-foreground">
              প্রাইভেসি পলিসি
            </Link>
            <Link to="/refund-policy" className="hover:text-foreground">
              রিফান্ড পলিসি
            </Link>
          </div>
        </div>
      </div>
      <div className="h-16 lg:hidden" />
    </footer>
  );
}
