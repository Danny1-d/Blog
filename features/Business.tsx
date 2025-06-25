"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';

import Image from 'next/image';

interface Article {
  title: string;
  summary: string;
  urlToImage?: string;
};

const options = {
  method: 'GET',
  url: 'https://news-api65.p.rapidapi.com/api/v1/news/g/sports/latest',
  params: {lang_reg: 'en-us'},
  headers: {
    'x-rapidapi-key': 'd3528f3c7fmsh9172479e352644ap12f77ejsn20cdbdb378e9',
    'x-rapidapi-host': 'news-api65.p.rapidapi.com'
  }
};

export const Business = () => {

  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          options.url,
          {
            params: options.params,
            headers: options.headers
          }
        );
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='flex flex-col mt-50 items-center justify-center mx-30'>
      <h5 className='text-sm font-semibold'>BROWSE AND READ THE LATEST STUFF</h5>
      <h2 className='text-lg font-semibold'>Business Stories</h2>

      <div className='grid grid-cols-2 md:grid-cols-3 space-y-4 gap-30'>
        {articles.slice(0,6).map((article, index) => (
          <div className="relative" key={index}>
            <Image
              src={article.urlToImage || '/background.png'}
              alt="token"
              width={250}
              height={10}
              className="md:w-150 md:h-70 w-100 h-20 object-cover rounded-lg shadow-lg"
            />
            <div key={index} className='absolute md:top-40 md:right-15 my-5 ml-6 text-black bg-white flex flex-col items-center justify-center p-4 shadow-lg w-70'>
              <h3 className='font-bold text-sm my-3'>{article.title.slice(0,50)}</h3>
              <p className='text-sm'>{article.summary.slice(0,200)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
