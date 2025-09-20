'use client';

import { useState } from 'react';
import { CameraIcon, EditIcon, MapPinIcon, CalendarIcon, LinkIcon, MailIcon, StarIcon, BookOpenIcon, UsersIcon, AwardIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Header } from '@/components/layout/header';

// Mock user data
const userData = {
  id: 1,
  name: "Sarah Johnson",
  email: "sarah@example.com",
  avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
  bio: "Full-stack developer with 8+ years of experience. Passionate about teaching and helping students launch their careers in tech.",
  location: "San Francisco, CA",
  website: "https://sarahjohnson.dev",
  joinedDate: "January 2023",
  role: "instructor",
  stats: {
    coursesCreated: 12,
    totalStudents: 25400,
    averageRating: 4.8,
    totalReviews: 1250
  }
};

const achievements = [
  { id: 1, title: "Top Instructor", description: "Rated in top 10% of instructors", icon: "🏆", earned: true },
  { id: 2, title: "Course Creator", description: "Published 10+ courses", icon: "📚", earned: true },
  { id: 3, title: "Student Favorite", description: "1000+ positive reviews", icon: "⭐", earned: true },
  { id: 4, title: "Community Leader", description: "Active in discussions", icon: "👥", earned: false }
];

const createdCourses = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    students: 12450,
    rating: 4.8,
    reviews: 420,
    thumbnail: "https://images.pexels.com/photos/177598/pexels-photo-177598.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2",
    status: "published"
  },
  {
    id: 2,
    title: "React Advanced Patterns",
    students: 8750,
    rating: 4.9,
    reviews: 280,
    thumbnail: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2",
    status: "published"
  },
  {
    id: 3,
    title: "Node.js Masterclass",
    students: 0,
    rating: 0,
    reviews: 0,
    thumbnail: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2",
    status: "draft"
  }
];

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: userData.name,
    bio: userData.bio,
    location: userData.location,
    website: userData.website
  });

  const handleSave = () => {
    console.log('Saving profile:', profileData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-neutral-light">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Avatar and Basic Info */}
              <div className="flex flex-col items-center md:items-start">
                <div className="relative">
                  <Avatar className="w-32 h-32">
                    <AvatarImage src={userData.avatar} />
                    <AvatarFallback className="text-2xl">{userData.name[0]}</AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 rounded-full w-10 h-10 p-0 bg-brand-green hover:bg-brand-green/90"
                  >
                    <CameraIcon className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="text-center md:text-left mt-4">
                  <Badge className="bg-brand-green text-white mb-2">
                    {userData.role === 'instructor' ? 'Instructor' : 'Student'}
                  </Badge>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CalendarIcon className="w-4 h-4" />
                    <span>Joined {userData.joinedDate}</span>
                  </div>
                </div>
              </div>
              
              {/* Profile Details */}
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        rows={3}
                        value={profileData.bio}
                        onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={profileData.location}
                          onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          value={profileData.website}
                          onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleSave} className="bg-brand-green hover:bg-brand-green/90">
                        Save Changes
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h1 className="text-3xl font-playfair font-bold mb-2">{userData.name}</h1>
                        <p className="text-gray-600 mb-4">{userData.bio}</p>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(true)}
                        className="flex-shrink-0"
                      >
                        <EditIcon className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Button>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MailIcon className="w-4 h-4" />
                        <span>{userData.email}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPinIcon className="w-4 h-4" />
                        <span>{userData.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <LinkIcon className="w-4 h-4" />
                        <a href={userData.website} className="text-brand-green hover:underline">
                          {userData.website}
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Stats for Instructors */}
            {userData.role === 'instructor' && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 pt-8 border-t">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <BookOpenIcon className="w-5 h-5 text-brand-green mr-2" />
                    <span className="text-2xl font-bold text-brand-green">{userData.stats.coursesCreated}</span>
                  </div>
                  <p className="text-sm text-gray-600">Courses Created</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <UsersIcon className="w-5 h-5 text-brand-green mr-2" />
                    <span className="text-2xl font-bold text-brand-green">{userData.stats.totalStudents.toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-gray-600">Total Students</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <StarIcon className="w-5 h-5 text-brand-green mr-2" />
                    <span className="text-2xl font-bold text-brand-green">{userData.stats.averageRating}</span>
                  </div>
                  <p className="text-sm text-gray-600">Average Rating</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <AwardIcon className="w-5 h-5 text-brand-green mr-2" />
                    <span className="text-2xl font-bold text-brand-green">{userData.stats.totalReviews.toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-gray-600">Reviews</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="courses" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="courses" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {createdCourses.map((course) => (
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
                  </CardHeader>
                  
                  <CardContent>
                    {course.status === 'published' ? (
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center justify-between">
                          <span>{course.students.toLocaleString()} students</span>
                          <div className="flex items-center gap-1">
                            <StarIcon className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>{course.rating}</span>
                          </div>
                        </div>
                        <div>{course.reviews} reviews</div>
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
              
              {/* Add New Course Card */}
              <Card className="border-2 border-dashed border-gray-300 hover:border-brand-green transition-colors cursor-pointer">
                <CardContent className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center mb-4">
                    <BookOpenIcon className="w-8 h-8 text-brand-green" />
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
          
          <TabsContent value="achievements" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              {achievements.map((achievement) => (
                <Card key={achievement.id} className={`${achievement.earned ? 'border-brand-green/50 bg-brand-green/5' : 'opacity-75'}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{achievement.title}</h3>
                          {achievement.earned && (
                            <Badge className="bg-brand-green text-white">Earned</Badge>
                          )}
                        </div>
                        <p className="text-gray-600">{achievement.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="mt-6">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Email Notifications</h4>
                      <p className="text-sm text-gray-600">Receive updates about your courses</p>
                    </div>
                    <input type="checkbox" className="rounded" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Marketing Emails</h4>
                      <p className="text-sm text-gray-600">Receive promotional content</p>
                    </div>
                    <input type="checkbox" className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Course Recommendations</h4>
                      <p className="text-sm text-gray-600">Get personalized course suggestions</p>
                    </div>
                    <input type="checkbox" className="rounded" defaultChecked />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>Control your profile visibility</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Public Profile</h4>
                      <p className="text-sm text-gray-600">Make your profile visible to others</p>
                    </div>
                    <input type="checkbox" className="rounded" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Show Learning Progress</h4>
                      <p className="text-sm text-gray-600">Display your course progress</p>
                    </div>
                    <input type="checkbox" className="rounded" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Danger Zone</CardTitle>
                  <CardDescription>Irreversible account actions</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="destructive">Delete Account</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}