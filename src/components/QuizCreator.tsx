import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Save, X } from 'lucide-react';
import type { Quiz, Question } from '@/types/quiz';

interface QuizCreatorProps {
  onSave: (quiz: Quiz) => void;
  onCancel: () => void;
}

const QuizCreator = ({ onSave, onCancel }: QuizCreatorProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Easy');
  const [timeLimit, setTimeLimit] = useState(30);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Partial<Question>>({
    type: 'multiple-choice',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    points: 10
  });

  const addQuestion = () => {
    if (!currentQuestion.question || !currentQuestion.correctAnswer) return;

    const newQuestion: Question = {
      id: Date.now().toString(),
      type: currentQuestion.type as Question['type'],
      question: currentQuestion.question,
      options: currentQuestion.type === 'multiple-choice' ? currentQuestion.options : undefined,
      correctAnswer: currentQuestion.correctAnswer,
      points: currentQuestion.points || 10
    };

    setQuestions([...questions, newQuestion]);
    setCurrentQuestion({
      type: 'multiple-choice',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: '',
      points: 10
    });
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...(currentQuestion.options || ['', '', '', ''])];
    newOptions[index] = value;
    setCurrentQuestion({ ...currentQuestion, options: newOptions });
  };

  const handleSave = () => {
    if (!title || !description || !category || questions.length === 0) {
      alert('Please fill in all required fields and add at least one question.');
      return;
    }

    const quiz: Quiz = {
      id: Date.now().toString(),
      title,
      description,
      category,
      difficulty,
      timeLimit,
      questions,
      createdAt: new Date()
    };

    onSave(quiz);
  };

  const canAddQuestion = currentQuestion.question && currentQuestion.correctAnswer && 
    (currentQuestion.type !== 'multiple-choice' || 
     (currentQuestion.options && currentQuestion.options.filter(opt => opt.trim()).length >= 2));

  return (
    <div className="space-y-6">
      {/* Quiz Details */}
      <Card>
        <CardHeader>
          <CardTitle>Quiz Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Quiz Title*</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter quiz title"
              />
            </div>
            <div>
              <Label htmlFor="category">Category*</Label>
              <Input
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g., Programming, Science, History"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="description">Description*</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what this quiz covers"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select value={difficulty} onValueChange={(value: 'Easy' | 'Medium' | 'Hard') => setDifficulty(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="timeLimit">Time Limit (minutes)</Label>
              <Input
                id="timeLimit"
                type="number"
                value={timeLimit}
                onChange={(e) => setTimeLimit(parseInt(e.target.value) || 30)}
                min={1}
                max={180}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Question */}
      <Card>
        <CardHeader>
          <CardTitle>Add Question</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="questionType">Question Type</Label>
              <Select 
                value={currentQuestion.type} 
                onValueChange={(value: Question['type']) => 
                  setCurrentQuestion({ 
                    ...currentQuestion, 
                    type: value,
                    options: value === 'multiple-choice' ? ['', '', '', ''] : undefined,
                    correctAnswer: ''
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                  <SelectItem value="true-false">True/False</SelectItem>
                  <SelectItem value="short-answer">Short Answer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="points">Points</Label>
              <Input
                id="points"
                type="number"
                value={currentQuestion.points}
                onChange={(e) => setCurrentQuestion({ ...currentQuestion, points: parseInt(e.target.value) || 10 })}
                min={1}
                max={100}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="question">Question*</Label>
            <Textarea
              id="question"
              value={currentQuestion.question}
              onChange={(e) => setCurrentQuestion({ ...currentQuestion, question: e.target.value })}
              placeholder="Enter your question"
              rows={2}
            />
          </div>

          {currentQuestion.type === 'multiple-choice' && (
            <div>
              <Label>Answer Options*</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                {currentQuestion.options?.map((option, index) => (
                  <Input
                    key={index}
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          )}

          <div>
            <Label htmlFor="correctAnswer">Correct Answer*</Label>
            {currentQuestion.type === 'multiple-choice' ? (
              <Select 
                value={currentQuestion.correctAnswer} 
                onValueChange={(value) => setCurrentQuestion({ ...currentQuestion, correctAnswer: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select correct option" />
                </SelectTrigger>
                <SelectContent>
                  {currentQuestion.options?.map((option, index) => (
                    option.trim() && (
                      <SelectItem key={index} value={option}>
                        {option}
                      </SelectItem>
                    )
                  ))}
                </SelectContent>
              </Select>
            ) : currentQuestion.type === 'true-false' ? (
              <Select 
                value={currentQuestion.correctAnswer} 
                onValueChange={(value) => setCurrentQuestion({ ...currentQuestion, correctAnswer: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select true or false" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">True</SelectItem>
                  <SelectItem value="false">False</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <Input
                value={currentQuestion.correctAnswer}
                onChange={(e) => setCurrentQuestion({ ...currentQuestion, correctAnswer: e.target.value })}
                placeholder="Enter the correct answer"
              />
            )}
          </div>

          <Button 
            onClick={addQuestion} 
            disabled={!canAddQuestion}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Question
          </Button>
        </CardContent>
      </Card>

      {/* Questions List */}
      {questions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Questions ({questions.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {questions.map((question, index) => (
                <div key={question.id} className="p-4 border rounded-lg bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex gap-2">
                      <Badge variant="outline">{question.type}</Badge>
                      <Badge variant="outline">{question.points} pts</Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeQuestion(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <h4 className="font-medium text-gray-800 mb-2">{question.question}</h4>
                  {question.options && (
                    <div className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Options:</span> {question.options.join(', ')}
                    </div>
                  )}
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Correct Answer:</span> {question.correctAnswer}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex gap-4 justify-end">
        <Button variant="outline" onClick={onCancel}>
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
        <Button 
          onClick={handleSave}
          disabled={!title || !description || !category || questions.length === 0}
          className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Quiz
        </Button>
      </div>
    </div>
  );
};

export default QuizCreator;
