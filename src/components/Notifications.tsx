import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { 
  Bell, 
  AlertCircle, 
  Calendar, 
  DollarSign, 
  MessageSquare, 
  CheckCircle,
  X,
  Package,
  Users,
  Trash2
} from 'lucide-react';

interface NotificationsPanelProps {
  onClose: () => void;
}

const notifications = [
  {
    id: 1,
    type: 'urgent',
    icon: AlertCircle,
    title: 'Emergency Alert',
    message: 'Security alert in Block B parking area. Please stay cautious.',
    time: '5 mins ago',
    unread: true,
    color: 'text-red-600',
    bgColor: 'bg-red-50 dark:bg-red-950/50',
  },
  {
    id: 2,
    type: 'payment',
    icon: DollarSign,
    title: 'Utility Bill Due',
    message: 'Your utility bill of ₹450 is due on 20th November.',
    time: '1 hour ago',
    unread: true,
    color: 'text-green-600',
    bgColor: 'bg-green-50 dark:bg-green-950/50',
  },
  {
    id: 3,
    type: 'event',
    icon: Calendar,
    title: 'Community Event',
    message: 'Annual gathering on 25th Nov at Community Hall.',
    time: '3 hours ago',
    unread: true,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-950/50',
  },
  {
    id: 4,
    type: 'message',
    icon: MessageSquare,
    title: 'New Message',
    message: 'Ahmed Khan replied to your complaint #1234.',
    time: '5 hours ago',
    unread: false,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-950/50',
  },
  {
    id: 5,
    type: 'service',
    icon: Package,
    title: 'Service Request Update',
    message: 'Your plumber service request has been approved.',
    time: '1 day ago',
    unread: false,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 dark:bg-orange-950/50',
  },
  {
    id: 6,
    type: 'community',
    icon: Users,
    title: 'New Member',
    message: 'Sana Malik has joined the community chat group.',
    time: '2 days ago',
    unread: false,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50 dark:bg-indigo-950/50',
  },
];

export function NotificationsPanel({ onClose }: NotificationsPanelProps) {
  const [notificationsList, setNotificationsList] = useState(notifications);
  const unreadCount = notificationsList.filter(n => n.unread).length;

  const markAsRead = (id: number) => {
    setNotificationsList(prev =>
      prev.map(n => n.id === id ? { ...n, unread: false } : n)
    );
  };

  const markAllAsRead = () => {
    setNotificationsList(prev =>
      prev.map(n => ({ ...n, unread: false }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotificationsList(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-20 px-4">
      <Card className="w-full max-w-md bg-white dark:bg-black border border-slate-200 dark:border-slate-800 shadow-2xl">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-green-600 dark:text-green-400" />
              <h3 className="text-slate-900 dark:text-white">Notifications</h3>
              {unreadCount > 0 && (
                <Badge className="bg-green-600 text-white">
                  {unreadCount} new
                </Badge>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          {unreadCount > 0 && (
            <Button
              variant="link"
              size="sm"
              onClick={markAllAsRead}
              className="text-green-600 dark:text-green-400 p-0 h-auto"
            >
              Mark all as read
            </Button>
          )}
        </div>

        <ScrollArea className="h-[500px]">
          <div className="p-2">
            {notificationsList.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle className="w-12 h-12 text-slate-300 dark:text-slate-700 mb-3" />
                <p className="text-slate-500 dark:text-slate-400">All caught up!</p>
                <p className="text-sm text-slate-400 dark:text-slate-600 mt-1">No new notifications</p>
              </div>
            ) : (
              <div className="space-y-2">
                {notificationsList.map((notification, index) => {
                  const Icon = notification.icon;
                  return (
                    <div key={notification.id}>
                      <div
                        className={`p-3 rounded-lg transition-all hover:shadow-md cursor-pointer group ${
                          notification.unread
                            ? 'bg-green-50 dark:bg-green-950/20 border-l-4 border-green-600'
                            : 'bg-slate-50 dark:bg-slate-900/50'
                        }`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-lg ${notification.bgColor} flex items-center justify-center flex-shrink-0`}>
                            <Icon className={`w-5 h-5 ${notification.color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h4 className="text-slate-900 dark:text-white text-sm">
                                {notification.title}
                              </h4>
                              {notification.unread && (
                                <div className="w-2 h-2 bg-green-600 rounded-full flex-shrink-0 mt-1"></div>
                              )}
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2 line-clamp-2">
                              {notification.message}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-slate-500 dark:text-slate-500">
                                {notification.time}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteNotification(notification.id);
                                }}
                              >
                                <Trash2 className="w-4 h-4 text-red-500" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      {index < notificationsList.length - 1 && (
                        <Separator className="my-2 dark:bg-slate-800" />
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </ScrollArea>

        {notificationsList.length > 0 && (
          <div className="p-4 border-t border-slate-200 dark:border-slate-800">
            <Button
              variant="outline"
              className="w-full text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border-slate-200 dark:border-slate-800"
              onClick={() => setNotificationsList([])}
            >
              Clear All Notifications
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
