import { useState, useEffect, useCallback, useRef } from 'react';
import { streamingSummarizeReviews } from '../../services/aiService';
import useHotelStore from '../../store/hotelStore';

const AIReviewSummary = ({ roomTheme, className = '' }) => {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const debounceRef = useRef(null);
  const { selectedHotelId } = useHotelStore();

  // Debounced update function for better performance
  const debouncedSetSummary = useCallback((text) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setSummary(text);
    }, 50); // 50ms debounce
  }, []);

  const generateSummary = async () => {
    const hotelId = selectedHotelId || 1;
    if (!hotelId || !roomTheme) return;

    setLoading(true);
    setError('');
    setSummary('');
    setIsStreaming(true);

    try {
      // Always use streaming output
      const result = await streamingSummarizeReviews(
        hotelId, 
        roomTheme, 
        (chunk, fullText) => {
          debouncedSetSummary(fullText);
        }
      );

      if (!result.success) {
        setError(result.error || 'Failed to generate summary');
      }
      setIsStreaming(false);
    } catch (err) {
      console.error('AI summary error:', err);
      setError('Network error, please try again');
      setIsStreaming(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedHotelId && roomTheme) {
      generateSummary();
    }
  }, [selectedHotelId, roomTheme]);

  const handleRefresh = () => {
    generateSummary();
  };

  if (!selectedHotelId || !roomTheme) {
    return null;
  }

  return (
    <div className={`bg-blue-50 rounded-lg p-4 border border-blue-200 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-blue-800 flex items-center">
          <svg 
            className="w-5 h-5 mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" 
            />
          </svg>
          AI Review Summary
        </h3>
        <button
          onClick={handleRefresh}
          disabled={loading || isStreaming}
          className="text-blue-600 hover:text-blue-800 disabled:opacity-50 text-sm"
        >
          {loading || isStreaming ? 'Generating...' : 'Refresh'}
        </button>
      </div>

      {/* Loading state */}
      {loading && !isStreaming && (
        <div className="flex items-center justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-blue-600">AI is analyzing reviews...</span>
        </div>
      )}

      {/* Streaming indicator */}
      {isStreaming && (
        <div className="flex items-center mb-2 text-blue-600">
          <div className="animate-pulse w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
          <span className="text-sm">AI is generating summary in real-time...</span>
        </div>
      )}

      {/* Error display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-red-700 text-sm">{error}</span>
          </div>
        </div>
      )}

      {/* Summary content */}
      {summary && (
        <div className="bg-white rounded-lg p-4 border border-blue-100">
          <div className="prose prose-sm max-w-none">
            <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
              {summary}
            </div>
          </div>
          {isStreaming && (
            <span className="inline-block w-0.5 h-4 bg-blue-600 ml-1 animate-pulse"></span>
          )}
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && !summary && (
        <div className="text-center py-4 text-gray-500">
          <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <p className="text-sm">No review summary available</p>
        </div>
      )}
    </div>
  );
};

export default AIReviewSummary;