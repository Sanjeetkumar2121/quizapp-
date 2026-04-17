import Link from "next/link";
import {
  BookOpen,
  Brain,
  Trophy,
  Users,
  ArrowRight,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: BookOpen,
    title: "Comprehensive Content",
    description: "Access thousands of questions across SSC, UPSC, Banking, JEE, NEET and more.",
  },
  {
    icon: Brain,
    title: "AI-Powered Learning",
    description: "Get instant doubt resolution with our intelligent AI tutor available 24/7.",
  },
  {
    icon: Trophy,
    title: "Track Progress",
    description: "Monitor your performance with detailed analytics and progress reports.",
  },
  {
    icon: Users,
    title: "Previous Year Questions",
    description: "Practice with actual exam questions from previous years to boost confidence.",
  },
];

const exams = [
  { name: "SSC CGL", questions: "50,000+" },
  { name: "UPSC CSE", questions: "30,000+" },
  { name: "Banking PO", questions: "45,000+" },
  { name: "JEE Main", questions: "25,000+" },
  { name: "NEET UG", questions: "35,000+" },
  { name: "Railway", questions: "40,000+" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius)] bg-primary">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">ExamPrep AI</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            AI-Powered Exam Preparation
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl text-balance">
            Master Your Exams with Intelligent Learning
          </h1>
          <p className="mb-8 text-lg text-muted-foreground text-pretty">
            Prepare smarter, not harder. Our AI-powered platform helps you ace competitive exams
            with personalized practice, instant doubt resolution, and comprehensive study material.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/register">
              <Button size="lg" className="gap-2">
                Start Learning Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline">
                Explore Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-y bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground">
            Everything You Need to Succeed
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Card key={feature.title} className="border-0 bg-card shadow-md">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[var(--radius)] bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Exams Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="mb-4 text-center text-3xl font-bold text-foreground">
          Prepare for Top Competitive Exams
        </h2>
        <p className="mb-12 text-center text-muted-foreground">
          Access curated content for all major examinations
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {exams.map((exam) => (
            <Card
              key={exam.name}
              className="group cursor-pointer transition-all hover:border-primary hover:shadow-md"
            >
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <h3 className="font-semibold text-foreground">{exam.name}</h3>
                  <p className="text-sm text-muted-foreground">{exam.questions} questions</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary">
                  <ArrowRight className="h-5 w-5 text-primary transition-colors group-hover:text-primary-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-primary-foreground">
            Ready to Start Your Journey?
          </h2>
          <p className="mb-8 text-primary-foreground/80">
            Join thousands of students who are already preparing smarter with ExamPrep AI
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/register">
              <Button
                size="lg"
                variant="secondary"
                className="gap-2 bg-white text-primary hover:bg-white/90"
              >
                <CheckCircle className="h-4 w-4" />
                Create Free Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2026 ExamPrep AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
