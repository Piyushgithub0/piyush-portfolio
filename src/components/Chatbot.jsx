import { useState } from 'react'
import { MessageCircle, X, Send, Droplets } from 'lucide-react'
import { useTheme } from '../ThemeContext'
import data from '../data/chatbot.json'

const normalize = (s) => s.toLowerCase().trim()

const Chatbot = () => {
  const { setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    {
      from: 'bot',
      text: 'Hi! Ask me about who I am, what projects I have, or what technologies I use.',
    },
  ])

  const handleSubmit = (e) => {
    e?.preventDefault()
    if (!input.trim()) return
    const question = input.trim()

    const userMessage = { from: 'user', text: question }
    let botMessage = null

    // Check for theme triggers
    const triggerWords = ['ocean', 'water', 'theme', 'dive']
    if (triggerWords.some(w => normalize(question).includes(w))) {
      setTheme('ocean')
      botMessage = {
        from: 'bot',
        text: 'Diving deep! I’ve activated the Ocean theme for you. 🌊',
      }
    } else {
      const match =
        data.faqs.find((f) => normalize(f.question) === normalize(question)) ?? null
      botMessage = {
        from: 'bot',
        text: match ? match.answer : data.fallback,
      }
    }

    setMessages((prev) => [...prev, userMessage, botMessage])
    setInput('')
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-accent-blue text-background-dark shadow-[0_0_30px_rgba(0,174,239,0.8)] transition-transform hover:-translate-y-0.5 md:bottom-8 md:right-8"
        aria-label="Open portfolio assistant"
      >
        <MessageCircle className="h-5 w-5" />
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-4 z-40 w-[min(22rem,90vw)] rounded-2xl border border-gray-200 bg-white/95 text-gray-900 shadow-[0_0_40px_rgba(15,23,42,0.35)] backdrop-blur dark:border-white/10 dark:bg-background-dark/95 dark:text-foreground-dark md:bottom-28 md:right-8">
          <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 dark:border-white/10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em]">
                Portfolio Assistant
              </p>
              <p className="mt-0.5 text-[11px] text-gray-500 dark:text-foreground-dark/60">
                Scripted responses from local JSON
              </p>
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => setTheme('ocean')}
                className="rounded-full p-1 text-accent-blue hover:bg-accent-blue/10 dark:hover:bg-accent-blue/20"
                aria-label="Activate Ocean Theme"
                title="Dive into Ocean Theme"
              >
                <Droplets className="h-4 w-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1 text-gray-500 hover:bg-gray-100 dark:text-foreground-dark/60 dark:hover:bg-white/10"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="max-h-72 space-y-2 overflow-y-auto px-4 py-3 text-[13px]">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'
                  }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 ${m.from === 'user'
                      ? 'bg-accent-blue text-white'
                      : 'bg-gray-100 text-gray-900 dark:bg-white/5 dark:text-foreground-dark'
                    }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border-t border-gray-200 px-3 py-2 dark:border-white/10"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something..."
              className="flex-1 bg-transparent text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none dark:text-foreground-dark dark:placeholder:text-foreground-dark/50"
            />
            <button
              type="submit"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-blue text-background-dark hover:bg-accent-blue/90"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  )
}

export default Chatbot

