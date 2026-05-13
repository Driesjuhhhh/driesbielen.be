import { FormEvent, useEffect, useRef, useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

type StatusResponse = {
  status?: string;
  ok?: boolean;
};

type ChatResponse = {
  ok?: boolean;
  response?: string;
  error?: string;
};

const API_BASE_URL =
  import.meta.env.VITE_DRS_AI_CHAT_API_BASE_URL ?? 'https://drs-ai-chat.driesbielen.be';
const API_KEY = import.meta.env.VITE_DRS_AI_CHAT_API_KEY ?? '';

export function ChatWidget() {
  const [isOnline, setIsOnline] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const shouldAutoScrollRef = useRef(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hey! Feel free to ask your question.'
    }
  ]);

  const canUseChat = API_BASE_URL.trim().length > 0;

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const distanceFromBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight;
    const isNearBottom = distanceFromBottom < 48;
    shouldAutoScrollRef.current = isNearBottom;
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    if (!shouldAutoScrollRef.current) return;

    const container = messagesContainerRef.current;
    if (!container) return;
    container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
  }, [messages, isSending, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!canUseChat) return;

    let isMounted = true;
    const checkStatus = async () => {
      const candidates = [`${API_BASE_URL}/status`, `${API_BASE_URL}/health`];

      for (const url of candidates) {
        try {
          const response = await fetch(url, {
            method: 'GET',
            cache: 'no-store'
          });

          if (!response.ok) {
            continue;
          }

          try {
            const data = (await response.json()) as StatusResponse;
            const hasHealthyStatus = data.status === 'ok' || data.ok === true;
            if (!hasHealthyStatus) {
              continue;
            }
          } catch {
            // Some deployments may return a non-JSON health response.
          }

          if (isMounted) {
            setIsOnline(true);
          }
          return;
        } catch {
          // Try the next candidate.
        }
      }

      if (isMounted) setIsOnline(false);
    };

    void checkStatus();
    const interval = window.setInterval(() => void checkStatus(), 30000);

    return () => {
      isMounted = false;
      window.clearInterval(interval);
    };
  }, [canUseChat]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isSending) return;

    const previousMessages = messages;
    const nextMessages: Message[] = [...previousMessages, { role: 'user', content: trimmed }];
    setMessages(nextMessages);
    setInput('');
    inputRef.current?.focus();
    setIsSending(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(API_KEY ? { 'x-api-key': API_KEY } : {})
        },
        body: JSON.stringify({
          message: trimmed,
          history: previousMessages
        })
      });

      const data = (await response.json()) as ChatResponse;

      if (!response.ok || !data.response) {
        throw new Error(data.error || 'Er ging iets mis.');
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: data.response ?? '' }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, something went wrong. Please try again in a moment.' }
      ]);
    } finally {
      setIsSending(false);
      inputRef.current?.focus();
    }
  };

  if (!canUseChat) return null;

  return (
    <>
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group fixed z-[70] flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500 text-slate-950 shadow-xl transition hover:scale-105 hover:bg-cyan-400"
          style={{
            bottom: 'max(1.5rem, env(safe-area-inset-bottom))',
            right: 'max(1.5rem, env(safe-area-inset-right))'
          }}
          aria-label="Open chat"
        >
          <MessageCircle size={24} />
          <span className="pointer-events-none absolute right-16 whitespace-nowrap rounded-full bg-slate-900 px-3 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100">
            Questions? Ask away!
          </span>
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-[70] bg-slate-950 md:inset-auto md:bottom-6 md:right-6 md:h-[620px] md:w-[380px] md:rounded-2xl md:border md:border-white/10">
          <div className="flex h-full flex-col md:rounded-2xl md:bg-slate-900">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <p className="text-sm font-semibold text-white">Want to know more?</p>
              <button
                type="button"
                className="rounded-full p-1 text-slate-300 transition hover:bg-white/10 hover:text-white"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>

            <div
              ref={messagesContainerRef}
              onScroll={(event) => {
                const element = event.currentTarget;
                const distanceFromBottom =
                  element.scrollHeight - element.scrollTop - element.clientHeight;
                shouldAutoScrollRef.current = distanceFromBottom < 48;
              }}
              className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4"
            >
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                    message.role === 'user'
                      ? 'ml-auto bg-cyan-500 text-slate-950'
                      : 'bg-white/10 text-white'
                  }`}
                >
                  {message.content}
                </div>
              ))}
              {isSending && (
                <div className="max-w-[85%] rounded-2xl bg-white/10 px-3 py-3 text-white">
                  <div className="flex items-center gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-white/80 [animation-delay:-0.3s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-white/80 [animation-delay:-0.15s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-white/80" />
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="border-t border-white/10 p-3">
              {!isOnline && (
                <p className="mb-2 text-xs text-amber-300">
                  Chat service is temporarily unavailable. You can still try sending a message.
                </p>
              )}
              <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-slate-950 px-2 py-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  className="w-full bg-transparent px-2 text-sm text-white outline-none placeholder:text-slate-500"
                  placeholder="Type your question..."
                  autoComplete="off"
                />
                <button
                  type="submit"
                  disabled={input.trim().length === 0}
                  className="rounded-lg bg-cyan-500 p-2 text-slate-950 transition disabled:cursor-not-allowed disabled:opacity-60"
                  aria-label="Send message"
                >
                  <Send size={16} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
