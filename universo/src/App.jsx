import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import ParallaxSection from './components/ParallaxSection.jsx'
import PlanetsGrid from './components/PlanetsGrid.jsx'
import Features from './components/Features.jsx'
import Footer from './components/Footer.jsx'
import Starfield from './components/Starfield.jsx'

export default function App() {
  return (
    <div className="relative min-h-screen bg-space-950">
      <Starfield className="fixed inset-0 z-0" density={1.1} />

      <Navbar />

      <main className="relative z-10">
        <Hero />
        <ParallaxSection />
        <PlanetsGrid />
        <Features />
      </main>

      <Footer />
    </div>
  )
}