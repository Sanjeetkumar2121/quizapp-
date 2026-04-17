"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { BookOpen, Clock, ChevronRight, ArrowLeft, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const chapterData: Record<string, Array<{ id: string; name: string; questions: number; time: string; difficulty: string }>> = {
  "quantitative-aptitude": [
    { id: "number-system", name: "Number System", questions: 50, time: "30 min", difficulty: "Easy" },
    { id: "percentage", name: "Percentage", questions: 40, time: "25 min", difficulty: "Easy" },
    { id: "profit-loss", name: "Profit & Loss", questions: 45, time: "30 min", difficulty: "Medium" },
    { id: "ratio-proportion", name: "Ratio & Proportion", questions: 35, time: "25 min", difficulty: "Medium" },
    { id: "time-work", name: "Time & Work", questions: 40, time: "30 min", difficulty: "Medium" },
    { id: "time-distance", name: "Time, Speed & Distance", questions: 50, time: "35 min", difficulty: "Hard" },
    { id: "simple-interest", name: "Simple Interest", questions: 30, time: "20 min", difficulty: "Easy" },
    { id: "compound-interest", name: "Compound Interest", questions: 35, time: "25 min", difficulty: "Medium" },
    { id: "algebra", name: "Algebra", questions: 55, time: "40 min", difficulty: "Hard" },
    { id: "geometry", name: "Geometry & Mensuration", questions: 60, time: "45 min", difficulty: "Hard" },
    { id: "data-interpretation", name: "Data Interpretation", questions: 50, time: "35 min", difficulty: "Medium" },
    { id: "trigonometry", name: "Trigonometry", questions: 40, time: "30 min", difficulty: "Hard" },
  ],
  reasoning: [
    { id: "coding-decoding", name: "Coding-Decoding", questions: 40, time: "25 min", difficulty: "Easy" },
    { id: "blood-relations", name: "Blood Relations", questions: 35, time: "25 min", difficulty: "Medium" },
    { id: "direction-sense", name: "Direction Sense", questions: 30, time: "20 min", difficulty: "Easy" },
    { id: "syllogism", name: "Syllogism", questions: 45, time: "30 min", difficulty: "Medium" },
    { id: "puzzles", name: "Puzzles & Seating Arrangement", questions: 60, time: "45 min", difficulty: "Hard" },
    { id: "analogy", name: "Analogy & Classification", questions: 35, time: "20 min", difficulty: "Easy" },
    { id: "series", name: "Number & Alphabet Series", questions: 40, time: "25 min", difficulty: "Medium" },
    { id: "ranking", name: "Ranking & Order", questions: 30, time: "20 min", difficulty: "Easy" },
    { id: "input-output", name: "Input-Output", questions: 35, time: "25 min", difficulty: "Hard" },
    { id: "data-sufficiency", name: "Data Sufficiency", questions: 40, time: "30 min", difficulty: "Hard" },
  ],
  english: [
    { id: "reading-comprehension", name: "Reading Comprehension", questions: 50, time: "40 min", difficulty: "Medium" },
    { id: "cloze-test", name: "Cloze Test", questions: 40, time: "25 min", difficulty: "Medium" },
    { id: "error-spotting", name: "Error Spotting", questions: 45, time: "30 min", difficulty: "Easy" },
    { id: "sentence-improvement", name: "Sentence Improvement", questions: 40, time: "25 min", difficulty: "Easy" },
    { id: "fill-blanks", name: "Fill in the Blanks", questions: 35, time: "20 min", difficulty: "Easy" },
    { id: "vocabulary", name: "Vocabulary (Synonyms/Antonyms)", questions: 50, time: "30 min", difficulty: "Medium" },
    { id: "para-jumbles", name: "Para Jumbles", questions: 35, time: "25 min", difficulty: "Hard" },
    { id: "sentence-rearrangement", name: "Sentence Rearrangement", questions: 30, time: "20 min", difficulty: "Medium" },
    { id: "idioms-phrases", name: "Idioms & Phrases", questions: 40, time: "25 min", difficulty: "Medium" },
  ],
  "general-awareness": [
    { id: "current-affairs", name: "Current Affairs", questions: 60, time: "35 min", difficulty: "Medium" },
    { id: "history", name: "Indian History", questions: 50, time: "30 min", difficulty: "Medium" },
    { id: "geography", name: "Geography", questions: 45, time: "30 min", difficulty: "Medium" },
    { id: "polity", name: "Indian Polity & Constitution", questions: 50, time: "30 min", difficulty: "Medium" },
    { id: "economy", name: "Indian Economy", questions: 45, time: "30 min", difficulty: "Hard" },
    { id: "science", name: "General Science", questions: 50, time: "30 min", difficulty: "Easy" },
    { id: "static-gk", name: "Static GK", questions: 40, time: "25 min", difficulty: "Easy" },
  ],
  physics: [
    { id: "mechanics", name: "Mechanics", questions: 60, time: "45 min", difficulty: "Hard" },
    { id: "thermodynamics", name: "Thermodynamics", questions: 45, time: "35 min", difficulty: "Hard" },
    { id: "waves-optics", name: "Waves & Optics", questions: 50, time: "40 min", difficulty: "Medium" },
    { id: "electromagnetism", name: "Electromagnetism", questions: 55, time: "45 min", difficulty: "Hard" },
    { id: "modern-physics", name: "Modern Physics", questions: 40, time: "30 min", difficulty: "Medium" },
  ],
  chemistry: [
    { id: "physical-chemistry", name: "Physical Chemistry", questions: 55, time: "45 min", difficulty: "Hard" },
    { id: "organic-chemistry", name: "Organic Chemistry", questions: 60, time: "50 min", difficulty: "Hard" },
    { id: "inorganic-chemistry", name: "Inorganic Chemistry", questions: 50, time: "40 min", difficulty: "Medium" },
  ],
  mathematics: [
    { id: "calculus", name: "Calculus", questions: 55, time: "45 min", difficulty: "Hard" },
    { id: "algebra-jee", name: "Algebra", questions: 50, time: "40 min", difficulty: "Hard" },
    { id: "coordinate-geometry", name: "Coordinate Geometry", questions: 45, time: "35 min", difficulty: "Medium" },
    { id: "vectors-3d", name: "Vectors & 3D Geometry", questions: 40, time: "35 min", difficulty: "Hard" },
    { id: "probability-stats", name: "Probability & Statistics", questions: 35, time: "30 min", difficulty: "Medium" },
  ],
  biology: [
    { id: "botany", name: "Botany", questions: 60, time: "45 min", difficulty: "Medium" },
    { id: "zoology", name: "Zoology", questions: 60, time: "45 min", difficulty: "Medium" },
    { id: "human-physiology", name: "Human Physiology", questions: 55, time: "40 min", difficulty: "Hard" },
    { id: "genetics", name: "Genetics & Evolution", questions: 45, time: "35 min", difficulty: "Hard" },
    { id: "ecology", name: "Ecology & Environment", questions: 40, time: "30 min", difficulty: "Medium" },
  ],
};

const difficultyColors = {
  Easy: "bg-success/10 text-success",
  Medium: "bg-warning/10 text-warning",
  Hard: "bg-destructive/10 text-destructive",
};

export default function SubjectChaptersPage() {
  const params = useParams();
  const examId = params.examId as string;
  const subjectId = params.subjectId as string;
  
  const chapters = chapterData[subjectId] || [
    { id: "chapter-1", name: "Chapter 1", questions: 30, time: "20 min", difficulty: "Easy" },
    { id: "chapter-2", name: "Chapter 2", questions: 35, time: "25 min", difficulty: "Medium" },
    { id: "chapter-3", name: "Chapter 3", questions: 40, time: "30 min", difficulty: "Hard" },
  ];

  const subjectName = subjectId.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

  return (
    <div className="space-y-6 pt-12 md:pt-0">
      {/* Back Button */}
      <Link href={`/quiz/${examId}`}>
        <Button variant="ghost" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Subjects
        </Button>
      </Link>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">{subjectName}</h1>
        <p className="text-muted-foreground">
          {chapters.length} chapters • {chapters.reduce((acc, ch) => acc + ch.questions, 0)} total questions
        </p>
      </div>

      {/* Quick Practice */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="flex flex-col items-center justify-between gap-4 p-6 md:flex-row">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Play className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Quick Practice</h3>
              <p className="text-sm text-muted-foreground">
                Random 20 questions from all chapters
              </p>
            </div>
          </div>
          <Link href={`/quiz/${examId}/${subjectId}/practice?mode=quick`}>
            <Button>Start Quick Practice</Button>
          </Link>
        </CardContent>
      </Card>

      {/* Chapters List */}
      <Card>
        <CardHeader>
          <CardTitle>Chapters</CardTitle>
          <CardDescription>Select a chapter to practice</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {chapters.map((chapter) => (
              <Link
                key={chapter.id}
                href={`/quiz/${examId}/${subjectId}/practice?chapter=${chapter.id}`}
              >
                <div className="group flex items-center justify-between rounded-[var(--radius)] border p-4 transition-all hover:border-primary hover:shadow-md">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary">
                      <BookOpen className="h-5 w-5 text-primary transition-colors group-hover:text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-medium">{chapter.name}</h4>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span>{chapter.questions} questions</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {chapter.time}
                        </span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs ${
                            difficultyColors[chapter.difficulty as keyof typeof difficultyColors]
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
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
