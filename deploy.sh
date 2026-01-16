#!/bin/bash
# =============================================================================
# Static Website Deployment Script for silence.codes
# Serves static files directly via Nginx from the 'out' directory
# =============================================================================

set -e  # Exit on any error

# Configuration
DOMAIN="silence.codes"
DEPLOY_DIR="/home/ubuntu/pechenka"
REPO_URL="https://github.com/Zeinullahh/pechenka.git"

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
# Step 1: Stop existing services and clean up
# -----------------------------------------------------------------------------
log_info "Stopping existing services..."
pm2 delete all 2>/dev/null || true
pm2 kill 2>/dev/null || true
sudo systemctl stop nginx 2>/dev/null || true

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

# Set proper permissions for nginx to read files
chmod -R 755 ${DEPLOY_DIR}/out

log_success "Static site built successfully"
log_info "Output directory: ${DEPLOY_DIR}/out"
ls -la ${DEPLOY_DIR}/out/ | head -10

# -----------------------------------------------------------------------------
# Step 6: Configure and restart Nginx (serves static files directly)
# -----------------------------------------------------------------------------
log_info "Configuring Nginx to serve static files..."

# Create Nginx configuration - serving static files directly (no PM2 needed)
sudo tee /etc/nginx/sites-available/${DOMAIN} > /dev/null << 'NGINX_CONFIG'
server {
    listen 80;
    server_name silence.codes www.silence.codes;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name silence.codes www.silence.codes;

    # Root directory for static files
    root /home/ubuntu/pechenka/out;
    index index.html;

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
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/json application/xml+rss image/svg+xml;
    gzip_comp_level 6;

    # Redirects (previously handled by Next.js config)
    location = /developer-services { return 301 /services/; }
    location ^~ /developer-services/ { return 301 /services/; }
    location = /slnc-code { return 301 /slnc-env/; }
    location ^~ /slnc-code/ { return 301 /slnc-env/; }
    location = /secure-development { return 301 /slnc-env/; }
    location ^~ /secure-development/ { return 301 /slnc-env/; }

    # Next.js static assets - long cache
    location /_next/static/ {
        expires 1y;
        add_header Cache-Control "public, max-age=31536000, immutable";
        access_log off;
    }

    # Static assets caching
    location ~* \.(ico|css|js|gif|jpeg|jpg|png|svg|webp|woff|woff2|ttf|eot)$ {
        expires 30d;
        add_header Cache-Control "public, max-age=2592000";
        access_log off;
    }

    # Main location - serve static files with SPA fallback
    location / {
        # Try to serve the file directly, then try with /index.html, then 404
        try_files $uri $uri/ $uri/index.html /index.html;
    }

    # Handle 404 errors
    error_page 404 /404/index.html;
    location = /404/index.html {
        internal;
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
# Step 7: Verify deployment
# -----------------------------------------------------------------------------
echo ""
log_info "Verifying deployment..."
sleep 2

# Check nginx status
echo ""
echo "📊 Nginx Status:"
sudo systemctl status nginx --no-pager | head -5

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

# Test a policy page to verify static file serving
log_info "Testing policy page..."
POLICY_CODE=$(curl -s -o /dev/null -w "%{http_code}" https://${DOMAIN}/policies/ai-soc1/cookies/ 2>/dev/null || echo "000")
if [ "$POLICY_CODE" = "200" ]; then
    log_success "Policy pages working (HTTP ${POLICY_CODE})"
else
    log_warning "Policy page returned HTTP ${POLICY_CODE}"
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
echo "  🌐 Served by: Nginx (direct static file serving)"
echo "  🔒 Domain: https://${DOMAIN}"
echo ""
echo "  Useful commands:"
echo "    sudo nginx -t              - Test Nginx config"
echo "    sudo systemctl reload nginx - Reload Nginx"
echo "    sudo tail -f /var/log/nginx/error.log - View errors"
echo ""
log_success "Deployment finished!"
