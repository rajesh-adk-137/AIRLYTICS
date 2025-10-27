// src/components/Interpreter.jsx
import { useState } from 'react';
import { Brain, Lightbulb, Loader2, Sparkles, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';

const Interpreter = ({ results, query }) => {
  const [isInterpreting, setIsInterpreting] = useState(false);
  const [interpretError, setInterpretError] = useState(null);
  const [agentText, setAgentText] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false); // ✅ starts closed

  const handleInterpret = async () => {
    if (!results) return;

    try {
      setIsExpanded(true); // ✅ expand only when user explicitly triggers interpretation
      setIsInterpreting(true);
      setInterpretError(null);
      setAgentText(null);

      const mode = results.mode || 'base_case';
      const topRows = (results.display_rows || []).slice(0, 5);

      let reintr_query = '';
      if (mode === 'special_case') reintr_query = results.semantic_query_used || '';
      else reintr_query = results.interpreted_query || '';

      let baseStats = null;
      if (mode === 'special_case') baseStats = results.base_stats || {};
      else baseStats = results.summary_stats || {};

      // ✅ Add user_message as description inside special_stats when available
      let specialStats = null;
      if (mode === 'special_case') {
        specialStats = results.multivalue_stats || null;
        if (specialStats && results.user_message) {
          specialStats = {
            ...specialStats,
            description: results.user_message
          };
        }
      }

      const payload = {
        query: query || '',
        reintr_query: reintr_query || '',
        top_reviews: topRows.map(r => ({
          airline_name: r.airline_name || 'Unknown',
          overall_rating: r.overall_rating,
          recommended: r.recommended,
          verified: r.verified,
          seat_type: r.seat_type,
          type_of_traveller: r.type_of_traveller,
          review: r.review || ''
        })),
        base_stats: baseStats || {},
        special_stats: specialStats
      };

      console.log('📤 Sending to interpret agent:', {
        mode,
        has_reintr_query: !!payload.reintr_query,
        has_base_stats: Object.keys(payload.base_stats).length > 0,
        has_special_stats: !!payload.special_stats,
        has_description: specialStats?.description ? true : false,
        top_reviews_count: payload.top_reviews.length
      });

      const resp = await fetch('http://127.0.0.1:8000/interpret_agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!resp.ok) {
        const errorText = await resp.text();
        throw new Error(`API Error: ${resp.status} - ${errorText}`);
      }

      const data = await resp.json();
      setAgentText(data.answer || 'No interpretation returned.');

    } catch (err) {
      console.error('❌ Interpret failed:', err);
      setInterpretError(err.message || 'Failed to interpret results.');
    } finally {
      setIsInterpreting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white/90 backdrop-blur-md border-2 border-gray-200 rounded-2xl shadow-xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b-2 border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg">
                <Lightbulb className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">AI Insights & Analysis</h3>
                <p className="text-sm text-gray-600">Click below to unlock deep AI interpretation</p>
              </div>
            </div>

            {/* Manual Toggle */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 rounded-lg hover:bg-white/60 transition-all duration-200"
            >
              {isExpanded ? (
                <ChevronUp className="h-5 w-5 text-gray-600" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Collapsible Content */}
        {isExpanded && (
          <div className="p-6">

            {/* Default CTA */}
            {!agentText && !isInterpreting && !interpretError && (
              <div className="text-center py-8">
                <div className="mb-4">
                  <Sparkles className="h-12 w-12 text-indigo-500 mx-auto mb-3 animate-pulse" />
                  <p className="text-gray-600 text-sm mb-6 max-w-md mx-auto">
                    Get airline-grade insights derived from top-matched reviews and stats. 
                    The AI Interpreter analyzes trends, contradictions, and actionable strategies.
                  </p>
                </div>
                <button
                  onClick={handleInterpret}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Brain className="h-5 w-5" />
                  <span>Generate AI Insights</span>
                  <Sparkles className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* Loading State */}
            {isInterpreting && (
              <div className="py-12 text-center">
                <div className="inline-flex flex-col items-center space-y-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-indigo-500 rounded-full opacity-20 animate-ping"></div>
                    <Brain className="w-12 h-12 text-indigo-600 animate-pulse relative" />
                  </div>
                  <div>
                    <span className="text-lg font-bold text-gray-900 block mb-1">
                      Analyzing Results...
                    </span>
                    <span className="text-sm text-gray-500">
                      InsightInterpreter is decoding passenger data patterns
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Error State */}
            {interpretError && !isInterpreting && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="text-red-900 font-bold text-sm mb-2">Failed to Generate Insights</h4>
                    <p className="text-red-700 text-sm mb-4">{interpretError}</p>
                    <button
                      onClick={handleInterpret}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm text-red-700 bg-red-100 hover:bg-red-200 transition-all duration-200"
                    >
                      <Brain className="h-4 w-4" />
                      <span>Try Again</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Success State */}
            {agentText && !isInterpreting && (
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 border-2 border-indigo-200 rounded-xl p-6 shadow-inner">
                  <div className="flex items-center space-x-2 mb-4">
                    <Brain className="h-5 w-5 text-indigo-600" />
                    <h4 className="font-bold text-indigo-900 text-base">AI Analysis</h4>
                  </div>
                  <div className="prose prose-sm max-w-none">
                    <p className="whitespace-pre-wrap text-gray-800 leading-relaxed text-sm">
                      {agentText}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleInterpret}
                    disabled={isInterpreting}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm text-indigo-700 bg-indigo-100 hover:bg-indigo-200 transition-all duration-200 disabled:opacity-50"
                  >
                    <Sparkles className="h-4 w-4" />
                    <span>Regenerate Insights</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
};

export default Interpreter;
