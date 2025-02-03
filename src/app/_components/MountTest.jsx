'use client'
import React, { useEffect, useState } from 'react';

const generateDummyData = (start, limit) => {
// const mydata = Array.from({length: limit},(_,index)=>`Item Israr ${start + index + 1} `);
//     console.log("New Array : ", mydata );
  return Array.from({ length: limit }, (_, index) => `Item ${start + index + 1}`);
};

export default function MountTest() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const limit = 5; // Items per page

  const loadMoreData = () => {
    if (loading) return;
    setLoading(true);

    setTimeout(() => {
      const newData = generateDummyData(page * limit, limit);
      setData((prevData) => [...prevData, ...newData]);
      setPage((prevPage) => prevPage + 1);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    loadMoreData(); // Load initial data
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        loadMoreData();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Infinite Scroll Pagination</h1>
      <ul className="space-y-2">
        {data.map((item, index) => (
          <li
            key={index}
            className="p-4 bg-gray-100 rounded-md shadow-sm border"
          >
            {item}
          </li>
        ))}
      </ul>
      {loading && (
        <p className="text-center mt-4 text-blue-500">Loading more items...</p>
      )}
    </div>
  );
}
