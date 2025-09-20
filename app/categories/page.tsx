'use client';

import { useState } from 'react';
import { FilterIcon, GridIcon, ListIcon, StarIcon, ClockIcon, TrendingUpIcon, BookmarkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Header } from '@/components/layout/header';

// Mock data
const categories = [
  { id: 1, name: "Web Development", count: 142 },
  { id: 2, name: "Data Science", count: 89 },
  { id: 3, name: "Digital Marketing", count: 67 },
  { id: 4, name: "Design", count: 124 },
  { id: 5, name: "Business", count: 95 },
  { id: 6, name: "Photography", count: 78 }
];

const courses = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    description: "Learn HTML, CSS, JavaScript, React, and Node.js from scratch. Build real-world projects and deploy them.",
    instructor: "Sarah Johnson",
    instructorAvatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
    rating: 4.8,
    students: 12450,
    duration: "42 hours",
    videos: 156,
    level: "Beginner",
    thumbnail: "https://images.pexels.com/photos/177598/pexels-photo-177598.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2",
    category: "Web Development",
    price: "Free",
    lastUpdated: "2024-01-15"
  },
  {
    id: 2,
    title: "Digital Marketing Mastery",
    description: "Master social media marketing, SEO, content marketing, email marketing, and analytics.",
    instructor: "Michael Chen",
    instructorAvatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
    rating: 4.9,
    students: 8750,
    duration: "28 hours",
    videos: 98,
    level: "Intermediate",
    thumbnail: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2",
    category: "Digital Marketing",
    price: "Free",
    lastUpdated: "2024-01-20"
  },
  {
    id: 3,
    title: "Python for Data Science",
    description: "Learn Python programming, data analysis with pandas, visualization with matplotlib, and machine learning.",
    instructor: "Dr. Emily Rodriguez",
    instructorAvatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
    rating: 4.7,
    students: 15200,
    duration: "36 hours",
    videos: 124,
    level: "Beginner",
    thumbnail: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2",
    category: "Data Science",
    price: "Free",
    lastUpdated: "2024-01-10"
  },
  {
    id: 4,
    title: "UI/UX Design Fundamentals",
    description: "Learn design principles, wireframing, prototyping, and user research. Create stunning interfaces.",
    instructor: "Alex Thompson",
    instructorAvatar: "https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
    rating: 4.6,
    students: 6890,
    duration: "24 hours",
    videos: 87,
    level: "Beginner",
    thumbnail: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2",
    category: "Design",
    price: "Free",
    lastUpdated: "2024-01-25"
  },
  {
    id: 5,
    title: "Business Strategy & Analytics",
    description: "Learn strategic planning, market analysis, financial modeling, and data-driven decision making.",
    instructor: "James Wilson",
    instructorAvatar: "https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
    rating: 4.5,
    students: 4320,
    duration: "32 hours",
    videos: 112,
    level: "Advanced",
    thumbnail: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2",
    category: "Business",
    price: "Free",
    lastUpdated: "2024-01-18"
  },
  {
    id: 6,
    title: "Photography Masterclass",
    description: "Master composition, lighting, editing, and storytelling. Shoot like a professional photographer.",
    instructor: "Lisa Park",
    instructorAvatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
    rating: 4.8,
    students: 9100,
    duration: "30 hours",
    videos: 95,
    level: "Intermediate",
    thumbnail: "https://images.pexels.com/photos/606541/pexels-photo-606541.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2",
    category: "Photography",
    price: "Free",
    lastUpdated: "2024-01-12"
  }
];

export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.students - a.students;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      case 'duration':
        return parseInt(a.duration) - parseInt(b.duration);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-neutral-light">
      <Header />
      
      {/* Page Header */}
      <section className="bg-white border-b py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-playfair font-bold mb-4">Browse Courses</h1>
          <p className="text-gray-600 text-lg">Discover your next learning adventure from our extensive course library</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <h3 className="font-playfair font-semibold text-lg mb-4">Categories</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-brand-green text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  All Categories ({courses.length})
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === category.name
                        ? 'bg-brand-green text-white'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>

              <div className="border-t pt-6 mt-6">
                <h4 className="font-semibold mb-3">Level</h4>
                <div className="space-y-2">
                  {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                    <label key={level} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="text-sm">{level}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Controls */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex gap-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="duration">Duration</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex border rounded-lg">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <GridIcon className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    <ListIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Results Summary */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {sortedCourses.length} courses
                {selectedCategory !== 'all' && ` in ${selectedCategory}`}
              </p>
            </div>

            {/* Course Grid */}
            {viewMode === 'grid' ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedCourses.map((course) => (
                  <Card key={course.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer">
                    <div className="relative">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-3 right-3 bg-brand-green text-white">
                        {course.level}
                      </Badge>
                    </div>
                    
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">{course.category}</Badge>
                        <span className="font-semibold text-brand-green">{course.price}</span>
                      </div>
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
                      
                      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <StarIcon className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>{course.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUpIcon className="w-4 h-4" />
                          <span>{course.students.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ClockIcon className="w-4 h-4" />
                          <span>{course.duration}</span>
                        </div>
                        <div>
                          <span>{course.videos} videos</span>
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="flex gap-2">
                      <Button variant="outline" size="sm" className="p-2 flex-shrink-0">
                        <BookmarkIcon className="w-4 h-4" />
                      </Button>
                      <Button size="sm" className="bg-brand-green hover:bg-brand-green/90 flex-1">
                        Enroll Now
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {sortedCourses.map((course) => (
                  <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="flex">
                      <div className="w-48 h-32 flex-shrink-0">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 p-6">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex gap-2">
                            <Badge variant="outline">{course.category}</Badge>
                            <Badge className="bg-brand-green text-white">{course.level}</Badge>
                          </div>
                          <span className="font-semibold text-lg text-brand-green">{course.price}</span>
                        </div>
                        
                        <h3 className="text-xl font-playfair font-semibold mb-2 hover:text-brand-green transition-colors cursor-pointer">
                          {course.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Avatar className="w-6 h-6">
                                <AvatarImage src={course.instructorAvatar} />
                                <AvatarFallback>{course.instructor[0]}</AvatarFallback>
                              </Avatar>
                              <span>{course.instructor}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <StarIcon className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span>{course.rating}</span>
                            </div>
                            <span>{course.students.toLocaleString()} students</span>
                            <span>{course.duration}</span>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="p-2">
                              <BookmarkIcon className="w-4 h-4" />
                            </Button>
                            <Button size="sm" className="bg-brand-green hover:bg-brand-green/90">
                              Enroll Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}