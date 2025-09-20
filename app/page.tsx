'use client';

import { useState } from 'react';
import { SearchIcon, BookmarkIcon, PlayIcon, StarIcon, TrendingUpIcon, ClockIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Header } from '@/components/layout/header';

// Mock data
const featuredCourses = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    description: "Learn HTML, CSS, JavaScript, React, and Node.js",
    instructor: "Sarah Johnson",
    instructorAvatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
    rating: 4.8,
    students: 12450,
    duration: "42 hours",
    price: "Free",
    thumbnail: "https://images.pexels.com/photos/177598/pexels-photo-177598.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2",
    category: "Web Development"
  },
  {
    id: 2,
    title: "Digital Marketing Mastery",
    description: "Master social media, SEO, and content marketing",
    instructor: "Michael Chen",
    instructorAvatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
    rating: 4.9,
    students: 8750,
    duration: "28 hours",
    price: "Free",
    thumbnail: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2",
    category: "Marketing"
  },
  {
    id: 3,
    title: "Python for Data Science",
    description: "Learn Python, pandas, numpy, and machine learning",
    instructor: "Dr. Emily Rodriguez",
    instructorAvatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
    rating: 4.7,
    students: 15200,
    duration: "36 hours",
    price: "Free",
    thumbnail: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2",
    category: "Data Science"
  }
];

const categories = [
  { name: "Web Development", count: 142, icon: "💻" },
  { name: "Data Science", count: 89, icon: "📊" },
  { name: "Digital Marketing", count: 67, icon: "📱" },
  { name: "Design", count: 124, icon: "🎨" },
  { name: "Business", count: 95, icon: "💼" },
  { name: "Photography", count: 78, icon: "📷" }
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-neutral-light">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-800 via-brand-green/80 to-gray-900 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-playfair font-bold text-white mb-6">
              Learn Something New Today
            </h1>
            <p className="text-xl text-white/90 mb-8 font-lora font-light">
              Discover thousands of courses from expert instructors. Start your learning journey with YouTube-powered content.
            </p>
            
            <div className="max-w-2xl mx-auto relative">
              <Input
                type="text"
                placeholder="Search for courses, instructors, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 text-lg border-0 shadow-lg"
              />
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-brand-green hover:bg-brand-green/90 px-6">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-playfair font-semibold text-center mb-12">
            Explore Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="font-semibold mb-2 group-hover:text-brand-green transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{category.count} courses</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-playfair font-semibold mb-2">
                Featured Courses
              </h2>
              <p className="text-gray-600">Hand-picked courses from our best instructors</p>
            </div>
            <Button variant="outline" className="border-brand-green text-brand-green hover:bg-brand-green hover:text-white">
              View All Courses
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer">
                <div className="relative">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <PlayIcon className="w-16 h-16 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <Badge className="absolute top-3 right-3 bg-brand-green text-white">
                    {course.category}
                  </Badge>
                </div>
                
                <CardHeader>
                  <CardTitle className="line-clamp-2 group-hover:text-brand-green transition-colors">
                    {course.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={course.instructorAvatar} />
                      <AvatarFallback>{course.instructor[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-600">{course.instructor}</span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <StarIcon className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUpIcon className="w-4 h-4" />
                      <span>{course.students.toLocaleString()} students</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ClockIcon className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="flex items-center justify-between">
                  <span className="font-semibold text-lg text-brand-green">{course.price}</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="p-2">
                      <BookmarkIcon className="w-4 h-4" />
                    </Button>
                    <Button size="sm" className="bg-brand-green hover:bg-brand-green/90">
                      Enroll Now
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 brand-gradient">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-white/90">Students</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-white/90">Courses</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100+</div>
              <div className="text-white/90">Instructors</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.8</div>
              <div className="text-white/90">Avg Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-playfair font-semibold mb-4">LearnHub</h3>
              <p className="text-gray-300">Your learning marketplace for discovering and sharing knowledge through expert-led courses.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Browse Courses</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Become an Instructor</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mobile App</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 LearnHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}