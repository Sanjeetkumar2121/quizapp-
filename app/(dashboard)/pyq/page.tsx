"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Calendar,
  FileText,
  Download,
  ChevronRight,
  Filter,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const pyqData = {
  "ssc-cgl": {
    name: "SSC CGL",
    years: [
      { year: 2025, papers: 4, questions: 400 },
      { year: 2024, papers: 4, questions: 400 },
      { year: 2023, papers: 4, questions: 400 },
      { year: 2022, papers: 4, questions: 400 },
      { year: 2021, papers: 3, questions: 300 },
      { year: 2020, papers: 2, questions: 200 },
    ],
  },
  "banking": {
    name: "Banking Exams",
    years: [
      { year: 2025, papers: 6, questions: 600 },
      { year: 2024, papers: 8, questions: 800 },
      { year: 2023, papers: 10, questions: 1000 },
      { year: 2022, papers: 8, questions: 800 },
      { year: 2021, papers: 6, questions: 600 },
    ],
  },
  "upsc": {
    name: "UPSC CSE",
    years: [
      { year: 2025, papers: 2, questions: 200 },
      { year: 2024, papers: 2, questions: 200 },
      { year: 2023, papers: 2, questions: 200 },
      { year: 2022, papers: 2, questions: 200 },
      { year: 2021, papers: 2, questions: 200 },
      { year: 2020, papers: 2, questions: 200 },
    ],
  },
  "jee": {
    name: "JEE Main",
    years: [
      { year: 2025, papers: 8, questions: 720 },
      { year: 2024, papers: 8, questions: 720 },
      { year: 2023, papers: 8, questions: 720 },
      { year: 2022, papers: 4, questions: 360 },
      { year: 2021, papers: 4, questions: 360 },
    ],
  },
  "neet": {
    name: "NEET UG",
    years: [
      { year: 2025, papers: 1, questions: 200 },
      { year: 2024, papers: 1, questions: 200 },
      { year: 2023, papers: 1, questions: 200 },
      { year: 2022, papers: 1, questions: 200 },
      { year: 2021, papers: 1, questions: 180 },
    ],
  },
  "railway": {
    name: "Railway Exams",
    years: [
      { year: 2024, papers: 5, questions: 500 },
      { year: 2023, papers: 6, questions: 600 },
      { year: 2022, papers: 4, questions: 400 },
      { year: 2021, papers: 3, questions: 300 },
    ],
  },
};

const featuredPapers = [
  {
    exam: "SSC CGL 2025",
    paper: "Tier 1 - Shift 1",
    date: "March 15, 2025",
    questions: 100,
    attempted: 15420,
  },
  {
    exam: "IBPS PO 2024",
    paper: "Prelims - Shift 2",
    date: "October 20, 2024",
    questions: 100,
    attempted: 12350,
  },
  {
    exam: "JEE Main 2025",
    paper: "January Session - Day 1",
    date: "January 24, 2025",
    questions: 90,
    attempted: 8920,
  },
];

export default function PYQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedExam, setSelectedExam] = useState("ssc-cgl");

  return (
    <div className="space-y-6 pt-12 md:pt-0">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Previous Year Questions</h1>
        <p className="text-muted-foreground">
          Practice with actual questions from past examinations
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by exam or year..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Featured Papers */}
      <Card>
        <CardHeader>
          <CardTitle>Trending Papers</CardTitle>
          <CardDescription>Most attempted papers this week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {featuredPapers.map((paper, index) => (
              <div
                key={index}
                className="group cursor-pointer rounded-[var(--radius)] border p-4 transition-all hover:border-primary hover:shadow-md"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {paper.exam}
                  </span>
                  <span className="text-xs text-muted-foreground">{paper.date}</span>
                </div>
                <h4 className="mb-2 font-semibold">{paper.paper}</h4>
                <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <FileText className="h-4 w-4" />
                    {paper.questions} questions
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {paper.attempted.toLocaleString()} students attempted
                </p>
                <Button className="mt-4 w-full" variant="secondary">
                  Start Practice
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Exam-wise PYQ */}
      <Tabs
        value={selectedExam}
        onValueChange={setSelectedExam}
        className="space-y-6"
      >
        <TabsList className="flex-wrap h-auto gap-2 bg-transparent p-0">
          {Object.entries(pyqData).map(([key, data]) => (
            <TabsTrigger
              key={key}
              value={key}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {data.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(pyqData).map(([key, data]) => (
          <TabsContent key={key} value={key} className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{data.name} Previous Year Papers</CardTitle>
                    <CardDescription>
                      {data.years.reduce((acc, y) => acc + y.questions, 0).toLocaleString()} total questions from {data.years.length} years
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {data.years.map((year) => (
                    <Link
                      key={year.year}
                      href={`/pyq/${key}/${year.year}`}
                    >
                      <div className="group flex items-center justify-between rounded-[var(--radius)] border p-4 transition-all hover:border-primary hover:shadow-md">
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary">
                            <Calendar className="h-5 w-5 text-primary transition-colors group-hover:text-primary-foreground" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{year.year}</h4>
                            <p className="text-sm text-muted-foreground">
                              {year.papers} papers • {year.questions} questions
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Subject-wise PYQ */}
      <Card>
        <CardHeader>
          <CardTitle>Practice by Subject</CardTitle>
          <CardDescription>
            Topic-wise previous year questions for focused practice
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Quantitative Aptitude", questions: 5200 },
              { name: "Reasoning", questions: 4800 },
              { name: "English Language", questions: 4200 },
              { name: "General Awareness", questions: 3800 },
              { name: "Physics", questions: 2500 },
              { name: "Chemistry", questions: 2800 },
              { name: "Mathematics", questions: 3200 },
              { name: "Biology", questions: 2400 },
            ].map((subject) => (
              <Link key={subject.name} href={`/pyq/subject/${subject.name.toLowerCase().replace(/ /g, "-")}`}>
                <div className="group flex items-center gap-3 rounded-[var(--radius)] border p-4 transition-all hover:border-primary hover:shadow-md">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary">
                    <BookOpen className="h-5 w-5 text-primary transition-colors group-hover:text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-medium">{subject.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {subject.questions.toLocaleString()} questions
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tips Card */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="flex flex-col items-center justify-between gap-4 p-6 md:flex-row">
          <div>
            <h3 className="font-semibold">Pro Tip for PYQ Practice</h3>
            <p className="text-sm text-muted-foreground">
              Start with the most recent papers and work backwards. Focus on understanding patterns and frequently asked topics.
            </p>
          </div>
          <Link href="/quiz">
            <Button>Start Topic-wise Practice</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
