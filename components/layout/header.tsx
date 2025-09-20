'use client';

import { useState } from 'react';
import { BookOpenIcon, UserIcon, MenuIcon, XIcon, BellIcon, HeartIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Mock auth state

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-brand-green p-2 rounded-lg">
              <BookOpenIcon className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-playfair font-bold text-brand-green">LearnHub</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-gray-700 hover:text-brand-green transition-colors font-medium">
              Browse
            </a>
            <a href="/categories" className="text-gray-700 hover:text-brand-green transition-colors font-medium">
              Categories
            </a>
            <a href="/create-course" className="text-gray-700 hover:text-brand-green transition-colors font-medium">
              Teach
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <Button variant="ghost" size="sm" className="p-2">
                  <BellIcon className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm" className="p-2">
                  <HeartIcon className="w-5 h-5" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2" />
                        <AvatarFallback>SJ</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">Sarah Johnson</p>
                        <p className="text-xs text-muted-foreground">sarah@example.com</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <a href="/my-learning">My Learning</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <a href="/notifications">Notifications</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <a href="/instructor/dashboard">My Courses</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <a href="/profile">Profile</a>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <a href="/settings">Settings</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <a href="/help">Help</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <a href="/auth/login">
                  Log In
                  </a>
                </Button>
                <Button className="bg-brand-green hover:bg-brand-green/90" asChild>
                  <a href="/auth/register">
                  Sign Up
                  </a>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <XIcon className="w-6 h-6" />
            ) : (
              <MenuIcon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4">
            <nav className="flex flex-col gap-4">
              <a href="#" className="text-gray-700 hover:text-brand-green transition-colors font-medium">
                Browse
              </a>
              <a href="/categories" className="text-gray-700 hover:text-brand-green transition-colors font-medium">
                Categories
              </a>
              <a href="/create-course" className="text-gray-700 hover:text-brand-green transition-colors font-medium">
                Teach
              </a>
              
              {isLoggedIn ? (
                <div className="flex flex-col gap-2 pt-2 border-t">
                  <a href="/my-learning" className="text-gray-700 hover:text-brand-green transition-colors">
                    My Learning
                  </a>
                  <a href="/notifications" className="text-gray-700 hover:text-brand-green transition-colors">
                    Notifications
                  </a>
                  <a href="/profile" className="text-gray-700 hover:text-brand-green transition-colors">
                    Profile
                  </a>
                  <a href="/settings" className="text-gray-700 hover:text-brand-green transition-colors">
                    Settings
                  </a>
                  <a href="/help" className="text-gray-700 hover:text-brand-green transition-colors">
                    Help
                  </a>
                  <Button variant="ghost" className="justify-start">
                    Log out
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 pt-2 border-t">
                  <Button variant="ghost" className="justify-start" asChild>
                    <a href="/auth/login">
                    Log In
                    </a>
                  </Button>
                  <Button className="justify-start bg-brand-green hover:bg-brand-green/90" asChild>
                    <a href="/auth/register">
                    Sign Up
                    </a>
                  </Button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}