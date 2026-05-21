import Link from 'next/link';

interface CTASectionProps {
  kicker?: string;
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  className?: string;
}

export function CTASection({ kicker, title, description, buttonText, buttonHref, className = "bg-slate-50 py-16 sm:py-20 lg:py-28" }: CTASectionProps) {
  return (
    <section className={className}>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        {kicker && (
          <p className="text-[#4a0e68] text-xs font-semibold tracking-[0.3em] uppercase mb-4">
            {kicker}
          </p>
        )}
        <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[#2c0e68] leading-tight mb-6">
          {title}
        </h2>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
          {description}
        </p>
        <Link
          href={buttonHref}
          className="inline-flex items-center justify-center px-8 py-3.5 min-h-[44px] rounded-full bg-[#2c0e68] text-white text-sm font-bold hover:bg-[#2c0e68]/90 transition-all duration-300 shadow-sm hover:-translate-y-0.5 hover:shadow-md"
        >
          {buttonText}
        </Link>
      </div>
    </section>
  );
}
