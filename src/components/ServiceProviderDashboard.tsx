import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { 
  Briefcase, 
  CheckCircle, 
  Clock,
  Star,
  Calendar,
  MapPin,
  User,
  X,
  Check,
  MessageCircle,
  ArrowLeft,
  Send,
  Smile,
  Paperclip
} from 'lucide-react';

interface ServiceProviderDashboardProps {
  onNavigate: (section: string) => void;
}

interface ServiceRequest {
  id: number;
  service: string;
  resident: string;
  requestTime: string;
  date: string;
  status: 'new' | 'in-progress' | 'completed';
}

interface ChatMessage {
  id: number;
  text: string;
  sender: 'provider' | 'resident';
  time: string;
}

export function ServiceProviderDashboard({ onNavigate }: ServiceProviderDashboardProps) {
  // Mock data
  const providerData = {
    name: "Ahmed Khan's Professional Services",
    ownerName: "Ahmed Khan",
    serviceType: "Plumbing",
    rating: 4.7,
    activeTasks: 3,
    completedTasks: 12
  };

  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([
    { id: 1, service: "AC Repair - Apartment 3B", resident: "Ahmed Khan", requestTime: "10:32 AM", date: "Nov 17, 2025", status: "new" },
    { id: 2, service: "Water Heater Installation", resident: "Sana Malik", requestTime: "9:15 AM", date: "Nov 17, 2025", status: "new" },
    { id: 3, service: "Kitchen Sink Fix", resident: "Usman Ali", requestTime: "Yesterday", date: "Nov 16, 2025", status: "in-progress" },
    { id: 4, service: "Bathroom Fitting", resident: "Fatima Hassan", requestTime: "Yesterday", date: "Nov 16, 2025", status: "in-progress" },
    { id: 5, service: "Pipe Repair", resident: "Zain Abbas", requestTime: "2 days ago", date: "Nov 15, 2025", status: "completed" },
    { id: 6, service: "Drain Cleaning", resident: "Ayesha Noor", requestTime: "3 days ago", date: "Nov 14, 2025", status: "completed" },
    { id: 7, service: "Leak Detection", resident: "Bilal Tariq", requestTime: "4 days ago", date: "Nov 13, 2025", status: "completed" }
  ]);

  const [activeChat, setActiveChat] = useState<ServiceRequest | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, text: "Hi, when can you start the work?", sender: "resident", time: "10:35 AM" },
    { id: 2, text: "Hello! I can start today afternoon. Would 2 PM work for you?", sender: "provider", time: "10:37 AM" },
    { id: 3, text: "Yes, that works perfectly. See you at 2 PM.", sender: "resident", time: "10:38 AM" }
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleContactClick = (request: ServiceRequest) => {
    setActiveChat(request);
    // Update status to in-progress when contact is initiated
    if (request.status === 'new') {
      setServiceRequests(serviceRequests.map(req => 
        req.id === request.id ? { ...req, status: 'in-progress' as const } : req
      ));
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const message: ChatMessage = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'provider',
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, message]);
    setNewMessage("");
  };

  const handleBackToRequests = () => {
    setActiveChat(null);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const activeTasks = serviceRequests.filter(req => req.status === 'in-progress').length;
  const completedTasks = serviceRequests.filter(req => req.status === 'completed').length;

  // If chat is active, show full-screen chat interface
  if (activeChat) {
    return (
      <div className="fixed inset-0 bg-white dark:bg-black z-50 flex flex-col">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-800 dark:to-blue-900 px-4 py-4 shadow-lg">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3">
              <button
                onClick={handleBackToRequests}
                className="hover:bg-white/10 rounded-lg p-2 -ml-2 transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <Avatar className="w-10 h-10 border-2 border-white/30">
                <AvatarFallback className="bg-white/20 text-white">
                  {getInitials(activeChat.resident)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-white">{activeChat.resident}</h2>
                <p className="text-xs text-blue-100">{activeChat.service}</p>
              </div>
              <Badge 
                variant="outline"
                className={
                  activeChat.status === 'in-progress'
                    ? 'bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800 px-3 py-1'
                    : activeChat.status === 'new'
                    ? 'bg-orange-50 dark:bg-orange-950/30 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800 px-3 py-1'
                    : 'bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800 px-3 py-1'
                }
              >
                {activeChat.status === 'in-progress' ? 'In Progress' : activeChat.status === 'new' ? 'New' : 'Completed'}
              </Badge>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 px-4 py-4" style={{ paddingBottom: '80px' }}>
          <div className="space-y-3 max-w-4xl mx-auto">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.sender === 'provider' ? 'flex-row-reverse' : ''}`}
              >
                <Avatar className="w-9 h-9">
                  <AvatarFallback className={`text-xs ${
                    msg.sender === 'provider' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-slate-300 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                  }`}>
                    {msg.sender === 'provider' ? getInitials(providerData.ownerName) : getInitials(activeChat.resident)}
                  </AvatarFallback>
                </Avatar>
                <div className={`flex-1 max-w-[75%] ${msg.sender === 'provider' ? 'flex flex-col items-end' : ''}`}>
                  {msg.sender === 'resident' && (
                    <div className="flex items-center gap-2 mb-1 px-1">
                      <span className="text-xs text-slate-900 dark:text-white">{activeChat.resident}</span>
                      <span className="text-xs text-slate-400 dark:text-slate-500">{msg.time}</span>
                    </div>
                  )}
                  <div
                    className={`inline-block px-3 py-2 rounded-xl ${
                      msg.sender === 'provider'
                        ? 'bg-blue-600 dark:bg-blue-700 text-white rounded-br-sm'
                        : 'bg-[#F1F3F5] dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-bl-sm'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                  </div>
                  {msg.sender === 'provider' && (
                    <span className="text-xs text-slate-400 dark:text-slate-500 mt-1 px-1">{msg.time}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Input Bar - Fixed at Bottom */}
        <div 
          className="fixed left-0 right-0 bg-white dark:bg-slate-900 border-t border-[#E9ECEF] dark:border-slate-800"
          style={{ 
            bottom: '0',
            height: '64px',
            boxShadow: '0 -2px 12px rgba(0, 0, 0, 0.08)',
            zIndex: 45
          }}
        >
          <div className="flex gap-3 items-center h-full px-3 max-w-4xl mx-auto">
            {/* Attach Icon */}
            <button 
              className="flex-shrink-0 text-[#6C757D] hover:text-[#1E1E1E] dark:hover:text-slate-100 transition-colors p-1.5"
              title="Attach file"
              type="button"
            >
              <Paperclip className="w-[22px] h-[22px]" />
            </button>

            {/* Text Input Field */}
            <div className="flex-1 flex gap-2 items-center bg-[#F8F9FA] dark:bg-slate-800 rounded-[20px] px-3 py-2">
              <Input
                placeholder="Type a message…"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                className="flex-1 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-auto px-1 text-[#1E1E1E] dark:text-white placeholder:text-[#A9A9A9] dark:placeholder:text-slate-500"
                style={{ fontSize: '14px', fontFamily: 'Inter, Poppins, sans-serif' }}
              />
              
              {/* Emoji Icon */}
              <button 
                className="flex-shrink-0 text-[#6C757D] hover:text-[#1E1E1E] dark:hover:text-slate-100 transition-colors"
                title="Add emoji"
                type="button"
              >
                <Smile className="w-5 h-5" />
              </button>
            </div>

            {/* Send Button */}
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              type="button"
              className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 disabled:cursor-not-allowed ${
                newMessage.trim() 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-[0_2px_8px_rgba(37,99,235,0.3)] hover:shadow-[0_4px_12px_rgba(37,99,235,0.5)] active:scale-95' 
                  : 'bg-blue-600 opacity-40 text-white'
              }`}
              title="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-black dark:via-slate-950 dark:to-black rounded-2xl p-6 text-white shadow-2xl relative overflow-hidden border border-slate-700 dark:border-slate-800">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-green-500/5 rounded-full -ml-24 -mb-24"></div>
        
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-4">
            <div className="flex items-start gap-4 flex-1">
              <Avatar className="w-16 h-16 border-4 border-green-500/20 shadow-lg">
                <AvatarFallback className="bg-green-600 text-white text-xl">
                  {providerData.ownerName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-white text-2xl mb-1">Service Provider Dashboard</h1>
                <p className="text-slate-300">Welcome back, {providerData.ownerName}</p>
                <div className="flex items-center gap-2 mt-3">
                  <Badge className="bg-green-600/20 text-green-300 hover:bg-green-600/30 border-0 border border-green-500/30">
                    <Briefcase className="w-3 h-3 mr-1" />
                    {providerData.serviceType}
                  </Badge>
                  <Badge className="bg-green-600/20 text-green-300 hover:bg-green-600/30 border-0 border border-green-500/30">
                    <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                    {providerData.rating} Rating
                  </Badge>
                </div>
              </div>
            </div>
            <Button 
              onClick={() => onNavigate('profile')}
              className="bg-green-600 hover:bg-green-700 text-white shadow-lg rounded-lg px-6 flex-shrink-0"
            >
              View Profile
            </Button>
          </div>

          {/* Summary Bar */}
          <div className="flex items-center gap-6 mt-6 pt-4 border-t border-slate-700 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-slate-300 text-sm">Active Tasks: <span className="text-white">{activeTasks}</span></span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-slate-300 text-sm">Completed: <span className="text-white">{completedTasks}</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-[#141414] shadow-lg">
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-green-600 dark:text-green-500" />
            Recent Activities
          </CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-400">
            Manage your service requests and track progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {serviceRequests.map((request) => (
              <div 
                key={request.id}
                className="p-4 rounded-xl bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all shadow-sm"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-start justify-between gap-4">
                  {/* Left Side - Service Info */}
                  <div className="flex items-start gap-3 flex-1 w-full sm:w-auto">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      request.status === 'new' 
                        ? 'bg-orange-100 dark:bg-orange-950/30' 
                        : request.status === 'in-progress'
                        ? 'bg-green-100 dark:bg-green-950/30' 
                        : 'bg-blue-100 dark:bg-blue-950/30'
                    }`}>
                      {request.status === 'new' ? (
                        <Clock className="w-5 h-5 text-orange-600 dark:text-orange-500" />
                      ) : request.status === 'in-progress' ? (
                        <Clock className="w-5 h-5 text-green-600 dark:text-green-500" />
                      ) : (
                        <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-900 dark:text-white mb-1">{request.service}</p>
                      <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 flex-wrap">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>Received {request.requestTime}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          <span>Requested by {request.resident}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Status/Actions */}
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    {request.status === 'new' ? (
                      <Button
                        onClick={() => handleContactClick(request)}
                        className="bg-green-600 hover:bg-green-700 text-white h-9 px-4 rounded-lg shadow-sm"
                      >
                        <MessageCircle className="w-4 h-4 mr-1" />
                        Contact
                      </Button>
                    ) : (
                      <>
                        <Badge 
                          variant="outline"
                          className={
                            request.status === 'in-progress'
                              ? 'bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800 px-3 py-1'
                              : 'bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800 px-3 py-1'
                          }
                        >
                          {request.status === 'in-progress' ? 'In Progress' : 'Completed'}
                        </Badge>
                        <Button
                          onClick={() => handleContactClick(request)}
                          className="bg-green-600 hover:bg-green-700 text-white h-9 px-4 rounded-lg shadow-sm"
                        >
                          <MessageCircle className="w-4 h-4 mr-1" />
                          Contact
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {serviceRequests.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-slate-400 dark:text-slate-500" />
              </div>
              <p className="text-slate-600 dark:text-slate-400">No service requests at the moment</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}