"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Clock, BookOpen, ChevronRight, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const subjects = {
  "quantitative-aptitude": {
    name: "Quantitative Aptitude",
    chapters: [
      { id: "number-system", name: "Number System", questions: 150, difficulty: "Easy" },
      { id: "percentage", name: "Percentage", questions: 120, difficulty: "Easy" },
      { id: "profit-loss", name: "Profit & Loss", questions: 100, difficulty: "Medium" },
      { id: "ratio-proportion", name: "Ratio & Proportion", questions: 90, difficulty: "Medium" },
      { id: "time-work", name: "Time & Work", questions: 110, difficulty: "Medium" },
      { id: "time-distance", name: "Time, Speed & Distance", questions: 130, difficulty: "Hard" },
      { id: "algebra", name: "Algebra", questions: 140, difficulty: "Hard" },
      { id: "geometry", name: "Geometry", questions: 160, difficulty: "Hard" },
    ],
  },
  reasoning: {
    name: "Reasoning",
    chapters: [
      { id: "coding-decoding", name: "Coding-Decoding", questions: 100, difficulty: "Easy" },
      { id: "blood-relations", name: "Blood Relations", questions: 80, difficulty: "Medium" },
      { id: "direction-sense", name: "Direction Sense", questions: 70, difficulty: "Easy" },
      { id: "syllogism", name: "Syllogism", questions: 90, difficulty: "Medium" },
      { id: "puzzles", name: "Puzzles & Seating", questions: 150, difficulty: "Hard" },
      { id: "analogy", name: "Analogy", questions: 85, difficulty: "Easy" },
    ],
  },
  english: {
    name: "English Language",
    chapters: [
      { id: "reading-comprehension", name: "Reading Comprehension", questions: 200, difficulty: "Medium" },
      { id: "cloze-test", name: "Cloze Test", questions: 120, difficulty: "Medium" },
      { id: "error-spotting", name: "Error Spotting", questions: 150, difficulty: "Easy" },
      { id: "sentence-improvement", name: "Sentence Improvement", questions: 100, difficulty: "Easy" },
      { id: "vocabulary", name: "Vocabulary", questions: 180, difficulty: "Medium" },
      { id: "para-jumbles", name: "Para Jumbles", questions: 90, difficulty: "Hard" },
    ],
  },
  "general-awareness": {
    name: "General Awareness",
    chapters: [
      { id: "current-affairs", name: "Current Affairs", questions: 300, difficulty: "Medium" },
      { id: "history", name: "History", questions: 200, difficulty: "Medium" },
      { id: "geography", name: "Geography", questions: 180, difficulty: "Medium" },
      { id: "polity", name: "Indian Polity", questions: 150, difficulty: "Medium" },
      { id: "economy", name: "Economy", questions: 170, difficulty: "Hard" },
      { id: "science", name: "General Science", questions: 160, difficulty: "Easy" },
    ],
  },
};

const difficultyColors = {
  Easy: "bg-success/10 text-success",
  Medium: "bg-warning/10 text-warning",
  Hard: "bg-destructive/10 text-destructive",
};

export default function QuizPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("quantitative-aptitude");

  const currentSubject = subjects[selectedSubject as keyof typeof subjects];
  const filteredChapters = currentSubject.chapters.filter((chapter) =>
    chapter.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pt-12 md:pt-0">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Practice Quiz</h1>
        <p className="text-muted-foreground">
          Select a subject and chapter to start practicing
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search chapters..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter by Difficulty
        </Button>
      </div>

      {/* Subject Tabs */}
      <Tabs
        value={selectedSubject}
        onValueChange={setSelectedSubject}
        className="space-y-6"
      >
        <TabsList className="flex-wrap h-auto gap-2 bg-transparent p-0">
          {Object.entries(subjects).map(([key, subject]) => (
            <TabsTrigger
              key={key}
              value={key}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {subject.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(subjects).map(([key, subject]) => (
          <TabsContent key={key} value={key} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{subject.name}</CardTitle>
                <CardDescription>
                  {subject.chapters.length} chapters available for practice
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {(key === selectedSubject ? filteredChapters : subject.chapters).map(
                    (chapter) => (
                      <Link
                        key={chapter.id}
                        href={`/quiz/${selectedSubject}/${chapter.id}`}
                      >
                        <div className="group flex items-center justify-between rounded-[var(--radius)] border p-4 transition-all hover:border-primary hover:shadow-md">
                          <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                              <BookOpen className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-medium">{chapter.name}</h4>
                              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <span>{chapter.questions} questions</span>
                                <span
                                  className={`rounded-full px-2 py-0.5 text-xs ${
                                    difficultyColors[
                                      chapter.difficulty as keyof typeof difficultyColors
                                    ]
                                  }`}
                                >
                                  {chapter.difficulty}
                                </span>
                              </div>
                            </div>
                          </div>
                          <ChevronRight className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
                        </div>
                      </Link>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Quick Quiz Card */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="flex flex-col items-center justify-between gap-4 p-6 md:flex-row">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Quick Quiz</h3>
              <p className="text-sm text-muted-foreground">
                Take a random 10-question quiz from all subjects
              </p>
            </div>
          </div>
          <Link href="/quiz/quick">
            <Button>Start Quick Quiz</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
