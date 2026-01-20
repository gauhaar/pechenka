/**
 * Featured Articles Configuration
 * 
 * INSTRUCTIONS FOR WEBSITE ADMINISTRATOR:
 * 
 * To add a new article to the Featured Resources section:
 * Add an object with the article details to the 'articles' array below.
 * 
 * Required fields:
 * - url: The full URL to the article
 * - title: Article title
 * - description: Short description/excerpt
 * - image: Image URL (can be local like "/solution/page1.png" or external)
 * 
 * Optional fields:
 * - author: Author name
 * - date: Publication date
 * - readTime: Estimated reading time
 * 
 * Example:
 * {
 *   url: "https://medium.com/@username/article-title-123",
 *   title: "My Article Title",
 *   description: "A short description of the article...",
 *   image: "/images/article-cover.png",
 *   author: "@username",
 *   date: "Jan 15, 2026",
 *   readTime: "5 min read"
 * }
 */

export const articles = [
  {
    url: "https://medium.com/@tahirbalarabe2/the-modern-security-operations-center-soc-operations-center-ff8db5b0dfb5",
    title: "The Modern Security Operations Center (SOC)",
    description: "An in-depth look at modern SOC operations and best practices for building effective security teams.",
    image: "/solution/page1.png",
    author: "@tahirbalarabe2",
    date: "Jan 15, 2026",
    readTime: "8 min read",
  },
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

// Legacy exports for backward compatibility
export const articleUrls = articles.map(a => a.url);
export const mediumArticles = articles;