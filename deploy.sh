#!/bin/bash
# =============================================================================
# Static Website Deployment Script for silence.codes
# Uses PM2 to serve static files from the 'out' directory
# =============================================================================

set -e  # Exit on any error

# Configuration
DOMAIN="silence.codes"
APP_NAME="silence-static"
DEPLOY_DIR="/home/ubuntu/pechenka"
REPO_URL="https://github.com/Zeinullahh/pechenka.git"
PORT=3000

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

log_info() { echo -e "${BLUE}ℹ️  $1${NC}"; }
log_success() { echo -e "${GREEN}✅ $1${NC}"; }
log_warning() { echo -e "${YELLOW}⚠️  $1${NC}"; }
log_error() { echo -e "${RED}❌ $1${NC}"; }

echo ""
echo "=============================================="
echo "  Static Website Deployment - ${DOMAIN}"
echo "=============================================="
echo ""

# -----------------------------------------------------------------------------
# Step 1: Stop existing services
# -----------------------------------------------------------------------------
log_info "Stopping existing services..."
pm2 delete ${APP_NAME} 2>/dev/null || true
pm2 delete all 2>/dev/null || true

# -----------------------------------------------------------------------------
# Step 2: Backup existing deployment (optional)
# -----------------------------------------------------------------------------
if [ -d "${DEPLOY_DIR}" ]; then
    log_info "Backing up existing deployment..."
    BACKUP_DIR="${DEPLOY_DIR}.backup.$(date +%Y%m%d_%H%M%S)"
    mv "${DEPLOY_DIR}" "${BACKUP_DIR}"
    log_success "Backup created at ${BACKUP_DIR}"
fi

# -----------------------------------------------------------------------------
# Step 3: Clone fresh repository
# -----------------------------------------------------------------------------
log_info "Cloning repository..."
cd /home/ubuntu
git clone ${REPO_URL} pechenka
cd ${DEPLOY_DIR}
log_success "Repository cloned"

# -----------------------------------------------------------------------------
# Step 4: Install dependencies
# -----------------------------------------------------------------------------
log_info "Installing dependencies..."
npm install --legacy-peer-deps --no-audit --no-fund
log_success "Dependencies installed"

# -----------------------------------------------------------------------------
# Step 5: Build static site
# -----------------------------------------------------------------------------
log_info "Building static site..."
npm run build

# Verify build output
if [ ! -d "${DEPLOY_DIR}/out" ]; then
    log_error "Build failed - 'out' directory not found!"
    exit 1
fi

log_success "Static site built successfully"
log_info "Output directory: ${DEPLOY_DIR}/out"
ls -la ${DEPLOY_DIR}/out/ | head -10

# -----------------------------------------------------------------------------
# Step 6: Start PM2 static server
# -----------------------------------------------------------------------------
log_info "Starting PM2 static file server..."

# Use pm2 serve for static files with SPA support
pm2 serve ${DEPLOY_DIR}/out ${PORT} \
    --name ${APP_NAME} \
    --spa \
    --no-daemon &

sleep 3

# Alternative: Start with ecosystem config if pm2 serve doesn't work well
# pm2 start ecosystem.config.js

pm2 save
log_success "PM2 server started on port ${PORT}"

# -----------------------------------------------------------------------------
# Step 7: Configure and restart Nginx
# -----------------------------------------------------------------------------
log_info "Configuring Nginx..."

# Create Nginx configuration
sudo tee /etc/nginx/sites-available/${DOMAIN} > /dev/null << 'NGINX_CONFIG'
server {
    listen 80;
    server_name silence.codes www.silence.codes;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name silence.codes www.silence.codes;

    # SSL certificates (managed by certbot)
    ssl_certificate /etc/letsencrypt/live/silence.codes/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/silence.codes/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/json application/xml+rss;
    gzip_comp_level 6;

    # Redirects (previously handled by Next.js config)
    location = /developer-services { return 301 /services/; }
    location ^~ /developer-services/ { return 301 /services/; }
    location = /slnc-code { return 301 /slnc-env/; }
    location ^~ /slnc-code/ { return 301 /slnc-env/; }

    # Static files caching
    location /_next/static/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_cache_valid 200 365d;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # Images and assets caching
    location ~* \.(ico|css|js|gif|jpeg|jpg|png|svg|webp|woff|woff2|ttf|eot)$ {
        proxy_pass http://127.0.0.1:3000;
        proxy_cache_valid 200 30d;
        add_header Cache-Control "public, max-age=2592000";
    }

    # Main proxy to PM2 static server
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # Handle trailing slashes for SPA
        try_files $uri $uri/ @proxy;
    }

    location @proxy {
        proxy_pass http://127.0.0.1:3000;
    }
}
NGINX_CONFIG

# Enable site
sudo ln -sf /etc/nginx/sites-available/${DOMAIN} /etc/nginx/sites-enabled/

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
log_success "Nginx configured and restarted"

# -----------------------------------------------------------------------------
# Step 8: Verify deployment
# -----------------------------------------------------------------------------
echo ""
log_info "Verifying deployment..."
sleep 2

# Check PM2 status
echo ""
echo "📊 PM2 Status:"
pm2 status

# Test local connection
echo ""
log_info "Testing local connection..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:${PORT}/)
if [ "$HTTP_CODE" = "200" ]; then
    log_success "Local server responding (HTTP ${HTTP_CODE})"
else
    log_warning "Local server returned HTTP ${HTTP_CODE}"
fi

# Test domain (if SSL is configured)
echo ""
log_info "Testing domain..."
HTTPS_CODE=$(curl -s -o /dev/null -w "%{http_code}" https://${DOMAIN}/ 2>/dev/null || echo "000")
if [ "$HTTPS_CODE" = "200" ]; then
    log_success "Domain ${DOMAIN} responding (HTTPS ${HTTPS_CODE})"
elif [ "$HTTPS_CODE" = "000" ]; then
    log_warning "Could not reach https://${DOMAIN} - check DNS and SSL"
else
    log_warning "Domain returned HTTP ${HTTPS_CODE}"
fi

# -----------------------------------------------------------------------------
# Summary
# -----------------------------------------------------------------------------
echo ""
echo "=============================================="
echo "  Deployment Complete!"
echo "=============================================="
echo ""
echo "  📁 Static files: ${DEPLOY_DIR}/out"
echo "  🚀 PM2 app name: ${APP_NAME}"
echo "  🌐 Local URL: http://localhost:${PORT}"
echo "  🔒 Domain: https://${DOMAIN}"
echo ""
echo "  Useful commands:"
echo "    pm2 status           - Check server status"
echo "    pm2 logs ${APP_NAME} - View server logs"
echo "    pm2 restart ${APP_NAME} - Restart server"
echo "    sudo nginx -t        - Test Nginx config"
echo ""
log_success "Deployment finished!"
