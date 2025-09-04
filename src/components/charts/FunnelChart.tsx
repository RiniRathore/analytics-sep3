@@ .. @@
-import React from 'react';
+import React, { useState } from 'react';
+import { motion } from 'framer-motion';
 import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
@@ .. @@
 const FunnelChart: React.FC<FunnelChartProps> = ({ data }) => {
+  const [activeBar, setActiveBar] = useState<string | null>(null);
+
   const chartData = [
     {
       stage: 'Total Visitors',
       count: data.total_visitors,
       percentage: 100,
-      color: '#3B82F6'
+      color: '#3B82F6',
+      fill: '#3B82F6'
     },
     {
       stage: 'Confirmed Bookings',
       count: data.confirmed_bookings,
       percentage: data.booking_conversion_rate,
-      color: '#10B981'
+      color: '#10B981',
+      fill: '#10B981'
     }
   ];

   const CustomTooltip = ({ active, payload, label }: any) => {
     if (active && payload && payload.length) {
       const data = payload[0].payload;
       return (
-        <div className="bg-white p-3 rounded-lg shadow-lg border">
-          <p className="font-semibold">{label}</p>
-          <p className="text-sm text-gray-600">Count: {data.count.toLocaleString()}</p>
-          <p className="text-sm text-gray-600">Conversion: {data.percentage.toFixed(2)}%</p>
+        <div className="bg-white/95 backdrop-blur-sm p-4 rounded-2xl border border-slate-200/60 shadow-xl">
+          <p className="font-semibold text-slate-800 mb-2">{label}</p>
+          <div className="space-y-1">
+            <p className="text-sm text-slate-600">
+              <span className="font-medium">Count:</span> {data.count.toLocaleString()}
+            </p>
+            <p className="text-sm text-slate-600">
+              <span className="font-medium">Rate:</span> {data.percentage.toFixed(2)}%
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
         <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
-          <CartesianGrid strokeDasharray="3 3" />
-          <XAxis dataKey="stage" />
-          <YAxis />
+          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.6} />
+          <XAxis 
+            dataKey="stage" 
+            stroke="#64748b"
+            fontSize={12}
+          />
+          <YAxis stroke="#64748b" fontSize={12} />
           <Tooltip content={<CustomTooltip />} />
-          <Bar dataKey="count">
+          <Bar 
+            dataKey="count"
+            radius={[8, 8, 0, 0]}
+            onMouseEnter={(data) => setActiveBar(data.stage)}
+            onMouseLeave={() => setActiveBar(null)}
+          >
             {chartData.map((entry, index) => (
-              <Cell key={`cell-${index}`} fill={entry.color} />
+              <Cell 
+                key={`cell-${index}`} 
+                fill={entry.color}
+                style={{
+                  filter: activeBar === entry.stage ? 'brightness(1.2)' : 'none',
+                  transform: activeBar === entry.stage ? 'scaleY(1.05)' : 'scaleY(1)',
+                  transformOrigin: 'bottom'
+                }}
+                className="hover:opacity-80 transition-all duration-200"
+              />
             ))}
           </Bar>
         </BarChart>
       </ResponsiveContainer>
     </div>
   );
 };