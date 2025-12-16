import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { 
  Bell, 
  Search, 
  Filter, 
  Calendar,
  ChevronLeft,
  Download,
  Pin,
  AlertCircle
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface ENoticeBoardProps {
  onBack?: () => void;
}

export function ENoticeBoard({ onBack }: ENoticeBoardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  const allNotices = [
    {
      id: 1,
      title: 'Water Supply Maintenance',
      date: 'Nov 3, 2025',
      priority: 'high',
      category: 'Maintenance',
      content: 'Water supply will be interrupted on Sunday from 8 AM to 2 PM for tank cleaning.',
      isPinned: true,
      postedBy: 'Management Office',
      views: 234
    },
    {
      id: 2,
      title: 'Diwali Celebration',
      date: 'Nov 5, 2025',
      priority: 'medium',
      category: 'Events',
      content: 'Join us for annual Diwali celebration at the clubhouse at 6 PM!',
      isPinned: true,
      postedBy: 'Events Committee',
      views: 189
    },
    {
      id: 3,
      title: 'Guest Parking Rules',
      date: 'Oct 28, 2025',
      priority: 'low',
      category: 'Rules',
      content: 'Please ensure guest vehicles are registered at the security gate.',
      isPinned: false,
      postedBy: 'Security Team',
      views: 156
    },
    {
      id: 4,
      title: 'Annual General Meeting',
      date: 'Nov 12, 2025',
      priority: 'high',
      category: 'Meetings',
      content: 'All residents are requested to attend the AGM scheduled for November 12 at 5 PM in the community hall.',
      isPinned: false,
      postedBy: 'Management Office',
      views: 298
    },
    {
      id: 5,
      title: 'Gym Equipment Upgrade',
      date: 'Nov 1, 2025',
      priority: 'medium',
      category: 'Amenities',
      content: 'New cardio equipment has been installed in the gym. Residents can start using them from November 2.',
      isPinned: false,
      postedBy: 'Amenities Team',
      views: 145
    },
    {
      id: 6,
      title: 'Security Alert',
      date: 'Oct 30, 2025',
      priority: 'high',
      category: 'Security',
      content: 'Please keep your gates locked and report any suspicious activity to security immediately.',
      isPinned: false,
      postedBy: 'Security Team',
      views: 412
    },
    {
      id: 7,
      title: 'Eid Milad-un-Nabi Celebration',
      date: 'Sep 27, 2025',
      priority: 'medium',
      category: 'Events',
      content: 'Join us for Eid Milad-un-Nabi celebration on September 28 at the community center.',
      isPinned: false,
      postedBy: 'Events Committee',
      views: 178
    },
    {
      id: 8,
      title: 'Swimming Pool Maintenance',
      date: 'Oct 25, 2025',
      priority: 'medium',
      category: 'Maintenance',
      content: 'The swimming pool will be closed for maintenance from October 26-28.',
      isPinned: false,
      postedBy: 'Management Office',
      views: 203
    },
    {
      id: 9,
      title: 'Parking Policy Update',
      date: 'Oct 20, 2025',
      priority: 'low',
      category: 'Rules',
      content: 'Updated parking policy effective November 1. Each unit is allowed maximum 2 parking spots.',
      isPinned: false,
      postedBy: 'Management Office',
      views: 267
    },
    {
      id: 10,
      title: 'Independence Day Celebration',
      date: 'Aug 10, 2025',
      priority: 'medium',
      category: 'Events',
      content: 'Celebrate 14th August with flag hoisting ceremony at 8 AM followed by cultural activities.',
      isPinned: false,
      postedBy: 'Events Committee',
      views: 321
    }
  ];

  const filteredNotices = allNotices.filter(notice => {
    const matchesSearch = notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notice.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = filterPriority === 'all' || notice.priority === filterPriority;
    const matchesCategory = filterCategory === 'all' || notice.category === filterCategory;
    
    return matchesSearch && matchesPriority && matchesCategory;
  });

  const pinnedNotices = filteredNotices.filter(n => n.isPinned);
  const regularNotices = filteredNotices.filter(n => !n.isPinned);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-600 text-white border-0';
      case 'medium':
        return 'bg-orange-600 text-white border-0';
      case 'low':
        return 'bg-blue-600 text-white border-0';
      default:
        return 'bg-slate-600 text-white border-0';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Maintenance':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400';
      case 'Events':
        return 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400';
      case 'Security':
        return 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400';
      case 'Rules':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400';
      case 'Meetings':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400';
      case 'Amenities':
        return 'bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-400';
      default:
        return 'bg-slate-100 text-slate-700 dark:bg-slate-950 dark:text-slate-400';
    }
  };

  const renderNoticeCard = (notice: typeof allNotices[0]) => (
    <Card key={notice.id} className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {notice.isPinned && (
                <Pin className="w-4 h-4 text-green-600 dark:text-green-400" />
              )}
              <h3 className="text-slate-900 dark:text-white">{notice.title}</h3>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge className={getPriorityColor(notice.priority)} variant="secondary">
                {notice.priority}
              </Badge>
              <Badge className={getCategoryColor(notice.category)} variant="secondary">
                {notice.category}
              </Badge>
            </div>
          </div>
        </div>
        
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
          {notice.content}
        </p>

        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{notice.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Bell className="w-3 h-3" />
              <span>{notice.postedBy}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-400">{notice.views} views</span>
            <Button variant="ghost" size="sm" className="h-6 px-2">
              <Download className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        {onBack && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="dark:text-slate-300"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
        )}
        <div className="flex-1">
          <h1 className="text-2xl text-slate-900 dark:text-white">E-Notice Board</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            All notices and announcements from the management
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Total Notices</p>
                <p className="text-2xl text-slate-900 dark:text-white mt-1">{allNotices.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-950 rounded-lg flex items-center justify-center">
                <Bell className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Pinned</p>
                <p className="text-2xl text-slate-900 dark:text-white mt-1">{allNotices.filter(n => n.isPinned).length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-950 rounded-lg flex items-center justify-center">
                <Pin className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">High Priority</p>
                <p className="text-2xl text-slate-900 dark:text-white mt-1">{allNotices.filter(n => n.priority === 'high').length}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 dark:bg-red-950 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Categories</p>
                <p className="text-2xl text-slate-900 dark:text-white mt-1">{new Set(allNotices.map(n => n.category)).size}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-950 rounded-lg flex items-center justify-center">
                <Filter className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search notices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 dark:bg-slate-900 dark:border-slate-700"
              />
            </div>
            
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-full md:w-40 dark:bg-slate-900 dark:border-slate-700 dark:text-white">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent className="dark:bg-slate-900 dark:border-slate-700">
                <SelectItem value="all" className="dark:text-white dark:focus:bg-slate-800">All Priorities</SelectItem>
                <SelectItem value="high" className="dark:text-white dark:focus:bg-slate-800">High</SelectItem>
                <SelectItem value="medium" className="dark:text-white dark:focus:bg-slate-800">Medium</SelectItem>
                <SelectItem value="low" className="dark:text-white dark:focus:bg-slate-800">Low</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full md:w-40 dark:bg-slate-900 dark:border-slate-700 dark:text-white">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="dark:bg-slate-900 dark:border-slate-700">
                <SelectItem value="all" className="dark:text-white dark:focus:bg-slate-800">All Categories</SelectItem>
                <SelectItem value="Maintenance" className="dark:text-white dark:focus:bg-slate-800">Maintenance</SelectItem>
                <SelectItem value="Events" className="dark:text-white dark:focus:bg-slate-800">Events</SelectItem>
                <SelectItem value="Security" className="dark:text-white dark:focus:bg-slate-800">Security</SelectItem>
                <SelectItem value="Rules" className="dark:text-white dark:focus:bg-slate-800">Rules</SelectItem>
                <SelectItem value="Meetings" className="dark:text-white dark:focus:bg-slate-800">Meetings</SelectItem>
                <SelectItem value="Amenities" className="dark:text-white dark:focus:bg-slate-800">Amenities</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Pinned Notices */}
      {pinnedNotices.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Pin className="w-5 h-5 text-green-600 dark:text-green-400" />
            <h2 className="text-lg text-slate-900 dark:text-white">Pinned Notices</h2>
          </div>
          <div className="space-y-3">
            {pinnedNotices.map(renderNoticeCard)}
          </div>
        </div>
      )}

      {/* Regular Notices */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg text-slate-900 dark:text-white">
            All Notices ({regularNotices.length})
          </h2>
        </div>
        <div className="space-y-3">
          {regularNotices.length > 0 ? (
            regularNotices.map(renderNoticeCard)
          ) : (
            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardContent className="p-8 text-center">
                <Bell className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <p className="text-slate-600 dark:text-slate-400">No notices found matching your criteria</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
