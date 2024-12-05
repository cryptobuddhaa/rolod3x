import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

const EXAMPLE_QUERIES = [
  "Who is looking to invest in Web3?",
  "Who is looking to hire at the moment?",
  "Give me a list of people I met this month."
];

export function AIPage() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResponse(null);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock responses based on the query
    let mockResponse = '';
    if (query === EXAMPLE_QUERIES[0]) {
      mockResponse = "Based on recent conversations:\n\n1. Sarah Chen - Actively looking to invest in DeFi projects\n2. Marcus Schmidt - Interested in Web3 gaming ventures\n3. Alex Johnson - Looking for early-stage Web3 startups";
    } else if (query === EXAMPLE_QUERIES[1]) {
      mockResponse = "Contacts currently hiring:\n\n1. Maria Garcia - Senior Blockchain Developer\n2. Yuki Tanaka - Product Manager\n3. Alex Johnson - Web3 Marketing Lead";
    } else if (query === EXAMPLE_QUERIES[2]) {
      mockResponse = "Contacts met this month:\n\n1. David Kim - Tech Conference 2024\n2. Elena Martinez - Web3 Meetup\n3. Sophie Turner - DeFi Summit";
    }

    setResponse(mockResponse || "I'll analyze your contacts and get back to you with relevant information.");
    setIsLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">AI Assistant</h1>

      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6 sm:mb-8">
        <p className="text-sm sm:text-base text-gray-600 mb-4">Ask anything about your Rolod3x</p>
        
        <form onSubmit={handleSubmit} className="flex gap-2 mb-4 sm:mb-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type your question here..."
            className="flex-1 p-2 sm:p-3 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={!query.trim() || isLoading}
            className="px-3 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
            ) : (
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
            Submit
          </button>
        </form>

        {response && (
          <div className="bg-gray-50 rounded-lg p-3 sm:p-4 whitespace-pre-line text-sm sm:text-base">
            {response}
          </div>
        )}
      </div>

      <div>
        <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Examples:</h2>
        <div className="space-y-1 sm:space-y-2">
          {EXAMPLE_QUERIES.map((example, index) => (
            <button
              key={index}
              onClick={() => setQuery(example)}
              className="w-full text-left p-2 sm:p-3 hover:bg-gray-50 rounded-lg transition-colors text-sm sm:text-base text-gray-700"
            >
              {index + 1}. {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}