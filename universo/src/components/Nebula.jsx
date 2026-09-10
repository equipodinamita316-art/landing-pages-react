export default function Nebula() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="animate-float-slow absolute -top-40 -left-40 h-[42rem] w-[42rem] rounded-full opacity-35 blur-[120px]"
        style={{ background: 'radial-gradient(circle at 30% 30%, rgba(168,85,247,0.85), rgba(88,28,135,0.35) 45%, transparent 70%)' }}
      />
      <div className="animate-float-slower absolute top-1/4 -right-48 h-[38rem] w-[38rem] rounded-full opacity-30 blur-[120px]"
        style={{ background: 'radial-gradient(circle at 60% 40%, rgba(56,189,248,0.8), rgba(2,132,199,0.3) 50%, transparent 72%)' }}
      />
      <div className="animate-float-slow absolute -bottom-48 left-1/3 h-[40rem] w-[40rem] rounded-full opacity-25 blur-[130px]"
        style={{ background: 'radial-gradient(circle at 50% 50%, rgba(244,114,182,0.7), rgba(190,24,93,0.25) 50%, transparent 72%)' }}
      />
    </div>
  )
}