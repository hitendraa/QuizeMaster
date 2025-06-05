
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Users, Trophy, Plus } from 'lucide-react';
import type { Quiz, QuizResult } from '@/types/quiz';

const AdminDashboard = () => {
  const [quizzes] = useState<Quiz[]>([]);
  const [results] = useState<QuizResult[]>([]);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage quizzes and monitor student progress</p>
          </div>
          <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800">
            <Plus className="h-4 w-4 mr-2" />
            Create Quiz
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <BookOpen className="h-6 w-6 text-blue-600" />
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
                <div className="p-2 bg-green-100 rounded-lg">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Active Students</p>
                  <p className="text-2xl font-bold text-gray-800">0</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Trophy className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Quiz Attempts</p>
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
                  <p className="text-sm text-gray-600">Avg Score</p>
                  <p className="text-2xl font-bold text-gray-800">0%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Recent Quizzes</CardTitle>
              <CardDescription>Latest quizzes created</CardDescription>
            </CardHeader>
            <CardContent>
              {quizzes.length === 0 ? (
                <div className="text-center py-8">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No quizzes created yet</p>
                  <Button variant="outline" className="mt-4">
                    Create Your First Quiz
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Quiz list will go here */}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Recent Results</CardTitle>
              <CardDescription>Latest quiz attempts</CardDescription>
            </CardHeader>
            <CardContent>
              {results.length === 0 ? (
                <div className="text-center py-8">
                  <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No quiz attempts yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Results list will go here */}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
