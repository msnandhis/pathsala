'use client';

import { useState } from 'react';
import { SearchIcon, HelpCircleIcon, BookOpenIcon, MessageSquareIcon, MailIcon, PhoneIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Header } from '@/components/layout/header';

const faqData = [
  {
    category: 'Getting Started',
    questions: [
      {
        question: 'How do I create an account?',
        answer: 'You can create an account by clicking the "Sign Up" button and choosing to register with Google or email. After registration, you\'ll go through a quick onboarding process to personalize your experience.'
      },
      {
        question: 'Are all courses free?',
        answer: 'Yes! Currently all courses on our platform are completely free. We believe in making quality education accessible to everyone.'
      },
      {
        question: 'How do I enroll in a course?',
        answer: 'Simply browse to any course page and click the "Enroll for Free" button. You\'ll immediately have access to all course content and can start learning right away.'
      }
    ]
  },
  {
    category: 'Learning',
    questions: [
      {
        question: 'How do I track my progress?',
        answer: 'Your progress is automatically tracked as you watch videos. You can view your overall progress on the course page and see detailed statistics in your "My Learning" dashboard.'
      },
      {
        question: 'Can I download course materials?',
        answer: 'Yes! Many courses include downloadable resources like PDFs, code files, and reference materials. Look for the "Resources" tab on the course page.'
      },
      {
        question: 'How do I bookmark courses?',
        answer: 'Click the bookmark icon on any course card or course page to save it for later. You can view all your bookmarked courses in your profile under "Bookmarks".'
      }
    ]
  },
  {
    category: 'Teaching',
    questions: [
      {
        question: 'How do I become an instructor?',
        answer: 'When you sign up, select "Teach and create courses" as your role. You\'ll then have access to the course creation tools and instructor dashboard.'
      },
      {
        question: 'What video formats are supported?',
        answer: 'We use YouTube videos embedded in our platform. Simply paste your YouTube video URLs when creating your course content.'
      },
      {
        question: 'How do I organize my course content?',
        answer: 'You can organize your course into sections, with multiple videos per section. This helps students follow a logical learning path through your material.'
      }
    ]
  },
  {
    category: 'Technical',
    questions: [
      {
        question: 'What browsers are supported?',
        answer: 'Our platform works on all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated for the best experience.'
      },
      {
        question: 'Can I use the platform on mobile?',
        answer: 'Yes! Our platform is fully responsive and works great on mobile devices and tablets. You can learn on the go from any device.'
      },
      {
        question: 'What if videos won\'t load?',
        answer: 'Video loading issues are usually related to internet connection or browser settings. Try refreshing the page, clearing your browser cache, or switching to a different browser.'
      }
    ]
  }
];

const contactOptions = [
  {
    title: 'Email Support',
    description: 'Get help via email within 24 hours',
    icon: MailIcon,
    contact: 'support@learnhub.com',
    action: 'Send Email'
  },
  {
    title: 'Community Forum',
    description: 'Ask questions and get help from the community',
    icon: MessageSquareIcon,
    contact: 'Join our community discussions',
    action: 'Visit Forum'
  },
  {
    title: 'Live Chat',
    description: 'Chat with our support team (Mon-Fri, 9AM-5PM)',
    icon: HelpCircleIcon,
    contact: 'Available during business hours',
    action: 'Start Chat'
  }
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', ...faqData.map(section => section.category)];

  const filteredFAQs = faqData.filter(section => {
    if (selectedCategory === 'all') return true;
    return section.category === selectedCategory;
  }).map(section => ({
    ...section,
    questions: section.questions.filter(q => 
      searchQuery === '' || 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.questions.length > 0);

  return (
    <div className="min-h-screen bg-neutral-light">
      <Header />
      
      {/* Page Header */}
      <section className="bg-white border-b py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-playfair font-bold mb-4">Help Center</h1>
          <p className="text-gray-600 text-lg mb-8">Find answers to common questions and get the help you need</p>
          
          {/* Search */}
          <div className="max-w-2xl mx-auto relative">
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-4 text-lg"
            />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="faq" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="faq">Frequently Asked Questions</TabsTrigger>
            <TabsTrigger value="contact">Contact Support</TabsTrigger>
          </TabsList>
          
          <TabsContent value="faq">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Category Filter */}
              <div className="lg:w-64 flex-shrink-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                            selectedCategory === category
                              ? 'bg-brand-green text-white'
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          {category === 'all' ? 'All Categories' : category}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* FAQ Content */}
              <div className="flex-1">
                {filteredFAQs.length === 0 ? (
                  <Card className="text-center py-12">
                    <CardContent>
                      <HelpCircleIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No results found</h3>
                      <p className="text-gray-600">
                        Try adjusting your search terms or browse different categories
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-8">
                    {filteredFAQs.map((section) => (
                      <Card key={section.category}>
                        <CardHeader>
                          <CardTitle>{section.category}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Accordion type="single" collapsible className="w-full">
                            {section.questions.map((faq, index) => (
                              <AccordionItem key={index} value={`${section.category}-${index}`}>
                                <AccordionTrigger className="text-left">
                                  {faq.question}
                                </AccordionTrigger>
                                <AccordionContent>
                                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                                </AccordionContent>
                              </AccordionItem>
                            ))}
                          </Accordion>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="contact">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-playfair font-bold mb-4">Get in Touch</h2>
                <p className="text-gray-600 text-lg">
                  Can't find what you're looking for? Our support team is here to help.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {contactOptions.map((option) => {
                  const IconComponent = option.icon;
                  return (
                    <Card key={option.title} className="text-center hover:shadow-lg transition-shadow">
                      <CardContent className="pt-8">
                        <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                          <IconComponent className="w-8 h-8 text-brand-green" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{option.title}</h3>
                        <p className="text-gray-600 mb-4">{option.description}</p>
                        <p className="text-sm text-gray-500 mb-6">{option.contact}</p>
                        <Button className="bg-brand-green hover:bg-brand-green/90">
                          {option.action}
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Quick Help */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Help</CardTitle>
                  <CardDescription>Common issues and quick solutions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold">Account Issues</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Reset your password from the login page</li>
                        <li>• Update your profile in Settings</li>
                        <li>• Change notification preferences</li>
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-semibold">Course Problems</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Refresh the page if videos won't load</li>
                        <li>• Check your internet connection</li>
                        <li>• Clear browser cache and cookies</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}