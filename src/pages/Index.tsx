
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Users, Trophy, Settings } from 'lucide-react';
import StudentDashboard from '@/components/StudentDashboard';
import AdminDashboard from '@/components/AdminDashboard';
import QuizTaking from '@/components/QuizTaking';
import ResultsView from '@/components/ResultsView';

export interface Question {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  question: string;
  options?: string[];
  correctAnswer: string;
  points: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  timeLimit: number; // in minutes
  createdAt: Date;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface QuizResult {
  id: string;
  quizId: string;
  studentName: string;
  score: number;
  totalPoints: number;
  completedAt: Date;
  answers: Record<string, string>;
}

const Index = () => {
  const [userRole, setUserRole] = useState<'student' | 'admin' | null>(null);
  const [currentView, setCurrentView] = useState<'dashboard' | 'taking-quiz' | 'results'>('dashboard');
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [currentResult, setCurrentResult] = useState<QuizResult | null>(null);

  // Sample data
  const [quizzes, setQuizzes] = useState<Quiz[]>([
    {
      id: '1',
      title: 'JavaScript Fundamentals',
      description: 'Test your knowledge of JavaScript basics including variables, functions, and data types.',
      category: 'Programming',
      difficulty: 'Easy',
      timeLimit: 30,
      createdAt: new Date('2024-01-15'),
      questions: [
        {
          id: '1',
          type: 'multiple-choice',
          question: 'What is the correct way to declare a variable in JavaScript?',
          options: ['var name = "John"', 'variable name = "John"', 'v name = "John"', 'declare name = "John"'],
          correctAnswer: 'var name = "John"',
          points: 10
        },
        {
          id: '2',
          type: 'true-false',
          question: 'JavaScript is a case-sensitive language.',
          correctAnswer: 'true',
          points: 5
        }
      ]
    },
    {
      id: '2',
      title: 'React Components',
      description: 'Advanced quiz on React components, hooks, and state management.',
      category: 'Programming',
      difficulty: 'Medium',
      timeLimit: 45,
      createdAt: new Date('2024-01-20'),
      questions: [
        {
          id: '1',
          type: 'multiple-choice',
          question: 'Which hook is used for state management in functional components?',
          options: ['useEffect', 'useState', 'useContext', 'useReducer'],
          correctAnswer: 'useState',
          points: 15
        }
      ]
    }
  ]);

  const [results, setResults] = useState<QuizResult[]>([]);

  const handleRoleSelection = (role: 'student' | 'admin') => {
    setUserRole(role);
    setCurrentView('dashboard');
  };

  const handleTakeQuiz = (quiz: Quiz) => {
    setCurrentQuiz(quiz);
    setCurrentView('taking-quiz');
  };

  const handleQuizComplete = (result: QuizResult) => {
    setResults(prev => [...prev, result]);
    setCurrentResult(result);
    setCurrentView('results');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setCurrentQuiz(null);
    setCurrentResult(null);
  };

  const handleAddQuiz = (quiz: Quiz) => {
    setQuizzes(prev => [...prev, quiz]);
  };

  const handleDeleteQuiz = (quizId: string) => {
    setQuizzes(prev => prev.filter(q => q.id !== quizId));
  };

  if (!userRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full">
                <BookOpen className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              QuizMaster Platform
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              The ultimate quiz management and taking platform for students and educators
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl text-blue-700">Student Portal</CardTitle>
                <CardDescription className="text-gray-600">
                  Take quizzes, track your progress, and view detailed results
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <Trophy className="h-4 w-4" />
                    <span>Track your scores and achievements</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <BookOpen className="h-4 w-4" />
                    <span>Access available quizzes</span>
                  </div>
                </div>
                <Button 
                  onClick={() => handleRoleSelection('student')}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
                >
                  Enter as Student
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 bg-purple-100 rounded-full w-fit">
                  <Settings className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-2xl text-purple-700">Admin Portal</CardTitle>
                <CardDescription className="text-gray-600">
                  Create and manage quizzes, monitor student performance
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <BookOpen className="h-4 w-4" />
                    <span>Create and edit quizzes</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <Users className="h-4 w-4" />
                    <span>Monitor student results</span>
                  </div>
                </div>
                <Button 
                  onClick={() => handleRoleSelection('admin')}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 transition-all duration-300"
                >
                  Enter as Admin
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'taking-quiz' && currentQuiz) {
    return (
      <QuizTaking 
        quiz={currentQuiz} 
        onComplete={handleQuizComplete}
        onBack={handleBackToDashboard}
      />
    );
  }

  if (currentView === 'results' && currentResult) {
    return (
      <ResultsView 
        result={currentResult}
        quiz={quizzes.find(q => q.id === currentResult.quizId)!}
        onBack={handleBackToDashboard}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {userRole === 'student' ? (
        <StudentDashboard 
          quizzes={quizzes}
          results={results}
          onTakeQuiz={handleTakeQuiz}
          onBackToRoleSelection={() => setUserRole(null)}
        />
      ) : (
        <AdminDashboard 
          quizzes={quizzes}
          results={results}
          onAddQuiz={handleAddQuiz}
          onDeleteQuiz={handleDeleteQuiz}
          onBackToRoleSelection={() => setUserRole(null)}
        />
      )}
    </div>
  );
};

export default Index;
