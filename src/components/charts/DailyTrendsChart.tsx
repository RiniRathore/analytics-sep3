@@ .. @@
-import React from 'react';
+import React, { useState } from 'react';
+import { motion } from 'framer-motion';
 import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
@@ .. @@
 const DailyTrendsChart: React.FC<DailyTrendsChartProps> = ({ data }) => {
+  const [activePoint, setActivePoint] = useState<string | null>(null);
+
   const chartData = data.daily_stats.map(item => ({
     date: item.date,
     bookings: item.confirmed_bookings
   }));

   const CustomTooltip = ({ active, payload, label }: any) => {
     if (active && payload && payload.length) {
       return (
-        <div className="bg-white p-3 rounded-lg shadow-lg border">
-          <p className="font-semibold">{new Date(label).toLocaleDateString()}</p>
-          <p className="text-sm text-gray-600">Bookings: {payload[0].value.toLocaleString()}</p>
+        <div className="bg-white/95 backdrop-blur-sm p-4 rounded-2xl border border-slate-200/60 shadow-xl">
+          <p className="font-semibold text-slate-800 mb-2">
+            {new Date(label).toLocaleDateString('en-US', { 
+              weekday: 'long', 
+              year: 'numeric', 
+              month: 'long', 
+              day: 'numeric' 
+            })}
+          </p>
+          <div className="space-y-1">
+            <p className="text-sm text-slate-600">
+              <span className="font-medium">Bookings:</span> {payload[0].value.toLocaleString()}
+            </p>
+          </div>
         </div>
       );
     }
     return null;
   };

   return (
-    <div className="h-80">
+    <div className="h-96">
       <ResponsiveContainer width="100%" height="100%">
         <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
-          <CartesianGrid strokeDasharray="3 3" />
-          <XAxis dataKey="date" />
-          <YAxis />
+          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.6} />
+          <XAxis 
+            dataKey="date" 
+            stroke="#64748b"
+            fontSize={12}
+            tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
+          />
+          <YAxis stroke="#64748b" fontSize={12} />
           <Tooltip content={<CustomTooltip />} />
           <Line 
             type="monotone" 
             dataKey="bookings" 
-            stroke="#8884d8" 
-            strokeWidth={2}
+            stroke="url(#colorGradient)" 
+            strokeWidth={3}
+            dot={{ fill: '#3B82F6', strokeWidth: 2, r: 5 }}
+            activeDot={{ r: 8, stroke: '#3B82F6', strokeWidth: 2, fill: '#ffffff' }}
           />
+          <defs>
+            <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
+              <stop offset="0%" stopColor="#3B82F6" />
+              <stop offset="100%" stopColor="#8B5CF6" />
+            </linearGradient>
+          </defs>
         </LineChart>
       </ResponsiveContainer>
     </div>
   );
 };