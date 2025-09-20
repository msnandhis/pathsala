'use client';

import { useState, useEffect } from 'react';
import { PlayIcon, BookmarkIcon, ShareIcon, StarIcon, ClockIcon, UsersIcon, FileTextIcon, DownloadIcon, HeartIcon, CheckCircleIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Header } from '@/components/layout/header';

// YouTube Video Player Component
function YouTubePlayer({ videoId, onVideoEnd }: { videoId: string; onVideoEnd: () => void }) {
  const handleStateChange = (event: any) => {
    if (event.data === 0) { // Video ended
      onVideoEnd();
    }
  };

  useEffect(() => {
    // Load YouTube IFrame API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // @ts-ignore
    window.onYouTubeIframeAPIReady = () => {
      // @ts-ignore
      new window.YT.Player('youtube-player', {
        height: '100%',
        width: '100%',
        videoId: videoId,
        events: {
          onStateChange: handleStateChange
        }
      });
    };
  }, [videoId, onVideoEnd, handleStateChange]);

  return (
    <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
      <div id="youtube-player" className="w-full h-full"></div>
    </div>
  );
}

// Mock data for a single course
const course = {
  id: 1,
  title: "Complete Web Development Bootcamp",
  description: "Learn HTML, CSS, JavaScript, React, and Node.js from scratch. Build real-world projects and deploy them to create a professional portfolio that will land you your dream job.",
  instructor: {
    name: "Sarah Johnson",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
    bio: "Full-stack developer with 8+ years of experience. Worked at Google and Netflix. Passionate about teaching and helping students launch their careers.",
    followers: 25400,
    courses: 12,
    rating: 4.8
  },
  rating: 4.8,
  totalRatings: 3420,
  students: 12450,
  duration: "42 hours",
  videos: 156,
  level: "Beginner",
  category: "Web Development",
  price: "Free",
  lastUpdated: "January 2024",
  language: "English",
  thumbnail: "https://images.pexels.com/photos/177598/pexels-photo-177598.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&dpr=2"
};

const courseContent = [
  {
    section: "Getting Started",
    duration: "2 hours",
    videos: [
      { id: 1, title: "Course Introduction", duration: "5:23", completed: true },
      { id: 2, title: "Setting Up Your Development Environment", duration: "12:45", completed: true },
      { id: 3, title: "Your First HTML Page", duration: "8:30", completed: false }
    ]
  },
  {
    section: "HTML Fundamentals", 
    duration: "6 hours",
    videos: [
      { id: 4, title: "HTML Structure and Syntax", duration: "15:20", completed: false },
      { id: 5, title: "Working with Text and Links", duration: "10:15", completed: false },
      { id: 6, title: "Images and Media", duration: "12:30", completed: false },
      { id: 7, title: "Forms and Input Elements", duration: "18:45", completed: false }
    ]
  },
  {
    section: "CSS Styling",
    duration: "8 hours", 
    videos: [
      { id: 8, title: "CSS Basics and Selectors", duration: "20:15", completed: false },
      { id: 9, title: "Box Model and Layout", duration: "25:30", completed: false },
      { id: 10, title: "Flexbox and Grid", duration: "22:45", completed: false },
      { id: 11, title: "Responsive Design", duration: "28:20", completed: false }
    ]
  }
];

const attachments = [
  { id: 1, name: "Course Slides.pdf", size: "2.4 MB", type: "PDF" },
  { id: 2, name: "Code Examples.zip", size: "1.8 MB", type: "ZIP" },
  { id: 3, name: "Resource Links.txt", size: "0.5 KB", type: "TXT" }
];

const reviews = [
  {
    id: 1,
    user: "Alex Chen",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2",
    rating: 5,
    date: "2 days ago",
    comment: "Amazing course! Sarah explains everything so clearly. I went from knowing nothing about web development to building my first website in just 2 weeks."
  },
  {
    id: 2,
    user: "Maria Rodriguez",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2", 
    rating: 5,
    date: "1 week ago",
    comment: "The projects in this course are incredible. I now have a portfolio I'm proud to show employers. Highly recommended!"
  },
  {
    id: 3,
    user: "David Kim",
    avatar: "https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2",
    rating: 4,
    date: "3 weeks ago", 
    comment: "Great course overall. The content is comprehensive and well-structured. Would love to see more advanced topics covered."
  }
];

export default function CoursePage() {
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState(1);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [completedVideos, setCompletedVideos] = useState<number[]>([1, 2]);

  const totalCompletedVideos = completedVideos.length;
  const totalVideos = courseContent.reduce((acc, section) => acc + section.videos.length, 0);
  const progressPercentage = (totalCompletedVideos / totalVideos) * 100;

  const handleVideoComplete = (videoId: number) => {
    if (!completedVideos.includes(videoId)) {
      setCompletedVideos([...completedVideos, videoId]);
    }
  };

  const handleEnrollment = () => {
    setIsEnrolled(true);
    setShowVideoPlayer(true);
  };

  return (
    <div className="min-h-screen bg-neutral-light">
      <Header />
      
      {/* Course Hero */}
      <section className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-brand-green text-white">{course.category}</Badge>
                <Badge variant="outline" className="border-white text-white">{course.level}</Badge>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-playfair font-bold mb-6">
                {course.title}
              </h1>
              
              <p className="text-xl text-gray-300 mb-6">
                {course.description}
              </p>
              
              <div className="flex items-center gap-6 mb-6 text-sm">
                <div className="flex items-center gap-1">
                  <StarIcon className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{course.rating}</span>
                  <span className="text-gray-300">({course.totalRatings.toLocaleString()} ratings)</span>
                </div>
                <div className="flex items-center gap-1">
                  <UsersIcon className="w-5 h-5" />
                  <span>{course.students.toLocaleString()} students</span>
                </div>
                <div className="flex items-center gap-1">
                  <ClockIcon className="w-5 h-5" />
                  <span>{course.duration}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3 mb-8">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={course.instructor.avatar} />
                  <AvatarFallback>{course.instructor.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{course.instructor.name}</p>
                  <p className="text-gray-300 text-sm">{course.instructor.followers.toLocaleString()} followers</p>
                </div>
                <Button
                  variant={isFollowing ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={isFollowing ? "bg-white text-gray-900" : "border-white text-white hover:bg-white hover:text-gray-900"}
                >
                  <HeartIcon className={`w-4 h-4 mr-2 ${isFollowing ? 'fill-current' : ''}`} />
                  {isFollowing ? 'Following' : 'Follow'}
                </Button>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  size="lg" 
                  className="bg-brand-green hover:bg-brand-green/90 px-8"
                  onClick={handleEnrollment}
                >
                  {isEnrolled ? 'Continue Learning' : 'Enroll for Free'}
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`border-white text-white hover:bg-white hover:text-gray-900 ${isBookmarked ? 'bg-white text-gray-900' : ''}`}
                >
                  <BookmarkIcon className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-gray-900"
                >
                  <ShareIcon className="w-5 h-5" />
                </Button>
              </div>
            </div>
            
            <div className="relative shadow-2xl rounded-xl overflow-hidden">
              {showVideoPlayer && isEnrolled ? (
                <YouTubePlayer 
                  videoId="dQw4w9WgXcQ" 
                  onVideoEnd={() => handleVideoComplete(currentVideoId)}
                />
              ) : (
                <div className="aspect-video bg-gray-800 rounded-xl overflow-hidden">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <Button 
                      size="lg" 
                      className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm"
                      onClick={() => setShowVideoPlayer(true)}
                    >
                      <PlayIcon className="w-8 h-8 mr-2" />
                      Preview Course
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="curriculum" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>
              
              <TabsContent value="curriculum" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Content</CardTitle>
                    <CardDescription>
                      {courseContent.length} sections • {totalVideos} videos • {course.duration} total length
                    </CardDescription>
                    {isEnrolled && (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span>Your Progress</span>
                          <span>{totalCompletedVideos}/{totalVideos} videos completed</span>
                        </div>
                        <Progress value={progressPercentage} className="w-full" />
                      </div>
                    )}
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {courseContent.map((section, sectionIndex) => (
                        <AccordionItem key={sectionIndex} value={`section-${sectionIndex}`}>
                          <AccordionTrigger className="text-left">
                            <div className="flex justify-between items-center w-full mr-4">
                              <span className="font-semibold">{section.section}</span>
                              <span className="text-sm text-gray-500">{section.videos.length} videos • {section.duration}</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-2">
                              {section.videos.map((video) => (
                                <div
                                  key={video.id}
                                  className={`flex items-center justify-between p-3 rounded-lg border transition-colors cursor-pointer ${
                                    currentVideoId === video.id ? 'border-brand-green bg-brand-green/5' : 'hover:bg-gray-50'
                                  }`}
                                  onClick={() => setCurrentVideoId(video.id)}
                                >
                                  <div className="flex items-center gap-3">
                                    {completedVideos.includes(video.id) ? (
                                      <CheckCircleIcon className="w-5 h-5 text-brand-green" />
                                    ) : (
                                      <PlayIcon className="w-5 h-5 text-gray-400" />
                                    )}
                                    <span className={completedVideos.includes(video.id) ? 'line-through text-gray-500' : ''}>
                                      {video.title}
                                    </span>
                                  </div>
                                  <span className="text-sm text-gray-500">{video.duration}</span>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="instructor" className="mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <Avatar className="w-20 h-20">
                        <AvatarImage src={course.instructor.avatar} />
                        <AvatarFallback>{course.instructor.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle className="text-2xl">{course.instructor.name}</CardTitle>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                          <span>{course.instructor.followers.toLocaleString()} followers</span>
                          <span>{course.instructor.courses} courses</span>
                          <div className="flex items-center gap-1">
                            <StarIcon className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>{course.instructor.rating} rating</span>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant={isFollowing ? "secondary" : "outline"}
                        onClick={() => setIsFollowing(!isFollowing)}
                      >
                        <HeartIcon className={`w-4 h-4 mr-2 ${isFollowing ? 'fill-current' : ''}`} />
                        {isFollowing ? 'Following' : 'Follow'}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{course.instructor.bio}</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Student Reviews</CardTitle>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <StarIcon className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                        <span className="text-2xl font-bold">{course.rating}</span>
                      </div>
                      <span className="text-gray-600">{course.totalRatings.toLocaleString()} reviews</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div key={review.id} className="border-b pb-6 last:border-b-0">
                          <div className="flex items-start gap-4">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={review.avatar} />
                              <AvatarFallback>{review.user[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-semibold">{review.user}</span>
                                <div className="flex items-center">
                                  {Array.from({ length: review.rating }).map((_, i) => (
                                    <StarIcon key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                  ))}
                                </div>
                                <span className="text-sm text-gray-500">{review.date}</span>
                              </div>
                              <p className="text-gray-700">{review.comment}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="resources" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Resources</CardTitle>
                    <CardDescription>Download supplementary materials and resources</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {attachments.map((attachment) => (
                        <div key={attachment.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <FileTextIcon className="w-8 h-8 text-brand-green" />
                            <div>
                              <p className="font-medium">{attachment.name}</p>
                              <p className="text-sm text-gray-500">{attachment.size} • {attachment.type}</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <DownloadIcon className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Level</span>
                  <span>{course.level}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span>{course.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Videos</span>
                  <span>{course.videos}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Language</span>
                  <span>{course.language}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Updated</span>
                  <span>{course.lastUpdated}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Share This Course</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm">Facebook</Button>
                  <Button variant="outline" size="sm">Twitter</Button>
                  <Button variant="outline" size="sm">LinkedIn</Button>
                  <Button variant="outline" size="sm">Copy Link</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}