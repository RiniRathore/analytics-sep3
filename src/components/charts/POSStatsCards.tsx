import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Building2, TrendingUp, Users } from 'lucide-react';

interface POSData {
  pos_breakdown: Record<string, number>;
  top_pos: [string, number];
  total_bookings: number;
  total_pos_systems: number;
}

interface POSStatsCardsProps {
  data: POSData;
}

const POSStatsCards: React.FC<POSStatsCardsProps> = ({ data }) => {
  const topPOSPercentage = ((data.top_pos[1] / data.total_bookings) * 100).toFixed(1);
  
  const stats = [
    {
      title: 'Total Bookings',
      value: data.total_bookings.toLocaleString(),
      icon: Users,
      gradient: 'from-blue-600 to-cyan-600',
      bgGradient: 'from-blue-50 to-cyan-50',
      change: '+12.5%',
      changeType: 'positive' as const
    },
    {
      title: 'Active POS Systems',
      value: data.total_pos_systems.toString(),
      icon: Building2,
      gradient: 'from-purple-600 to-pink-600',
      bgGradient: 'from-purple-50 to-pink-50',
      change: '+3',
      changeType: 'positive' as const
    },
    {
      title: 'Top POS System',
      value: data.top_pos[0],
      subtitle: `${data.top_pos[1].toLocaleString()} bookings`,
      icon: CreditCard,
      gradient: 'from-emerald-600 to-teal-600',
      bgGradient: 'from-emerald-50 to-teal-50',
      change: `${topPOSPercentage}%`,
      changeType: 'neutral' as const
    },
    {
      title: 'Market Share',
      value: `${topPOSPercentage}%`,
      subtitle: 'Top performer',
      icon: TrendingUp,
      gradient: 'from-orange-600 to-red-600',
      bgGradient: 'from-orange-50 to-red-50',
      change: '+2.1%',
      changeType: 'positive' as const
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`bg-gradient-to-br ${stat.bgGradient} rounded-3xl border border-white/60 shadow-xl p-6 hover:shadow-2xl transition-all duration-300 group`}
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
              stat.changeType === 'positive' 
                ? 'bg-green-100 text-green-700' 
                : stat.changeType === 'negative'
                ? 'bg-red-100 text-red-700'
                : 'bg-slate-100 text-slate-700'
            }`}>
              {stat.change}
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-1 group-hover:text-slate-900 transition-colors">
              {stat.value}
            </h3>
            <p className="text-slate-600 text-sm font-medium mb-1">{stat.title}</p>
            {stat.subtitle && (
              <p className="text-slate-500 text-xs">{stat.subtitle}</p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default POSStatsCards;