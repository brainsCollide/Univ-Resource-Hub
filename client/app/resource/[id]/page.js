'use client'

import axiosInstance from '@/api/axiosInstance';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

export default function ResourceDetail() {
  const { id } = useParams();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const response = await axiosInstance.get(`/api/resources/${id}`);
        setResource(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchResource();
  }, [id]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (error) return (
    <div className="text-center text-red-600 mt-20">
      <p>Error loading resource.</p>
    </div>
  );

  if (!resource) return null;

  const postDate = new Date(resource.createdAt).toLocaleDateString(undefined, {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <main className="max-w-3xl mx-auto px-6 py-12 bg-white rounded-lg shadow-lg">
      {/* Featured Image */}
      {resource.coverImage && (
        <div className="mb-8 overflow-hidden rounded-lg shadow-md">
          <img
            src={resource.coverImage}
            alt={`Cover image for ${resource.title}`}
            className="w-full object-cover h-72 sm:h-96 transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}

      <article className="prose prose-lg max-w-none text-gray-900">
        {/* Title */}
        <h1 className="font-extrabold tracking-tight text-4xl mb-4">{resource.title}</h1>

        {/* Author and Date */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 text-gray-500 text-sm">
          <div className="flex items-center space-x-3 mb-2 sm:mb-0">
            <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden shadow-sm">
              {/* Placeholder avatar - replace with author avatar if available */}
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(resource.author)}&background=random&size=64`}
                alt={resource.author}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-medium text-gray-700">{resource.author}</span>
          </div>
          <time className="whitespace-nowrap">{postDate}</time>
        </div>

        {/* Description */}
        {resource.description && (
          <p className="text-lg text-gray-700 mb-10">{resource.description}</p>
        )}

        {/* Content - Markdown Rendered */}
        <section className="prose prose-indigo prose-pre:bg-gray-100 prose-pre:p-4 prose-pre:rounded prose-pre:overflow-x-auto leading-relaxed">
          <ReactMarkdown>{resource.content}</ReactMarkdown>
        </section>
      </article>
    </main>
  );
}
