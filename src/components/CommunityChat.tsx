import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { 
  Send,
  Users,
  Search,
  Paperclip,
  ArrowLeft,
  MoreVertical,
  Circle,
  MessageCircle,
  X,
  Info,
  UserCircle,
  Smile
} from 'lucide-react';

interface PrivateChat {
  id: string;
  userId: string;
  userName: string;
  userUnit: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  isOnline: boolean;
}

interface Message {
  id: number;
  user: string;
  unit: string;
  message: string;
  time: string;
  isOwn: boolean;
  userId: string;
}

interface UserProfile {
  id: string;
  name: string;
  unit: string;
  isOnline: boolean;
}

type ViewMode = 'selector' | 'community' | 'privateList' | 'privateConversation';

export function CommunityChat({ onBack }: { onBack?: () => void }) {
  const [viewMode, setViewMode] = useState<ViewMode>('selector');
  const [selectedPrivateChat, setSelectedPrivateChat] = useState<PrivateChat | null>(null);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserProfile, setShowUserProfile] = useState<UserProfile | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Community messages state
  const [communityMessages, setCommunityMessages] = useState<Message[]>([
    {
      id: 1,
      userId: 'user4',
      user: 'Ahmed Khan',
      unit: 'A-101',
      message: 'Assalam o Alaikum everyone! Hope you all have a great day.',
      time: '9:15 AM',
      isOwn: false,
    },
    {
      id: 2,
      userId: 'user5',
      user: 'Sana Malik',
      unit: 'A-204',
      message: 'Walaikum Assalam! Does anyone know when the water supply will be restored?',
      time: '9:18 AM',
      isOwn: false,
    },
    {
      id: 3,
      userId: 'own',
      user: 'You',
      unit: 'A-204',
      message: 'According to the notice, it should be back by 2 PM.',
      time: '9:20 AM',
      isOwn: true,
    },
    {
      id: 4,
      userId: 'user6',
      user: 'Zain Abbas',
      unit: 'B-302',
      message: 'Thanks for the update! 👍',
      time: '9:22 AM',
      isOwn: false,
    },
    {
      id: 5,
      userId: 'user7',
      user: 'Ayesha Noor',
      unit: 'C-105',
      message: 'Reminder: Community meeting tomorrow at 6 PM in the clubhouse.',
      time: '10:05 AM',
      isOwn: false,
    },
    {
      id: 6,
      userId: 'user8',
      user: 'Bilal Tariq',
      unit: 'B-201',
      message: 'Is anyone interested in playing cricket this weekend?',
      time: '10:30 AM',
      isOwn: false,
    },
    {
      id: 7,
      userId: 'own',
      user: 'You',
      unit: 'A-204',
      message: 'I am in! What time?',
      time: '10:32 AM',
      isOwn: true,
    },
    {
      id: 8,
      userId: 'user8',
      user: 'Bilal Tariq',
      unit: 'B-201',
      message: 'How about Saturday at 5 PM?',
      time: '10:33 AM',
      isOwn: false,
    },
  ]);

  // Private chats state
  const [privateChats, setPrivateChats] = useState<PrivateChat[]>([
    {
      id: '1',
      userId: 'user1',
      userName: 'Sana Malik',
      userUnit: 'A-101',
      lastMessage: 'Thanks for helping with the carpooling!',
      timestamp: '2m ago',
      unread: 2,
      isOnline: true
    },
    {
      id: '2',
      userId: 'user2',
      userName: 'Usman Ali',
      userUnit: 'B-305',
      lastMessage: 'Sure, I will be there at 5 PM.',
      timestamp: '1h ago',
      unread: 0,
      isOnline: false
    },
    {
      id: '3',
      userId: 'user3',
      userName: 'Fatima Hassan',
      userUnit: 'C-202',
      lastMessage: 'Is the gym open today?',
      timestamp: '3h ago',
      unread: 1,
      isOnline: true
    },
    {
      id: '4',
      userId: 'user11',
      userName: 'Hassan Raza',
      userUnit: 'D-104',
      lastMessage: 'See you tomorrow!',
      timestamp: '5h ago',
      unread: 0,
      isOnline: false
    },
    {
      id: '5',
      userId: 'user12',
      userName: 'Aisha Zaidi',
      userUnit: 'A-305',
      lastMessage: 'Thanks for the information',
      timestamp: 'Yesterday',
      unread: 0,
      isOnline: true
    },
    {
      id: '6',
      userId: 'user13',
      userName: 'Imran Sheikh',
      userUnit: 'B-102',
      lastMessage: 'Perfect timing!',
      timestamp: '2d ago',
      unread: 0,
      isOnline: false
    }
  ]);

  // Private chat messages state
  const [privateChatMessages, setPrivateChatMessages] = useState<{ [key: string]: Message[] }>({
    'user1': [
      {
        id: 1,
        userId: 'user1',
        user: 'Sana Malik',
        unit: 'A-101',
        message: 'Hi! Are you going to the office tomorrow?',
        time: '8:30 AM',
        isOwn: false,
      },
      {
        id: 2,
        userId: 'own',
        user: 'You',
        unit: 'A-204',
        message: 'Yes, I am. Do you need a ride?',
        time: '8:32 AM',
        isOwn: true,
      },
      {
        id: 3,
        userId: 'user1',
        user: 'Sana Malik',
        unit: 'A-101',
        message: 'That would be great! Thanks!',
        time: '8:33 AM',
        isOwn: false,
      },
      {
        id: 4,
        userId: 'user1',
        user: 'Sana Malik',
        unit: 'A-101',
        message: 'Thanks for helping with the carpooling!',
        time: '2m ago',
        isOwn: false,
      }
    ],
    'user2': [
      {
        id: 1,
        userId: 'user2',
        user: 'Usman Ali',
        unit: 'B-305',
        message: 'Are you coming to the community meeting?',
        time: '2:15 PM',
        isOwn: false,
      },
      {
        id: 2,
        userId: 'own',
        user: 'You',
        unit: 'A-204',
        message: 'Yes, what time is it?',
        time: '2:20 PM',
        isOwn: true,
      },
      {
        id: 3,
        userId: 'user2',
        user: 'Usman Ali',
        unit: 'B-305',
        message: 'Sure, I will be there at 5 PM.',
        time: '1h ago',
        isOwn: false,
      }
    ],
    'user3': [
      {
        id: 1,
        userId: 'user3',
        user: 'Fatima Hassan',
        unit: 'C-202',
        message: 'Is the gym open today?',
        time: '3h ago',
        isOwn: false,
      }
    ]
  });

  // Auto scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [communityMessages, privateChatMessages, viewMode, selectedPrivateChat]);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      userId: 'own',
      user: 'You',
      unit: 'A-204',
      message: message.trim(),
      time: getCurrentTime(),
      isOwn: true,
    };

    if (viewMode === 'community') {
      setCommunityMessages(prev => [...prev, newMessage]);
    } else if (viewMode === 'privateConversation' && selectedPrivateChat) {
      setPrivateChatMessages(prev => ({
        ...prev,
        [selectedPrivateChat.userId]: [
          ...(prev[selectedPrivateChat.userId] || []),
          newMessage
        ]
      }));

      setPrivateChats(prev =>
        prev.map(chat =>
          chat.userId === selectedPrivateChat.userId
            ? { ...chat, lastMessage: message.trim(), timestamp: 'Just now' }
            : chat
        )
      );
    }

    setMessage('');
  };

  const handleOpenPrivateChat = (chat: PrivateChat) => {
    if (chat.unread > 0) {
      setPrivateChats(prevChats =>
        prevChats.map(c =>
          c.id === chat.id ? { ...c, unread: 0 } : c
        )
      );
    }
    setSelectedPrivateChat(chat);
    setViewMode('privateConversation');
  };

  const handleUserClick = (userId: string, userName: string, userUnit: string, isOnline: boolean) => {
    if (userId === 'own') return;
    setShowUserProfile({ id: userId, name: userName, unit: userUnit, isOnline });
  };

  const handleStartPrivateChat = () => {
    if (!showUserProfile) return;
    
    const existingChat = privateChats.find(chat => chat.userId === showUserProfile.id);
    
    if (existingChat) {
      handleOpenPrivateChat(existingChat);
    } else {
      const newChat: PrivateChat = {
        id: Date.now().toString(),
        userId: showUserProfile.id,
        userName: showUserProfile.name,
        userUnit: showUserProfile.unit,
        lastMessage: '',
        timestamp: 'Just now',
        unread: 0,
        isOnline: showUserProfile.isOnline
      };
      setPrivateChats([newChat, ...privateChats]);
      setSelectedPrivateChat(newChat);
      setViewMode('privateConversation');
    }
    
    setShowUserProfile(null);
  };

  const getCurrentMessages = () => {
    if (viewMode === 'privateConversation' && selectedPrivateChat) {
      return privateChatMessages[selectedPrivateChat.userId] || [];
    }
    return communityMessages;
  };

  const filteredPrivateChats = privateChats.filter(chat =>
    chat.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalUnreadCount = privateChats.reduce((sum, c) => sum + c.unread, 0);

  // ==================== CHAT SELECTOR VIEW ====================
  if (viewMode === 'selector') {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-white to-green-50 dark:from-slate-950 dark:via-slate-900 dark:to-green-950 z-50 flex flex-col">
        {/* Header */}
        <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-4">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-3 mb-2">
              {onBack && (
                <button
                  onClick={onBack}
                  className="hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg p-2 -ml-2 transition-colors"
                  aria-label="Go back"
                >
                  <ArrowLeft className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                </button>
              )}
              <h1 className="text-2xl text-slate-900 dark:text-white">Chat Center</h1>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Choose how you want to connect</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md space-y-4">
            {/* Community Chat Button */}
            <button
              onClick={() => setViewMode('community')}
              className="w-full group relative overflow-hidden bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="absolute inset-0 bg-white/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <div className="relative flex items-center gap-4">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <h2 className="text-xl text-white mb-1">Community Chat</h2>
                  <p className="text-sm text-green-100">Chat with everyone in UrbanEase</p>
                </div>
                <div className="text-white/80">
                  <Circle className="w-2 h-2 fill-current" />
                </div>
              </div>
            </button>

            {/* Private Chat Button */}
            <button
              onClick={() => setViewMode('privateList')}
              className="w-full group relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="absolute inset-0 bg-white/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <div className="relative flex items-center gap-4">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform relative">
                  <MessageCircle className="w-7 h-7 text-white" />
                  {totalUnreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center border-2 border-blue-600">
                      <span className="text-xs text-white">{totalUnreadCount}</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 text-left">
                  <h2 className="text-xl text-white mb-1">Private Chats</h2>
                  <p className="text-sm text-blue-100">One-on-one conversations</p>
                </div>
                <div className="text-white/80">
                  <Circle className="w-2 h-2 fill-current" />
                </div>
              </div>
            </button>

            {/* Info Card */}
            <div className="mt-8 p-4 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="flex gap-3">
                <Info className="w-5 h-5 text-slate-600 dark:text-slate-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 mb-1">Quick Tip</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Click on any user's profile in Community Chat to start a private conversation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==================== COMMUNITY CHAT VIEW ====================
  if (viewMode === 'community') {
    return (
      <div className="fixed inset-0 bg-white dark:bg-slate-900 z-50 flex flex-col">
        {/* User Profile Modal */}
        {showUserProfile && (
          <div 
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" 
            onClick={() => setShowUserProfile(null)}
          >
            <div 
              className="w-full max-w-sm bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowUserProfile(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col items-center text-center mb-6">
                <div className="relative mb-4">
                  <Avatar className="w-20 h-20">
                    <AvatarFallback className="bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400 text-xl">
                      {getInitials(showUserProfile.name)}
                    </AvatarFallback>
                  </Avatar>
                  {showUserProfile.isOnline && (
                    <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 rounded-full border-4 border-white dark:border-slate-800"></div>
                  )}
                </div>
                <h3 className="text-xl text-slate-900 dark:text-white mb-1">{showUserProfile.name}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                  {showUserProfile.unit} • Resident
                </p>
                {showUserProfile.isOnline && (
                  <div className="flex items-center gap-1.5">
                    <Circle className="w-2 h-2 fill-green-500 text-green-500" />
                    <span className="text-sm text-green-600 dark:text-green-400">Online</span>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full h-11 rounded-xl border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700"
                  onClick={() => setShowUserProfile(null)}
                >
                  <UserCircle className="w-4 h-4 mr-2" />
                  View Full Profile
                </Button>

                <Button
                  className="w-full h-11 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-sm"
                  onClick={handleStartPrivateChat}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Start Private Chat
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="bg-green-600 dark:bg-green-700 text-white px-4 py-3 shadow-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewMode('selector')}
              className="hover:bg-white/10 rounded-lg p-2 -ml-2 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white">Community Chat</h3>
                <p className="text-xs text-green-100">156 members</p>
              </div>
            </div>
          </div>
          <button className="hover:bg-white/10 rounded-lg p-2 transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 px-4 py-4" style={{ paddingBottom: '80px' }}>
          <div className="space-y-3 max-w-4xl mx-auto">
            {communityMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.isOwn ? 'flex-row-reverse' : ''}`}
              >
                {!msg.isOwn && (
                  <button
                    onClick={() => handleUserClick(msg.userId, msg.user, msg.unit, Math.random() > 0.5)}
                    className="flex-shrink-0"
                  >
                    <Avatar className="w-9 h-9 cursor-pointer hover:ring-2 hover:ring-green-500 transition-all">
                      <AvatarFallback className="bg-slate-300 text-slate-700 dark:bg-slate-700 dark:text-slate-300 text-xs">
                        {getInitials(msg.user)}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                )}
                <div className={`flex-1 max-w-[75%] ${msg.isOwn ? 'flex flex-col items-end' : ''}`}>
                  {!msg.isOwn && (
                    <div className="flex items-center gap-2 mb-1 px-1">
                      <span className="text-xs text-slate-900 dark:text-white">{msg.user}</span>
                      <span className="text-xs text-slate-400 dark:text-slate-500">{msg.time}</span>
                    </div>
                  )}
                  <div
                    className={`inline-block px-3 py-2 rounded-xl ${
                      msg.isOwn
                        ? 'bg-[#DFF7E0] dark:bg-green-900 text-slate-900 dark:text-green-100 rounded-br-sm'
                        : 'bg-[#F1F3F5] dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-bl-sm'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.message}</p>
                  </div>
                  {msg.isOwn && (
                    <span className="text-xs text-slate-400 dark:text-slate-500 mt-1 px-1">{msg.time}</span>
                  )}
                </div>
              </div>
            ))}
            <div ref={scrollRef} />
          </div>
        </div>

        {/* Professional WhatsApp-Style Message Input Bar - Fixed at Bottom */}
        <div 
          className="fixed left-0 right-0 bg-white dark:bg-slate-900 border-t border-[#E9ECEF] dark:border-slate-800"
          style={{ 
            bottom: '0',
            height: '64px',
            boxShadow: '0 -2px 12px rgba(0, 0, 0, 0.08)',
            borderTopLeftRadius: '0px',
            borderTopRightRadius: '0px',
            zIndex: 45
          }}
        >
          <div className="flex gap-3 items-center h-full px-3 max-w-4xl mx-auto">
            {/* Attach Icon 📎 */}
            <button 
              className="flex-shrink-0 text-[#6C757D] hover:text-[#1E1E1E] dark:hover:text-slate-100 transition-colors p-1.5"
              title="Attach file"
              type="button"
            >
              <Paperclip className="w-[22px] h-[22px]" />
            </button>

            {/* Text Input Field Container */}
            <div className="flex-1 flex gap-2 items-center bg-[#F8F9FA] dark:bg-slate-800 rounded-[20px] px-3 py-2">
              <Input
                placeholder="Type a message…"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                className="flex-1 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-auto px-1 text-[#1E1E1E] dark:text-white placeholder:text-[#A9A9A9] dark:placeholder:text-slate-500"
                style={{ fontSize: '14px', fontFamily: 'Inter, Poppins, sans-serif' }}
              />
              
              {/* Emoji Icon 😊 */}
              <button 
                className="flex-shrink-0 text-[#6C757D] hover:text-[#1E1E1E] dark:hover:text-slate-100 transition-colors"
                title="Add emoji"
                type="button"
              >
                <Smile className="w-5 h-5" />
              </button>
            </div>

            {/* Send Button 🕊️ */}
            <button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              type="button"
              className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 disabled:cursor-not-allowed ${
                message.trim() 
                  ? 'bg-[#00A35A] hover:bg-[#00884D] text-white shadow-[0_2px_8px_rgba(0,163,90,0.3)] hover:shadow-[0_4px_12px_rgba(0,163,90,0.5)] active:scale-95' 
                  : 'bg-[#00A35A] opacity-40 text-white'
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

  // ==================== PRIVATE CHAT LIST VIEW ====================
  if (viewMode === 'privateList') {
    return (
      <div className="fixed inset-0 bg-white dark:bg-slate-900 z-50 flex flex-col">
        {/* Header */}
        <div className="bg-blue-600 dark:bg-blue-700 text-white px-4 py-3 shadow-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewMode('selector')}
              className="hover:bg-white/10 rounded-lg p-2 -ml-2 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h3 className="text-white text-lg">Private Chats</h3>
          </div>
          <button className="hover:bg-white/10 rounded-lg p-2 transition-colors">
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-100 dark:bg-slate-800 dark:border-slate-700 border-slate-200 rounded-full h-10 border-0"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {filteredPrivateChats.length > 0 ? (
            <div>
              {filteredPrivateChats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => handleOpenPrivateChat(chat)}
                  className="w-full px-4 py-3 flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b border-slate-100 dark:border-slate-800 active:bg-slate-100 dark:active:bg-slate-700"
                >
                  <div className="relative flex-shrink-0">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300">
                        {getInitials(chat.userName)}
                      </AvatarFallback>
                    </Avatar>
                    {chat.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white dark:border-slate-900"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center justify-between mb-0.5">
                      <p className="text-slate-900 dark:text-white truncate">{chat.userName}</p>
                      <span className="text-xs text-slate-400 dark:text-slate-500 ml-2 flex-shrink-0">{chat.timestamp}</span>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                      {chat.lastMessage || 'Start a conversation'}
                    </p>
                  </div>
                  {chat.unread > 0 && (
                    <div className="flex-shrink-0 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white">{chat.unread}</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                <MessageCircle className="w-10 h-10 text-slate-400 dark:text-slate-600" />
              </div>
              <h3 className="text-lg text-slate-900 dark:text-white mb-2">No conversations yet</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 max-w-sm">
                Click on any resident's profile in Community Chat to start a private conversation
              </p>
              <Button
                onClick={() => setViewMode('community')}
                className="bg-green-600 hover:bg-green-700 text-white rounded-full"
              >
                Go to Community Chat
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ==================== PRIVATE CONVERSATION VIEW ====================
  if (viewMode === 'privateConversation' && selectedPrivateChat) {
    return (
      <div className="fixed inset-0 bg-white dark:bg-slate-900 z-50 flex flex-col">
        {/* Header */}
        <div className="bg-blue-600 dark:bg-blue-700 text-white px-4 py-3 shadow-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setViewMode('privateList');
                setSelectedPrivateChat(null);
              }}
              className="hover:bg-white/10 rounded-lg p-2 -ml-2 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="w-10 h-10 ring-2 ring-white/20">
                  <AvatarFallback className="bg-white/20 text-white">
                    {getInitials(selectedPrivateChat.userName)}
                  </AvatarFallback>
                </Avatar>
                {selectedPrivateChat.isOnline && (
                  <Circle className="absolute bottom-0 right-0 w-3 h-3 fill-green-400 text-green-400 border-2 border-blue-600 rounded-full" />
                )}
              </div>
              <div>
                <h3 className="text-white">{selectedPrivateChat.userName}</h3>
                <p className="text-xs text-blue-100">
                  {selectedPrivateChat.isOnline ? 'Online' : `Last seen ${selectedPrivateChat.timestamp}`}
                </p>
              </div>
            </div>
          </div>
          <button className="hover:bg-white/10 rounded-lg p-2 transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 px-4 py-4">
          <div className="space-y-3 max-w-4xl mx-auto">
            {getCurrentMessages().map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.isOwn ? 'flex-row-reverse' : ''}`}
              >
                <Avatar className="w-9 h-9 flex-shrink-0">
                  <AvatarFallback className={msg.isOwn ? 'bg-green-600 text-white text-xs' : 'bg-slate-300 text-slate-700 dark:bg-slate-700 dark:text-slate-300 text-xs'}>
                    {msg.isOwn ? 'You' : getInitials(msg.user)}
                  </AvatarFallback>
                </Avatar>
                <div className={`flex-1 max-w-[75%] ${msg.isOwn ? 'flex flex-col items-end' : ''}`}>
                  <div
                    className={`inline-block px-3 py-2 rounded-xl ${
                      msg.isOwn
                        ? 'bg-[#DFF7E0] dark:bg-green-900 text-slate-900 dark:text-green-100 rounded-br-sm'
                        : 'bg-[#F1F3F5] dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-bl-sm'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.message}</p>
                  </div>
                  <span className="text-xs text-slate-400 dark:text-slate-500 mt-1 px-1">{msg.time}</span>
                </div>
              </div>
            ))}
            <div ref={scrollRef} />
          </div>
        </div>

        {/* Professional WhatsApp-Style Input Bar */}
        <div 
          className="bg-white dark:bg-slate-900 border-t border-[#E9ECEF] dark:border-slate-800 px-3 py-2"
          style={{ 
            height: '64px',
            boxShadow: '0 0 6px rgba(0, 0, 0, 0.1)',
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px'
          }}
        >
          <div className="flex gap-3 items-center max-w-4xl mx-auto h-full">
            {/* Attach Button */}
            <button 
              className="flex-shrink-0 text-[#6C757D] hover:text-slate-900 dark:hover:text-slate-100 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              title="Attach file"
            >
              <Paperclip className="w-6 h-6" />
            </button>

            {/* Text Input Container */}
            <div className="flex-1 flex gap-2 items-center bg-[#F8F9FA] dark:bg-slate-800 rounded-[20px] px-4 py-2 h-11">
              <Input
                placeholder="Type a message…"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-8 px-0 text-[#1E1E1E] dark:text-white placeholder:text-[#A9A9A9] dark:placeholder:text-slate-500"
                style={{ fontSize: '14px' }}
              />
              
              {/* Emoji Button */}
              <button 
                className="flex-shrink-0 text-[#6C757D] hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                title="Add emoji"
              >
                <Smile className="w-5 h-5" />
              </button>
            </div>

            {/* Send Button */}
            <button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all disabled:cursor-not-allowed ${
                message.trim() 
                  ? 'bg-[#00A35A] hover:bg-[#00884D] text-white shadow-[0_2px_8px_rgba(0,163,90,0.3)] hover:shadow-[0_4px_12px_rgba(0,163,90,0.4)] active:scale-95' 
                  : 'bg-[#00A35A] opacity-40 text-white'
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

  return null;
}