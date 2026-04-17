"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Trophy,
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock,
  Target,
  ChevronRight,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const overallStats = {
  totalQuizzes: 135,
  totalQuestions: 2700,
  correctAnswers: 2106,
  averageAccuracy: 78,
  totalTime: "56h 30m",
  currentStreak: 7,
  bestStreak: 14,
};

const recentResults = [
  {
    id: 1,
    exam: "SSC CGL",
    subject: "Quantitative Aptitude",
    chapter: "Percentage",
    date: "Today, 3:45 PM",
    score: 18,
    total: 20,
    accuracy: 90,
    timeTaken: "25 min",
    trend: "up",
  },
  {
    id: 2,
    exam: "Banking PO",
    subject: "Reasoning",
    chapter: "Puzzles",
    date: "Today, 11:20 AM",
    score: 14,
    total: 20,
    accuracy: 70,
    timeTaken: "32 min",
    trend: "down",
  },
  {
    id: 3,
    exam: "SSC CGL",
    subject: "English",
    chapter: "Reading Comprehension",
    date: "Yesterday, 5:30 PM",
    score: 17,
    total: 20,
    accuracy: 85,
    timeTaken: "28 min",
    trend: "up",
  },
  {
    id: 4,
    exam: "UPSC CSE",
    subject: "General Studies",
    chapter: "History",
    date: "Yesterday, 2:15 PM",
    score: 15,
    total: 20,
    accuracy: 75,
    timeTaken: "30 min",
    trend: "same",
  },
  {
    id: 5,
    exam: "JEE Main",
    subject: "Physics",
    chapter: "Mechanics",
    date: "2 days ago",
    score: 12,
    total: 20,
    accuracy: 60,
    timeTaken: "35 min",
    trend: "down",
  },
];

const subjectPerformance = [
  { subject: "Quantitative Aptitude", quizzes: 45, accuracy: 82, trend: "up" },
  { subject: "Reasoning", quizzes: 38, accuracy: 76, trend: "up" },
  { subject: "English Language", quizzes: 32, accuracy: 85, trend: "same" },
  { subject: "General Awareness", quizzes: 20, accuracy: 68, trend: "down" },
];

const weeklyData = [
  { day: "Mon", quizzes: 5, accuracy: 75 },
  { day: "Tue", quizzes: 4, accuracy: 80 },
  { day: "Wed", quizzes: 6, accuracy: 72 },
  { day: "Thu", quizzes: 3, accuracy: 85 },
  { day: "Fri", quizzes: 5, accuracy: 78 },
  { day: "Sat", quizzes: 7, accuracy: 82 },
  { day: "Sun", quizzes: 4, accuracy: 79 },
];

export default function ResultsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("all");

  return (
    <div className="space-y-6 pt-12 md:pt-0">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Results & Analytics</h1>
          <p className="text-muted-foreground">
            Track your performance and identify areas for improvement
          </p>
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter Results
        </Button>
      </div>

      {/* Overall Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Quizzes</p>
                <p className="text-2xl font-bold">{overallStats.totalQuizzes}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10">
                <Target className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg. Accuracy</p>
                <p className="text-2xl font-bold">{overallStats.averageAccuracy}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warning/10">
                <Clock className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Study Time</p>
                <p className="text-2xl font-bold">{overallStats.totalTime}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
                <TrendingUp className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current Streak</p>
                <p className="text-2xl font-bold">{overallStats.currentStreak} days</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="recent" className="space-y-6">
        <TabsList>
          <TabsTrigger value="recent">Recent Results</TabsTrigger>
          <TabsTrigger value="subjects">Subject Analysis</TabsTrigger>
          <TabsTrigger value="weekly">Weekly Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Quiz Results</CardTitle>
              <CardDescription>Your latest quiz attempts and scores</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentResults.map((result) => (
                  <div
                    key={result.id}
                    className="flex flex-col gap-4 rounded-[var(--radius)] border p-4 md:flex-row md:items-center md:justify-between"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={cn(
                          "flex h-12 w-12 items-center justify-center rounded-full",
                          result.accuracy >= 80
                            ? "bg-success/10"
                            : result.accuracy >= 60
                            ? "bg-warning/10"
                            : "bg-destructive/10"
                        )}
                      >
                        <span
                          className={cn(
                            "text-lg font-bold",
                            result.accuracy >= 80
                              ? "text-success"
                              : result.accuracy >= 60
                              ? "text-warning"
                              : "text-destructive"
                          )}
                        >
                          {result.accuracy}%
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium">{result.chapter}</h4>
                        <p className="text-sm text-muted-foreground">
                          {result.exam} • {result.subject}
                        </p>
                        <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {result.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {result.timeTaken}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-semibold">
                          {result.score}/{result.total}
                        </p>
                        <div className="flex items-center gap-1 text-sm">
                          {result.trend === "up" ? (
                            <>
                              <TrendingUp className="h-4 w-4 text-success" />
                              <span className="text-success">Improved</span>
                            </>
                          ) : result.trend === "down" ? (
                            <>
                              <TrendingDown className="h-4 w-4 text-destructive" />
                              <span className="text-destructive">Declined</span>
                            </>
                          ) : (
                            <span className="text-muted-foreground">Same</span>
                          )}
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button variant="outline">Load More Results</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Subject-wise Performance</CardTitle>
              <CardDescription>Your accuracy across different subjects</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {subjectPerformance.map((subject) => (
                <div key={subject.subject} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{subject.subject}</span>
                      {subject.trend === "up" && (
                        <TrendingUp className="h-4 w-4 text-success" />
                      )}
                      {subject.trend === "down" && (
                        <TrendingDown className="h-4 w-4 text-destructive" />
                      )}
                    </div>
                    <div className="text-right">
                      <span className="font-semibold">{subject.accuracy}%</span>
                      <span className="ml-2 text-sm text-muted-foreground">
                        ({subject.quizzes} quizzes)
                      </span>
                    </div>
                  </div>
                  <Progress value={subject.accuracy} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Strongest Subject</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
                    <Trophy className="h-8 w-8 text-success" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold">English Language</p>
                    <p className="text-sm text-muted-foreground">85% accuracy</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Needs Improvement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-warning/10">
                    <Target className="h-8 w-8 text-warning" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold">General Awareness</p>
                    <p className="text-sm text-muted-foreground">68% accuracy</p>
                    <Link href="/quiz?subject=general-awareness">
                      <Button size="sm" variant="link" className="h-auto p-0">
                        Practice Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="weekly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>This Week&apos;s Activity</CardTitle>
              <CardDescription>Your daily quiz activity and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between gap-2 h-48">
                {weeklyData.map((day) => (
                  <div key={day.day} className="flex flex-1 flex-col items-center gap-2">
                    <div className="relative w-full flex-1">
                      <div
                        className="absolute bottom-0 w-full rounded-t bg-primary transition-all"
                        style={{ height: `${day.accuracy}%` }}
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-medium">{day.day}</p>
                      <p className="text-xs text-muted-foreground">{day.quizzes}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded bg-primary" />
                  <span>Accuracy %</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Numbers = Quizzes taken</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="flex flex-col items-center justify-between gap-4 p-6 md:flex-row">
              <div>
                <h3 className="font-semibold">Keep up the momentum!</h3>
                <p className="text-sm text-muted-foreground">
                  You&apos;re on a {overallStats.currentStreak}-day streak. Your best is {overallStats.bestStreak} days.
                </p>
              </div>
              <Link href="/quiz">
                <Button>Continue Learning</Button>
              </Link>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
