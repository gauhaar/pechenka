/**
 * Featured Articles Configuration
 * 
 * INSTRUCTIONS FOR WEBSITE ADMINISTRATOR:
 * 
 * To add a new article to the Featured Resources section:
 * Simply paste the article URL into the 'articleUrls' array below.
 * 
 * The system will automatically fetch:
 * - Article title
 * - Cover image
 * - Description/excerpt
 * - Author name
 * - Reading time
 * - Publication date
 * 
 * No need to manually enter any article details!
 * Just paste the URL and the preview will be generated automatically.
 * 
 * Example:
 * articleUrls: [
 *   "https://medium.com/@username/article-title-123",
 *   "https://medium.com/@another/different-article-456",
 * ]
 */

export const articleUrls = [
  // Add your article URLs here - just paste the link!
  "https://medium.com/@tahirbalarabe2/the-modern-security-operations-center-soc-operations-center-ff8db5b0dfb5",
];

/**
 * Configuration for the Featured Resources section
 */
export const featuredResourcesConfig = {
  // Number of articles to display on the homepage
  displayCount: 1,
  
  // Show "View all articles" link
  showViewAllLink: true,
  
  // External link to your Medium publication/profile
  mediumProfileUrl: "https://medium.com/@silence-security",
};

// Legacy export for backward compatibility (deprecated - use articleUrls instead)
export const mediumArticles = [
  {
    url: "https://medium.com/@tahirbalarabe2/the-modern-security-operations-center-soc-operations-center-ff8db5b0dfb5",
    title: "The Modern Security Operations Center (SOC)",
    description: "An in-depth look at modern SOC operations and best practices.",
    image: "/solution/page1.png",
    author: "@tahirbalarabe2",
    date: "Jan 15, 2026",
    readTime: "8 min read",
  },
];