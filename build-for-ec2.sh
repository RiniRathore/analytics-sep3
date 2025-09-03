#!/bin/bash

echo "🚀 Building frontend for EC2 deployment..."

# Check if node_modules exists, if not install dependencies
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf dist/

# Build the project
echo "🔨 Building project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "📁 Build files created in 'dist/' directory:"
    ls -la dist/
    echo ""
    echo "📊 Build size:"
    du -sh dist/
    echo ""
    echo "🚀 Ready for EC2 deployment!"
    echo "Upload the 'dist/' folder to your EC2 instance."
else
    echo "❌ Build failed!"
    exit 1
fi 