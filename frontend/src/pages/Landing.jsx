import { 
  Sparkles, 
  TrendingUp, 
  MessageSquare, 
  BarChart3, 
  Zap, 
  Brain,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Briefcase,
  Lightbulb
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Landing = () => {
  const features = [
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Natural Language Queries",
      description: "Ask complex analytical questions in plain English — no SQL, no training required"
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Dual-Agent Intelligence",
      description: "Analytics Agent interprets queries, Decision Agent provides actionable management insights"
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Real-Time Visualizations",
      description: "Dynamic charts, correlation matrices, and statistical breakdowns generated instantly"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Cross-Metric Analysis",
      description: "10,000+ analytical combinations across ratings, categories, and distributions"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Hybrid Semantic Search",
      description: "Combines MindsDB embeddings with structured metadata for intelligent filtering"
    },
    {
      icon: <Briefcase className="h-6 w-6" />,
      title: "Management-Ready Insights",
      description: "Operational intelligence mapped to business actions and strategic decisions"
    }
  ];

  const agentQueries = [
    {
      type: "Conditional Rating Analysis",
      query: "Among users who mentioned poor inflight meals, what percent of those who rated food above 4 also recommended the airline?",
      insight: "Reveals tolerance thresholds and loyalty patterns"
    },
    {
      type: "Rating-to-Rating Correlation",
      query: "Users who complained about baggage delays — what percentage rated ground service above 4 but overall below 5?",
      insight: "Identifies service disconnect points"
    },
    {
      type: "Distribution Analysis",
      query: "For passengers complaining about check-in delays, show seat type distribution among those who rated ground service above 3",
      insight: "Maps pain points to customer segments"
    },
    {
      type: "Category Cross-Analysis",
      query: "Among crowded flight reviews, how many Economy passengers were Solo Leisure vs Business travelers?",
      insight: "Uncovers demographic-specific friction areas"
    },
    {
      type: "Percentage Distribution",
      query: "Out of all reviews mentioning slow boarding, what percentage rated value for money above 4?",
      insight: "Measures expectation-reality alignment"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-2 text-blue-700 text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              <span>MindsDB Hacktoberfest 2025 Project</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
              From Messy Reviews to
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Flight-Ready Intelligence
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Turn 20,000+ airline reviews into actionable insights with hybrid semantic search, 
              agent-driven analytics, and management-focused decision intelligence.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a
                href="/home"
                className="group inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <span>Ask. Analyze. Act.</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/about"
                className="inline-flex items-center space-x-2 bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300"
              >
                <span>How It Works</span>
                <ChevronRight className="h-5 w-5" />
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 pt-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>MindsDB Knowledge Bases</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>Dual-Agent Architecture</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>Zero-ETL Analytics</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Enterprise-Grade Analytics, Zero Complexity
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Built for airline management teams who need insights, not infrastructure
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl hover:shadow-xl hover:border-blue-300 transition-all duration-300"
              >
                <div className="bg-gradient-to-br from-blue-500 to-indigo-500 w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agent Capabilities Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-indigo-100 border border-indigo-300 rounded-full px-4 py-2 text-indigo-700 text-sm font-semibold mb-4">
              <Brain className="h-4 w-4" />
              <span>Analytics Agent Capabilities</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Five Analytical Functions, Infinite Insights
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our agent intelligently routes queries to specialized analytical functions, 
              generating 10,000+ cross-metric combinations from natural language
            </p>
          </div>

          <div className="space-y-4">
            {agentQueries.map((item, index) => (
              <div
                key={index}
                className="group bg-white p-6 rounded-xl border border-gray-200 hover:border-indigo-400 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-indigo-100 text-indigo-600 w-10 h-10 rounded-lg flex items-center justify-center font-bold flex-shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                        {item.type}
                      </span>
                    </div>
                    <p className="text-gray-800 font-medium mb-2">
                      "{item.query}"
                    </p>
                    <div className="flex items-start space-x-2 text-sm text-gray-600">
                      <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <span className="italic">{item.insight}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-white border-2 border-indigo-200 rounded-2xl p-8">
            <div className="flex items-start space-x-4">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-xl flex-shrink-0">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Decision Intelligence Agent
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Beyond analytics, our Decision Agent interprets findings and provides 
                  <span className="font-semibold text-gray-900"> management-ready recommendations</span> — 
                  mapping data patterns to operational actions, helping airline executives make 
                  confident, data-driven decisions without technical expertise.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <a
              href="/home"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <span>Start Analyzing</span>
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;