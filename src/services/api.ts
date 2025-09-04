@@ .. @@
   async fetchBookingTrend(startDate: string, endDate: string, device?: string, browser?: string, country?: string, propertyId?: string): Promise<any> {
     const params = new URLSearchParams({
       start_date: startDate,
       end_date: endDate,
       ...(device && { device }),
       ...(browser && { browser }),
       ...(country && { country }),
       ...(propertyId && { propertyid: propertyId })
     });
     
     const response = await fetch(`${this.baseUrl}/booking_trend?${params}`);
     if (!response.ok) {
       throw new Error(`Failed to fetch booking trend: ${response.statusText}`);
     }
     return response.json();
   }
+
+  // POS Analytics APIs
+  async fetchPOSData(startDate: string, endDate: string): Promise<any> {
+    const response = await fetch(`${this.baseUrl}/analytics/pos/range?start_date=${startDate}&end_date=${endDate}`);
+    if (!response.ok) {
+      throw new Error(`Failed to fetch POS data: ${response.statusText}`);
+    }
+    return response.json();
+  }
+
+  async fetchPOSTrends(startDate: string, endDate: string): Promise<any> {
+    const response = await fetch(`${this.baseUrl}/analytics/pos-trends?start_date=${startDate}&end_date=${endDate}`);
+    if (!response.ok) {
+      throw new Error(`Failed to fetch POS trends: ${response.statusText}`);
+    }
+    return response.json();
+  }
+
+  async fetchPOSSingleDate(date: string): Promise<any> {
+    const response = await fetch(`${this.baseUrl}/analytics/pos/${date}`);
+    if (!response.ok) {
+      throw new Error(`Failed to fetch POS data for date: ${response.statusText}`);
+    }
+    return response.json();
+  }
 }