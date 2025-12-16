import { useState, useEffect } from "react";
import {
  Home,
  MessageSquare,
  AlertCircle,
  ShoppingBag,
  User,
  Menu,
  Bell,
  ChevronRight,
  Users,
  DollarSign,
  CreditCard,
  Search,
  MessageCircle,
  Building,
  Car,
  TrendingUp,
  Moon,
  Sun,
} from "lucide-react";
import { Button } from "./components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "./components/ui/sheet";
import { Toaster } from "./components/ui/sonner";
import { Dashboard } from "./components/Dashboard";
import { Complaints } from "./components/Complaints";
import { EmergencySOS } from "./components/EmergencySOS";
import { ServiceMarketplace } from "./components/ServiceMarketplace";
import { Profile } from "./components/Profile";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { ServiceProviderLogin } from "./components/ServiceProviderLogin";
import { ServiceProviderSignUpFlow } from "./components/ServiceProviderSignUpFlow";
import { ServiceProviderDashboard } from "./components/ServiceProviderDashboard";
import { ENoticeBoard } from "./components/ENoticeBoard";
import { SocietyDirectory } from "./components/SocietyDirectory";
import { UtilityBills } from "./components/UtilityBills";
import { Maintenance } from "./components/Maintenance";
import { Events } from "./components/Events";
import { LostAndFound } from "./components/LostAndFound";
import { CommunityChat } from "./components/CommunityChat";
import { PropertyMarket } from "./components/PropertyMarket";
import { CarPooling } from "./components/CarPooling";
import { OnlinePayment } from "./components/OnlinePayment";
import { LanguageSettings } from "./components/LanguageSettings";
import { AppPreferences } from "./components/AppPreferences";
import { PrivacySecurity } from "./components/PrivacySecurity";
import { ServiceProviderProfile } from "./components/ServiceProviderProfile";
import { NotificationsPanel } from "./components/Notifications";

// Categorized menu items for the drawer
const menuCategories = [
  {
    category: "Financial",
    icon: DollarSign,
    items: [
      { id: "bills", label: "Utility Bills", icon: DollarSign },
      {
        id: "online-payment",
        label: "Online Payment",
        icon: CreditCard,
      },
    ],
  },
  {
    category: "Community",
    icon: Users,
    items: [
      {
        id: "chat",
        label: "Community Chat",
        icon: MessageCircle,
      },
      {
        id: "lostandfound",
        label: "Lost & Found",
        icon: Search,
      },
      { id: "carpool", label: "Car Pooling", icon: Car },
    ],
  },
  {
    category: "Marketplace",
    icon: Building,
    items: [
      {
        id: "property",
        label: "Property Market",
        icon: Building,
      },
    ],
  },
];

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<"resident" | "serviceProvider">("resident");
  const [authView, setAuthView] = useState<"login" | "signup" | "serviceProviderLogin" | "serviceProviderSignup">(
    "login",
  );

  // Load dark mode preference and auth state
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "true") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }

    const authState = localStorage.getItem("isAuthenticated");
    const savedUserType = localStorage.getItem("userType") as "resident" | "serviceProvider" | null;
    if (authState === "true") {
      setIsAuthenticated(true);
      if (savedUserType) {
        setUserType(savedUserType);
      }
    }
  }, []);

  const toggleDarkMode = (enabled: boolean) => {
    setDarkMode(enabled);
    localStorage.setItem("darkMode", enabled.toString());
    if (enabled) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setUserType("resident");
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userType", "resident");
  };

  const handleSignup = () => {
    setIsAuthenticated(true);
    setUserType("resident");
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userType", "resident");
  };

  const handleServiceProviderLogin = () => {
    setIsAuthenticated(true);
    setUserType("serviceProvider");
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userType", "serviceProvider");
  };

  const handleServiceProviderSignup = () => {
    setIsAuthenticated(true);
    setUserType("serviceProvider");
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userType", "serviceProvider");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.setItem("isAuthenticated", "false");
    localStorage.removeItem("userType");
    setActiveSection("home");
    setAuthView("login");
  };

  // Show login/signup if not authenticated
  if (!isAuthenticated) {
    if (authView === "login") {
      return (
        <Login
          onLogin={handleLogin}
          onNavigateToSignup={() => setAuthView("signup")}
          onNavigateToServiceProviderLogin={() => setAuthView("serviceProviderLogin")}
        />
      );
    } else if (authView === "signup") {
      return (
        <Signup
          onSignup={handleSignup}
          onNavigateToLogin={() => setAuthView("login")}
        />
      );
    } else if (authView === "serviceProviderLogin") {
      return (
        <ServiceProviderLogin
          onLogin={handleServiceProviderLogin}
          onNavigateToSignup={() => setAuthView("serviceProviderSignup")}
          onNavigateToUserLogin={() => setAuthView("login")}
        />
      );
    } else if (authView === "serviceProviderSignup") {
      return (
        <ServiceProviderSignUpFlow
          onSignup={handleServiceProviderSignup}
          onNavigateToLogin={() => setAuthView("serviceProviderLogin")}
          onNavigateToUserSignup={() => setAuthView("signup")}
        />
      );
    }
  }

  // Service Provider View - Restricted Dashboard
  if (userType === "serviceProvider") {
    const renderServiceProviderContent = () => {
      switch (activeSection) {
        case "profile":
          return (
            <ServiceProviderProfile
              darkMode={darkMode}
              toggleDarkMode={toggleDarkMode}
              onLogout={handleLogout}
            />
          );
        default:
          return <ServiceProviderDashboard onNavigate={setActiveSection} />;
      }
    };

    return (
      <div className="min-h-screen bg-slate-50 dark:bg-black transition-colors">
        {/* Service Provider Header */}
        <header className="bg-gradient-to-r from-slate-900 via-blue-800 to-blue-900 text-white sticky top-0 z-40 shadow-lg">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-blue-600 rounded-lg flex items-center justify-center shadow-md">
                  <Building className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-white">
                    Service Provider Portal
                  </h1>
                  <p className="text-sm text-blue-200">
                    Professional Dashboard
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10"
                  onClick={() => toggleDarkMode(!darkMode)}
                >
                  {darkMode ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </Button>
                <Button
                  onClick={() => setActiveSection("home")}
                  variant={activeSection === "home" ? "secondary" : "ghost"}
                  className={activeSection === "home" 
                    ? "bg-white/20 text-white hover:bg-white/30" 
                    : "text-white hover:bg-white/10"
                  }
                >
                  Dashboard
                </Button>
                <Button
                  onClick={() => setActiveSection("profile")}
                  variant={activeSection === "profile" ? "secondary" : "ghost"}
                  className={activeSection === "profile" 
                    ? "bg-white/20 text-white hover:bg-white/30" 
                    : "text-white hover:bg-white/10"
                  }
                >
                  Profile
                </Button>
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className="text-white hover:bg-white/10"
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-4 py-6 max-w-7xl mx-auto">
          {renderServiceProviderContent()}
        </main>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeSection) {
      case "home":
        return <Dashboard onNavigate={setActiveSection} />;
      case "complaints":
        return <Complaints />;
      case "emergency":
        return <EmergencySOS />;
      case "marketplace":
        return <ServiceMarketplace />;
      case "profile":
        return (
          <Profile
            onNavigate={setActiveSection}
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            onLogout={handleLogout}
          />
        );
      case "language-settings":
        return <LanguageSettings onBack={() => setActiveSection("profile")} />;
      case "app-preferences":
        return <AppPreferences onBack={() => setActiveSection("profile")} />;
      case "privacy-security":
        return <PrivacySecurity onBack={() => setActiveSection("profile")} />;
      case "directory":
        return <SocietyDirectory />;
      case "bills":
        return <UtilityBills />;
      case "maintenance":
        return <Maintenance />;
      case "events":
        return <Events />;
      case "lostandfound":
        return <LostAndFound />;
      case "chat":
        return <CommunityChat onBack={() => setActiveSection('home')} />;
      case "property":
        return <PropertyMarket />;
      case "carpool":
        return <CarPooling />;
      case "online-payment":
        return <OnlinePayment />;
      case "enoticeboard":
        return <ENoticeBoard onBack={() => setActiveSection("home")} />;
      default:
        return <Dashboard onNavigate={setActiveSection} />;
    }
  };

  const bottomNavItems = [
    {
      id: "home",
      label: "Home",
      icon: Home,
      color: "text-green-600",
      activeColor:
        "bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-400",
    },
    {
      id: "complaints",
      label: "Complaints",
      icon: MessageSquare,
      color: "text-slate-600",
      activeColor:
        "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100",
    },
    {
      id: "emergency",
      label: "SOS",
      icon: AlertCircle,
      color: "text-white",
      activeColor: "bg-red-600 text-white",
      isSpecial: true,
    },
    {
      id: "marketplace",
      label: "Services",
      icon: ShoppingBag,
      color: "text-slate-600",
      activeColor:
        "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100",
    },
    {
      id: "profile",
      label: "Profile",
      icon: User,
      color: "text-slate-600",
      activeColor:
        "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black pb-20 transition-colors">
      <Toaster />
      
      {/* Notifications Panel */}
      {showNotifications && (
        <NotificationsPanel onClose={() => setShowNotifications(false)} />
      )}
      
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-green-900 text-white sticky top-0 z-40 shadow-lg">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-green-600 rounded-lg flex items-center justify-center shadow-md">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-white">
                  UrbanEase
                </h1>
                <p className="text-sm text-green-200">
                  Welcome, Ahmed Khan
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 relative"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full"></span>
              </Button>
              <Sheet
                open={drawerOpen}
                onOpenChange={setDrawerOpen}
              >
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/10"
                  >
                    <Menu className="w-6 h-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-80 bg-white dark:bg-slate-900 p-0 border-l-4 border-green-600"
                >
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  <SheetDescription className="sr-only">Browse through all available sections and features</SheetDescription>
                  <div className="h-full flex flex-col">
                    {/* Enhanced Header with Gradient */}
                    <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-green-900 p-6 text-white overflow-hidden">
                      {/* Decorative Elements */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-green-600/10 rounded-full -mr-16 -mt-16"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-green-600/10 rounded-full -ml-12 -mb-12"></div>

                      <div className="relative z-10">
                        {/* Logo/Brand */}
                        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/10">
                          <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center shadow-lg">
                            <Building className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-white">
                              UrbanEase
                            </h3>
                            <p className="text-xs text-green-200">
                              Community Living
                            </p>
                          </div>
                        </div>

                        {/* User Info */}
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center shadow-xl ring-4 ring-green-600/30">
                              <User className="w-7 h-7 text-white" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-slate-900 flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-white">
                              Ahmed Khan
                            </h3>
                            <p className="text-sm text-green-200 flex items-center gap-1">
                              <Building className="w-3 h-3" />
                              Block A, #204
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-slate-50/50 to-white dark:from-slate-900 dark:to-slate-900">
                      <h3 className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4 px-2 flex items-center gap-2">
                        <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800"></div>
                        <span>Explore More</span>
                        <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800"></div>
                      </h3>

                      {/* Categorized Menu */}
                      <div className="space-y-6">
                        {menuCategories.map(
                          (category, catIndex) => {
                            const CategoryIcon = category.icon;
                            return (
                              <div key={catIndex}>
                                <div className="flex items-center gap-2 px-2 mb-2">
                                  <CategoryIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
                                  <h4 className="text-xs uppercase tracking-wider text-slate-600 dark:text-slate-400">
                                    {category.category}
                                  </h4>
                                </div>
                                <div className="space-y-1">
                                  {category.items.map(
                                    (item) => {
                                      const Icon = item.icon;
                                      const isActive =
                                        activeSection ===
                                        item.id;
                                      return (
                                        <button
                                          key={item.id}
                                          onClick={() => {
                                            setActiveSection(
                                              item.id,
                                            );
                                            setDrawerOpen(
                                              false,
                                            );
                                          }}
                                          className={`w-full flex items-center justify-between p-3 rounded-xl transition-all group relative overflow-hidden ${
                                            isActive
                                              ? "bg-green-600 shadow-lg shadow-green-600/20"
                                              : "hover:bg-green-50 dark:hover:bg-slate-800"
                                          }`}
                                        >
                                          {/* Hover gradient background */}
                                          {!isActive && (
                                            <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-transparent dark:from-slate-800 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                          )}

                                          <div className="flex items-center gap-3 relative z-10">
                                            <div
                                              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all shadow-sm ${
                                                isActive
                                                  ? "bg-white/20 backdrop-blur-sm"
                                                  : "bg-gradient-to-br from-green-50 to-green-100 dark:from-slate-800 dark:to-slate-700 group-hover:from-green-600 group-hover:to-green-700"
                                              }`}
                                            >
                                              <Icon
                                                className={`w-5 h-5 transition-colors ${
                                                  isActive
                                                    ? "text-white"
                                                    : "text-green-600 group-hover:text-white dark:text-green-400"
                                                }`}
                                              />
                                            </div>
                                            <span
                                              className={`text-sm transition-colors ${
                                                isActive
                                                  ? "text-white"
                                                  : "text-slate-900 dark:text-slate-100"
                                              }`}
                                            >
                                              {item.label}
                                            </span>
                                          </div>
                                          <ChevronRight
                                            className={`w-4 h-4 transition-all relative z-10 ${
                                              isActive
                                                ? "text-white translate-x-1"
                                                : "text-slate-400 group-hover:translate-x-1"
                                            }`}
                                          />
                                        </button>
                                      );
                                    },
                                  )}
                                </div>
                              </div>
                            );
                          },
                        )}
                      </div>

                      {/* Enhanced Quick Stats */}
                      <div className="mt-6 p-4 bg-gradient-to-br from-green-500 to-green-700 dark:from-green-900 dark:to-green-950 rounded-xl shadow-lg border border-green-400 dark:border-green-800">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center">
                            <TrendingUp className="w-4 h-4 text-white" />
                          </div>
                          <h4 className="text-sm text-white">
                            Your Activity
                          </h4>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-green-200 rounded-full"></div>
                              <span className="text-xs text-green-100">
                                Messages
                              </span>
                            </div>
                            <span className="text-sm text-white">
                              12 new
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-green-200 rounded-full"></div>
                              <span className="text-xs text-green-100">
                                Carpools
                              </span>
                            </div>
                            <span className="text-sm text-white">
                              3 active
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-green-200 rounded-full"></div>
                              <span className="text-xs text-green-100">
                                Pending Bills
                              </span>
                            </div>
                            <span className="text-sm text-white">
                              ₹450
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 max-w-7xl mx-auto">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className={`fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shadow-lg z-50 transition-colors ${activeSection === 'chat' ? 'hidden' : ''}`}>
        <div className="flex items-center justify-around px-2 py-2 max-w-md mx-auto">
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            if (item.isSpecial) {
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className="relative -mt-8"
                >
                  <div
                    className={`w-16 h-16 rounded-full ${
                      isActive ? "bg-red-600" : "bg-red-500"
                    } shadow-xl flex flex-col items-center justify-center transition-all hover:scale-105 active:scale-95 border-4 border-white dark:border-slate-900`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <span
                    className={`absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap ${
                      isActive
                        ? "text-red-600"
                        : "text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all ${
                  isActive
                    ? item.activeColor
                    : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                }`}
              >
                <Icon
                  className={`w-6 h-6 transition-transform ${isActive ? "scale-110" : ""}`}
                />
                <span className="text-xs">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}