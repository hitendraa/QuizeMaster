
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { BookOpen, Users, Trophy, ArrowLeft, Plus, Settings, Calendar, Trash2 } from 'lucide-react';
import type { Quiz, QuizResult } from '@/pages/Index';
import QuizCreator from '@/components/QuizCreator';

interface AdminDashboardProps {
  quizzes: Quiz[];
  results: QuizResult[];
  onAddQuiz: (quiz: Quiz) => void;
  onDeleteQuiz: (quizId: string) => void;
  onBackToRoleSelection: () => void;
}

const AdminDashboard = ({ quizzes, results, onAddQuiz, onDeleteQuiz, onBackToRoleSelection }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'quizzes' | 'results'>('overview');
  const [isCreatingQuiz, setIsCreatingQuiz] = useState(false);

  const totalQuestions = quizzes.reduce((acc, quiz) => acc + quiz.questions.length, 0);
  const averageScore = results.length > 0 
    ? Math.round(results.reduce((acc, r) => acc + (r.score / r.totalPoints) * 100, 0) / results.length)
    : 0;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getQuizStats = (quizId: string) => {
    const quizResults = results.filter(r => r.quizId === quizId);
    const averageScore = quizResults.length > 0 
      ? Math.round(quizResults.reduce((acc, r) => acc + (r.score / r.totalPoints) * 100, 0) / quizResults.length)
      : 0;
    return {
      attempts: quizResults.length,
      averageScore
    };
  };

  const handleCreateQuiz = (quiz: Quiz) => {
    onAddQuiz(quiz);
    setIsCreatingQuiz(false);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBackToRoleSelection}
              className="text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Login
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage quizzes and monitor student performance</p>
            </div>
          </div>
          <Button 
            onClick={() => setIsCreatingQuiz(true)}
            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Quiz
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <BookOpen className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Quizzes</p>
                  <p className="text-2xl font-bold text-gray-800">{quizzes.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Settings className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Questions</p>
                  <p className="text-2xl font-bold text-gray-800">{totalQuestions}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Attempts</p>
                  <p className="text-2xl font-bold text-gray-800">{results.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Trophy className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Average Score</p>
                  <p className="text-2xl font-bold text-gray-800">{averageScore}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-1 mb-6">
          <Button
            variant={activeTab === 'overview' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('overview')}
            className={activeTab === 'overview' ? 'bg-purple-600 hover:bg-purple-700' : ''}
          >
            Overview
          </Button>
          <Button
            variant={activeTab === 'quizzes' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('quizzes')}
            className={activeTab === 'quizzes' ? 'bg-purple-600 hover:bg-purple-700' : ''}
          >
            Manage Quizzes ({quizzes.length})
          </Button>
          <Button
            variant={activeTab === 'results' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('results')}
            className={activeTab === 'results' ? 'bg-purple-600 hover:bg-purple-700' : ''}
          >
            Student Results ({results.length})
          </Button>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Recent Quiz Activity</CardTitle>
                <CardDescription>Latest quiz attempts and results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {results.slice(-5).reverse().map((result) => {
                    const quiz = quizzes.find(q => q.id === result.quizId);
                    const percentage = Math.round((result.score / result.totalPoints) * 100);
                    return (
                      <div key={result.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-800">{result.studentName}</p>
                          <p className="text-sm text-gray-600">{quiz?.title}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-800">{percentage}%</p>
                          <p className="text-xs text-gray-500">{result.completedAt.toLocaleDateString()}</p>
                        </div>
                      </div>
                    );
                  })}
                  {results.length === 0 && (
                    <p className="text-gray-500 text-center py-4">No quiz attempts yet</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Quiz Performance</CardTitle>
                <CardDescription>Average scores by quiz difficulty</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Easy', 'Medium', 'Hard'].map((difficulty) => {
                    const difficultyQuizzes = quizzes.filter(q => q.difficulty === difficulty);
                    const difficultyResults = results.filter(r => 
                      difficultyQuizzes.some(q => q.id === r.quizId)
                    );
                    const avgScore = difficultyResults.length > 0 
                      ? Math.round(difficultyResults.reduce((acc, r) => acc + (r.score / r.totalPoints) * 100, 0) / difficultyResults.length)
                      : 0;

                    return (
                      <div key={difficulty} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Badge className={getDifficultyColor(difficulty)}>
                            {difficulty}
                          </Badge>
                          <span className="text-sm text-gray-600">{difficultyQuizzes.length} quizzes</span>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-800">{avgScore}%</p>
                          <p className="text-xs text-gray-500">{difficultyResults.length} attempts</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'quizzes' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => {
              const stats = getQuizStats(quiz.id);
              return (
                <Card key={quiz.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge className={getDifficultyColor(quiz.difficulty)}>
                        {quiz.difficulty}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDeleteQuiz(quiz.id)}
                        className="text-red-600 hover:text-red-800 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardTitle className="text-lg">{quiz.title}</CardTitle>
                    <CardDescription className="text-sm">{quiz.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Questions</span>
                        <span className="font-medium">{quiz.questions.length}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Time Limit</span>
                        <span className="font-medium">{quiz.timeLimit} min</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Attempts</span>
                        <span className="font-medium">{stats.attempts}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Avg Score</span>
                        <span className="font-medium">{stats.averageScore}%</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>Created {quiz.createdAt.toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
            {quizzes.length === 0 && (
              <div className="col-span-full text-center py-12">
                <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No quizzes created yet</h3>
                <p className="text-gray-500 mb-4">Create your first quiz to get started!</p>
                <Button 
                  onClick={() => setIsCreatingQuiz(true)}
                  className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Quiz
                </Button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'results' && (
          <div className="space-y-6">
            {results.length > 0 ? (
              <div className="grid gap-4">
                {results.map((result) => {
                  const quiz = quizzes.find(q => q.id === result.quizId);
                  const percentage = Math.round((result.score / result.totalPoints) * 100);
                  return (
                    <Card key={result.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-800">{result.studentName}</h3>
                            <p className="text-gray-600">{quiz?.title}</p>
                            <p className="text-sm text-gray-500">
                              Completed on {result.completedAt.toLocaleDateString()} at {result.completedAt.toLocaleTimeString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-gray-800">{percentage}%</div>
                            <div className="text-sm text-gray-600">
                              {result.score}/{result.totalPoints} points
                            </div>
                            <Badge className={
                              percentage >= 80 ? 'bg-green-100 text-green-800' :
                              percentage >= 60 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }>
                              {percentage >= 80 ? 'Excellent' : percentage >= 60 ? 'Good' : 'Needs Improvement'}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <Trophy className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No results yet</h3>
                <p className="text-gray-500">Student quiz results will appear here once they start taking quizzes.</p>
              </div>
            )}
          </div>
        )}

        {/* Quiz Creator Dialog */}
        <Dialog open={isCreatingQuiz} onOpenChange={setIsCreatingQuiz}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Quiz</DialogTitle>
              <DialogDescription>
                Build a new quiz with custom questions and settings
              </DialogDescription>
            </DialogHeader>
            <QuizCreator onSave={handleCreateQuiz} onCancel={() => setIsCreatingQuiz(false)} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminDashboard;
