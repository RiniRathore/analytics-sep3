import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, TrendingUp, Users, Globe, Smartphone, Monitor, CreditCard } from 'lucide-react';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import POSAnalytics from './components/POSAnalytics';

type ActiveTool = 'analytics' | 'pos';

const sidebarItems = [
  {
    id: 'analytics' as const,
    name: 'Analytics Dashboard',
    icon: BarChart3,
    description: 'Conversion rates, device stats, and booking analytics'
  },
  {
    id: 'pos' as const,
    name: 'POS Analytics',
    icon: CreditCard,
    description: 'Point of sale systems and booking sources'
  }
];

function App() {
  const [activeTool, setActiveTool] = useState<ActiveTool>('analytics');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="flex">
        {/* Enhanced Sidebar */}
        <motion.div 
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          className="w-80 bg-white/80 backdrop-blur-xl border-r border-slate-200/60 shadow-xl min-h-screen"
        >
          <div className="p-8">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Analytics Hub
                </h1>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                Comprehensive insights and data visualization platform
              </p>
            </motion.div>

            <nav className="space-y-3">
              {sidebarItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setActiveTool(item.id)}
                  className={`w-full text-left p-4 rounded-2xl transition-all duration-300 group ${
                    activeTool === item.id
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
                      : 'hover:bg-slate-50 text-slate-700 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-xl transition-colors ${
                      activeTool === item.id
                        ? 'bg-white/20'
                        : 'bg-slate-100 group-hover:bg-slate-200'
                    }`}>
                      <item.icon className={`w-5 h-5 ${
                        activeTool === item.id ? 'text-white' : 'text-slate-600'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-semibold text-sm mb-1 ${
                        activeTool === item.id ? 'text-white' : 'text-slate-800'
                      }`}>
                        {item.name}
                      </h3>
                      <p className={`text-xs leading-relaxed ${
                        activeTool === item.id ? 'text-blue-100' : 'text-slate-500'
                      }`}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </nav>

            {/* Quick Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 p-6 bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-2xl border border-slate-200/60"
            >
              <h4 className="font-semibold text-slate-800 mb-4 flex items-center">
                <Globe className="w-4 h-4 mr-2 text-slate-600" />
                Quick Overview
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Active Tools</span>
                  <span className="text-sm font-semibold text-slate-800">2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Data Sources</span>
                  <span className="text-sm font-semibold text-slate-800">11+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Real-time</span>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    <span className="text-sm font-semibold text-green-600">Live</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTool}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {activeTool === 'analytics' && <AnalyticsDashboard />}
              {activeTool === 'pos' && <POSAnalytics />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default App;