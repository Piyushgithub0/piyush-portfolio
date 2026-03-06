import { useState } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'
import data from '../data/chatbot.json'

const normalize = (s) => s.toLowerCase().trim()

const Chatbot = () => {
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
    const match =
      data.faqs.find((f) => normalize(f.question) === normalize(question)) ?? null
    const botMessage = {
      from: 'bot',
      text: match ? match.answer : data.fallback,
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
        <div className="fixed bottom-24 right-4 z-40 w-[min(22rem,90vw)] rounded-2xl border border-white/10 bg-background-dark/95 text-foreground-dark shadow-[0_0_40px_rgba(0,0,0,0.6)] backdrop-blur md:bottom-28 md:right-8">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em]">
                Portfolio Assistant
              </p>
              <p className="mt-0.5 text-[11px] text-foreground-dark/60">
                Scripted responses from local JSON
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 text-foreground-dark/60 hover:bg-white/10"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="max-h-72 space-y-2 overflow-y-auto px-4 py-3 text-[13px]">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${
                  m.from === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 ${
                    m.from === 'user'
                      ? 'bg-accent-blue text-background-dark'
                      : 'bg-white/5 text-foreground-dark'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border-t border-white/10 px-3 py-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something..."
              className="flex-1 bg-transparent text-xs text-foreground-dark placeholder:text-foreground-dark/50 focus:outline-none"
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

