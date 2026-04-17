"use client";

import Link from "next/link";
import {
  BookOpen,
  Clock,
  Trophy,
  TrendingUp,
  Play,
  FileText,
  MessageSquare,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const quickStats = [
  {
    title: "Quizzes Completed",
    value: "45",
    change: "+12 this week",
    icon: BookOpen,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Study Time",
    value: "28h",
    change: "+4h this week",
    icon: Clock,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    title: "Accuracy Rate",
    value: "78%",
    change: "+5% improvement",
    icon: Trophy,
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    title: "Current Streak",
    value: "7 days",
    change: "Keep it up!",
    icon: TrendingUp,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
];

const recentActivity = [
  { exam: "SSC CGL", subject: "Quantitative Aptitude", score: 85, time: "2 hours ago" },
  { exam: "Banking PO", subject: "Reasoning", score: 72, time: "Yesterday" },
  { exam: "UPSC CSE", subject: "General Studies", score: 68, time: "2 days ago" },
];

const recommendedQuizzes = [
  { exam: "SSC CGL", subject: "English Language", questions: 25, time: "30 min" },
  { exam: "Banking PO", subject: "Data Interpretation", questions: 20, time: "25 min" },
  { exam: "JEE Main", subject: "Physics - Mechanics", questions: 15, time: "20 min" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6 pt-12 md:pt-0">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Welcome back, Rahul!</h1>
          <p className="text-muted-foreground">
            Continue your preparation and track your progress
          </p>
        </div>
        <Link href="/exams">
          <Button>
            <Play className="mr-2 h-4 w-4" />
            Start New Quiz
          </Button>
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {quickStats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.change}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Current Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Current Progress</CardTitle>
            <CardDescription>Your preparation status for SSC CGL 2026</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Quantitative Aptitude</span>
                <span className="text-muted-foreground">75%</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Reasoning</span>
                <span className="text-muted-foreground">60%</span>
              </div>
              <Progress value={60} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>English Language</span>
                <span className="text-muted-foreground">85%</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>General Awareness</span>
                <span className="text-muted-foreground">45%</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest quiz attempts</CardDescription>
              </div>
              <Link href="/results">
                <Button variant="ghost" size="sm">
                  View All
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-[var(--radius)] border p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{activity.subject}</p>
                      <p className="text-sm text-muted-foreground">{activity.exam}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-success">{activity.score}%</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommended Quizzes */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recommended for You</CardTitle>
              <CardDescription>Personalized quizzes based on your performance</CardDescription>
            </div>
            <Link href="/quiz">
              <Button variant="outline" size="sm">
                Browse All
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {recommendedQuizzes.map((quiz, index) => (
              <div
                key={index}
                className="group cursor-pointer rounded-[var(--radius)] border p-4 transition-all hover:border-primary hover:shadow-md"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {quiz.exam}
                  </span>
                  <span className="text-xs text-muted-foreground">{quiz.time}</span>
                </div>
                <h4 className="mb-2 font-semibold">{quiz.subject}</h4>
                <p className="text-sm text-muted-foreground">{quiz.questions} questions</p>
                <Button className="mt-4 w-full" variant="secondary">
                  Start Quiz
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Link href="/pyq">
          <Card className="cursor-pointer transition-all hover:border-primary hover:shadow-md">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Previous Year Questions</h3>
                <p className="text-sm text-muted-foreground">Practice with real exam papers</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/doubt-solver">
          <Card className="cursor-pointer transition-all hover:border-primary hover:shadow-md">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10">
                <MessageSquare className="h-6 w-6 text-success" />
              </div>
              <div>
                <h3 className="font-semibold">AI Doubt Solver</h3>
                <p className="text-sm text-muted-foreground">Get instant help with doubts</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/exams">
          <Card className="cursor-pointer transition-all hover:border-primary hover:shadow-md">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warning/10">
                <Trophy className="h-6 w-6 text-warning" />
              </div>
              <div>
                <h3 className="font-semibold">Mock Tests</h3>
                <p className="text-sm text-muted-foreground">Take full-length practice tests</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
