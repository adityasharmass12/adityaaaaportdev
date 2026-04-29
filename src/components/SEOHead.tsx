import React, { useEffect } from 'react';

export const SEOHead: React.FC = () => {
  useEffect(() => {
    document.title = 'Aditya Sharma — AI/ML Developer & Full-Stack Engineer | adityaaaportdev Portfolio';

    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    const setLink = (rel: string, href: string) => {
      let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    setMeta('name', 'description', 'Aditya Sharma (adityaaaportdev) — Computer Science Engineering student at Delhi Technical Campus (GGSIPU) specializing in AI/ML, Python, React, and Full-Stack Development. Explore projects like PoisonGuard.');
    setMeta('name', 'keywords', 'adityaaaportdev, Aditya Sharma, aditya sharma portfolio, AI developer Delhi, ML engineer India, full-stack developer, PoisonGuard, Delhi Technical Campus, GGSIPU, Python developer, React developer');
    setMeta('name', 'author', 'Aditya Sharma');

    setMeta('property', 'og:title', 'Aditya Sharma — AI/ML Developer & Full-Stack Engineer Portfolio');
    setMeta('property', 'og:description', 'Explore the professional portfolio of Aditya Sharma (adityaaaportdev) — AI/ML projects, hackathon achievements, and full-stack development expertise.');
    setMeta('property', 'og:url', 'https://adityaaaaportdev.vercel.app/');
    setMeta('property', 'og:type', 'profile');

    setMeta('name', 'twitter:title', 'Aditya Sharma — AI/ML Developer & Full-Stack Engineer');
    setMeta('name', 'twitter:description', 'Portfolio of Aditya Sharma (adityaaaportdev) — AI/ML projects, hackathon achievements, and full-stack expertise.');

    setLink('canonical', 'https://adityaaaaportdev.vercel.app/');
  }, []);

  return null;
};
