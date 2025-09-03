# Analytics Dashboard

A comprehensive React-based analytics dashboard that integrates with your booking platform APIs to provide real-time insights and visualizations.

## Features

### 📊 Analytics Overview
- **Conversion Rate Tracking**: Monitor booking conversion rates with real-time data
- **Device Analytics**: Track bookings across different devices (Desktop, iPhone, Android, iPad)
- **Browser Statistics**: Analyze user behavior across different browsers
- **Geographic Insights**: View booking patterns by country
- **Conversion Funnel**: Visualize the user journey from visitors to confirmed bookings

### 🎯 Key Metrics
- Total Bookings
- Total Visitors
- Conversion Rate
- Drop-off Rate
- Device Performance
- Browser Performance
- Country-wise Performance

### 📈 Visualizations
- **Line Charts**: Daily booking trends and visitor patterns
- **Bar Charts**: Device and country performance comparisons
- **Donut Charts**: Device and browser distribution
- **Funnel Charts**: Conversion funnel visualization
- **Country Charts**: Geographic booking distribution

## API Integration

The dashboard integrates with the following APIs:

### 1. Conversion Rate API
- **Endpoint**: `GET /api/conversion_rate`
- **Chart**: Stats cards showing conversion rate, total bookings, and visitors
- **Parameters**: `date`, `start_date`, `end_date`, `propertyid`

### 2. Device Stats API
- **Endpoint**: `GET /api/device_stats`
- **Chart**: Donut chart showing device distribution
- **Parameters**: `start_date`, `end_date`

### 3. Browser Stats API
- **Endpoint**: `GET /api/browser_stats`
- **Chart**: Donut chart showing browser distribution
- **Parameters**: `date`, `start_date`, `end_date`, `propertyid`

### 4. Country Stats API
- **Endpoint**: `GET /api/country_stats`
- **Chart**: Bar chart showing country-wise bookings
- **Parameters**: `start_date`, `end_date`

### 5. Funnel API
- **Endpoint**: `GET /api/funnel`
- **Chart**: Funnel chart showing conversion steps
- **Parameters**: `start_date`, `end_date`, `device`

### 6. Daily Stats API
- **Endpoint**: `GET /api/daily_stats`
- **Chart**: Line chart showing daily trends
- **Parameters**: `start_date`, `end_date`

## Available Data Dates

The dashboard works with the following available data dates:
- **2025-08-1**: Device, browser, country data
- **2025-08-2**: Device, browser, country data  
- **2025-07-31**: Combined analytics data (funnel, booking trends, daily stats)

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Backend API server running on `http://localhost:5000`

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd reporting-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Backend Setup

Ensure your backend API server is running on `http://localhost:5000` with the following endpoints available:

```bash
# Test API connectivity
curl http://localhost:5000/api/device_stats?start_date=2025-08-1&end_date=2025-08-2
```

## Usage

### Date Range Selection
- Use the date range picker to select specific dates
- Quick presets available: Today, Yesterday, Last 2 Days, Last Week
- Custom date range selection with start and end dates

### Property Filtering
- Enter a specific Property ID to filter data for that property
- Leave empty to view aggregated data across all properties

### Chart Interactions
- **Hover**: View detailed tooltips with exact values
- **Responsive**: Charts automatically resize for different screen sizes
- **Real-time**: Data updates automatically when date range changes

## Chart Types and Data Mapping

### 1. Stats Cards
- **Conversion Rate**: Shows booking conversion percentage
- **Total Bookings**: Displays confirmed bookings count
- **Total Visitors**: Shows total visitor count
- **Drop-off Rate**: Displays funnel drop-off percentage

### 2. Line Chart - Daily Trends
- **Data Source**: Daily Stats API
- **X-Axis**: Date
- **Y-Axis**: Booking count
- **Features**: Comparison with previous period

### 3. Country Chart
- **Data Source**: Country Stats API
- **X-Axis**: Country names
- **Y-Axis**: Booking count
- **Features**: Color-coded bars, percentage display

### 4. Donut Charts
- **Device Chart**: Shows booking distribution by device type
- **Browser Chart**: Shows booking distribution by browser
- **Features**: Percentage breakdown, total in center

### 5. Funnel Chart
- **Data Source**: Funnel API
- **Steps**: Total Visitors → Confirmed Bookings
- **Features**: Conversion rates, drop-off visualization

### 6. Bar Chart - Device Performance
- **Data Source**: Device Stats API
- **X-Axis**: Device types
- **Y-Axis**: Booking count
- **Features**: Performance comparison

## API Response Examples

### Conversion Rate Response
```json
{
  "booking_conversion_rate": 1.23,
  "confirmed_bookings": 1295,
  "total_visitors": 105577,
  "date": "2025-08-2",
  "propertyid": "all"
}
```

### Device Stats Response
```json
{
  "device_stats": [
    {
      "device": "DESKTOP",
      "confirmed_bookings": 1342,
      "percentage": 48.2,
      "color": "#0088FE"
    }
  ],
  "total_confirmed_bookings": 2787
}
```

### Country Stats Response
```json
{
  "country_stats": [
    {
      "country": "India",
      "confirmed_bookings": 373,
      "percentage": 31.7,
      "color": "#0088FE"
    }
  ],
  "total_confirmed_bookings": 1176
}
```

## Error Handling

The dashboard includes comprehensive error handling:

- **API Connection Errors**: Displays user-friendly error messages
- **No Data Scenarios**: Shows appropriate empty states
- **Loading States**: Displays loading spinners during data fetch
- **Invalid Date Ranges**: Validates date inputs

## Customization

### Adding New Charts
1. Create a new chart component in `src/components/charts/`
2. Add the API service method in `src/services/api.ts`
3. Integrate the chart in `src/components/AnalyticsDashboard.tsx`

### Styling
- Uses Tailwind CSS for styling
- Chart colors can be customized in the API responses
- Responsive design for mobile and desktop

### API Configuration
- Base URL can be changed in `src/services/api.ts`
- Add new API endpoints by extending the `ApiService` class

## Troubleshooting

### Common Issues

1. **API Connection Failed**
   - Ensure backend server is running on `http://localhost:5000`
   - Check CORS configuration on backend
   - Verify API endpoints are accessible

2. **No Data Displayed**
   - Check if selected dates have available data
   - Verify API responses in browser network tab
   - Ensure Property ID is correct (if filtering)

3. **Charts Not Rendering**
   - Check browser console for JavaScript errors
   - Verify all dependencies are installed
   - Ensure data format matches expected structure

### Debug Mode
Enable debug logging by checking browser console for:
- API request/response logs
- Data transformation logs
- Error details

## Performance

- **Lazy Loading**: Charts load data on demand
- **Caching**: API responses are cached during session
- **Optimized Rendering**: Charts use efficient re-rendering
- **Responsive**: Optimized for different screen sizes

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

---

**Note**: This dashboard is designed to work with the specific API structure provided. If your API responses differ, you may need to adjust the data transformation logic in the components. 