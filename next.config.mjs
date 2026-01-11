const nextConfig = {
  output: 'export',  // Enables static export
  images: {
    unoptimized: true,  // Disables heavy image optimization
  },
  trailingSlash: true,  // Ensures proper static file generation
  distDir: 'out'
};

export default nextConfig;
