# API Curl Commands Documentation

This document contains all the curl commands for the API endpoints used by the frontend analytics dashboard.

## Base URL
```
http://localhost:5000/api
```

## 1. Conversion Rate API

### Single Date
```bash
curl "http://localhost:5000/api/conversion_rate?date=2025-08-02"
```

### Date Range
```bash
curl "http://localhost:5000/api/conversion_rate?start_date=2025-08-01&end_date=2025-08-02"
```

### With Property Filter
```bash
curl "http://localhost:5000/api/conversion_rate?date=2025-08-02&propertyid=123"
```

### Date Range with Property Filter
```bash
curl "http://localhost:5000/api/conversion_rate?start_date=2025-08-01&end_date=2025-08-02&propertyid=123"
```

## 2. Device Stats API

### Date Range (Required)
```bash
curl "http://localhost:5000/api/device_stats?start_date=2025-08-01&end_date=2025-08-02"
```

### With Property Filter
```bash
curl "http://localhost:5000/api/device_stats?start_date=2025-08-01&end_date=2025-08-02&propertyid=123"
```

## 3. Browser Stats API

### Single Date
```bash
curl "http://localhost:5000/api/browser_stats?date=2025-08-02"
```

### Date Range
```bash
curl "http://localhost:5000/api/browser_stats?start_date=2025-08-01&end_date=2025-08-02"
```

### With Property Filter
```bash
curl "http://localhost:5000/api/browser_stats?date=2025-08-02&propertyid=123"
```

### Date Range with Property Filter
```bash
curl "http://localhost:5000/api/browser_stats?start_date=2025-08-01&end_date=2025-08-02&propertyid=123"
```

## 4. Country Stats API

### Date Range (Required)
```bash
curl "http://localhost:5000/api/country_stats?start_date=2025-08-01&end_date=2025-08-02"
```

### With Property Filter
```bash
curl "http://localhost:5000/api/country_stats?start_date=2025-08-01&end_date=2025-08-02&propertyid=123"
```

## 5. Funnel API

### Date Range (Required)
```bash
curl "http://localhost:5000/api/funnel?start_date=2025-07-31&end_date=2025-07-31"
```

### With Device Filter
```bash
curl "http://localhost:5000/api/funnel?start_date=2025-07-31&end_date=2025-07-31&device=DESKTOP"
```

### With Property Filter
```bash
curl "http://localhost:5000/api/funnel?start_date=2025-07-31&end_date=2025-07-31&propertyid=123"
```

## 6. Daily Stats API

### Date Range (Required)
```bash
curl "http://localhost:5000/api/daily_stats?start_date=2025-07-31&end_date=2025-07-31"
```

### With Property Filter
```bash
curl "http://localhost:5000/api/daily_stats?start_date=2025-07-31&end_date=2025-07-31&propertyid=123"
```

## 7. OS Stats API

### Date Range (Required)
```bash
curl "http://localhost:5000/api/os_stats?start_date=2025-08-01&end_date=2025-08-02"
```

### With Property Filter
```bash
curl "http://localhost:5000/api/os_stats?start_date=2025-08-01&end_date=2025-08-02&propertyid=123"
```

## 8. Device Country Stats API

### Single Date
```bash
curl "http://localhost:5000/api/device_country_stats?date=2025-08-02"
```

### Date Range
```bash
curl "http://localhost:5000/api/device_country_stats?start_date=2025-08-01&end_date=2025-08-02"
```

### With Property Filter
```bash
curl "http://localhost:5000/api/device_country_stats?date=2025-08-02&propertyid=123"
```

## 9. Browser Country Stats API

### Single Date
```bash
curl "http://localhost:5000/api/browser_country_stats?date=2025-08-02"
```

### Date Range
```bash
curl "http://localhost:5000/api/browser_country_stats?start_date=2025-08-01&end_date=2025-08-02"
```

### With Property Filter
```bash
curl "http://localhost:5000/api/browser_country_stats?date=2025-08-02&propertyid=123"
```

## 10. Booking Trend API

### Date Range (Required)
```bash
curl "http://localhost:5000/api/booking_trend?start_date=2025-07-31&end_date=2025-07-31"
```

### With Device Filter
```bash
curl "http://localhost:5000/api/booking_trend?start_date=2025-07-31&end_date=2025-07-31&device=DESKTOP"
```

### With Browser Filter
```bash
curl "http://localhost:5000/api/booking_trend?start_date=2025-07-31&end_date=2025-07-31&browser=Chrome"
```

### With Country Filter
```bash
curl "http://localhost:5000/api/booking_trend?start_date=2025-07-31&end_date=2025-07-31&country=India"
```

### With Property Filter
```bash
curl "http://localhost:5000/api/booking_trend?start_date=2025-07-31&end_date=2025-07-31&propertyid=123"
```

## 11. Device Region Stats API

### Date Range (Required)
```bash
curl "http://localhost:5000/api/device_region_stats?start_date=2025-08-01&end_date=2025-08-15"
```

### Single Date
```bash
curl "http://localhost:5000/api/device_region_stats?start_date=2025-08-05&end_date=2025-08-05"
```

### Response Format
```json
{
  "device_region_stats": [
    {
      "device": "DESKTOP",
      "region": "Europe",
      "booking_count": 64,
      "percentage": 15.2,
      "color": "#0088FE"
    },
    {
      "device": "ANDROID",
      "region": "APAC",
      "booking_count": 259,
      "percentage": 61.4,
      "color": "#00C49F"
    },
    {
      "device": "IPHONE",
      "region": "Oceania",
      "booking_count": 98,
      "percentage": 23.2,
      "color": "#FFBB28"
    }
  ],
  "total_confirmed_bookings": 421,
  "start_date": "2025-08-05",
  "end_date": "2025-08-05",
  "source": "combined_analytics"
}
```

## Available Data Dates

### July 31, 2025
- **Funnel API**: ✅ Available
- **Daily Stats API**: ✅ Available
- **Booking Trend API**: ✅ Available

### August 01, 2025
- **Device Stats API**: ✅ Available
- **Browser Stats API**: ✅ Available
- **Country Stats API**: ✅ Available
- **OS Stats API**: ✅ Available
- **Device Region Stats API**: ✅ Available

### August 02, 2025
- **Device Stats API**: ✅ Available
- **Browser Stats API**: ✅ Available
- **Country Stats API**: ✅ Available
- **OS Stats API**: ✅ Available
- **Device Region Stats API**: ✅ Available

### August 05, 2025
- **Device Region Stats API**: ✅ Available

## Testing All APIs

### Quick Test Script
```bash
#!/bin/bash

echo "Testing all API endpoints..."

# Test Conversion Rate
echo "Testing Conversion Rate API..."
curl -s "http://localhost:5000/api/conversion_rate?date=2025-08-02" | head -5

# Test Device Stats
echo "Testing Device Stats API..."
curl -s "http://localhost:5000/api/device_stats?start_date=2025-08-01&end_date=2025-08-02" | head -5

# Test Browser Stats
echo "Testing Browser Stats API..."
curl -s "http://localhost:5000/api/browser_stats?date=2025-08-02" | head -5

# Test Country Stats
echo "Testing Country Stats API..."
curl -s "http://localhost:5000/api/country_stats?start_date=2025-08-01&end_date=2025-08-02" | head -5

# Test Funnel
echo "Testing Funnel API..."
curl -s "http://localhost:5000/api/funnel?start_date=2025-07-31&end_date=2025-07-31" | head -5

# Test Daily Stats
echo "Testing Daily Stats API..."
curl -s "http://localhost:5000/api/daily_stats?start_date=2025-07-31&end_date=2025-07-31" | head -5

# Test Device Region Stats
echo "Testing Device Region Stats API..."
curl -s "http://localhost:5000/api/device_region_stats?start_date=2025-08-05&end_date=2025-08-05" | head -5

echo "API testing complete!"
```