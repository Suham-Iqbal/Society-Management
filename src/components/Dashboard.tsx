import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Bell, Calendar, ChevronRight, Car, Search, MessageCircle, Users } from 'lucide-react';

interface DashboardProps {
  onNavigate?: (section: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const notices = [
    {
      id: 1,
      title: 'Water Supply Maintenance',
      date: 'Nov 3, 2025',
      priority: 'high',
      content: 'Water supply will be interrupted on Sunday from 8 AM to 2 PM for tank cleaning.',
    },
    {
      id: 2,
      title: 'Diwali Celebration',
      date: 'Nov 5, 2025',
      priority: 'medium',
      content: 'Join us for annual Diwali celebration at the clubhouse at 6 PM!',
    },
    {
      id: 3,
      title: 'Guest Parking Rules',
      date: 'Oct 28, 2025',
      priority: 'low',
      content: 'Please ensure guest vehicles are registered at the security gate.',
    },
  ];

  const quickActions = [
    { 
      id: 'carpool',
      label: 'Car Pooling', 
      icon: Car, 
      count: '3',
      description: 'Available rides',
      bgColor: 'bg-green-50 dark:bg-green-950',
      iconColor: 'text-green-600 dark:text-green-400',
      hoverColor: 'hover:bg-green-100 dark:hover:bg-green-900'
    },
    { 
      id: 'lostandfound',
      label: 'Lost & Found', 
      icon: Search, 
      count: '4',
      description: 'New items',
      bgColor: 'bg-slate-100 dark:bg-slate-800',
      iconColor: 'text-slate-700 dark:text-slate-300',
      hoverColor: 'hover:bg-slate-200 dark:hover:bg-slate-700'
    },
    { 
      id: 'chat',
      label: 'Community Chat', 
      icon: MessageCircle, 
      count: '12',
      description: 'New messages',
      bgColor: 'bg-slate-100 dark:bg-slate-800',
      iconColor: 'text-slate-700 dark:text-slate-300',
      hoverColor: 'hover:bg-slate-200 dark:hover:bg-slate-700'
    },
    { 
      id: 'directory',
      label: 'Society Map', 
      icon: Users, 
      count: '156',
      description: 'Members',
      bgColor: 'bg-slate-100 dark:bg-slate-800',
      iconColor: 'text-slate-700 dark:text-slate-300',
      hoverColor: 'hover:bg-slate-200 dark:hover:bg-slate-700'
    },
  ];

  const upcomingEvents = [
    { 
      name: 'Diwali Celebration', 
      date: 'Nov 5', 
      time: '6:00 PM', 
      attendees: 45,
    },
    { 
      name: 'Yoga Session', 
      date: 'Nov 8', 
      time: '7:00 AM', 
      attendees: 12,
    },
    { 
      name: 'Kids Art Workshop', 
      date: 'Nov 10', 
      time: '4:00 PM', 
      attendees: 18,
    },
  ];

  return (
    <div className="space-y-6 pb-6">
      {/* Welcome Banner with Notice Board */}
      <Card className="bg-gradient-to-br from-slate-900 via-slate-800 to-green-900 border-0 text-white overflow-hidden relative shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-600/10 rounded-full -mr-32 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-green-600/10 rounded-full -ml-24 -mb-20"></div>
        <CardContent className="pt-6 relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center shadow-lg">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-white text-xl">Welcome Home, Ahmed Khan!</h2>
              <p className="text-green-200 text-sm">Check out today's updates</p>
            </div>
          </div>

          {/* Notice Board */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white flex items-center gap-2">
                <Bell className="w-4 h-4" />
                Notice Board
              </h3>
              <Badge className="bg-green-600 text-white border-0">
                {notices.length} Active
              </Badge>
            </div>
            <div className="space-y-2">
              {notices.slice(0, 2).map((notice) => (
                <div key={notice.id} className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="text-white text-sm">{notice.title}</h4>
                    <Badge
                      className={
                        notice.priority === 'high'
                          ? 'bg-red-600 text-white border-0 text-xs'
                          : notice.priority === 'medium'
                          ? 'bg-orange-600 text-white border-0 text-xs'
                          : 'bg-slate-600 text-white border-0 text-xs'
                      }
                    >
                      {notice.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-green-100">{notice.content}</p>
                  <p className="text-xs text-green-200 mt-2">{notice.date}</p>
                </div>
              ))}
            </div>
            <Button 
              variant="ghost" 
              className="w-full mt-3 text-white hover:bg-white/10 border border-white/20"
              size="sm"
              onClick={() => onNavigate?.('enoticeboard')}
            >
              View All Notices
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-slate-900 dark:text-slate-100">Quick Actions</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={() => onNavigate?.(action.id)}
                className={`text-left bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm ${action.hoverColor} transition-all border border-slate-200 dark:border-slate-800`}
              >
                <div className={`w-12 h-12 ${action.bgColor} rounded-lg flex items-center justify-center mb-3`}>
                  <Icon className={`w-6 h-6 ${action.iconColor}`} />
                </div>
                <h4 className="text-slate-900 dark:text-slate-100 mb-1">{action.label}</h4>
                <p className="text-lg text-slate-900 dark:text-slate-100 mb-1">{action.count}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{action.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Upcoming Events */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-slate-900 dark:text-slate-100">Upcoming Events</h3>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-green-600 hover:text-green-700 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-950"
            onClick={() => onNavigate?.('events')}
          >
            See All
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        <div className="space-y-3">
          {upcomingEvents.map((event, index) => (
            <Card 
              key={index} 
              className="border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer dark:bg-slate-900"
              onClick={() => onNavigate?.('events')}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-50 dark:bg-green-950 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h4 className="text-slate-900 dark:text-slate-100 mb-1">{event.name}</h4>
                      <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                        <span>{event.date}</span>
                        <span>•</span>
                        <span>{event.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{event.attendees} going</p>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                      Join
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <Card className="border border-slate-200 dark:border-slate-800 shadow-sm dark:bg-slate-900">
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-slate-100">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3 pb-3 border-b border-slate-100 dark:border-slate-800 last:border-0">
            <div className="w-10 h-10 bg-green-50 dark:bg-green-950 rounded-lg flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-slate-900 dark:text-slate-100">New message in Community Chat</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-start gap-3 pb-3 border-b border-slate-100 dark:border-slate-800 last:border-0">
            <div className="w-10 h-10 bg-green-50 dark:bg-green-950 rounded-lg flex items-center justify-center flex-shrink-0">
              <Car className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-slate-900 dark:text-slate-100">New carpool ride available</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">1 day ago</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-green-50 dark:bg-green-950 rounded-lg flex items-center justify-center flex-shrink-0">
              <Search className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-slate-900 dark:text-slate-100">Lost item reported</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">2 days ago</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}