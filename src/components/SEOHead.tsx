import React, { useEffect } from 'react';

export const SEOHead: React.FC = () => {
  useEffect(() => {
    document.title = 'Aditya Sharma — AI/ML & Data Analytics Student | Portfolio';

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

    setMeta('name', 'description', 'Aditya Sharma is a third-year Computer Science and Engineering student at Delhi Technical Campus (GGSIPU), interested in AI, machine learning, data analytics, and software development.');
    setMeta('name', 'keywords', 'Aditya Sharma, portfolio, AI, machine learning, data analytics, Python, SQL, Delhi Technical Campus, GGSIPU');
    setMeta('name', 'author', 'Aditya Sharma');

    setMeta('property', 'og:title', 'Aditya Sharma — AI/ML & Data Analytics Portfolio');
    setMeta('property', 'og:description', 'Explore Aditya Sharma’s work in AI, machine learning, data analytics, and software development.');
    setMeta('property', 'og:url', 'https://adityaaaaportdev.vercel.app/');
    setMeta('property', 'og:type', 'profile');

    setMeta('name', 'twitter:title', 'Aditya Sharma — AI/ML & Data Analytics Portfolio');
    setMeta('name', 'twitter:description', 'Portfolio of Aditya Sharma, a Computer Science student interested in AI, machine learning, data analytics, and software development.');

    setLink('canonical', 'https://adityaaaaportdev.vercel.app/');
  }, []);

  return null;
};
