'use client';

import Image from 'next/image';
import axios from 'axios';
import { useState, useEffect } from 'react';

interface Article {
  title: string;
  summary: string;
  urlToImage?: string;
};


export const Hero = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://newsapi.org/v2/everything?q=apple&from=2025-06-23&to=2025-06-23&sortBy=popularity&apiKey=efb939077bab415c9bb7ba9b0f14776f'
 
        );
        console.log(response.data);
        setArticles(response.data.articles);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
  if (articles.length === 0) return;

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
