'use client';

import { useState } from 'react';
import { ChevronRightIcon, CheckIcon, BookOpenIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
// Progress component removed to fix build issues

const interests = [
  { id: 1, name: "Web Development", icon: "💻", description: "HTML, CSS, JavaScript, React" },
  { id: 2, name: "Data Science", icon: "📊", description: "Python, Machine Learning, Analytics" },
  { id: 3, name: "Digital Marketing", icon: "📱", description: "SEO, Social Media, Content Marketing" },
  { id: 4, name: "Design", icon: "🎨", description: "UI/UX, Graphic Design, Figma" },
  { id: 5, name: "Business", icon: "💼", description: "Strategy, Management, Entrepreneurship" },
  { id: 6, name: "Photography", icon: "📷", description: "Portrait, Landscape, Photo Editing" },
  { id: 7, name: "Music", icon: "🎵", description: "Production, Theory, Instruments" },
  { id: 8, name: "Languages", icon: "🌍", description: "Spanish, French, German, Japanese" },
  { id: 9, name: "Health & Fitness", icon: "💪", description: "Nutrition, Yoga, Personal Training" },
  { id: 10, name: "Finance", icon: "💰", description: "Investing, Cryptocurrency, Personal Finance" }
];

const experienceLevels = [
  { id: 'beginner', name: 'Beginner', description: 'New to learning online' },
  { id: 'intermediate', name: 'Intermediate', description: 'Some experience with online courses' },
  { id: 'advanced', name: 'Advanced', description: 'Experienced online learner' }
];

const goals = [
  { id: 'career', name: 'Advance my career', icon: '🚀' },
  { id: 'skills', name: 'Learn new skills', icon: '🎯' },
  { id: 'hobby', name: 'Pursue a hobby', icon: '🎨' },
  { id: 'business', name: 'Start a business', icon: '💼' },
  { id: 'certification', name: 'Get certified', icon: '🏆' },
  { id: 'knowledge', name: 'General knowledge', icon: '📚' }
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedInterests, setSelectedInterests] = useState<number[]>([]);
  const [experienceLevel, setExperienceLevel] = useState('');
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [timeCommitment, setTimeCommitment] = useState('');

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const toggleInterest = (interestId: number) => {
    setSelectedInterests(prev => 
      prev.includes(interestId) 
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    );
  };

  const toggleGoal = (goalId: string) => {
    setSelectedGoals(prev => 
      prev.includes(goalId) 
        ? prev.filter(id => id !== goalId)
        : [...prev, goalId]
    );
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      console.log('Onboarding completed:', {
        interests: selectedInterests,
        experienceLevel,
        goals: selectedGoals,
        timeCommitment
      });
      // Redirect to homepage
      window.location.href = '/';
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return selectedInterests.length > 0;
      case 2: return experienceLevel !== '';
      case 3: return selectedGoals.length > 0;
      case 4: return timeCommitment !== '';
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-green via-brand-soft-gray to-brand-beige">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="bg-white p-3 rounded-xl shadow-lg">
              <BookOpenIcon className="w-8 h-8 text-brand-green" />
            </div>
            <span className="text-2xl font-playfair font-bold text-white">LearnHub</span>
          </div>
          <h1 className="text-4xl font-playfair font-bold text-white mb-2">
            Let's personalize your learning
          </h1>
          <p className="text-white/90 text-lg">
            Help us recommend the best courses for you
          </p>
        </div>

        {/* Progress */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white/90 text-sm">Step {currentStep} of {totalSteps}</span>
            <span className="text-white/90 text-sm">{Math.round(progress)}% complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-brand-green h-2 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-2xl border-0">
            <CardContent className="p-8">
              {/* Step 1: Interests */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <CardTitle className="text-3xl font-playfair mb-2">
                      What interests you?
                    </CardTitle>
                    <CardDescription className="text-lg">
                      Select topics you'd like to learn about (choose at least one)
                    </CardDescription>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {interests.map((interest) => (
                      <div
                        key={interest.id}
                        onClick={() => toggleInterest(interest.id)}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:scale-105 ${
                          selectedInterests.includes(interest.id)
                            ? 'border-brand-green bg-brand-green/10'
                            : 'border-gray-200 hover:border-brand-green/50'
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-3xl mb-2">{interest.icon}</div>
                          <h3 className="font-semibold text-sm mb-1">{interest.name}</h3>
                          <p className="text-xs text-gray-600">{interest.description}</p>
                          {selectedInterests.includes(interest.id) && (
                            <CheckIcon className="w-5 h-5 text-brand-green mx-auto mt-2" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Experience Level */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <CardTitle className="text-3xl font-playfair mb-2">
                      What's your experience level?
                    </CardTitle>
                    <CardDescription className="text-lg">
                      This helps us recommend courses at the right difficulty
                    </CardDescription>
                  </div>
                  
                  <div className="space-y-4 max-w-2xl mx-auto">
                    {experienceLevels.map((level) => (
                      <div
                        key={level.id}
                        onClick={() => setExperienceLevel(level.id)}
                        className={`p-6 rounded-xl border-2 cursor-pointer transition-all hover:scale-102 ${
                          experienceLevel === level.id
                            ? 'border-brand-green bg-brand-green/10'
                            : 'border-gray-200 hover:border-brand-green/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{level.name}</h3>
                            <p className="text-gray-600">{level.description}</p>
                          </div>
                          {experienceLevel === level.id && (
                            <CheckIcon className="w-6 h-6 text-brand-green" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Goals */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <CardTitle className="text-3xl font-playfair mb-2">
                      What are your goals?
                    </CardTitle>
                    <CardDescription className="text-lg">
                      Select what you hope to achieve (choose at least one)
                    </CardDescription>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                    {goals.map((goal) => (
                      <div
                        key={goal.id}
                        onClick={() => toggleGoal(goal.id)}
                        className={`p-6 rounded-xl border-2 cursor-pointer transition-all hover:scale-105 ${
                          selectedGoals.includes(goal.id)
                            ? 'border-brand-green bg-brand-green/10'
                            : 'border-gray-200 hover:border-brand-green/50'
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-4xl mb-3">{goal.icon}</div>
                          <h3 className="font-semibold">{goal.name}</h3>
                          {selectedGoals.includes(goal.id) && (
                            <CheckIcon className="w-5 h-5 text-brand-green mx-auto mt-2" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Time Commitment */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <CardTitle className="text-3xl font-playfair mb-2">
                      How much time can you dedicate?
                    </CardTitle>
                    <CardDescription className="text-lg">
                      This helps us suggest the right course length and pace
                    </CardDescription>
                  </div>
                  
                  <div className="space-y-4 max-w-2xl mx-auto">
                    {[
                      { id: '30min', name: '30 minutes per day', description: 'Perfect for busy schedules' },
                      { id: '1hour', name: '1 hour per day', description: 'Steady progress' },
                      { id: '2hours', name: '2+ hours per day', description: 'Intensive learning' },
                      { id: 'weekend', name: 'Weekends only', description: 'Learn at your own pace' }
                    ].map((option) => (
                      <div
                        key={option.id}
                        onClick={() => setTimeCommitment(option.id)}
                        className={`p-6 rounded-xl border-2 cursor-pointer transition-all hover:scale-102 ${
                          timeCommitment === option.id
                            ? 'border-brand-green bg-brand-green/10'
                            : 'border-gray-200 hover:border-brand-green/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{option.name}</h3>
                            <p className="text-gray-600">{option.description}</p>
                          </div>
                          {timeCommitment === option.id && (
                            <CheckIcon className="w-6 h-6 text-brand-green" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="px-6"
                >
                  Back
                </Button>
                
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">
                    {currentStep === totalSteps ? 'Ready to start learning!' : 'Continue setup'}
                  </p>
                </div>
                
                <Button
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className="bg-brand-green hover:bg-brand-green/90 px-6"
                >
                  {currentStep === totalSteps ? 'Get Started' : 'Next'}
                  <ChevronRightIcon className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}