export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <nav className="sticky top-0 z-10 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold text-red-500">Vibhu Maurya</h1>
          <div className="flex gap-6 text-sm text-slate-300">
            <a href="#about" className="hover:text-red-400">About</a>
            <a href="#projects" className="hover:text-red-400">Projects</a>
            <a href="#skills" className="hover:text-red-400">Skills</a>
            <a href="#contact" className="hover:text-red-400">Contact</a>
          </div>
        </div>
      </nav>

      <section className="mx-auto flex max-w-6xl flex-col items-center px-6 py-24 text-center">
        <h2 className="text-5xl font-extrabold md:text-6xl">
          Hi, I'm <span className="text-red-500">Vibhu</span>
        </h2>

        <p className="mt-6 max-w-2xl text-lg text-slate-300">
          AI/ML Developer passionate about building projects like EcoPackAI,
          stock prediction systems, and automation tools.
        </p>

        <div className="mt-8 flex gap-4">
          <a
            href="#projects"
            className="rounded-2xl bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-500"
          >
            View Projects
          </a>

          <a
            href="#contact"
            className="rounded-2xl border border-slate-700 px-6 py-3 font-semibold"
          >
            Contact Me
          </a>
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-6xl px-6 py-16">
        <h3 className="mb-8 text-center text-3xl font-bold text-red-500">
          My Projects
        </h3>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <h4 className="text-xl font-semibold">EcoPackAI</h4>
            <p className="mt-3 text-slate-400">
              AI-based packaging recommendation system.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <h4 className="text-xl font-semibold">Stock Price Prediction</h4>
            <p className="mt-3 text-slate-400">
              Flask website using deep learning to predict stock prices.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <h4 className="text-xl font-semibold">News Automation</h4>
            <p className="mt-3 text-slate-400">
              Summarizes news and posts automatically to Twitter/X.
            </p>
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-4xl px-6 py-16">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center">
          <h3 className="mb-4 text-3xl font-bold text-red-500">Contact Me</h3>
          <p className="mb-6 text-slate-300">Email: vibhu631@gmail.com</p>

          <div className="flex justify-center gap-4">
            <a
              href="https://github.com/Vibhu-Maurya"
              className="rounded-xl bg-slate-800 px-5 py-3"
            >
              GitHub
            </a>

            <a
              href="https://linkedin.com/in/yourusername"
              className="rounded-xl bg-slate-800 px-5 py-3"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}