import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, TrendingUp, BarChart3, PieChart, Filter, CreditCard, Building2, Globe } from 'lucide-react';
import DateRangePicker from './DateRangePicker';
import POSBreakdownChart from './charts/POSBreakdownChart';
import POSTrendsChart from './charts/POSTrendsChart';
import POSStatsCards from './charts/POSStatsCards';
import { ApiService } from '../services/api';

interface POSData {
  date?: string;
  start_date?: string;
  end_date?: string;
  pos_breakdown: Record<string, number>;
  top_pos: [string, number];
  total_bookings: number;
  total_pos_systems: number;
  success: boolean;
}

interface POSTrendsData {
  start_date: string;
  end_date: string;
  pos_trends: Record<string, Array<{ count: number; date: string }>>;
  success: boolean;
}

const POSAnalytics: React.FC = () => {
  const [dateRange, setDateRange] = useState({
    startDate: '2025-08-25',
    endDate: '2025-08-30'
  });
  const [posData, setPosData] = useState<POSData | null>(null);
  const [trendsData, setTrendsData] = useState<POSTrendsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPOSData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const apiService = new ApiService();
      
      // Fetch POS breakdown data
      const posResponse = await apiService.fetchPOSData(dateRange.startDate, dateRange.endDate);
      setPosData(posResponse);
      
      // Fetch POS trends data
      const trendsResponse = await apiService.fetchPOSTrends(dateRange.startDate, dateRange.endDate);
      setTrendsData(trendsResponse);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch POS data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPOSData();
  }, [dateRange]);

  const handleDateRangeChange = (startDate: string, endDate: string) => {
    setDateRange({ startDate, endDate });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <CreditCard className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                    POS Analytics
                  </h1>
                  <p className="text-slate-500">Point of Sale systems and booking source analysis</p>
                </div>
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <DateRangePicker
                startDate={dateRange.startDate}
                endDate={dateRange.endDate}
                onDateRangeChange={handleDateRangeChange}
              />
            </motion.div>
          </div>

          {/* Quick Filters */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center space-x-4 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-sm"
          >
            <Filter className="w-5 h-5 text-slate-600" />
            <span className="text-sm font-medium text-slate-700">Quick Filters:</span>
            <div className="flex space-x-2">
              {['Top 10', 'OTAs Only', 'Direct Bookings', 'Mobile Apps'].map((filter, index) => (
                <motion.button
                  key={filter}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-white/80 hover:bg-purple-50 hover:text-purple-700 rounded-lg border border-slate-200/60 transition-all duration-200 hover:shadow-sm"
                >
                  {filter}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center py-20"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
              <span className="text-slate-600 font-medium">Loading POS analytics...</span>
            </div>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <Building2 className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-red-800">Error Loading POS Data</h3>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            </div>
          </motion.div>
        )}

        {!loading && !error && posData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            {/* Stats Cards */}
            <POSStatsCards data={posData} />

            {/* Charts Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* POS Breakdown Chart */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white/70 backdrop-blur-sm rounded-3xl border border-slate-200/60 shadow-xl p-8"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <PieChart className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">POS Distribution</h3>
                    <p className="text-slate-500 text-sm">Booking sources breakdown</p>
                  </div>
                </div>
                <POSBreakdownChart data={posData} />
              </motion.div>

              {/* POS Trends Chart */}
              {trendsData && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white/70 backdrop-blur-sm rounded-3xl border border-slate-200/60 shadow-xl p-8"
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">Booking Trends</h3>
                      <p className="text-slate-500 text-sm">Daily performance by POS</p>
                    </div>
                  </div>
                  <POSTrendsChart data={trendsData} />
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default POSAnalytics;