
import React, { useState } from 'react';
import { User, BookOpen, Activity, TrendingUp, Star, Clock, BarChart3, PieChart, Github, Youtube, Calendar, Award } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

// Mock data
const mockUser = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  streak: 12,
  completedCourses: 8,
  hoursLearned: 127
};

const mockRecommendations = [
  {
    id: 1,
    title: "Advanced React Patterns",
    source: "YouTube",
    icon: <Youtube className="w-5 h-5 text-red-500" />,
    description: "Master advanced React concepts including hooks, context, and performance optimization",
    duration: "3.5 hours",
    rating: 4.8
  },
  {
    id: 2,
    title: "Machine Learning Fundamentals",
    source: "GitHub",
    icon: <Github className="w-5 h-5 text-gray-700" />,
    description: "Complete guide to ML algorithms and practical implementations",
    duration: "6 hours",
    rating: 4.9
  },
  {
    id: 3,
    title: "TypeScript Deep Dive",
    source: "YouTube",
    icon: <Youtube className="w-5 h-5 text-red-500" />,
    description: "Advanced TypeScript features and best practices",
    duration: "4.2 hours",
    rating: 4.7
  },
  {
    id: 4,
    title: "System Design Interview",
    source: "GitHub",
    icon: <Github className="w-5 h-5 text-gray-700" />,
    description: "Comprehensive system design patterns and case studies",
    duration: "8 hours",
    rating: 4.6
  }
];

const activityData = [
  { name: 'Mon', hours: 2.5 },
  { name: 'Tue', hours: 3.2 },
  { name: 'Wed', hours: 1.8 },
  { name: 'Thu', hours: 4.1 },
  { name: 'Fri', hours: 2.9 },
  { name: 'Sat', hours: 3.7 },
  { name: 'Sun', hours: 2.3 }
];

const topicData = [
  { name: 'Frontend', value: 35, color: '#3B82F6' },
  { name: 'Backend', value: 25, color: '#10B981' },
  { name: 'Machine Learning', value: 20, color: '#F59E0B' },
  { name: 'DevOps', value: 15, color: '#EF4444' },
  { name: 'Mobile', value: 5, color: '#8B5CF6' }
];

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'recommendations', label: 'Recommendations', icon: BookOpen },
    { id: 'activity', label: 'Activity', icon: Activity }
  ];

  const renderDashboardContent = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {mockUser.name}! 👋</h1>
        <p className="text-blue-100 text-lg">Ready to continue your learning journey?</p>
        <div className="flex items-center gap-6 mt-6">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-300" />
            <span className="font-semibold">{mockUser.streak} day streak</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-green-300" />
            <span className="font-semibold">{mockUser.hoursLearned} hours learned</span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Completed Courses</p>
              <p className="text-2xl font-bold text-gray-900">{mockUser.completedCourses}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Current Streak</p>
              <p className="text-2xl font-bold text-gray-900">{mockUser.streak} days</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Hours This Week</p>
              <p className="text-2xl font-bold text-gray-900">20.5</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recommended for You</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockRecommendations.slice(0, 4).map((course) => (
            <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900 text-sm">{course.title}</h3>
                {course.icon}
              </div>
              <p className="text-gray-600 text-sm mb-3">{course.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{course.duration}</span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-xs text-gray-600">{course.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Activity</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="hours" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Topics</h3>
          <ResponsiveContainer width="100%" height={200}>
            <RechartsPieChart>
              <Pie
                data={topicData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {topicData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {topicData.map((topic) => (
              <div key={topic.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: topic.color }}></div>
                  <span className="text-sm text-gray-600">{topic.name}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{topic.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderProfileContent = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Profile</h2>
        <div className="flex items-center gap-6 mb-6">
          <img src={mockUser.avatar} alt="Profile" className="w-20 h-20 rounded-full" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{mockUser.name}</h3>
            <p className="text-gray-600">{mockUser.email}</p>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-sm text-gray-500">Joined March 2024</span>
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm text-gray-500">Learning Enthusiast</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Learning Stats</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Courses Completed</span>
                <span className="font-medium">{mockUser.completedCourses}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Hours Learned</span>
                <span className="font-medium">{mockUser.hoursLearned}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Current Streak</span>
                <span className="font-medium">{mockUser.streak} days</span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Achievements</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-yellow-500" />
                <span className="text-sm">7-day streak</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-blue-500" />
                <span className="text-sm">First course completed</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-green-500" />
                <span className="text-sm">100 hours learned</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRecommendationsContent = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Recommended Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockRecommendations.map((course) => (
            <div key={course.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-gray-900">{course.title}</h3>
                {course.icon}
              </div>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{course.duration}</span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">{course.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderActivityContent = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Learning Activity</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Hours</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="hours" stroke="#3B82F6" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Topic Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={topicData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {topicData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return renderProfileContent();
      case 'recommendations':
        return renderRecommendationsContent();
      case 'activity':
        return renderActivityContent();
      default:
        return renderDashboardContent();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Smart Learning</h1>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeSection === item.id
                      ? 'bg-blue-50 text-blue-600 border border-blue-200'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 capitalize">{activeSection}</h1>
            <div className="flex items-center gap-4">
              <img src={mockUser.avatar} alt="User" className="w-10 h-10 rounded-full" />
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{mockUser.name}</p>
                <p className="text-xs text-gray-500">Learner</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
