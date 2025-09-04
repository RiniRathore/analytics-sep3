@@ .. @@
-import React, { useState } from 'react';
+import React, { useState } from 'react';
+import { motion } from 'framer-motion';
 import { Calendar, ChevronDown } from 'lucide-react';
@@ .. @@
   };

   return (
-    <div className="relative">
-      <button
+    <div className="relative">
+      <motion.button
+        whileHover={{ scale: 1.02 }}
+        whileTap={{ scale: 0.98 }}
         onClick={() => setIsOpen(!isOpen)}
-        className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
+        className="flex items-center space-x-3 px-6 py-3 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl hover:bg-white hover:shadow-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
       >
-        <Calendar className="w-4 h-4 text-gray-600" />
-        <span className="text-sm font-medium text-gray-700">
+        <Calendar className="w-5 h-5 text-slate-600" />
+        <span className="text-sm font-medium text-slate-700">
           {formatDateRange(startDate, endDate)}
         </span>
-        <ChevronDown className="w-4 h-4 text-gray-600" />
-      </button>
+        <ChevronDown className={`w-4 h-4 text-slate-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
+      </motion.button>

       {isOpen && (
-        <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
-          <div className="p-4">
-            <h3 className="text-sm font-semibold text-gray-800 mb-3">Select Date Range</h3>
+        <motion.div
+          initial={{ opacity: 0, y: -10, scale: 0.95 }}
+          animate={{ opacity: 1, y: 0, scale: 1 }}
+          exit={{ opacity: 0, y: -10, scale: 0.95 }}
+          className="absolute top-full left-0 mt-3 w-80 bg-white/95 backdrop-blur-xl border border-slate-200/60 rounded-2xl shadow-2xl z-10"
+        >
+          <div className="p-6">
+            <h3 className="text-sm font-semibold text-slate-800 mb-4 flex items-center">
+              <Calendar className="w-4 h-4 mr-2 text-slate-600" />
+              Select Date Range
+            </h3>
             
             {/* Quick Presets */}
-            <div className="grid grid-cols-2 gap-2 mb-4">
+            <div className="grid grid-cols-2 gap-2 mb-6">
               {presets.map((preset) => (
-                <button
+                <motion.button
                   key={preset.label}
+                  whileHover={{ scale: 1.02 }}
+                  whileTap={{ scale: 0.98 }}
                   onClick={() => handlePresetClick(preset)}
-                  className="px-3 py-2 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
+                  className="px-3 py-2 text-sm text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all duration-200 font-medium hover:shadow-sm"
                 >
                   {preset.label}
-                </button>
+                </motion.button>
               ))}
             </div>

             {/* Custom Date Inputs */}
-            <div className="space-y-3">
-              <div>
-                <label className="block text-xs font-medium text-gray-700 mb-1">Start Date</label>
+            <div className="space-y-4">
+              <div>
+                <label className="block text-xs font-medium text-slate-700 mb-2">Start Date</label>
                 <input
                   type="date"
                   value={startDate}
                   onChange={(e) => setStartDate(e.target.value)}
-                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
+                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm text-slate-800 transition-all duration-200"
                 />
               </div>
-              <div>
-                <label className="block text-xs font-medium text-gray-700 mb-1">End Date</label>
+              <div>
+                <label className="block text-xs font-medium text-slate-700 mb-2">End Date</label>
                 <input
                   type="date"
                   value={endDate}
                   onChange={(e) => setEndDate(e.target.value)}
-                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
+                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm text-slate-800 transition-all duration-200"
                 />
               </div>
-              <button
+              <motion.button
+                whileHover={{ scale: 1.02 }}
+                whileTap={{ scale: 0.98 }}
                 onClick={handleApply}
-                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
+                className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
               >
                 Apply Date Range
-              </button>
+              </motion.button>
             </div>
           </div>
-        </div>
+        </motion.div>
       )}
     </div>
   );
 };