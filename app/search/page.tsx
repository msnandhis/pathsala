'use client';

import { useState } from 'react';
import { SearchIcon, FilterIcon, SortAscIcon, GridIcon, ListIcon, StarIcon, ClockIcon, TrendingUpIcon, BookmarkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Header } from '@/components/layout/header';

// Mock search results
const searchResults = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    description: "Learn HTML, CSS, JavaScript, React, and Node.js from scratch. Build real-world projects and deploy them to create a professional portfolio.",
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
    description: "Master social media marketing, SEO, content marketing, email marketing, and analytics to grow any business online.",
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
    description: "Learn Python programming, data analysis with pandas, visualization with matplotlib, and machine learning fundamentals.",
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
    description: "Learn design principles, wireframing, prototyping, and user research. Create stunning interfaces that users love.",
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
    title: "JavaScript Advanced Concepts",
    description: "Master closures, prototypes, async programming, and modern ES6+ features. Take your JavaScript skills to the next level.",
    instructor: "Sarah Johnson",
    instructorAvatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
    rating: 4.9,
    students: 9200,
    duration: "18 hours",
    videos: 65,
    level: "Advanced",
    thumbnail: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2",
    category: "Web Development",
    price: "Free",
    lastUpdated: "2024-01-08"
  }
];

const categories = [
  "Web Development",
  "Data Science",
  "Digital Marketing",
  "Design",
  "Business",
  "Photography"
];

const levels = ["Beginner", "Intermediate", "Advanced"];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredResults = searchResults.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(course.category);
    const matchesLevel = selectedLevels.length === 0 || selectedLevels.includes(course.level);
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const sortedResults = [...filteredResults].sort((a, b) => {
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

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleLevel = (level: string) => {
    setSelectedLevels(prev =>
      prev.includes(level)
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
  };

  return (
    <div className="min-h-screen bg-neutral-light">
      <Header />
      
      {/* Search Header */}
      <section className="bg-white border-b py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-playfair font-bold mb-6">Search Courses</h1>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for courses, instructors, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-3 text-lg"
              />
            </div>
            <Button className="bg-brand-green hover:bg-brand-green/90 px-8">
              Search
            </Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className={`lg:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-playfair font-semibold text-lg">Filters</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedCategories([]);
                    setSelectedLevels([]);
                  }}
                >
                  Clear All
                </Button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Categories</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={category}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => toggleCategory(category)}
                        />
                        <label htmlFor={category} className="text-sm cursor-pointer">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Level</h4>
                  <div className="space-y-2">
                    {levels.map((level) => (
                      <div key={level} className="flex items-center space-x-2">
                        <Checkbox
                          id={level}
                          checked={selectedLevels.includes(level)}
                          onCheckedChange={() => toggleLevel(level)}
                        />
                        <label htmlFor={level} className="text-sm cursor-pointer">
                          {level}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Duration</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="short" />
                      <label htmlFor="short" className="text-sm cursor-pointer">
                        0-2 hours
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="medium" />
                      <label htmlFor="medium" className="text-sm cursor-pointer">
                        3-6 hours
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="long" />
                      <label htmlFor="long" className="text-sm cursor-pointer">
                        7+ hours
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <FilterIcon className="w-4 h-4 mr-2" />
                Filters
              </Button>
              
              <div className="flex-1">
                <p className="text-gray-600">
                  Showing {sortedResults.length} results
                  {searchQuery && ` for "${searchQuery}"`}
                </p>
              </div>
              
              <div className="flex gap-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Most Relevant</SelectItem>
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

            {/* Results */}
            {sortedResults.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <SearchIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No courses found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your search terms or filters
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategories([]);
                      setSelectedLevels([]);
                    }}
                  >
                    Clear Search
                  </Button>
                </CardContent>
              </Card>
            ) : viewMode === 'grid' ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedResults.map((course) => (
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
                    
                    <div className="p-6 pt-0 flex gap-2">
                      <Button variant="outline" size="sm" className="p-2 flex-shrink-0">
                        <BookmarkIcon className="w-4 h-4" />
                      </Button>
                      <Button size="sm" className="bg-brand-green hover:bg-brand-green/90 flex-1">
                        Enroll Now
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {sortedResults.map((course) => (
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