import { NextResponse } from 'next/server';

/**
 * API Route to fetch Open Graph metadata from any URL
 * This enables link previews similar to WhatsApp/Telegram
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
  }

  try {
    // Try multiple user agents - some sites block certain crawlers
    const userAgents = [
      'Mozilla/5.0 (compatible; Discordbot/2.0; +https://discordapp.com)',
      'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
      'Slackbot-LinkExpanding 1.0 (+https://api.slack.com/robots)',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    ];

    let html = null;
    let response = null;

    for (const userAgent of userAgents) {
      try {
        response = await fetch(url, {
          headers: {
            'User-Agent': userAgent,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Cache-Control': 'no-cache',
          },
          redirect: 'follow',
        });

        if (response.ok) {
          html = await response.text();
          break;
        }
      } catch (e) {
        continue;
      }
    }

    if (!html) {
      throw new Error('Failed to fetch URL with any user agent');
    }

    // Extract Open Graph metadata with multiple fallback patterns
    const getMetaContent = (property) => {
      const patterns = [
        // og: prefix - property attribute (both attribute orders)
        new RegExp(`<meta[^>]*property=["']og:${property}["'][^>]*content=["']([^"']*)["']`, 'i'),
        new RegExp(`<meta[^>]*content=["']([^"']*)["'][^>]*property=["']og:${property}["']`, 'i'),
        // twitter: prefix
        new RegExp(`<meta[^>]*name=["']twitter:${property}["'][^>]*content=["']([^"']*)["']`, 'i'),
        new RegExp(`<meta[^>]*content=["']([^"']*)["'][^>]*name=["']twitter:${property}["']`, 'i'),
        // Standard meta name
        new RegExp(`<meta[^>]*name=["']${property}["'][^>]*content=["']([^"']*)["']`, 'i'),
        new RegExp(`<meta[^>]*content=["']([^"']*)["'][^>]*name=["']${property}["']`, 'i'),
      ];

      for (const pattern of patterns) {
        const match = html.match(pattern);
        if (match && match[1]) return match[1];
      }
      return null;
    };

    // Extract title from og:title or <title> tag
    const getTitle = () => {
      const ogTitle = getMetaContent('title');
      if (ogTitle) return ogTitle;

      const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
      return titleMatch ? titleMatch[1].trim() : null;
    };

    // Extract image with multiple fallback strategies
    const getImage = () => {
      // Try og:image first (most reliable)
      const ogImage = getMetaContent('image');
      if (ogImage && ogImage.startsWith('http')) return ogImage;

      // Try twitter:image
      const twitterPatterns = [
        /<meta[^>]*name=["']twitter:image(?::src)?["'][^>]*content=["']([^"']*)["']/i,
        /<meta[^>]*content=["']([^"']*)["'][^>]*name=["']twitter:image(?::src)?["']/i,
      ];
      for (const pattern of twitterPatterns) {
        const match = html.match(pattern);
        if (match && match[1] && match[1].startsWith('http')) return match[1];
      }

      // For Medium specifically, look for miro.medium.com images
      if (url.includes('medium.com')) {
        const mediumPatterns = [
          /["'](https:\/\/miro\.medium\.com\/v2\/resize:[^"']+)["']/i,
          /["'](https:\/\/miro\.medium\.com\/max\/[^"']+)["']/i,
          /["'](https:\/\/cdn-images-\d+\.medium\.com\/[^"']+)["']/i,
        ];
        for (const pattern of mediumPatterns) {
          const match = html.match(pattern);
          if (match && match[1]) return match[1];
        }
      }

      // Try to find any image_src link
      const imageSrc = html.match(/<link[^>]*rel=["']image_src["'][^>]*href=["']([^"']*)["']/i);
      if (imageSrc && imageSrc[1]) return imageSrc[1];

      return null;
    };

    // Extract author
    const getAuthor = () => {
      const articleAuthor = html.match(/<meta[^>]*property=["']article:author["'][^>]*content=["']([^"']*)["']/i);
      if (articleAuthor) return articleAuthor[1];

      const authorMeta = getMetaContent('author');
      if (authorMeta) return authorMeta;

      const mediumAuthorMatch = url.match(/medium\.com\/@([^\/]+)/);
      if (mediumAuthorMatch) return `@${mediumAuthorMatch[1]}`;

      return null;
    };

    // Extract reading time
    const getReadTime = () => {
      const readTimeMatch = html.match(/(\d+)\s*min\s*read/i);
      return readTimeMatch ? `${readTimeMatch[1]} min read` : null;
    };

    // Extract publish date
    const getPublishDate = () => {
      const publishedTime = html.match(/<meta[^>]*property=["']article:published_time["'][^>]*content=["']([^"']*)["']/i)
        || html.match(/<time[^>]*datetime=["']([^"']*)["']/i);
      if (publishedTime) {
        try {
          const date = new Date(publishedTime[1]);
          if (!isNaN(date.getTime())) {
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
          }
        } catch (e) {}
      }
      return null;
    };

    // Get site name
    const getSiteName = () => {
      const siteName = getMetaContent('site_name');
      if (siteName) return siteName;
      
      if (url.includes('medium.com')) return 'Medium';
      if (url.includes('dev.to')) return 'DEV Community';
      if (url.includes('hashnode')) return 'Hashnode';
      
      return null;
    };

    const metadata = {
      title: getTitle(),
      description: getMetaContent('description'),
      image: getImage(),
      siteName: getSiteName(),
      author: getAuthor(),
      readTime: getReadTime(),
      publishDate: getPublishDate(),
      url: url,
    };

    return NextResponse.json(metadata, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error fetching OG metadata:', error);
    return NextResponse.json(
      { error: 'Failed to fetch metadata', details: error.message },
      { status: 500 }
    );
  }
}
