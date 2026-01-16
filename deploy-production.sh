#!/bin/bash
# deploy-production.sh - Production deployment for Next.js SSR app
set -e

echo "🚀 Starting production deployment..."

# Stop existing processes
echo "🛑 Stopping existing services..."
pm2 delete all 2>/dev/null || true
sudo systemctl stop nginx 2>/dev/null || true

# Navigate to project
cd /home/ubuntu

# Backup old deployment
if [ -d "pechenka" ]; then
    echo "📦 Backing up existing deployment..."
    mv pechenka pechenka.backup.$(date +%s)
fi

# Fresh clone
echo "📥 Cloning repository..."
git clone https://github.com/Zeinullahh/pechenka.git
cd pechenka

# Create logs directory
mkdir -p logs

# Install dependencies
echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

# Build the application
echo "🔨 Building Next.js application..."
npm run build

# Verify build succeeded
if [ ! -d ".next" ]; then
    echo "❌ Build failed - .next directory not found"
    exit 1
fi

echo "✅ Build completed successfully!"

# Setup Nginx config
echo "🔧 Configuring Nginx..."
sudo cp nginx.conf.example /etc/nginx/sites-available/nextjs 2>/dev/null || true
sudo ln -sf /etc/nginx/sites-available/nextjs /etc/nginx/sites-enabled/ 2>/dev/null || true

# Test Nginx config
sudo nginx -t

# Start Next.js with PM2
echo "🚀 Starting Next.js server with PM2..."
pm2 start ecosystem.config.js
pm2 save

# Start Nginx
echo "🔧 Starting Nginx..."
sudo systemctl start nginx
sudo systemctl reload nginx

# Wait for server to start
echo "⏳ Waiting for server to start..."
sleep 5

# Test local server
echo ""
echo "📊 Testing local server (port 3000)..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/)
if [ "$HTTP_CODE" = "200" ]; then
    echo "✅ Local server responding with HTTP $HTTP_CODE"
else
    echo "⚠️  Local server returned HTTP $HTTP_CODE"
    echo "📋 PM2 logs:"
    pm2 logs --lines 20 --nostream
fi

echo ""
echo "📊 PM2 Status:"
pm2 status

echo ""
echo "✅ Deployment complete!"
echo ""
echo "🔗 Your site should be available at:"
echo "   - https://silence.codes"
echo ""
echo "📋 Useful commands:"
echo "   - pm2 logs           # View application logs"
echo "   - pm2 status         # Check PM2 status"
echo "   - pm2 restart all    # Restart the app"
echo "   - sudo nginx -t      # Test Nginx config"
echo "   - sudo systemctl status nginx  # Check Nginx status"
