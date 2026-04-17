"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  Flag,
  CheckCircle,
  AlertCircle,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

// Sample questions data
const sampleQuestions = [
  {
    id: 1,
    question: "If x + y = 12 and xy = 32, what is the value of x² + y²?",
    options: ["80", "72", "64", "88"],
    correct: 0,
    explanation: "Using the identity (x + y)² = x² + 2xy + y², we get 144 = x² + 64 + y². Therefore, x² + y² = 80.",
  },
  {
    id: 2,
    question: "A train 150m long passes a pole in 15 seconds. What is the speed of the train in km/hr?",
    options: ["36 km/hr", "40 km/hr", "32 km/hr", "45 km/hr"],
    correct: 0,
    explanation: "Speed = Distance/Time = 150/15 = 10 m/s = 10 × 18/5 = 36 km/hr",
  },
  {
    id: 3,
    question: "The average of 5 consecutive odd numbers is 27. What is the largest number?",
    options: ["29", "31", "33", "35"],
    correct: 1,
    explanation: "If average is 27, then the middle number is 27. The five consecutive odd numbers are 23, 25, 27, 29, 31. Largest is 31.",
  },
  {
    id: 4,
    question: "A shopkeeper marks his goods 20% above the cost price and gives a discount of 10%. His gain percent is:",
    options: ["8%", "10%", "12%", "6%"],
    correct: 0,
    explanation: "Let CP = 100. MP = 120. SP = 120 × 0.9 = 108. Gain = 8%",
  },
  {
    id: 5,
    question: "The ratio of ages of A and B is 3:5. After 6 years, their ratio becomes 2:3. Find the present age of A.",
    options: ["18 years", "24 years", "30 years", "12 years"],
    correct: 0,
    explanation: "Let ages be 3x and 5x. After 6 years: (3x+6)/(5x+6) = 2/3. Solving: 9x + 18 = 10x + 12. x = 6. Age of A = 18 years.",
  },
  {
    id: 6,
    question: "If 15% of a number is 45, what is 25% of that number?",
    options: ["75", "60", "90", "50"],
    correct: 0,
    explanation: "15% of x = 45. So x = 300. 25% of 300 = 75.",
  },
  {
    id: 7,
    question: "A can do a work in 12 days and B can do it in 18 days. In how many days can they complete the work together?",
    options: ["7.2 days", "6.5 days", "8 days", "5.4 days"],
    correct: 0,
    explanation: "A's 1 day work = 1/12. B's 1 day work = 1/18. Together = 1/12 + 1/18 = 5/36. Days = 36/5 = 7.2 days.",
  },
  {
    id: 8,
    question: "What is the compound interest on Rs. 10,000 at 10% per annum for 2 years?",
    options: ["Rs. 2,100", "Rs. 2,000", "Rs. 1,900", "Rs. 2,200"],
    correct: 0,
    explanation: "CI = P(1 + r/100)² - P = 10000(1.1)² - 10000 = 12100 - 10000 = Rs. 2,100",
  },
  {
    id: 9,
    question: "The HCF and LCM of two numbers are 12 and 180 respectively. If one number is 36, find the other.",
    options: ["60", "48", "72", "54"],
    correct: 0,
    explanation: "Product of numbers = HCF × LCM. 36 × x = 12 × 180. x = 2160/36 = 60.",
  },
  {
    id: 10,
    question: "A person travels 40 km at 8 km/hr and another 30 km at 6 km/hr. What is the average speed for the whole journey?",
    options: ["7 km/hr", "7.5 km/hr", "6.5 km/hr", "8 km/hr"],
    correct: 0,
    explanation: "Total distance = 70 km. Total time = 40/8 + 30/6 = 5 + 5 = 10 hours. Average speed = 70/10 = 7 km/hr.",
  },
];

type QuizState = {
  answers: Record<number, number | null>;
  flagged: Set<number>;
  submitted: boolean;
};

export default function QuizPracticePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const chapter = searchParams.get("chapter");
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const [quizState, setQuizState] = useState<QuizState>({
    answers: {},
    flagged: new Set(),
    submitted: false,
  });

  const questions = sampleQuestions;
  const totalQuestions = questions.length;

  // Timer
  useEffect(() => {
    if (quizState.submitted || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizState.submitted, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswerSelect = (optionIndex: number) => {
    if (quizState.submitted) return;
    setQuizState((prev) => ({
      ...prev,
      answers: { ...prev.answers, [currentQuestion]: optionIndex },
    }));
  };

  const handleFlagQuestion = () => {
    setQuizState((prev) => {
      const newFlagged = new Set(prev.flagged);
      if (newFlagged.has(currentQuestion)) {
        newFlagged.delete(currentQuestion);
      } else {
        newFlagged.add(currentQuestion);
      }
      return { ...prev, flagged: newFlagged };
    });
  };

  const handleSubmit = useCallback(() => {
    setQuizState((prev) => ({ ...prev, submitted: true }));
  }, []);

  const calculateScore = () => {
    let correct = 0;
    let attempted = 0;
    questions.forEach((q, index) => {
      if (quizState.answers[index] !== null && quizState.answers[index] !== undefined) {
        attempted++;
        if (quizState.answers[index] === q.correct) {
          correct++;
        }
      }
    });
    return { correct, attempted, total: totalQuestions };
  };

  const goToQuestion = (index: number) => {
    setCurrentQuestion(index);
  };

  const currentQ = questions[currentQuestion];
  const selectedAnswer = quizState.answers[currentQuestion];
  const score = calculateScore();
  const progress = ((Object.keys(quizState.answers).length) / totalQuestions) * 100;

  if (quizState.submitted) {
    return (
      <div className="mx-auto max-w-4xl space-y-6 pt-12 md:pt-0">
        {/* Results Header */}
        <Card className="border-primary bg-primary/5">
          <CardContent className="p-8 text-center">
            <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle className="h-10 w-10 text-primary" />
            </div>
            <h1 className="mb-2 text-3xl font-bold">Quiz Completed!</h1>
            <p className="text-muted-foreground">
              You scored {score.correct} out of {score.total}
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[var(--radius)] bg-card p-4">
                <p className="text-2xl font-bold text-success">{score.correct}</p>
                <p className="text-sm text-muted-foreground">Correct</p>
              </div>
              <div className="rounded-[var(--radius)] bg-card p-4">
                <p className="text-2xl font-bold text-destructive">
                  {score.attempted - score.correct}
                </p>
                <p className="text-sm text-muted-foreground">Incorrect</p>
              </div>
              <div className="rounded-[var(--radius)] bg-card p-4">
                <p className="text-2xl font-bold text-muted-foreground">
                  {score.total - score.attempted}
                </p>
                <p className="text-sm text-muted-foreground">Unattempted</p>
              </div>
            </div>
            <div className="mt-6 flex justify-center gap-4">
              <Button onClick={() => router.back()}>
                Back to Chapters
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setQuizState({ answers: {}, flagged: new Set(), submitted: false });
                  setCurrentQuestion(0);
                  setTimeLeft(30 * 60);
                }}
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Retry Quiz
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Answer Review */}
        <Card>
          <CardHeader>
            <CardTitle>Answer Review</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {questions.map((q, index) => {
              const userAnswer = quizState.answers[index];
              const isCorrect = userAnswer === q.correct;
              const isAttempted = userAnswer !== null && userAnswer !== undefined;

              return (
                <div
                  key={q.id}
                  className={cn(
                    "rounded-[var(--radius)] border p-4",
                    isAttempted && isCorrect && "border-success/50 bg-success/5",
                    isAttempted && !isCorrect && "border-destructive/50 bg-destructive/5"
                  )}
                >
                  <div className="mb-3 flex items-start gap-2">
                    <span className="font-medium text-muted-foreground">Q{index + 1}.</span>
                    <p className="font-medium">{q.question}</p>
                  </div>
                  <div className="ml-6 space-y-2">
                    {q.options.map((option, optIndex) => (
                      <div
                        key={optIndex}
                        className={cn(
                          "flex items-center gap-2 rounded px-3 py-2 text-sm",
                          optIndex === q.correct && "bg-success/10 text-success font-medium",
                          optIndex === userAnswer &&
                            optIndex !== q.correct &&
                            "bg-destructive/10 text-destructive"
                        )}
                      >
                        {optIndex === q.correct && (
                          <CheckCircle className="h-4 w-4 text-success" />
                        )}
                        {optIndex === userAnswer && optIndex !== q.correct && (
                          <AlertCircle className="h-4 w-4 text-destructive" />
                        )}
                        <span>{String.fromCharCode(65 + optIndex)}. {option}</span>
                      </div>
                    ))}
                  </div>
                  <div className="ml-6 mt-3 rounded bg-muted p-3 text-sm">
                    <span className="font-medium">Explanation: </span>
                    {q.explanation}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-4 pt-12 md:pt-0">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-[var(--radius)] border bg-card p-4">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold">
            {chapter ? chapter.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()) : "Practice Quiz"}
          </h1>
          <div className="h-6 w-px bg-border" />
          <span className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {totalQuestions}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium",
              timeLeft < 300 ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"
            )}
          >
            <Clock className="h-4 w-4" />
            {formatTime(timeLeft)}
          </div>
          <Button onClick={handleSubmit}>Submit Quiz</Button>
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className="text-muted-foreground">
            {Object.keys(quizState.answers).length} / {totalQuestions} answered
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
        {/* Question Panel */}
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="p-6">
              {/* Question */}
              <div className="mb-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">
                    Question {currentQuestion + 1}
                  </span>
                  <Button
                    variant={quizState.flagged.has(currentQuestion) ? "destructive" : "outline"}
                    size="sm"
                    onClick={handleFlagQuestion}
                  >
                    <Flag className="mr-2 h-4 w-4" />
                    {quizState.flagged.has(currentQuestion) ? "Flagged" : "Flag for Review"}
                  </Button>
                </div>
                <p className="text-lg font-medium">{currentQ.question}</p>
              </div>

              {/* Options */}
              <RadioGroup
                value={selectedAnswer?.toString()}
                onValueChange={(value) => handleAnswerSelect(parseInt(value))}
                className="space-y-3"
              >
                {currentQ.options.map((option, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex items-center space-x-3 rounded-[var(--radius)] border p-4 transition-colors cursor-pointer",
                      selectedAnswer === index
                        ? "border-primary bg-primary/5"
                        : "hover:border-primary/50"
                    )}
                    onClick={() => handleAnswerSelect(index)}
                  >
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label
                      htmlFor={`option-${index}`}
                      className="flex-1 cursor-pointer font-normal"
                    >
                      <span className="mr-2 font-medium">{String.fromCharCode(65 + index)}.</span>
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              {/* Navigation */}
              <div className="mt-6 flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
                  disabled={currentQuestion === 0}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                <Button
                  onClick={() =>
                    setCurrentQuestion((prev) => Math.min(totalQuestions - 1, prev + 1))
                  }
                  disabled={currentQuestion === totalQuestions - 1}
                >
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Question Navigator */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Question Navigator</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-2">
                {questions.map((_, index) => {
                  const isAnswered = quizState.answers[index] !== null && quizState.answers[index] !== undefined;
                  const isFlagged = quizState.flagged.has(index);
                  const isCurrent = currentQuestion === index;

                  return (
                    <button
                      key={index}
                      onClick={() => goToQuestion(index)}
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-[var(--radius)] text-sm font-medium transition-colors",
                        isCurrent && "ring-2 ring-primary ring-offset-2",
                        isAnswered && !isFlagged && "bg-success text-success-foreground",
                        isFlagged && "bg-warning text-warning-foreground",
                        !isAnswered && !isFlagged && "bg-muted hover:bg-muted/80"
                      )}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>
              <div className="mt-4 space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded bg-success" />
                  <span>Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded bg-warning" />
                  <span>Flagged for Review</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded bg-muted" />
                  <span>Not Answered</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
