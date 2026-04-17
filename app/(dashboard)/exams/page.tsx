"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  GraduationCap,
  BookOpen,
  Users,
  ArrowRight,
  Building2,
  Train,
  Stethoscope,
  Calculator,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const examCategories = [
  {
    id: "government",
    label: "Government",
    icon: Building2,
    exams: [
      {
        id: "ssc-cgl",
        name: "SSC CGL",
        fullName: "Staff Selection Commission - Combined Graduate Level",
        questions: "50,000+",
        mockTests: 25,
        subjects: ["Quantitative Aptitude", "Reasoning", "English", "General Awareness"],
      },
      {
        id: "ssc-chsl",
        name: "SSC CHSL",
        fullName: "Staff Selection Commission - Combined Higher Secondary Level",
        questions: "35,000+",
        mockTests: 20,
        subjects: ["Quantitative Aptitude", "Reasoning", "English", "General Awareness"],
      },
      {
        id: "upsc-cse",
        name: "UPSC CSE",
        fullName: "Union Public Service Commission - Civil Services Examination",
        questions: "30,000+",
        mockTests: 15,
        subjects: ["General Studies", "CSAT", "Optional Subjects"],
      },
    ],
  },
  {
    id: "banking",
    label: "Banking",
    icon: Building2,
    exams: [
      {
        id: "ibps-po",
        name: "IBPS PO",
        fullName: "Institute of Banking Personnel Selection - Probationary Officer",
        questions: "45,000+",
        mockTests: 30,
        subjects: ["Quantitative Aptitude", "Reasoning", "English", "General Awareness", "Computer"],
      },
      {
        id: "sbi-po",
        name: "SBI PO",
        fullName: "State Bank of India - Probationary Officer",
        questions: "40,000+",
        mockTests: 25,
        subjects: ["Quantitative Aptitude", "Reasoning", "English", "General Awareness"],
      },
      {
        id: "rbi-grade-b",
        name: "RBI Grade B",
        fullName: "Reserve Bank of India - Grade B Officer",
        questions: "25,000+",
        mockTests: 15,
        subjects: ["General Awareness", "English", "Quantitative Aptitude", "Economic & Social Issues"],
      },
    ],
  },
  {
    id: "railway",
    label: "Railway",
    icon: Train,
    exams: [
      {
        id: "rrb-ntpc",
        name: "RRB NTPC",
        fullName: "Railway Recruitment Board - Non-Technical Popular Categories",
        questions: "40,000+",
        mockTests: 20,
        subjects: ["Mathematics", "General Intelligence", "General Awareness"],
      },
      {
        id: "rrb-group-d",
        name: "RRB Group D",
        fullName: "Railway Recruitment Board - Group D",
        questions: "35,000+",
        mockTests: 18,
        subjects: ["Mathematics", "General Intelligence", "General Science", "General Awareness"],
      },
    ],
  },
  {
    id: "engineering",
    label: "Engineering",
    icon: Calculator,
    exams: [
      {
        id: "jee-main",
        name: "JEE Main",
        fullName: "Joint Entrance Examination - Main",
        questions: "25,000+",
        mockTests: 20,
        subjects: ["Physics", "Chemistry", "Mathematics"],
      },
      {
        id: "jee-advanced",
        name: "JEE Advanced",
        fullName: "Joint Entrance Examination - Advanced",
        questions: "15,000+",
        mockTests: 12,
        subjects: ["Physics", "Chemistry", "Mathematics"],
      },
      {
        id: "gate",
        name: "GATE",
        fullName: "Graduate Aptitude Test in Engineering",
        questions: "20,000+",
        mockTests: 15,
        subjects: ["Engineering Mathematics", "General Aptitude", "Core Subjects"],
      },
    ],
  },
  {
    id: "medical",
    label: "Medical",
    icon: Stethoscope,
    exams: [
      {
        id: "neet-ug",
        name: "NEET UG",
        fullName: "National Eligibility cum Entrance Test - Undergraduate",
        questions: "35,000+",
        mockTests: 25,
        subjects: ["Physics", "Chemistry", "Biology"],
      },
      {
        id: "neet-pg",
        name: "NEET PG",
        fullName: "National Eligibility cum Entrance Test - Postgraduate",
        questions: "20,000+",
        mockTests: 15,
        subjects: ["Pre-Clinical", "Para-Clinical", "Clinical"],
      },
    ],
  },
];

export default function ExamsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = examCategories.map((category) => ({
    ...category,
    exams: category.exams.filter(
      (exam) =>
        exam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((category) => category.exams.length > 0);

  return (
    <div className="space-y-6 pt-12 md:pt-0">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Select Your Exam</h1>
        <p className="text-muted-foreground">
          Choose an exam to start practicing with thousands of questions
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search exams..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Exam Categories */}
      <Tabs defaultValue="government" className="space-y-6">
        <TabsList className="flex-wrap h-auto gap-2 bg-transparent p-0">
          {examCategories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <category.icon className="mr-2 h-4 w-4" />
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {examCategories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {(searchQuery
                ? filteredCategories.find((c) => c.id === category.id)?.exams || []
                : category.exams
              ).map((exam) => (
                <Card
                  key={exam.id}
                  className="group cursor-pointer transition-all hover:border-primary hover:shadow-md"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{exam.name}</CardTitle>
                        <CardDescription className="mt-1 line-clamp-2">
                          {exam.fullName}
                        </CardDescription>
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary">
                        <GraduationCap className="h-5 w-5 text-primary transition-colors group-hover:text-primary-foreground" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        {exam.questions}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {exam.mockTests} tests
                      </div>
                    </div>
                    <div className="mb-4 flex flex-wrap gap-2">
                      {exam.subjects.slice(0, 3).map((subject) => (
                        <span
                          key={subject}
                          className="rounded-full bg-secondary px-2 py-1 text-xs text-secondary-foreground"
                        >
                          {subject}
                        </span>
                      ))}
                      {exam.subjects.length > 3 && (
                        <span className="rounded-full bg-secondary px-2 py-1 text-xs text-secondary-foreground">
                          +{exam.subjects.length - 3} more
                        </span>
                      )}
                    </div>
                    <Link href={`/quiz/${exam.id}`}>
                      <Button className="w-full">
                        Start Practice
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Quick Stats */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="flex flex-col items-center justify-between gap-4 p-6 md:flex-row">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold">Ready to ace your exam?</h3>
            <p className="text-sm text-muted-foreground">
              Start with a diagnostic test to identify your strengths and weaknesses
            </p>
          </div>
          <Button size="lg">Take Diagnostic Test</Button>
        </CardContent>
      </Card>
    </div>
  );
}
