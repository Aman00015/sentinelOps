import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, AlertTriangle, CheckCircle, Search, ExternalLink } from 'lucide-react';
import FloatingBg from '@/components/AnimatedBg';
import { Link } from 'react-router-dom';

interface PhishingResult {
  url: string;
  prediction: 'phishing' | 'legitimate';
  confidence: number;
  features: { [key: string]: number };
}

const PhishingDetector: React.FC = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PhishingResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('https://secure-ai-backend.onrender.com/phishing/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze URL');
      }

      const data = await response.json();
      setResult(data.result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getFeatureDescription = (feature: string, value: number) => {
    const descriptions: { [key: string]: { [key: number]: string } } = {
      having_IP_Address: {
        1: 'URL uses IP address instead of domain name',
        [-1]: 'URL uses proper domain name'
      },
      Shortining_Service: {
        1: 'URL uses URL shortening service',
        [-1]: 'URL does not use shortening service'
      },
      SSLfinal_State: {
        1: 'URL uses HTTPS',
        [-1]: 'URL does not use HTTPS'
      },
      having_Sub_Domain: {
        1: 'Multiple subdomains detected',
        0: 'Single subdomain',
        [-1]: 'No subdomains'
      },
      URL_Length: {
        1: 'Long URL (potential risk)',
        [-1]: 'Normal URL length'
      },
      having_At_Symbol: {
        1: 'URL contains @ symbol (suspicious)',
        [-1]: 'No @ symbol in URL'
      },
      Prefix_Suffix: {
        1: 'Domain contains hyphens (suspicious)',
        [-1]: 'Domain name is clean'
      },
      double_slash_redirecting: {
        1: 'URL contains suspicious double slashes',
        [-1]: 'No suspicious redirects'
      },
      // Add more feature descriptions as needed
    };

    return descriptions[feature]?.[value] || `Value: ${value}`;
  };

  return (
    <div className="relative min-h-screen bg-transparent overflow-x-hidden font-sans">
      <FloatingBg />
      <div className="max-w-4xl mx-auto py-8 px-4 relative z-10">
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-sm text-white/90 backdrop-blur-xl transition-colors hover:bg-white/[0.1]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-12 h-12 text-white" />
            <h1 className="text-4xl font-bold text-white">Phishing URL Detector</h1>
          </div>
          <p className="text-lg text-white max-w-2xl mx-auto">
            Analyze URLs for potential phishing attempts using machine learning and 30+ security features
          </p>
        </motion.div>

        {/* Input Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-card border border-primary/20 rounded-2xl p-6 mb-8"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-white mb-2">
                Enter URL to Analyze
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black/80 w-5 h-5" />
                <input
                  type="url"
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  required
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Analyzing URL...
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  Analyze URL
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6"
          >
            <div className="flex items-center gap-2 text-red-800">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-semibold">Error:</span>
              <span>{error}</span>
            </div>
          </motion.div>
        )}

        {/* Results */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Summary Card */}
            <div className="bg-gradient-card border border-primary/20 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white">Analysis Results</h2>
                <a
                  href={result.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  <ExternalLink className="w-4 h-4" />
                  Visit URL
                </a>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Prediction */}
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className={`flex items-center justify-center gap-2 mb-2 ${result.prediction === 'phishing' ? 'text-red-600' : 'text-green-600'}`}>
                    {result.prediction === 'phishing' ? (
                      <AlertTriangle className="w-8 h-8" />
                    ) : (
                      <CheckCircle className="w-8 h-8" />
                    )}
                  </div>
                  <h3 className="font-semibold text-lg text-gray-900 capitalize">{result.prediction}</h3>
                  <p className="text-sm text-gray-600">Prediction</p>
                </div>

                {/* Confidence */}
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    {result.confidence.toFixed(1)}%
                  </div>
                  <h3 className="font-semibold text-gray-900">Confidence</h3>
                  <p className="text-sm text-gray-600">Model certainty</p>
                </div>
              </div>

              {/* URL Display */}
              <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Analyzed URL:</p>
                <p className="text-gray-900 font-mono text-sm break-all">{result.url}</p>
              </div>
            </div>

            {/* Features Analysis */}
            <div className="bg-gradient-card border border-primary/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Security Features Analysis</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                {Object.entries(result.features).map(([feature, value]) => (
                  <div
                    key={feature}
                    className={`p-3 rounded-lg border ${
                      value === 1 
                        ? 'bg-red-50 border-red-200' 
                        : value === -1 
                        ? 'bg-green-50 border-green-200'
                        : 'bg-yellow-50 border-yellow-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm text-gray-700 capitalize">
                        {feature.replace(/_/g, ' ')}
                      </span>
                      <span className={`text-xs font-semibold ${
                        value === 1 ? 'text-red-600' : value === -1 ? 'text-green-600' : 'text-yellow-600'
                      }`}>
                        {value === 1 ? 'Risky' : value === -1 ? 'Safe' : 'Neutral'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">
                      {getFeatureDescription(feature, value)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-gradient-card border border-primary/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Recommendations</h3>
              <div className="space-y-3">
                {result.prediction === 'phishing' ? (
                  <>
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0 text-red-600" />
                      <p className="text-white/90">This URL has been flagged as potentially malicious. Do not enter any personal information.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0 text-red-600" />
                      <p className="text-white/90">Avoid clicking on links from untrusted sources and verify the website's authenticity.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0 text-red-600" />
                      <p className="text-white/90">Consider reporting this URL to your organization's security team.</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-green-600" />
                      <p className="text-white/90">This URL appears to be safe based on our analysis.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-green-600" />
                      <p className="text-white/90">Always ensure you're on the legitimate website before entering sensitive information.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-green-600" />
                      <p className="text-white/90">Continue to practice good security habits like using strong passwords and enabling 2FA.</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Info Section when no results */}
        {!result && !loading && !error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-card border border-primary/20 rounded-2xl p-6 text-center"
          >
            <Shield className="w-16 h-16 text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">How it works</h3>
            <p className="text-white mb-4">
              Our phishing detector analyzes URLs using 30+ security features including:
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-white">
              <div className="text-left">
                <ul className="space-y-2">
                  <li>• URL structure analysis</li>
                  <li>• Domain age and registration</li>
                  <li>• SSL certificate status</li>
                  <li>• Suspicious patterns detection</li>
                </ul>
              </div>
              <div className="text-left">
                <ul className="space-y-2">
                  <li>• Shortened URL detection</li>
                  <li>• Subdomain analysis</li>
                  <li>• HTML content inspection</li>
                  <li>• Machine learning classification</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PhishingDetector;