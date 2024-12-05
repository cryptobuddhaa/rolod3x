import React from 'react';
import { NavLink } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarLinkProps {
  icon: LucideIcon;
  label: string;
  path: string;
}

export function SidebarLink({ icon: Icon, label, path }: SidebarLinkProps) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        cn(
          'p-2 rounded-lg hover:bg-gray-100 transition-colors',
          'flex flex-col items-center gap-0.5',
          isActive ? 'text-blue-600' : 'text-gray-600'
        )
      }
    >
      <Icon className="w-5 h-5" />
      <span className="text-[10px]">{label}</span>
    </NavLink>
  );
}