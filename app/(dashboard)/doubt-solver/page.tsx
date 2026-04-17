"use client";

import { useState, useRef, useEffect } from "react";
import {
  Send,
  Bot,
  User,
  Sparkles,
  ImageIcon,
  Mic,
  History,
  Trash2,
  Plus,
  BookOpen,
  Calculator,
  Languages,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

const suggestedQuestions = [
  {
    icon: Calculator,
    category: "Mathematics",
    question: "Explain the concept of compound interest with examples",
  },
  {
    icon: BookOpen,
    category: "Reasoning",
    question: "How to solve blood relation problems quickly?",
  },
  {
    icon: Languages,
    category: "English",
    question: "What are the rules for subject-verb agreement?",
  },
  {
    icon: Lightbulb,
    category: "General",
    question: "Tips for improving reading comprehension speed",
  },
];

const previousChats = [
  { id: 1, title: "Percentage calculation methods", date: "Today" },
  { id: 2, title: "Syllogism solving techniques", date: "Yesterday" },
  { id: 3, title: "Para jumble strategies", date: "2 days ago" },
];

// Simulated AI responses for demo
const getAIResponse = (question: string): string => {
  const lowerQuestion = question.toLowerCase();
  
  if (lowerQuestion.includes("compound interest")) {
    return `**Compound Interest** is the interest calculated on both the initial principal and the accumulated interest from previous periods.

**Formula:** A = P(1 + r/n)^(nt)

Where:
- A = Final amount
- P = Principal (initial investment)
- r = Annual interest rate (decimal)
- n = Number of times interest is compounded per year
- t = Time in years

**Example:**
If you invest Rs. 10,000 at 10% annual interest compounded annually for 2 years:

Year 1: 10,000 × 1.10 = Rs. 11,000
Year 2: 11,000 × 1.10 = Rs. 12,100

Total CI = 12,100 - 10,000 = Rs. 2,100

**Quick Tip:** For 2 years, CI = P × r/100 × (2 + r/100)

Would you like me to explain more examples or shortcuts for CI calculations?`;
  }
  
  if (lowerQuestion.includes("blood relation")) {
    return `**Blood Relation Problems - Quick Solving Techniques**

**Step 1: Identify Key Terms**
- Father's/Mother's son/daughter = Brother/Sister
- Brother's/Sister's son = Nephew
- Brother's/Sister's daughter = Niece
- Father's brother = Uncle
- Mother's brother = Maternal Uncle

**Step 2: Draw a Family Tree**
- Use symbols: + for male, - for female
- Connect generations with vertical lines
- Connect siblings with horizontal lines

**Example:**
"A is B's father. C is A's brother. D is C's daughter."
What is D to B?

Solution:
- B is A's child
- C is A's brother (B's uncle)
- D is C's daughter (B's cousin)
- **Answer: D is B's cousin**

**Pro Tips:**
1. Always start from the person mentioned first
2. Draw diagrams for complex problems
3. Remember: "Son's wife's son" = Grandson

Need me to solve a specific blood relation problem?`;
  }
  
  return `That's a great question! Here's a detailed explanation:

Based on your query about "${question}", let me break this down for you:

**Key Points:**
1. Understanding the fundamentals is crucial for this topic
2. Practice with varied examples helps build pattern recognition
3. Time management is essential during exams

**Recommended Approach:**
- Start with basic concepts and build up
- Practice daily with timed exercises
- Review mistakes to avoid repetition

**Quick Tips:**
- Focus on frequently asked patterns
- Learn shortcuts for common calculations
- Use elimination methods in MCQs

Would you like me to explain any specific aspect in more detail or provide practice problems?`;
};

export default function DoubtSolverPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate AI response delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: getAIResponse(content),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, aiResponse]);
    setIsLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="flex h-[calc(100vh-6rem)] flex-col pt-12 md:pt-0">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">AI Doubt Solver</h1>
          <p className="text-muted-foreground">
            Get instant help with your exam preparation doubts
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowHistory(!showHistory)}
          >
            <History className="mr-2 h-4 w-4" />
            History
          </Button>
          {messages.length > 0 && (
            <Button variant="outline" size="sm" onClick={clearChat}>
              <Plus className="mr-2 h-4 w-4" />
              New Chat
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-1 gap-4 overflow-hidden">
        {/* Chat History Sidebar */}
        {showHistory && (
          <Card className="w-64 shrink-0 overflow-hidden">
            <CardHeader className="p-4">
              <CardTitle className="text-base">Recent Chats</CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <div className="space-y-1">
                {previousChats.map((chat) => (
                  <button
                    key={chat.id}
                    className="w-full rounded-[var(--radius)] p-3 text-left text-sm transition-colors hover:bg-muted"
                  >
                    <p className="font-medium line-clamp-1">{chat.title}</p>
                    <p className="text-xs text-muted-foreground">{chat.date}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Chat Area */}
        <Card className="flex flex-1 flex-col overflow-hidden">
          {messages.length === 0 ? (
            /* Empty State */
            <div className="flex flex-1 flex-col items-center justify-center p-8">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <Sparkles className="h-10 w-10 text-primary" />
              </div>
              <h2 className="mb-2 text-xl font-semibold">How can I help you today?</h2>
              <p className="mb-8 text-center text-muted-foreground">
                Ask any question related to your exam preparation. I&apos;m here to help 24/7!
              </p>

              {/* Suggested Questions */}
              <div className="w-full max-w-2xl">
                <p className="mb-4 text-sm font-medium text-muted-foreground">
                  Try asking about:
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {suggestedQuestions.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleSendMessage(item.question)}
                      className="flex items-start gap-3 rounded-[var(--radius)] border p-4 text-left transition-colors hover:border-primary hover:bg-muted"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <item.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-muted-foreground">
                          {item.category}
                        </p>
                        <p className="text-sm">{item.question}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Messages */
            <div className="flex-1 overflow-y-auto p-4">
              <div className="mx-auto max-w-3xl space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-4",
                      message.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    {message.role === "assistant" && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary">
                        <Bot className="h-4 w-4 text-primary-foreground" />
                      </div>
                    )}
                    <div
                      className={cn(
                        "max-w-[80%] rounded-[var(--radius)] p-4",
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      )}
                    >
                      <div
                        className={cn(
                          "prose prose-sm max-w-none",
                          message.role === "user" && "prose-invert"
                        )}
                      >
                        {message.content.split("\n").map((line, i) => {
                          if (line.startsWith("**") && line.endsWith("**")) {
                            return (
                              <p key={i} className="font-bold">
                                {line.replace(/\*\*/g, "")}
                              </p>
                            );
                          }
                          if (line.startsWith("- ")) {
                            return (
                              <p key={i} className="ml-4">
                                {line}
                              </p>
                            );
                          }
                          return line ? <p key={i}>{line}</p> : <br key={i} />;
                        })}
                      </div>
                      <p
                        className={cn(
                          "mt-2 text-xs",
                          message.role === "user"
                            ? "text-primary-foreground/70"
                            : "text-muted-foreground"
                        )}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    {message.role === "user" && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary">
                        <User className="h-4 w-4 text-secondary-foreground" />
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary">
                      <Bot className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div className="rounded-[var(--radius)] bg-muted p-4">
                      <div className="flex gap-1">
                        <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="border-t p-4">
            <form
              onSubmit={handleSubmit}
              className="mx-auto flex max-w-3xl items-center gap-2"
            >
              <Button type="button" variant="outline" size="icon" title="Attach image">
                <ImageIcon className="h-4 w-4" />
              </Button>
              <Button type="button" variant="outline" size="icon" title="Voice input">
                <Mic className="h-4 w-4" />
              </Button>
              <Input
                placeholder="Ask your doubt..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1"
                disabled={isLoading}
              />
              <Button type="submit" disabled={!inputValue.trim() || isLoading}>
                <Send className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </form>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              AI can make mistakes. Always verify important information.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
