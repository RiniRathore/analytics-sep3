import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:5000/api';

async function testAPI(endpoint, params = {}) {
  try {
    const url = new URL(`${BASE_URL}${endpoint}`);
    Object.entries(params).forEach(([key, value]) => {
      if (value) url.searchParams.append(key, value);
    });

    console.log(`\n🔍 Testing: ${endpoint}`);
    console.log(`📡 URL: ${url.toString()}`);
    
    const response = await fetch(url.toString());
    
    if (!response.ok) {
      console.log(`❌ Error: ${response.status} ${response.statusText}`);
      return;
    }
    
    const data = await response.json();
    console.log(`✅ Success! Data received:`);
    console.log(JSON.stringify(data, null, 2));
    
  } catch (error) {
    console.log(`❌ Connection failed: ${error.message}`);
  }
}

async function runTests() {
  console.log('🚀 Starting API Tests...\n');
  
  // Test 1: Device Stats
  await testAPI('/device_stats', {
    start_date: '2025-08-1',
    end_date: '2025-08-2'
  });
  
  // Test 2: Browser Stats
  await testAPI('/browser_stats', {
    date: '2025-08-2'
  });
  
  // Test 3: Country Stats
  await testAPI('/country_stats', {
    start_date: '2025-08-1',
    end_date: '2025-08-2'
  });
  
  // Test 4: Conversion Rate
  await testAPI('/conversion_rate', {
    date: '2025-08-2'
  });
  
  // Test 5: Funnel
  await testAPI('/funnel', {
    start_date: '2025-07-31',
    end_date: '2025-07-31'
  });
  
  // Test 6: Daily Stats
  await testAPI('/daily_stats', {
    start_date: '2025-07-31',
    end_date: '2025-07-31'
  });
  
  console.log('\n🎉 API Tests Complete!');
}

// Check if backend is running
async function checkBackend() {
  try {
    const response = await fetch(`${BASE_URL}/device_stats?start_date=2025-08-1&end_date=2025-08-2`);
    if (response.ok) {
      console.log('✅ Backend server is running and accessible');
      return true;
    }
  } catch (error) {
    console.log('❌ Backend server is not accessible');
    console.log('Please ensure your backend server is running on http://localhost:5000');
    return false;
  }
}

async function main() {
  const backendRunning = await checkBackend();
  if (backendRunning) {
    await runTests();
  }
}

main().catch(console.error); 