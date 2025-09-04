@@ .. @@
-import React, { useState, useEffect } from 'react';
-import { Calendar, TrendingUp, BarChart3, PieChart, Filter } from 'lucide-react';
+import React, { useState, useEffect } from 'react';
+import { motion } from 'framer-motion';
+import { Calendar, TrendingUp, BarChart3, PieChart, Filter, Users, Globe, Smartphone } from 'lucide-react';
 import DateRangePicker from './DateRangePicker';
@@ .. @@
 const AnalyticsDashboard: React.FC = () => {
   const [dateRange, setDateRange] = useState({
     startDate: '2025-08-01',
     endDate: '2025-08-02'
   });
   const [propertyId, setPropertyId] = useState('');
   const [conversionData, setConversionData] = useState<ConversionData | null>(null);
   const [deviceData, setDeviceData] = useState<DeviceData | null>(null);
   const [browserData, setBrowserData] = useState<BrowserData | null>(null);
   const [countryData, setCountryData] = useState<CountryData | null>(null);
   const [funnelData, setFunnelData] = useState<FunnelData | null>(null);
   const [dailyData, setDailyData] = useState<DailyData | null>(null);
   const [osData, setOsData] = useState<OsData | null>(null);
   const [deviceRegionData, setDeviceRegionData] = useState<DeviceRegionData | null>(null);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);
@@ .. @@
   };

   return (
-    <div className="min-h-screen bg-gray-50 p-6">
-      <div className="max-w-7xl mx-auto">
-        {/* Header */}
-        <div className="mb-8">
-          <div className="flex items-center justify-between mb-6">
-            <div>
-              <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
-              <p className="text-gray-600">Real-time insights and performance metrics</p>
+    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-8">
+      <motion.div
+        initial={{ opacity: 0, y: -20 }}
+        animate={{ opacity: 1, y: 0 }}
+        className="max-w-7xl mx-auto"
+      >
+        {/* Enhanced Header */}
+        <div className="mb-8">
+          <div className="flex items-center justify-between mb-6">
+            <div>
+              <div className="flex items-center space-x-3 mb-2">
+                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
+                  <BarChart3 className="w-7 h-7 text-white" />
+                </div>
+                <div>
+                  <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
+                    Analytics Dashboard
+                  </h1>
+                  <p className="text-slate-500">Real-time insights and performance metrics</p>
+                </div>
+              </div>
             </div>
             
-            <div className="flex items-center space-x-4">
+            <motion.div
+              initial={{ opacity: 0, scale: 0.9 }}
+              animate={{ opacity: 1, scale: 1 }}
+              transition={{ delay: 0.2 }}
+              className="flex items-center space-x-4"
+            >
               <DateRangePicker
                 startDate={dateRange.startDate}
                 endDate={dateRange.endDate}
                 onDateRangeChange={handleDateRangeChange}
               />
-            </div>
+            </motion.div>
           </div>

-          {/* Property Filter */}
-          <div className="flex items-center space-x-4 mb-6">
-            <Filter className="w-5 h-5 text-gray-600" />
-            <input
-              type="text"
-              placeholder="Property ID (optional)"
-              value={propertyId}
-              onChange={(e) => setPropertyId(e.target.value)}
-              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
-            />
-            <span className="text-sm text-gray-500">Filter by specific property</span>
-          </div>
+          {/* Enhanced Property Filter */}
+          <motion.div
+            initial={{ opacity: 0, y: 10 }}
+            animate={{ opacity: 1, y: 0 }}
+            transition={{ delay: 0.3 }}
+            className="flex items-center space-x-4 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-sm"
+          >
+            <Filter className="w-5 h-5 text-slate-600" />
+            <input
+              type="text"
+              placeholder="Property ID (optional)"
+              value={propertyId}
+              onChange={(e) => setPropertyId(e.target.value)}
+              className="px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm text-slate-800 placeholder-slate-400 transition-all duration-200"
+            />
+            <span className="text-sm text-slate-500 font-medium">Filter by specific property</span>
+          </motion.div>
         </div>

         {loading && (
-          <div className="flex items-center justify-center py-20">
-            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
-            <span className="ml-4 text-gray-600">Loading analytics...</span>
-          </div>
+          <motion.div
+            initial={{ opacity: 0 }}
+            animate={{ opacity: 1 }}
+            className="flex items-center justify-center py-20"
+          >
+            <div className="flex items-center space-x-3">
+              <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
+              <span className="text-slate-600 font-medium">Loading analytics...</span>
+            </div>
+          </motion.div>
         )}

         {error && (
-          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
-            <h3 className="font-semibold text-red-800">Error Loading Data</h3>
-            <p className="text-red-600">{error}</p>
-          </div>
+          <motion.div
+            initial={{ opacity: 0, scale: 0.9 }}
+            animate={{ opacity: 1, scale: 1 }}
+            className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8"
+          >
+            <div className="flex items-center space-x-3">
+              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
+                <BarChart3 className="w-5 h-5 text-red-600" />
+              </div>
+              <div>
+                <h3 className="font-semibold text-red-800">Error Loading Data</h3>
+                <p className="text-red-600 text-sm">{error}</p>
+              </div>
+            </div>
+          </motion.div>
         )}

         {!loading && !error && (
-          <div className="space-y-8">
+          <motion.div
+            initial={{ opacity: 0, y: 20 }}
+            animate={{ opacity: 1, y: 0 }}
+            transition={{ delay: 0.2 }}
+            className="space-y-8"
+          >
             {/* Stats Cards */}
             {conversionData && (
-              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
-                <div className="bg-white p-6 rounded-lg shadow-md">
-                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Conversion Rate</h3>
-                  <p className="text-3xl font-bold text-blue-600">{conversionData.booking_conversion_rate.toFixed(2)}%</p>
-                </div>
-                <div className="bg-white p-6 rounded-lg shadow-md">
-                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Bookings</h3>
-                  <p className="text-3xl font-bold text-green-600">{conversionData.confirmed_bookings.toLocaleString()}</p>
-                </div>
-                <div className="bg-white p-6 rounded-lg shadow-md">
-                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Visitors</h3>
-                  <p className="text-3xl font-bold text-purple-600">{conversionData.total_visitors.toLocaleString()}</p>
-                </div>
-              </div>
+              <motion.div
+                initial={{ opacity: 0, y: 20 }}
+                animate={{ opacity: 1, y: 0 }}
+                transition={{ delay: 0.3 }}
+                className="grid grid-cols-1 md:grid-cols-3 gap-6"
+              >
+                {[
+                  {
+                    title: 'Conversion Rate',
+                    value: `${conversionData.booking_conversion_rate.toFixed(2)}%`,
+                    icon: TrendingUp,
+                    gradient: 'from-blue-600 to-cyan-600',
+                    bgGradient: 'from-blue-50 to-cyan-50'
+                  },
+                  {
+                    title: 'Total Bookings',
+                    value: conversionData.confirmed_bookings.toLocaleString(),
+                    icon: Users,
+                    gradient: 'from-emerald-600 to-teal-600',
+                    bgGradient: 'from-emerald-50 to-teal-50'
+                  },
+                  {
+                    title: 'Total Visitors',
+                    value: conversionData.total_visitors.toLocaleString(),
+                    icon: Globe,
+                    gradient: 'from-purple-600 to-pink-600',
+                    bgGradient: 'from-purple-50 to-pink-50'
+                  }
+                ].map((stat, index) => (
+                  <motion.div
+                    key={stat.title}
+                    initial={{ opacity: 0, y: 20 }}
+                    animate={{ opacity: 1, y: 0 }}
+                    transition={{ delay: 0.4 + index * 0.1 }}
+                    className={`bg-gradient-to-br ${stat.bgGradient} rounded-3xl border border-white/60 shadow-xl p-6 hover:shadow-2xl transition-all duration-300 group`}
+                  >
+                    <div className="flex items-start justify-between mb-4">
+                      <div className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
+                        <stat.icon className="w-6 h-6 text-white" />
+                      </div>
+                    </div>
+                    <div>
+                      <h3 className="text-2xl font-bold text-slate-800 mb-1 group-hover:text-slate-900 transition-colors">
+                        {stat.value}
+                      </h3>
+                      <p className="text-slate-600 text-sm font-medium">{stat.title}</p>
+                    </div>
+                  </motion.div>
+                ))}
+              </motion.div>
             )}

             {/* Charts Grid */}
-            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
+            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
               {/* Daily Trends Chart */}
               {dailyData && (
-                <div className="bg-white p-6 rounded-lg shadow-md">
-                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
-                    <TrendingUp className="w-5 h-5 mr-2" />
-                    Daily Booking Trends
-                  </h3>
+                <motion.div
+                  initial={{ opacity: 0, scale: 0.95 }}
+                  animate={{ opacity: 1, scale: 1 }}
+                  transition={{ delay: 0.5 }}
+                  className="bg-white/70 backdrop-blur-sm rounded-3xl border border-slate-200/60 shadow-xl p-8"
+                >
+                  <div className="flex items-center space-x-3 mb-6">
+                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
+                      <TrendingUp className="w-5 h-5 text-white" />
+                    </div>
+                    <div>
+                      <h3 className="text-xl font-bold text-slate-800">Daily Booking Trends</h3>
+                      <p className="text-slate-500 text-sm">Performance over time</p>
+                    </div>
+                  </div>
                   <DailyTrendsChart data={dailyData} />
-                </div>
+                </motion.div>
               )}

               {/* Country Chart */}
               {countryData && (
-                <div className="bg-white p-6 rounded-lg shadow-md">
-                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
-                    <BarChart3 className="w-5 h-5 mr-2" />
-                    Country Performance
-                  </h3>
+                <motion.div
+                  initial={{ opacity: 0, scale: 0.95 }}
+                  animate={{ opacity: 1, scale: 1 }}
+                  transition={{ delay: 0.6 }}
+                  className="bg-white/70 backdrop-blur-sm rounded-3xl border border-slate-200/60 shadow-xl p-8"
+                >
+                  <div className="flex items-center space-x-3 mb-6">
+                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
+                      <Globe className="w-5 h-5 text-white" />
+                    </div>
+                    <div>
+                      <h3 className="text-xl font-bold text-slate-800">Country Performance</h3>
+                      <p className="text-slate-500 text-sm">Geographic distribution</p>
+                    </div>
+                  </div>
                   <CountryChart data={countryData} />
-                </div>
+                </motion.div>
               )}

               {/* Device Chart */}
               {deviceData && (
-                <div className="bg-white p-6 rounded-lg shadow-md">
-                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
-                    <PieChart className="w-5 h-5 mr-2" />
-                    Device Distribution
-                  </h3>
+                <motion.div
+                  initial={{ opacity: 0, scale: 0.95 }}
+                  animate={{ opacity: 1, scale: 1 }}
+                  transition={{ delay: 0.7 }}
+                  className="bg-white/70 backdrop-blur-sm rounded-3xl border border-slate-200/60 shadow-xl p-8"
+                >
+                  <div className="flex items-center space-x-3 mb-6">
+                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
+                      <Smartphone className="w-5 h-5 text-white" />
+                    </div>
+                    <div>
+                      <h3 className="text-xl font-bold text-slate-800">Device Distribution</h3>
+                      <p className="text-slate-500 text-sm">Booking by device type</p>
+                    </div>
+                  </div>
                   <DeviceChart data={deviceData} />
-                </div>
+                </motion.div>
               )}

               {/* Browser Chart */}
               {browserData && (
-                <div className="bg-white p-6 rounded-lg shadow-md">
-                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
-                    <PieChart className="w-5 h-5 mr-2" />
-                    Browser Distribution
-                  </h3>
+                <motion.div
+                  initial={{ opacity: 0, scale: 0.95 }}
+                  animate={{ opacity: 1, scale: 1 }}
+                  transition={{ delay: 0.8 }}
+                  className="bg-white/70 backdrop-blur-sm rounded-3xl border border-slate-200/60 shadow-xl p-8"
+                >
+                  <div className="flex items-center space-x-3 mb-6">
+                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
+                      <Monitor className="w-5 h-5 text-white" />
+                    </div>
+                    <div>
+                      <h3 className="text-xl font-bold text-slate-800">Browser Distribution</h3>
+                      <p className="text-slate-500 text-sm">User browser preferences</p>
+                    </div>
+                  </div>
                   <BrowserChart data={browserData} />
-                </div>
+                </motion.div>
               )}
             </div>

             {/* Full Width Charts */}
             <div className="space-y-8">
               {/* Funnel Chart */}
               {funnelData && (
-                <div className="bg-white p-6 rounded-lg shadow-md">
-                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Conversion Funnel</h3>
+                <motion.div
+                  initial={{ opacity: 0, y: 20 }}
+                  animate={{ opacity: 1, y: 0 }}
+                  transition={{ delay: 0.9 }}
+                  className="bg-white/70 backdrop-blur-sm rounded-3xl border border-slate-200/60 shadow-xl p-8"
+                >
+                  <div className="flex items-center space-x-3 mb-6">
+                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
+                      <BarChart3 className="w-5 h-5 text-white" />
+                    </div>
+                    <div>
+                      <h3 className="text-xl font-bold text-slate-800">Conversion Funnel</h3>
+                      <p className="text-slate-500 text-sm">User journey analysis</p>
+                    </div>
+                  </div>
                   <FunnelChart data={funnelData} />
-                </div>
+                </motion.div>
               )}

               {/* Device Region Chart */}
               {deviceRegionData && (
-                <div className="bg-white p-6 rounded-lg shadow-md">
-                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Device by Region</h3>
+                <motion.div
+                  initial={{ opacity: 0, y: 20 }}
+                  animate={{ opacity: 1, y: 0 }}
+                  transition={{ delay: 1.0 }}
+                  className="bg-white/70 backdrop-blur-sm rounded-3xl border border-slate-200/60 shadow-xl p-8"
+                >
+                  <div className="flex items-center space-x-3 mb-6">
+                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
+                      <Globe className="w-5 h-5 text-white" />
+                    </div>
+                    <div>
+                      <h3 className="text-xl font-bold text-slate-800">Device by Region</h3>
+                      <p className="text-slate-500 text-sm">Regional device preferences</p>
+                    </div>
+                  </div>
                   <DeviceRegionChart data={deviceRegionData} />
-                </div>
+                </motion.div>
               )}

               {/* OS Chart */}
               {osData && (
-                <div className="bg-white p-6 rounded-lg shadow-md">
-                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Operating System Distribution</h3>
+                <motion.div
+                  initial={{ opacity: 0, y: 20 }}
+                  animate={{ opacity: 1, y: 0 }}
+                  transition={{ delay: 1.1 }}
+                  className="bg-white/70 backdrop-blur-sm rounded-3xl border border-slate-200/60 shadow-xl p-8"
+                >
+                  <div className="flex items-center space-x-3 mb-6">
+                    <div className="w-10 h-10 bg-gradient-to-br from-slate-500 to-slate-600 rounded-xl flex items-center justify-center">
+                      <Monitor className="w-5 h-5 text-white" />
+                    </div>
+                    <div>
+                      <h3 className="text-xl font-bold text-slate-800">Operating System Distribution</h3>
+                      <p className="text-slate-500 text-sm">OS preferences analysis</p>
+                    </div>
+                  </div>
                   <OSChart data={osData} />
-                </div>
+                </motion.div>
               )}
             </div>
-          </div>
+          </motion.div>
         )}
-      </div>
+      </motion.div>
     </div>
   );
 };