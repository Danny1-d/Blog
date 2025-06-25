'use client';

import Image from 'next/image';
import axios from 'axios';
import { useState, useEffect } from 'react';

interface Article {
  title: string;
  summary: string;
  urlToImage?: string;
};

const options = {
  method: 'GET',
  url: 'https://news-api65.p.rapidapi.com/api/v1/crypto/listing_delisting',
  headers: {
    'x-rapidapi-key': 'd3528f3c7fmsh9172479e352644ap12f77ejsn20cdbdb378e9',
    'x-rapidapi-host': 'news-api65.p.rapidapi.com'
  }
};

export const Hero = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [current, setCurrent] = useState(4);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://newsapi.org/v2/everything?q=tesla&from=2025-05-24&sortBy=publishedAt&apiKey=efb939077bab415c9bb7ba9b0f14776f'
          // options.url,
          // {
          //   headers: options.headers
          // }
        );
        console.log(response.data);
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Slideshow logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % articles.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [articles]);

  const currentArticle = articles[current];

  return (
    <div>

         {currentArticle && (
            <div className="relative">
            <Image
              src={currentArticle.urlToImage || '/bg.png'}
              alt="bg"
              width={450}
              height={10}
              className="w-250 h-100 object-cover rounded-lg shadow-lg mx-15"
            />
            <div className="absolute top-20 bottom-20 right-150 my-5 ml-6 text-black bg-white flex flex-col items-center justify-center p-4 rounded-lg shadow-lg w-96">
              <h2 className="font-bold text-xl mb-2">{currentArticle.title}</h2>
              <h4 className="text-sm line-clamp-4">{currentArticle.summary}</h4>
            </div>
          </div>
        )}
    </div>
  );
};
