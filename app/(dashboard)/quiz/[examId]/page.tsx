"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { BookOpen, Clock, ChevronRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const examSubjects: Record<string, { name: string; subjects: Array<{ id: string; name: string; chapters: number; questions: number }> }> = {
  "ssc-cgl": {
    name: "SSC CGL",
    subjects: [
      { id: "quantitative-aptitude", name: "Quantitative Aptitude", chapters: 15, questions: 2500 },
      { id: "reasoning", name: "General Intelligence & Reasoning", chapters: 12, questions: 2000 },
      { id: "english", name: "English Language", chapters: 10, questions: 1800 },
      { id: "general-awareness", name: "General Awareness", chapters: 8, questions: 1500 },
    ],
  },
  "ibps-po": {
    name: "IBPS PO",
    subjects: [
      { id: "quantitative-aptitude", name: "Quantitative Aptitude", chapters: 14, questions: 2200 },
      { id: "reasoning", name: "Reasoning Ability", chapters: 11, questions: 1900 },
      { id: "english", name: "English Language", chapters: 9, questions: 1600 },
      { id: "general-awareness", name: "General/Banking Awareness", chapters: 7, questions: 1400 },
      { id: "computer", name: "Computer Knowledge", chapters: 5, questions: 800 },
    ],
  },
  "jee-main": {
    name: "JEE Main",
    subjects: [
      { id: "physics", name: "Physics", chapters: 20, questions: 3000 },
      { id: "chemistry", name: "Chemistry", chapters: 25, questions: 3500 },
      { id: "mathematics", name: "Mathematics", chapters: 18, questions: 2800 },
    ],
  },
  "neet-ug": {
    name: "NEET UG",
    subjects: [
      { id: "physics", name: "Physics", chapters: 18, questions: 2500 },
      { id: "chemistry", name: "Chemistry", chapters: 22, questions: 3000 },
      { id: "biology", name: "Biology (Botany + Zoology)", chapters: 30, questions: 4000 },
    ],
  },
};

// Default subjects for any exam not specifically defined
const defaultSubjects = {
  name: "Exam",
  subjects: [
    { id: "quantitative-aptitude", name: "Quantitative Aptitude", chapters: 12, questions: 1500 },
    { id: "reasoning", name: "Reasoning", chapters: 10, questions: 1200 },
    { id: "english", name: "English Language", chapters: 8, questions: 1000 },
    { id: "general-awareness", name: "General Awareness", chapters: 6, questions: 800 },
  ],
};

export default function ExamSubjectsPage() {
  const params = useParams();
  const examId = params.examId as string;
  const examData = examSubjects[examId] || { ...defaultSubjects, name: examId.replace(/-/g, " ").toUpperCase() };

  return (
    <div className="space-y-6 pt-12 md:pt-0">
      {/* Back Button */}
      <Link href="/exams">
        <Button variant="ghost" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Exams
        </Button>
      </Link>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">{examData.name}</h1>
        <p className="text-muted-foreground">
          Select a subject to start practicing
        </p>
      </div>

      {/* Subject Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {examData.subjects.map((subject) => (
          <Link key={subject.id} href={`/quiz/${examId}/${subject.id}`}>
            <Card className="group h-full cursor-pointer transition-all hover:border-primary hover:shadow-md">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary">
                    <BookOpen className="h-6 w-6 text-primary transition-colors group-hover:text-primary-foreground" />
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
                </div>
                <CardTitle className="mt-4">{subject.name}</CardTitle>
                <CardDescription>
                  {subject.chapters} chapters • {subject.questions.toLocaleString()} questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    ~30 min per chapter
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Mock Test Card */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="flex flex-col items-center justify-between gap-4 p-6 md:flex-row">
          <div>
            <h3 className="font-semibold">Full Length Mock Test</h3>
            <p className="text-sm text-muted-foreground">
              Take a complete mock test simulating the actual {examData.name} exam
            </p>
          </div>
          <Link href={`/quiz/${examId}/mock-test`}>
            <Button size="lg">Start Mock Test</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
