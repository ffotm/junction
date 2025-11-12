'use client'
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Settings, 
  HelpCircle, 
  LogOut,
  Moon,
  Sun,
  Fish,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  currentPage?: string;
  onPageChange?: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage = 'dashboard', onPageChange }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      href: '/dashboard'
    },
    {
      id: 'pond-owners',
      label: 'Pond Owners',
      icon: Users,
      href: '/dashboard/pond-owners'
    },
    {
      id: 'admin-requests',
      label: 'Admin Requests',
      icon: FileText,
      href: '/dashboard/admin-requests'
    }
  ];

  const bottomMenuItems = [
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      href: '/dashboard/settings'
    },
    {
      id: 'help',
      label: 'Help & Center',
      icon: HelpCircle,
      href: '/dashboard/help'
    }
  ];

  const handleMenuClick = (itemId: string, href: string) => {
    if (onPageChange) {
      onPageChange(itemId);
    }
    // In a real app, you'd use Next.js router here
    // router.push(href);
  };

  return (
    <motion.div
      initial={{ x: -280 }}
      animate={{ x: 0, width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="bg-white border-r border-gray-200 h-screen flex flex-col shadow-lg relative"
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center space-x-2"
            >
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Fish className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Waqti</span>
            </motion.div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-gray-500 hover:text-gray-700"
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Main Menu */}
      <div className="flex-1 py-6">
        {!isCollapsed && (
          <div className="px-6 mb-4">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Main Menu
            </span>
          </div>
        )}
        
        <nav className="space-y-1 px-3">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleMenuClick(item.id, item.href)}
                className={`w-full flex items-center px-3 py-3 rounded-lg text-left transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <IconComponent className={`h-5 w-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                {!isCollapsed && (
                  <span className="ml-3 font-medium">{item.label}</span>
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* Preferences Section */}
        {!isCollapsed && (
          <div className="px-6 mt-8 mb-4">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Preferences
            </span>
          </div>
        )}

        <nav className="space-y-1 px-3">
          {bottomMenuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleMenuClick(item.id, item.href)}
                className={`w-full flex items-center px-3 py-3 rounded-lg text-left transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <IconComponent className={`h-5 w-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                {!isCollapsed && (
                  <span className="ml-3 font-medium">{item.label}</span>
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* Dark Mode Toggle */}
        <div className="px-3 mt-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="w-full flex items-center px-3 py-3 rounded-lg text-left transition-all duration-200 text-gray-700 hover:bg-gray-50"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5 text-gray-500" />
            ) : (
              <Moon className="h-5 w-5 text-gray-500" />
            )}
            {!isCollapsed && (
              <span className="ml-3 font-medium">Dark Mode</span>
            )}
            {!isCollapsed && (
              <div className="ml-auto">
                <div className={`w-8 h-4 rounded-full transition-colors duration-200 ${isDarkMode ? 'bg-blue-600' : 'bg-gray-300'}`}>
                  <div className={`w-3 h-3 bg-white rounded-full shadow-sm transition-transform duration-200 mt-0.5 ${isDarkMode ? 'translate-x-4 ml-0.5' : 'translate-x-0.5'}`} />
                </div>
              </div>
            )}
          </motion.button>
        </div>
      </div>

      {/* User Profile & Logout */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-semibold">JC</span>
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">John Connors</p>
              <p className="text-xs text-gray-500 truncate">Platform Owner</p>
            </div>
          )}
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-gray-700 hover:text-red-600 hover:bg-red-50"
        >
          <LogOut className="h-4 w-4" />
          {!isCollapsed && <span className="ml-2">Log Out</span>}
        </Button>
      </div>
    </motion.div>
  );
};

export default Sidebar;
