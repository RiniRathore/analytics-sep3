@@ .. @@
-import React from 'react';
+import React, { useState } from 'react';
+import { motion } from 'framer-motion';
 import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
@@ .. @@
 const CountryChart: React.FC<CountryChartProps> = ({ data }) => {
+  const [activeBar, setActiveBar] = useState<string | null>(null);
+
   const chartData = data.country_stats.map(item => ({
     name: item.country,
     bookings: item.confirmed_bookings,
     percentage: item.percentage,
-    color: item.color
+    fill: item.color
   }));

   const CustomTooltip = ({ active, payload, label }: any) => {
     if (active && payload && payload.length) {
       const data = payload[0].payload;
       return (
-        <div className="bg-white p-3 rounded-lg shadow-lg border">
-          <p className="font-semibold">{label}</p>
-          <p className="text-sm text-gray-600">Bookings: {data.bookings.toLocaleString()}</p>
-          <p className="text-sm text-gray-600">Percentage: {data.percentage.toFixed(1)}%</p>
+        <div className="bg-white/95 backdrop-blur-sm p-4 rounded-2xl border border-slate-200/60 shadow-xl">
+          <p className="font-semibold text-slate-800 mb-2">{label}</p>
+          <div className="space-y-1">
+            <p className="text-sm text-slate-600">
+              <span className="font-medium">Bookings:</span> {data.bookings.toLocaleString()}
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

+  const CustomBar = (props: any) => {
+    const { fill, ...rest } = props;
+    const isActive = activeBar === props.payload?.name;
+    
+    return (
+      <Bar
+        {...rest}
+        fill={fill}
+        style={{
+          filter: isActive ? 'brightness(1.2)' : 'none',
+          transform: isActive ? 'scaleY(1.05)' : 'scaleY(1)',
+          transformOrigin: 'bottom'
+        }}
+        onMouseEnter={() => setActiveBar(props.payload?.name)}
+        onMouseLeave={() => setActiveBar(null)}
+      />
+    );
+  };
+
   return (
-    <div className="h-80">
+    <div className="h-96">
       <ResponsiveContainer width="100%" height="100%">
         <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
-          <CartesianGrid strokeDasharray="3 3" />
-          <XAxis dataKey="name" />
-          <YAxis />
+          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.6} />
+          <XAxis 
+            dataKey="name" 
+            stroke="#64748b"
+            fontSize={12}
+            angle={-45}
+            textAnchor="end"
+            height={80}
+          />
+          <YAxis stroke="#64748b" fontSize={12} />
           <Tooltip content={<CustomTooltip />} />
-          <Bar dataKey="bookings" fill="#8884d8" />
+          <Bar 
+            dataKey="bookings" 
+            radius={[8, 8, 0, 0]}
+            className="hover:opacity-80 transition-opacity duration-200"
+          />
         </BarChart>
       </ResponsiveContainer>
     </div>
   );
 };