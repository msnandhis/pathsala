'use client';

import { useState } from 'react';
import { PlayIcon, ClockIcon, CheckCircleIcon, BookmarkIcon, TrendingUpIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Header } from '@/components/layout/header';

// Mock data for enrolled courses
const enrolledCourses = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    instructor: "Sarah Johnson",
    thumbnail: "https://images.pexels.com/photos/177598/pexels-photo-177598.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2",
    progress: 65,
    totalVideos: 156,
    completedVideos: 101,
    totalDuration: "42 hours",
    lastWatched: "2 days ago",
    category: "Web Development",
    nextVideo: "CSS Grid Layout"
  },
  {
    id: 2,
    title: "Python for Data Science",
    instructor: "Dr. Emily Rodriguez",
    thumbnail: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2",
    progress: 32,
    totalVideos: 124,
    completedVideos: 40,
    totalDuration: "36 hours",
    lastWatched: "5 days ago",
    category: "Data Science",
    nextVideo: "Pandas Data Analysis"
  },
  {
    id: 3,
    title: "UI/UX Design Fundamentals",
    instructor: "Alex Thompson",
    thumbnail: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2",
    progress: 88,
    totalVideos: 87,
    completedVideos: 77,
    totalDuration: "24 hours",
    lastWatched: "1 week ago",
    category: "Design",
    nextVideo: "User Testing Methods"
  }
];

const bookmarkedCourses = [
  {
    id: 4,
    title: "Digital Marketing Mastery",
    instructor: "Michael Chen",
    thumbnail: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2",
    rating: 4.9,
    students: 8750,
    duration: "28 hours",
    category: "Marketing",
    bookmarkedDate: "3 days ago"
  },
  {
    id: 5,
    title: "Business Strategy & Analytics",
    instructor: "James Wilson",
    thumbnail: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2",
    rating: 4.5,
    students: 4320,
    duration: "32 hours",
    category: "Business",
    bookmarkedDate: "1 week ago"
  }
];

const achievements = [
  {
    id: 1,
    title: "First Course Completed",
    description: "Completed your first course",
    icon: "🎓",
    earned: true,
    date: "2 weeks ago"
  },
  {
    id: 2,
    title: "Week Streak",
    description: "Learned for 7 days in a row",
    icon: "🔥",
    earned: true,
    date: "1 week ago"
  },
  {
    id: 3,
    title: "Video Master",
    description: "Watched 100 videos",
    icon: "📺",
    earned: false,
    progress: 85
  },
  {
    id: 4,
    title: "Multi-disciplinary",
    description: "Enrolled in 3 different categories",
    icon: "🌟",
    earned: true,
    date: "3 days ago"
  }
];

export default function MyLearningPage() {
  const [activeTab, setActiveTab] = useState('enrolled');

  const totalCoursesCompleted = enrolledCourses.filter(course => course.progress === 100).length;
  const averageProgress = enrolledCourses.length > 0 
    ? enrolledCourses.reduce((acc, course) => acc + course.progress, 0) / enrolledCourses.length 
    : 0;
  const totalWatchTime = enrolledCourses.reduce((acc, course) => acc + parseInt(course.totalDuration), 0);

  return (
    <div className="min-h-screen bg-neutral-light">
      <Header />
      
      {/* Page Header */}
      <section className="bg-white border-b py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-playfair font-bold mb-4">My Learning</h1>
          <p className="text-gray-600 text-lg">Track your progress and continue your learning journey</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-brand-green mb-2">{enrolledCourses.length}</div>
              <div className="text-sm text-gray-600">Courses Enrolled</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-brand-green mb-2">{totalCoursesCompleted}</div>
              <div className="text-sm text-gray-600">Courses Completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-brand-green mb-2">{Math.round(averageProgress)}%</div>
              <div className="text-sm text-gray-600">Average Progress</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-brand-green mb-2">{totalWatchTime}</div>
              <div className="text-sm text-gray-600">Hours Watched</div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="enrolled">My Courses</TabsTrigger>
            <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>
          
          <TabsContent value="enrolled">
            <div className="grid gap-6">
              {enrolledCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="flex">
                    <div className="w-64 h-36 flex-shrink-0">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">{course.category}</Badge>
                            <span className="text-sm text-gray-500">Last watched: {course.lastWatched}</span>
                          </div>
                          <h3 className="text-xl font-playfair font-semibold mb-2">{course.title}</h3>
                          <p className="text-gray-600 mb-4">by {course.instructor}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">Progress</span>
                            <span className="text-sm text-gray-600">
                              {course.completedVideos}/{course.totalVideos} videos completed
                            </span>
                          </div>
                          <Progress value={course.progress} className="w-full" />
                          <div className="flex justify-between items-center mt-1 text-xs text-gray-500">
                            <span>{course.progress}% complete</span>
                            <span>{course.totalDuration} total</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">Next:</span> {course.nextVideo}
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <BookmarkIcon className="w-4 h-4 mr-2" />
                              View Details
                            </Button>
                            <Button size="sm" className="bg-brand-green hover:bg-brand-green/90">
                              <PlayIcon className="w-4 h-4 mr-2" />
                              Continue Learning
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="bookmarks">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookmarkedCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
                  <div className="relative">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                      <PlayIcon className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <Badge className="absolute top-3 right-3 bg-brand-green text-white">
                      {course.category}
                    </Badge>
                  </div>
                  
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">Bookmarked {course.bookmarkedDate}</Badge>
                      <Button variant="ghost" size="sm" className="p-1 text-red-500 hover:text-red-700">
                        <BookmarkIcon className="w-4 h-4 fill-current" />
                      </Button>
                    </div>
                    <CardTitle className="line-clamp-2 group-hover:text-brand-green transition-colors">
                      {course.title}
                    </CardTitle>
                    <CardDescription>by {course.instructor}</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <TrendingUpIcon className="w-4 h-4" />
                        <span>{course.students.toLocaleString()} students</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ClockIcon className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                    </div>
                    
                    <Button size="sm" className="w-full bg-brand-green hover:bg-brand-green/90">
                      Enroll Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="achievements">
            <div className="grid md:grid-cols-2 gap-6">
              {achievements.map((achievement) => (
                <Card key={achievement.id} className={`overflow-hidden ${achievement.earned ? 'border-brand-green/50 bg-brand-green/5' : 'opacity-75'}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{achievement.title}</h3>
                          {achievement.earned && (
                            <CheckCircleIcon className="w-5 h-5 text-brand-green" />
                          )}
                        </div>
                        <p className="text-gray-600 mb-3">{achievement.description}</p>
                        
                        {achievement.earned ? (
                          <div className="flex items-center gap-2 text-sm text-brand-green">
                            <CheckCircleIcon className="w-4 h-4" />
                            <span>Earned {achievement.date}</span>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-gray-600">Progress</span>
                              <span className="text-gray-600">{achievement.progress}%</span>
                            </div>
                            <Progress value={achievement.progress} className="w-full" />
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}