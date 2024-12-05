import React from 'react';
import { Users, Calendar, MessageSquare, Settings, Sparkles } from 'lucide-react';
import { SidebarLink } from './SidebarLink';

const navItems = [
  { icon: Users, label: 'Contacts', path: '/contacts' },
  { icon: MessageSquare, label: 'Messages', path: '/messages' },
  { icon: Calendar, label: 'Tasks', path: '/tasks' },
  { icon: Sparkles, label: 'AI', path: '/ai' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export function Sidebar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => (
          <SidebarLink key={item.path} {...item} />
        ))}
      </div>
    </nav>
  );
}