import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, PieChart as PieIcon, BarChart3, Info, Sparkles } from 'lucide-react';

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#ef4444', '#6366f1', '#14b8a6', '#f97316', '#84cc16'];

const SpecialCase = ({ data, query }) => {
  const functionName = data.function_executed;
  const multiValueStats = data.multivalue_stats || {};
  const baseStats = data.base_stats || {};

  const renderVisualization = () => {
    switch (functionName) {
      case 'conditional_rating_analysis':
        return renderConditionalRatingAnalysis();
      case 'conditional_rating_to_rating_analysis':
        return renderRatingToRatingAnalysis();
      case 'conditional_category_to_category_analysis':
        return renderCategoryToCategoryAnalysis();
      case 'conditional_distribution_analysis':
        return renderDistributionAnalysis();
      case 'general_percentage_distribution':
        return renderPercentageDistribution();
      default:
        return <div className="text-gray-500 text-center py-8">Visualization not available for this function.</div>;
    }
  };

  const renderConditionalRatingAnalysis = () => {
    const matching = multiValueStats.matching_group?.distribution || {};
    const opposite = multiValueStats.opposite_group?.distribution || {};

    const matchingData = Object.entries(matching).map(([key, value]) => ({
      name: key,
      value: value
    }));

    const oppositeData = Object.entries(opposite).map(([key, value]) => ({
      name: key,
      value: value
    }));

    return (
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-5 border border-blue-200">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Info className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-bold text-gray-900 mb-2">Analysis Summary</h3>
              <p className="text-sm text-gray-700 mb-3 leading-relaxed">{data.user_message}</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-lg p-3 border border-gray-200">
                  <div className="text-xs font-medium text-gray-500 mb-1">Matching Condition</div>
                  <div className="text-2xl font-bold text-blue-600">{multiValueStats.matching_group?.total || 0}</div>
                  <div className="text-xs text-gray-500">users</div>
                </div>
                <div className="bg-white rounded-lg p-3 border border-gray-200">
                  <div className="text-xs font-medium text-gray-500 mb-1">Opposite Condition</div>
                  <div className="text-2xl font-bold text-purple-600">{multiValueStats.opposite_group?.total || 0}</div>
                  <div className="text-xs text-gray-500">users</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-bold text-gray-900 mb-3">Matching Group Distribution</h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={matchingData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} tick={{ fontSize: 11 }} />
                <YAxis label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft', style: { fontSize: 11 } }} tick={{ fontSize: 11 }} />
                <Tooltip formatter={(value) => `${value}%`} contentStyle={{ borderRadius: '6px', border: '1px solid #e5e7eb', fontSize: '12px' }} />
                <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-bold text-gray-900 mb-3">Opposite Group Distribution</h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={oppositeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} tick={{ fontSize: 11 }} />
                <YAxis label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft', style: { fontSize: 11 } }} tick={{ fontSize: 11 }} />
                <Tooltip formatter={(value) => `${value}%`} contentStyle={{ borderRadius: '6px', border: '1px solid #e5e7eb', fontSize: '12px' }} />
                <Bar dataKey="value" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  };

  const renderRatingToRatingAnalysis = () => {
    const matchPercent = multiValueStats.match_percent || 0;
    const totalBase = multiValueStats.total_base_users || 0;
    const matchingUsers = multiValueStats.matching_users || 0;

    const chartData = [
      { name: 'Matching', value: matchPercent, count: matchingUsers },
      { name: 'Not Matching', value: 100 - matchPercent, count: totalBase - matchingUsers }
    ];

    return (
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-5 border border-purple-200">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-purple-600 rounded-lg">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-bold text-gray-900 mb-2">Comparative Analysis</h3>
              <p className="text-sm text-gray-700 mb-3 leading-relaxed">{data.user_message}</p>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white rounded-lg p-3 border border-gray-200">
                  <div className="text-xs font-medium text-gray-500 mb-1">Base Condition</div>
                  <div className="text-sm font-bold text-purple-600 truncate">{multiValueStats.base_condition}</div>
                </div>
                <div className="bg-white rounded-lg p-3 border border-gray-200">
                  <div className="text-xs font-medium text-gray-500 mb-1">Compare Condition</div>
                  <div className="text-sm font-bold text-pink-600 truncate">{multiValueStats.compare_condition}</div>
                </div>
                <div className="bg-white rounded-lg p-3 border border-gray-200">
                  <div className="text-xs font-medium text-gray-500 mb-1">Match Rate</div>
                  <div className="text-2xl font-bold text-blue-600">{matchPercent}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Percentage Breakdown</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value.toFixed(2)}%`} contentStyle={{ borderRadius: '6px', border: '1px solid #e5e7eb', fontSize: '12px' }} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  const renderCategoryToCategoryAnalysis = () => {
    const summary = multiValueStats.summary || {};
    const categories = Object.keys(summary);
    const allCompareValues = new Set();
    
    categories.forEach(cat => {
      Object.keys(summary[cat].distribution || {}).forEach(val => allCompareValues.add(val));
    });

    const chartData = categories.map(cat => {
      const row = { category: cat };
      allCompareValues.forEach(val => {
        row[val] = summary[cat].distribution[val] || 0;
      });
      return row;
    });

    return (
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-5 border border-green-200">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-green-600 rounded-lg">
              <BarChart3 className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-bold text-gray-900 mb-2">Category Cross-Analysis</h3>
              <p className="text-sm text-gray-700 mb-3 leading-relaxed">{data.user_message}</p>
              <div className="flex flex-wrap gap-2 text-xs">
                <div className="bg-white rounded-lg px-3 py-1.5 border border-gray-200">
                  <span className="text-gray-600">Base: </span>
                  <span className="font-semibold text-gray-900">{multiValueStats.base_field}</span>
                </div>
                <div className="bg-white rounded-lg px-3 py-1.5 border border-gray-200">
                  <span className="text-gray-600">Compare: </span>
                  <span className="font-semibold text-gray-900">{multiValueStats.compare_field}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Distribution Across Categories</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="category" angle={-45} textAnchor="end" height={70} tick={{ fontSize: 11 }} />
              <YAxis label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft', style: { fontSize: 11 } }} tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ borderRadius: '6px', border: '1px solid #e5e7eb', fontSize: '12px' }} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              {Array.from(allCompareValues).map((val, idx) => (
                <Bar key={val} dataKey={val} stackId="a" fill={COLORS[idx % COLORS.length]} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Detailed Breakdown</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold text-gray-700">Category</th>
                  <th className="px-3 py-2 text-center font-semibold text-gray-700">Total Users</th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-700">Distribution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {categories.map((cat, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-3 py-2 font-medium text-gray-900">{cat}</td>
                    <td className="px-3 py-2 text-center text-gray-700">{summary[cat].total}</td>
                    <td className="px-3 py-2">
                      <div className="flex flex-wrap gap-1.5">
                        {Object.entries(summary[cat].distribution).map(([key, val]) => (
                          <span key={key} className="inline-block bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs font-medium">
                            {key}: {val}%
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderDistributionAnalysis = () => {
    const distribution = multiValueStats.distribution || {};
    const chartData = Object.entries(distribution).map(([key, value]) => ({
      name: key,
      value: value
    }));

    return (
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-5 border border-orange-200">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-orange-600 rounded-lg">
              <PieIcon className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-bold text-gray-900 mb-2">Distribution Analysis</h3>
              <p className="text-sm text-gray-700 mb-3 leading-relaxed">{data.user_message}</p>
              <div className="bg-white rounded-lg p-3 border border-gray-200 inline-block">
                <div className="text-xs font-medium text-gray-500 mb-1">Condition Applied</div>
                <div className="text-sm font-bold text-orange-600 mb-1">{multiValueStats.condition}</div>
                <div className="text-xs text-gray-600">
                  Total: <span className="font-semibold">{multiValueStats.total_filtered_rows}</span> users
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-sm font-bold text-gray-900 mb-3">
            {multiValueStats.target_field} Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} contentStyle={{ borderRadius: '6px', border: '1px solid #e5e7eb', fontSize: '12px' }} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  const renderPercentageDistribution = () => {
    const matchPercent = multiValueStats.match_percent || 0;
    const notMatchPercent = 100 - matchPercent;

    const chartData = [
      { name: 'Matching', value: matchPercent, count: multiValueStats.matching_users },
      { name: 'Not Matching', value: notMatchPercent, count: multiValueStats.total_users - multiValueStats.matching_users }
    ];

    return (
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-5 border border-indigo-200">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-indigo-600 rounded-lg">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-bold text-gray-900 mb-2">Percentage Analysis</h3>
              <p className="text-sm text-gray-700 mb-3 leading-relaxed">{multiValueStats.note}</p>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
                  <div className="text-4xl font-bold text-indigo-600 mb-1">{matchPercent}%</div>
                  <div className="text-xs text-gray-600 font-medium">Matching Condition</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {multiValueStats.matching_users} of {multiValueStats.total_users}
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="text-xs font-medium text-gray-500 mb-1">Condition</div>
                  <div className="text-sm font-semibold text-gray-900 mb-2 truncate">
                    {multiValueStats.field}
                  </div>
                  <div className="text-xl font-bold text-blue-600">
                    {multiValueStats.operator} {multiValueStats.threshold}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Visual Breakdown</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name, props) => [`${value.toFixed(2)}% (${props.payload.count} users)`, name]} contentStyle={{ borderRadius: '6px', border: '1px solid #e5e7eb', fontSize: '12px' }} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  const hasValidBaseStats = baseStats && !baseStats.error && (
    baseStats.average_overall_rating !== undefined ||
    baseStats.recommendation_rate !== undefined ||
    baseStats.verification_rate !== undefined ||
    baseStats.total_reviews !== undefined
  );

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-6xl mx-auto space-y-4">
        {/* Header */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="h-4 w-4 text-indigo-600 flex-shrink-0" />
                <span className="text-xs font-semibold text-indigo-600 uppercase">Smart Analysis</span>
              </div>
              <h2 className="text-lg font-bold text-gray-900 mb-1">{query}</h2>
              <p className="text-xs text-gray-600">
                <span className="font-medium">Semantic Query:</span> {data.semantic_query_used}
              </p>
            </div>
            <div className="bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg text-xs font-semibold border border-indigo-200 whitespace-nowrap">
              {data.total_results_fetched} results
            </div>
          </div>
        </div>

        {/* Main Visualization */}
        {renderVisualization()}

        {/* Base Stats Section */}
        {hasValidBaseStats && (
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-bold text-gray-900 mb-3">Overall Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {baseStats.average_overall_rating !== undefined && (
                <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                  <div className="text-xs font-medium text-gray-600 mb-1">Avg Rating</div>
                  <div className="text-2xl font-bold text-blue-600">{baseStats.average_overall_rating.toFixed(2)}</div>
                </div>
              )}
              {baseStats.recommendation_rate !== undefined && (
                <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                  <div className="text-xs font-medium text-gray-600 mb-1">Recommendation</div>
                  <div className="text-2xl font-bold text-green-600">{baseStats.recommendation_rate.toFixed(1)}%</div>
                </div>
              )}
              {baseStats.verification_rate !== undefined && (
                <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                  <div className="text-xs font-medium text-gray-600 mb-1">Verification</div>
                  <div className="text-2xl font-bold text-purple-600">{baseStats.verification_rate.toFixed(1)}%</div>
                </div>
              )}
              {baseStats.total_reviews !== undefined && (
                <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
                  <div className="text-xs font-medium text-gray-600 mb-1">Total Reviews</div>
                  <div className="text-2xl font-bold text-orange-600">{baseStats.total_reviews}</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpecialCase;