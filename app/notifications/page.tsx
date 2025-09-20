'use client';

import { useState } from 'react';
import { BellIcon, CheckIcon, XIcon, UserIcon, BookOpenIcon, HeartIcon, MessageSquareIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Header } from '@/components/layout/header';

// Mock notifications data
const notifications = [
  {
    id: 1,
    type: 'course_update',
    title: 'New video added to React Advanced Patterns',
    message: 'Sarah Johnson added a new video: "Custom Hooks Deep Dive"',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2',
    timestamp: '2 hours ago',
    read: false,
    icon: BookOpenIcon
  },
  {
    id: 2,
    type: 'new_follower',
    title: 'New follower',
    message: 'Alex Chen started following you',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2',
    timestamp: '5 hours ago',
    read: false,
    icon: UserIcon
  },
  {
    id: 3,
    type: 'course_review',
    title: 'New review on your course',
    message: 'Maria Rodriguez left a 5-star review on "Complete Web Development Bootcamp"',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2',
    timestamp: '1 day ago',
    read: true,
    icon: MessageSquareIcon
  },
  {
    id: 4,
    type: 'course_milestone',
    title: 'Course milestone reached!',
    message: 'Your course "Web Development Bootcamp" reached 10,000 students!',
    avatar: null,
    timestamp: '2 days ago',
    read: true,
    icon: HeartIcon
  },
  {
    id: 5,
    type: 'system',
    title: 'Platform update',
    message: 'New features available: Course analytics dashboard and student messaging',
    avatar: null,
    timestamp: '1 week ago',
    read: true,
    icon: BellIcon
  }
];

export default function NotificationsPage() {
  const [notificationList, setNotificationList] = useState(notifications);
  const [filter, setFilter] = useState('all');

  const unreadCount = notificationList.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotificationList(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotificationList(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotificationList(prev => prev.filter(n => n.id !== id));
  };

  const filteredNotifications = notificationList.filter(notification => {
    if (filter === 'unread') return !notification.read;
    if (filter === 'read') return notification.read;
    return true;
  });

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'course_update': return 'bg-blue-500';
      case 'new_follower': return 'bg-green-500';
      case 'course_review': return 'bg-yellow-500';
      case 'course_milestone': return 'bg-purple-500';
      case 'system': return 'bg-gray-500';
      default: return 'bg-brand-green';
    }
  };

  return (
    <div className="min-h-screen bg-neutral-light">
      <Header />
      
      {/* Page Header */}
      <section className="bg-white border-b py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-playfair font-bold mb-2">Notifications</h1>
              <p className="text-gray-600 text-lg">
                Stay updated with your courses and followers
                {unreadCount > 0 && (
                  <Badge className="ml-2 bg-red-500 text-white">
                    {unreadCount} unread
                  </Badge>
                )}
              </p>
            </div>
            {unreadCount > 0 && (
              <Button onClick={markAllAsRead} variant="outline">
                <CheckIcon className="w-4 h-4 mr-2" />
                Mark All Read
              </Button>
            )}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={filter} onValueChange={setFilter} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="all">All ({notificationList.length})</TabsTrigger>
            <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
            <TabsTrigger value="read">Read ({notificationList.length - unreadCount})</TabsTrigger>
          </TabsList>
          
          <TabsContent value={filter}>
            {filteredNotifications.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <BellIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No notifications</h3>
                  <p className="text-gray-600">
                    {filter === 'unread' 
                      ? "You're all caught up! No unread notifications."
                      : "You don't have any notifications yet."
                    }
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredNotifications.map((notification) => {
                  const IconComponent = notification.icon;
                  return (
                    <Card 
                      key={notification.id} 
                      className={`transition-all hover:shadow-md ${
                        !notification.read ? 'border-l-4 border-l-brand-green bg-brand-green/5' : ''
                      }`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="relative">
                            {notification.avatar ? (
                              <Avatar className="w-12 h-12">
                                <AvatarImage src={notification.avatar} />
                                <AvatarFallback>
                                  <IconComponent className="w-6 h-6" />
                                </AvatarFallback>
                              </Avatar>
                            ) : (
                              <div className={`w-12 h-12 rounded-full ${getNotificationColor(notification.type)} flex items-center justify-center`}>
                                <IconComponent className="w-6 h-6 text-white" />
                              </div>
                            )}
                            {!notification.read && (
                              <div className="absolute -top-1 -right-1 w-4 h-4 bg-brand-green rounded-full"></div>
                            )}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="font-semibold text-lg">{notification.title}</h3>
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500">{notification.timestamp}</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => deleteNotification(notification.id)}
                                  className="p-1 h-auto text-gray-400 hover:text-red-500"
                                >
                                  <XIcon className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                            <p className="text-gray-600 mb-3">{notification.message}</p>
                            
                            <div className="flex items-center gap-2">
                              {!notification.read && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => markAsRead(notification.id)}
                                >
                                  <CheckIcon className="w-4 h-4 mr-2" />
                                  Mark as Read
                                </Button>
                              )}
                              
                              {notification.type === 'course_update' && (
                                <Button size="sm" className="bg-brand-green hover:bg-brand-green/90">
                                  View Course
                                </Button>
                              )}
                              
                              {notification.type === 'new_follower' && (
                                <Button size="sm" variant="outline">
                                  View Profile
                                </Button>
                              )}
                              
                              {notification.type === 'course_review' && (
                                <Button size="sm" variant="outline">
                                  View Review
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}