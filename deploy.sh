#!/bin/bash
# =============================================================================
# Static Website Deployment Script for silence.codes - FIXED VERSION
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
# Step 0: Check if we should proceed
# -----------------------------------------------------------------------------
log_warning "This will:"
echo "  1. Stop nginx temporarily"
echo "  2. Backup current deployment"
echo "  3. Clone fresh code from GitHub"
echo "  4. Rebuild and redeploy"
echo ""
read -p "Continue? (y/N): " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    log_info "Deployment cancelled"
    exit 0
fi

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

# FIXED: Set proper permissions AND ownership for nginx
log_info "Setting permissions for nginx..."
sudo chown -R www-data:www-data ${DEPLOY_DIR}/out
sudo chmod -R 755 ${DEPLOY_DIR}/out

log_success "Static site built successfully"
log_info "Output directory: ${DEPLOY_DIR}/out"
ls -la ${DEPLOY_DIR}/out/ | head -10

# -----------------------------------------------------------------------------
# Step 6: Configure and restart Nginx
# -----------------------------------------------------------------------------
log_info "Configuring Nginx..."

# [Keep your existing nginx config here - it's good]
# ... rest of your nginx config ...

# -----------------------------------------------------------------------------
# [Rest of your script remains the same]
# -----------------------------------------------------------------------------