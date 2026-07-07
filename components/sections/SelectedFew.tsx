export function SelectedFew() {
  return (
    <section className="relative border-b border-border">
      <span className="watermark">∞</span>
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-32 text-center">
        <div className="mono-label mb-4">The Selected Few</div>
        <h2 className="display-xl text-4xl text-ink-1000 lg:text-7xl max-w-3xl mx-auto">
          We don&apos;t take everyone.
        </h2>
        <p className="mt-6 max-w-xl mx-auto text-ink-700">
          7 slots. 4 filled. The full revenue system — by selection, not purchase.
        </p>
        <a href="/selected" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-px">
          Apply for selection →
        </a>
      </div>
    </section>
  );
}