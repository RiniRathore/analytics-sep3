@@ .. @@
-import React from 'react';
+import React, { useState } from 'react';
+import { motion } from 'framer-motion';
 import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
@@ .. @@
 const BrowserChart: React.FC<BrowserChartProps> = ({ data }) => {
+  const [activeIndex, setActiveIndex] = useState<number | null>(null);
+
   const chartData = data.browser_stats.map((item, index) => ({
     name: item.browser,
     value: item.confirmed_bookings,
     percentage: item.percentage,
-    color: item.color
+    color: item.color,
+    fill: item.color
   }));

+  const onPieEnter = (_: any, index: number) => {
+    setActiveIndex(index);
+  };
+
+  const onPieLeave = () => {
+    setActiveIndex(null);
+  };
+
   const CustomTooltip = ({ active, payload }: any) => {
     if (active && payload && payload.length) {
       const data = payload[0].payload;
       return (
-        <div className="bg-white p-3 rounded-lg shadow-lg border">
-          <p className="font-semibold">{data.name}</p>
-          <p className="text-sm text-gray-600">Bookings: {data.value.toLocaleString()}</p>
-          <p className="text-sm text-gray-600">Percentage: {data.percentage.toFixed(1)}%</p>
+        <div className="bg-white/95 backdrop-blur-sm p-4 rounded-2xl border border-slate-200/60 shadow-xl">
+          <p className="font-semibold text-slate-800 mb-2">{data.name}</p>
+          <div className="space-y-1">
+            <p className="text-sm text-slate-600">
+              <span className="font-medium">Bookings:</span> {data.value.toLocaleString()}
+            </p>
+            <p className="text-sm text-slate-600">
+              <span className="font-medium">Share:</span> {data.percentage.toFixed(1)}%
+            </p>
+          </div>
         </div>
       );
     }
     return null;
   };

+  const CustomLegend = ({ payload }: any) => (
+    <div className="flex justify-center flex-wrap gap-4 mt-6">
+      {payload?.map((entry: any, index: number) => (
+        <motion.div
+          key={index}
+          initial={{ opacity: 0, y: 10 }}
+          animate={{ opacity: 1, y: 0 }}
+          transition={{ delay: index * 0.1 }}
+          className="flex items-center space-x-2"
+        >
+          <div 
+            className="w-4 h-4 rounded-full shadow-sm"
+            style={{ backgroundColor: entry.color }}
+          />
+          <span className="text-sm font-medium text-slate-700">{entry.value}</span>
+        </motion.div>
+      ))}
+    </div>
+  );
+
   return (
-    <div className="h-80">
+    <div className="h-96">
       <ResponsiveContainer width="100%" height="100%">
         <PieChart>
           <Pie
             data={chartData}
             cx="50%"
-            cy="50%"
-            outerRadius={100}
-            fill="#8884d8"
+            cy="45%"
+            outerRadius={120}
+            innerRadius={50}
+            paddingAngle={3}
             dataKey="value"
+            onMouseEnter={onPieEnter}
+            onMouseLeave={onPieLeave}
           >
-            {chartData.map((entry, index) => (
-              <Cell key={`cell-${index}`} fill={entry.color} />
+            {chartData.map((entry, index) => (
+              <Cell 
+                key={`cell-${index}`} 
+                fill={entry.color}
+                stroke={activeIndex === index ? '#ffffff' : 'none'}
+                strokeWidth={activeIndex === index ? 3 : 0}
+                className="hover:opacity-80 transition-all duration-200"
+                style={{
+                  filter: activeIndex === index ? 'brightness(1.1)' : 'none',
+                  transform: activeIndex === index ? 'scale(1.05)' : 'scale(1)',
+                  transformOrigin: 'center'
+                }}
+              />
             ))}
           </Pie>
           <Tooltip content={<CustomTooltip />} />
-          <Legend />
+          <Legend content={<CustomLegend />} />
         </PieChart>
       </ResponsiveContainer>
     </div>
   );
 };