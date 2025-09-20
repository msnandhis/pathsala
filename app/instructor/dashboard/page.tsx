'use client';

import { useState } from 'react';
import { PlusIcon, TrendingUpIcon, UsersIcon, StarIcon, DollarSignIcon, EyeIcon, BookOpenIcon, MessageSquareIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
// Progress component removed to fix build issues
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Header } from '@/components/layout/header';

// Mock data
const dashboardStats = {
  totalStudents: 25400,
  totalRevenue: 0, // Free courses for now
  averageRating: 4.8,
  totalCourses: 12,
  monthlyGrowth: {
    students: 15.2,
    revenue: 0,
    rating: 0.1,
    courses: 2
  }
};

const recentCourses = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    students: 12450,
    rating: 4.8,
    reviews: 420,
    status: "published",
    thumbnail: "https://images.pexels.com/photos/177598/pexels-photo-177598.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2",
    lastUpdated: "2 days ago",
    completionRate: 68
  },
  {
    id: 2,
    title: "React Advanced Patterns",
    students: 8750,
    rating: 4.9,
    reviews: 280,
    status: "published",
    thumbnail: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2",
    lastUpdated: "1 week ago",
    completionRate: 72
  },
  {
    id: 3,
    title: "Node.js Masterclass",
    students: 0,
    rating: 0,
    reviews: 0,
    status: "draft",
    thumbnail: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2",
    lastUpdated: "3 days ago",
    completionRate: 0
  }
];

const recentReviews = [
  {
    id: 1,
    student: "Alex Chen",
    course: "Complete Web Development Bootcamp",
    rating: 5,
    comment: "Amazing course! Sarah explains everything so clearly. I went from knowing nothing about web development to building my first website.",
    date: "2 days ago"
  },
  {
    id: 2,
    student: "Maria Rodriguez",
    course: "React Advanced Patterns",
    rating: 5,
    comment: "The projects in this course are incredible. I now have a portfolio I'm proud to show employers.",
    date: "1 week ago"
  },
  {
    id: 3,
    student: "David Kim",
    course: "Complete Web Development Bootcamp",
    rating: 4,
    comment: "Great course overall. The content is comprehensive and well-structured.",
    date: "2 weeks ago"
  }
];

const analytics = {
  studentGrowth: [
    { month: 'Jan', students: 1200 },
    { month: 'Feb', students: 1800 },
    { month: 'Mar', students: 2400 },
    { month: 'Apr', students: 3200 },
    { month: 'May', students: 4100 },
    { month: 'Jun', students: 5200 }
  ],
  topCourses: [
    { name: 'Web Development Bootcamp', students: 12450, percentage: 49 },
    { name: 'React Advanced Patterns', students: 8750, percentage: 34 },
    { name: 'JavaScript Fundamentals', students: 4300, percentage: 17 }
  ]
};

export default function InstructorDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-neutral-light">
      <Header />
      
      {/* Page Header */}
      <section className="bg-white border-b py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-playfair font-bold mb-2">Instructor Dashboard</h1>
              <p className="text-gray-600 text-lg">Manage your courses and track your teaching success</p>
            </div>
            <Button className="bg-brand-green hover:bg-brand-green/90">
              <PlusIcon className="w-4 h-4 mr-2" />
              Create New Course
            </Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Students</p>
                      <p className="text-3xl font-bold text-brand-green">{dashboardStats.totalStudents.toLocaleString()}</p>
                    </div>
                    <UsersIcon className="w-8 h-8 text-brand-green" />
                  </div>
                  <div className="flex items-center mt-2 text-sm">
                    <TrendingUpIcon className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-green-500">+{dashboardStats.monthlyGrowth.students}%</span>
                    <span className="text-gray-500 ml-1">this month</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Average Rating</p>
                      <p className="text-3xl font-bold text-brand-green">{dashboardStats.averageRating}</p>
                    </div>
                    <StarIcon className="w-8 h-8 text-brand-green" />
                  </div>
                  <div className="flex items-center mt-2 text-sm">
                    <TrendingUpIcon className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-green-500">+{dashboardStats.monthlyGrowth.rating}</span>
                    <span className="text-gray-500 ml-1">this month</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Courses</p>
                      <p className="text-3xl font-bold text-brand-green">{dashboardStats.totalCourses}</p>
                    </div>
                    <BookOpenIcon className="w-8 h-8 text-brand-green" />
                  </div>
                  <div className="flex items-center mt-2 text-sm">
                    <TrendingUpIcon className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-green-500">+{dashboardStats.monthlyGrowth.courses}</span>
                    <span className="text-gray-500 ml-1">this month</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Revenue</p>
                      <p className="text-3xl font-bold text-brand-green">Free</p>
                    </div>
                    <DollarSignIcon className="w-8 h-8 text-brand-green" />
                  </div>
                  <div className="flex items-center mt-2 text-sm">
                    <span className="text-gray-500">All courses are free</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Courses</CardTitle>
                  <CardDescription>Your latest course activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentCourses.slice(0, 3).map((course) => (
                      <div key={course.id} className="flex items-center gap-4 p-4 border rounded-lg">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-16 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium line-clamp-1">{course.title}</h4>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                            <span>{course.students.toLocaleString()} students</span>
                            <Badge variant={course.status === 'published' ? 'default' : 'secondary'}>
                              {course.status}
                            </Badge>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Reviews</CardTitle>
                  <CardDescription>Latest feedback from students</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentReviews.slice(0, 3).map((review) => (
                      <div key={review.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{review.student}</span>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: review.rating }).map((_, i) => (
                              <StarIcon key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{review.comment}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{review.course}</span>
                          <span>{review.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="courses">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-48 object-cover"
                    />
                    <Badge 
                      className={`absolute top-3 right-3 ${
                        course.status === 'published' 
                          ? 'bg-green-500 text-white' 
                          : 'bg-yellow-500 text-white'
                      }`}
                    >
                      {course.status}
                    </Badge>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                    <CardDescription>Updated {course.lastUpdated}</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    {course.status === 'published' ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span>{course.students.toLocaleString()} students</span>
                          <div className="flex items-center gap-1">
                            <StarIcon className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>{course.rating}</span>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Completion Rate</span>
                            <span>{course.completionRate}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-brand-green h-2 rounded-full"
                              style={{ width: `${course.completionRate}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600">{course.reviews} reviews</div>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-600">Course in development</p>
                    )}
                    
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline" className="flex-1">
                        {course.status === 'published' ? 'View' : 'Edit'}
                      </Button>
                      <Button size="sm" className="flex-1 bg-brand-green hover:bg-brand-green/90">
                        {course.status === 'published' ? 'Analytics' : 'Publish'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {/* Create New Course Card */}
              <Card className="border-2 border-dashed border-gray-300 hover:border-brand-green transition-colors cursor-pointer">
                <CardContent className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center mb-4">
                    <PlusIcon className="w-8 h-8 text-brand-green" />
                  </div>
                  <h3 className="font-semibold mb-2">Create New Course</h3>
                  <p className="text-gray-600 text-sm mb-4">Share your knowledge with the world</p>
                  <Button className="bg-brand-green hover:bg-brand-green/90">
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics">
            <div className="space-y-8">
              {/* Top Courses */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Courses</CardTitle>
                  <CardDescription>Your most popular courses by student enrollment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analytics.topCourses.map((course, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-brand-green text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium">{course.name}</span>
                            <span className="text-sm text-gray-600">{course.students.toLocaleString()} students</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-brand-green h-2 rounded-full"
                              style={{ width: `${course.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Student Growth Chart Placeholder */}
              <Card>
                <CardHeader>
                  <CardTitle>Student Growth</CardTitle>
                  <CardDescription>Monthly student enrollment over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <TrendingUpIcon className="w-12 h-12 mx-auto mb-2" />
                      <p>Chart visualization would go here</p>
                      <p className="text-sm">Integration with charting library needed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews">
            <div className="space-y-6">
              {recentReviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold">{review.student}</h4>
                        <p className="text-sm text-gray-600">{review.course}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <StarIcon key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm">
                        <MessageSquareIcon className="w-4 h-4 mr-2" />
                        Reply
                      </Button>
                      <Button variant="outline" size="sm">
                        Mark as Helpful
                      </Button>
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