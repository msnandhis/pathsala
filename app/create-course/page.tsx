'use client';

import { useState } from 'react';
import { PlusIcon, XIcon, MoveIcon, UploadIcon, LinkIcon, FileTextIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Header } from '@/components/layout/header';

interface Video {
  id: number;
  title: string;
  youtubeUrl: string;
  duration?: string;
}

interface CourseSection {
  id: number;
  title: string;
  videos: Video[];
}

const categories = [
  "Web Development",
  "Data Science", 
  "Digital Marketing",
  "Design",
  "Business",
  "Photography"
];

export default function CreateCoursePage() {
  const [activeTab, setActiveTab] = useState('basics');
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    category: '',
    level: '',
    thumbnail: ''
  });
  
  const [courseSections, setCourseSections] = useState<CourseSection[]>([
    {
      id: 1,
      title: '',
      videos: []
    }
  ]);
  
  const [attachments, setAttachments] = useState<any[]>([]);

  const addSection = () => {
    const newSection: CourseSection = {
      id: Date.now(),
      title: '',
      videos: []
    };
    setCourseSections([...courseSections, newSection]);
  };

  const addVideo = (sectionId: number) => {
    const newVideo: Video = {
      id: Date.now(),
      title: '',
      youtubeUrl: ''
    };
    
    setCourseSections(courseSections.map(section => 
      section.id === sectionId 
        ? { ...section, videos: [...section.videos, newVideo] }
        : section
    ));
  };

  const removeSection = (sectionId: number) => {
    setCourseSections(courseSections.filter(section => section.id !== sectionId));
  };

  const removeVideo = (sectionId: number, videoId: number) => {
    setCourseSections(courseSections.map(section =>
      section.id === sectionId
        ? { ...section, videos: section.videos.filter(video => video.id !== videoId) }
        : section
    ));
  };

  const updateSectionTitle = (sectionId: number, title: string) => {
    setCourseSections(courseSections.map(section =>
      section.id === sectionId ? { ...section, title } : section
    ));
  };

  const updateVideo = (sectionId: number, videoId: number, field: string, value: string) => {
    setCourseSections(courseSections.map(section =>
      section.id === sectionId
        ? {
            ...section,
            videos: section.videos.map(video =>
              video.id === videoId ? { ...video, [field]: value } : video
            )
          }
        : section
    ));
  };

  const handlePublishCourse = () => {
    // Validate course data
    if (!courseData.title || !courseData.description || !courseData.category || !courseData.level) {
      alert('Please fill in all required fields');
      return;
    }

    if (courseSections.length === 0 || courseSections.every(section => section.videos.length === 0)) {
      alert('Please add at least one video to your course');
      return;
    }

    console.log('Publishing course:', {
      ...courseData,
      sections: courseSections,
      attachments
    });
    
    // Simulate API call
    setTimeout(() => {
      alert('Course published successfully! Students can now enroll.');
      // Redirect to instructor dashboard
      window.location.href = '/instructor/dashboard';
    }, 1000);
  };

  const saveDraft = () => {
    console.log('Saving draft:', {
      ...courseData,
      sections: courseSections,
      attachments
    });
    alert('Course saved as draft!');
  };

  const extractYouTubeVideoId = (url: string) => {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  return (
    <div className="min-h-screen bg-neutral-light">
      <Header />
      
      {/* Page Header */}
      <section className="bg-white border-b py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-playfair font-bold mb-4">Create New Course</h1>
          <p className="text-gray-600 text-lg">Share your knowledge and create an amazing learning experience</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="basics">Course Basics</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="publish">Publish</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basics">
              <Card>
                <CardHeader>
                  <CardTitle>Course Information</CardTitle>
                  <CardDescription>
                    Provide the basic information about your course
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Course Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Complete Web Development Bootcamp"
                      value={courseData.title}
                      onChange={(e) => setCourseData({...courseData, title: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Course Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe what students will learn in this course..."
                      rows={4}
                      value={courseData.description}
                      onChange={(e) => setCourseData({...courseData, description: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select
                        value={courseData.category}
                        onValueChange={(value) => setCourseData({...courseData, category: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="level">Course Level *</Label>
                      <Select
                        value={courseData.level}
                        onValueChange={(value) => setCourseData({...courseData, level: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select difficulty level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Beginner">Beginner</SelectItem>
                          <SelectItem value="Intermediate">Intermediate</SelectItem>
                          <SelectItem value="Advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="thumbnail">Course Thumbnail URL</Label>
                    <Input
                      id="thumbnail"
                      placeholder="https://example.com/image.jpg"
                      value={courseData.thumbnail}
                      onChange={(e) => setCourseData({...courseData, thumbnail: e.target.value})}
                    />
                    {courseData.thumbnail && (
                      <div className="mt-2">
                        <img
                          src={courseData.thumbnail}
                          alt="Course thumbnail preview"
                          className="w-64 h-36 object-cover rounded-lg border"
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="curriculum">
              <Card>
                <CardHeader>
                  <CardTitle>Course Curriculum</CardTitle>
                  <CardDescription>
                    Organize your course content into sections and videos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {courseSections.map((section, sectionIndex) => (
                      <div key={section.id} className="border rounded-lg p-6 space-y-4">
                        <div className="flex items-center gap-4">
                          <div className="flex-1">
                            <Input
                              placeholder={`Section ${sectionIndex + 1} Title`}
                              value={section.title}
                              onChange={(e) => updateSectionTitle(section.id, e.target.value)}
                            />
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeSection(section.id)}
                            disabled={courseSections.length === 1}
                          >
                            <XIcon className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <div className="space-y-3">
                          {section.videos.map((video, videoIndex) => (
                            <div key={video.id} className="bg-gray-50 rounded-lg p-4 space-y-3">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium">Video {videoIndex + 1}</h4>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeVideo(section.id, video.id)}
                                >
                                  <XIcon className="w-4 h-4" />
                                </Button>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor={`video-title-${video.id}`}>Video Title</Label>
                                  <Input
                                    id={`video-title-${video.id}`}
                                    placeholder="e.g., Introduction to HTML"
                                    value={video.title}
                                    onChange={(e) => updateVideo(section.id, video.id, 'title', e.target.value)}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor={`video-duration-${video.id}`}>Duration (optional)</Label>
                                  <Input
                                    id={`video-duration-${video.id}`}
                                    placeholder="e.g., 15:30"
                                    value={video.duration || ''}
                                    onChange={(e) => updateVideo(section.id, video.id, 'duration', e.target.value)}
                                  />
                                </div>
                              </div>
                              
                              <div>
                                <Label htmlFor={`youtube-url-${video.id}`}>YouTube URL</Label>
                                <div className="flex gap-2">
                                  <LinkIcon className="w-5 h-5 text-gray-400 mt-2" />
                                  <Input
                                    id={`youtube-url-${video.id}`}
                                    placeholder="https://www.youtube.com/watch?v=..."
                                    value={video.youtubeUrl}
                                    onChange={(e) => updateVideo(section.id, video.id, 'youtubeUrl', e.target.value)}
                                  />
                                </div>
                                {video.youtubeUrl && extractYouTubeVideoId(video.youtubeUrl) && (
                                  <div className="mt-2">
                                    <p className="text-sm text-green-600">✓ Valid YouTube URL</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                          
                          <Button
                            variant="outline"
                            onClick={() => addVideo(section.id)}
                            className="w-full"
                          >
                            <PlusIcon className="w-4 h-4 mr-2" />
                            Add Video
                          </Button>
                        </div>
                      </div>
                    ))}
                    
                    <Button onClick={addSection} className="bg-brand-green hover:bg-brand-green/90">
                      <PlusIcon className="w-4 h-4 mr-2" />
                      Add Section
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="resources">
              <Card>
                <CardHeader>
                  <CardTitle>Course Resources</CardTitle>
                  <CardDescription>
                    Add supplementary files and materials for your students
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <UploadIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Upload Course Resources</h3>
                      <p className="text-gray-600 mb-4">
                        Upload PDFs, documents, code files, or other resources for your students
                      </p>
                      <Button variant="outline">
                        <UploadIcon className="w-4 h-4 mr-2" />
                        Choose Files
                      </Button>
                    </div>
                    
                    {attachments.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="font-semibold">Uploaded Resources</h4>
                        {attachments.map((attachment, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <FileTextIcon className="w-6 h-6 text-brand-green" />
                              <div>
                                <p className="font-medium">{attachment.name}</p>
                                <p className="text-sm text-gray-500">{attachment.size}</p>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              <XIcon className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="publish">
              <Card>
                <CardHeader>
                  <CardTitle>Publish Your Course</CardTitle>
                  <CardDescription>
                    Review your course details before publishing
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-brand-beige/20 rounded-lg p-6">
                    <h3 className="font-semibold text-lg mb-4">Course Summary</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Title:</span>
                        <p className="font-medium">{courseData.title || 'Not set'}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Category:</span>
                        <p className="font-medium">{courseData.category || 'Not set'}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Level:</span>
                        <p className="font-medium">{courseData.level || 'Not set'}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Sections:</span>
                        <p className="font-medium">{courseSections.length} sections</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Total Videos:</span>
                        <p className="font-medium">
                          {courseSections.reduce((acc, section) => acc + section.videos.length, 0)} videos
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Resources:</span>
                        <p className="font-medium">{attachments.length} files</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold">Before Publishing</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Course title and description are complete</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">All video links are working</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Course content is original or properly licensed</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">I agree to the platform terms and conditions</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <Button variant="outline" className="flex-1">
                      <Button variant="outline" className="flex-1" onClick={saveDraft}>
                        Save as Draft
                      </Button>
                    </Button>
                    <Button 
                      onClick={handlePublishCourse}
                      className="flex-1 bg-brand-green hover:bg-brand-green/90"
                    >
                      Publish Course
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}