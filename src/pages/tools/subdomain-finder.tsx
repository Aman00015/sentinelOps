import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, ExternalLink, Globe, Shield, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import FloatingBg from '@/components/AnimatedBg';
import { Link } from 'react-router-dom';

interface SubdomainResult {
  subdomain: string;
  status: 'active' | 'dns_only' | 'inactive';
  http_status?: number;
  protocol?: string;
}

interface SubdomainResponse {
  domain: string;
  subdomains: SubdomainResult[];
  total_found: number;
}

const SubdomainFinder: React.FC = () => {
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SubdomainResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('https://secure-ai-backend.onrender.com/subdomain/find', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ domain }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to find subdomains');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'dns_only':
        return <Globe className="w-4 h-4 text-blue-500" />;
      case 'inactive':
        return <XCircle className="w-4 h-4 text-gray-400" />;
      default:
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'dns_only':
        return 'DNS Record Only';
      case 'inactive':
        return 'Inactive';
      default:
        return 'Unknown';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'dns_only':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'inactive':
        return 'bg-gray-100 text-gray-600 border-gray-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  return (
    <div className="relative min-h-screen bg-transparent overflow-x-hidden font-sans">
      <FloatingBg />
      <div className="max-w-6xl mx-auto py-8 px-4 relative z-10">
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
            <Globe className="w-12 h-12 text-white" />
            <h1 className="text-4xl font-bold text-white">Subdomain Finder</h1>
          </div>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Discover subdomains for any domain using multiple reconnaissance techniques
          </p>
        </motion.div>

        {/* Input Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-card border-primary/20 hover:border-primary/40 transition-all duration-500 hover:shadow-glow rounded-2xl p-6 mb-8"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="domain" className="block text-sm font-medium text-white/90 mb-2">
                Enter Domain to Scan
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  id="domain"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value.toLowerCase())}
                  placeholder="example.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  required
                  pattern="[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                  title="Enter a valid domain (e.g., example.com)"
                />
              </div>
              <p className="mt-1 text-sm text-white">
                Enter a domain without http:// or https:// (e.g., google.com, github.com)
              </p>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Discovering Subdomains...
                </>
              ) : (
                <>
                  <Globe className="w-5 h-5" />
                  Find Subdomains
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
            className="bg-gradient-card border-primary/20 rounded-xl p-4 mb-6 text-white"
          >
            <div className="flex items-center gap-2 text-red-800">
              <AlertCircle className="w-5 h-5" />
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
            <div className="bg-gradient-card border-primary/20 hover:border-primary/40 transition-all duration-500 hover:shadow-glow rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white">Discovery Results</h2>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">
                    Found: <strong className="text-purple-600">{result.total_found}</strong> subdomains
                  </span>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {result.subdomains.filter(s => s.status === 'active').length}
                  </div>
                  <div className="text-sm text-green-700 font-medium">Active Sites</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {result.subdomains.filter(s => s.status === 'dns_only').length}
                  </div>
                  <div className="text-sm text-blue-700 font-medium">DNS Records</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="text-2xl font-bold text-gray-600 mb-1">
                    {result.subdomains.filter(s => s.status === 'inactive').length}
                  </div>
                  <div className="text-sm text-gray-700 font-medium">Inactive</div>
                </div>
              </div>

              <div className="p-3 bg-gray-100 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Scanned Domain:</p>
                <p className="text-gray-900 font-mono text-sm">{result.domain}</p>
              </div>
            </div>

            {/* Subdomains List */}
            <div className="bg-gradient-card border-primary/20 hover:border-primary/40 transition-all duration-500 hover:shadow-glow rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Discovered Subdomains</h3>
              
              {result.subdomains.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Globe className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                  <p>No subdomains found for this domain.</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {result.subdomains.map((subdomain, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border flex items-center justify-between ${getStatusColor(subdomain.status)}`}
                    >
                      <div className="flex items-center gap-3">
                        {getStatusIcon(subdomain.status)}
                        <div>
                          <p className="font-mono text-sm font-medium">{subdomain.subdomain}</p>
                          <div className="flex items-center gap-2 text-xs">
                            <span>{getStatusText(subdomain.status)}</span>
                            {subdomain.http_status && (
                              <span className="px-1.5 py-0.5 bg-white rounded text-xs">
                                HTTP {subdomain.http_status}
                              </span>
                            )}
                            {subdomain.protocol && (
                              <span className="px-1.5 py-0.5 bg-white rounded text-xs">
                                {subdomain.protocol.toUpperCase()}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {subdomain.status === 'active' && (
                          <a
                            href={`${subdomain.protocol || 'https'}://${subdomain.subdomain}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors"
                            title="Visit subdomain"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Information */}
            <div className="bg-gradient-card border-primary/20 hover:border-primary/40 transition-all duration-500 hover:shadow-glow rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                About Subdomain Discovery
              </h3>
              <div className="text-sm text-white/80 space-y-2">
                <p>
                  <strong>Active:</strong> Subdomain responds to HTTP/HTTPS requests
                </p>
                <p>
                  <strong>DNS Record Only:</strong> Subdomain has DNS records but no web service
                </p>
                <p>
                  <strong>Inactive:</strong> Subdomain not found or not responding
                </p>
                <p className="mt-3 text-xs text-white/70">
                  This tool uses multiple techniques including certificate transparency logs, 
                  common subdomain enumeration, and DNS analysis.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Info Section when no results */}
        {!result && !loading && !error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-card border-primary/20 hover:border-primary/40 transition-all duration-500 hover:shadow-glow rounded-2xl p-6 text-center"
          >
            <Globe className="w-16 h-16 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">How Subdomain Discovery Works</h3>
            <p className="text-white mb-4">
              Our subdomain finder uses multiple reconnaissance techniques to discover subdomains:
            </p>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-white">
              <div className="text-left space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Certificate Transparency Logs (crt.sh)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Common Subdomain Enumeration</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>DNS Record Analysis</span>
                </div>
              </div>
              <div className="text-left space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>HTTP/HTTPS Service Discovery</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Security API Integration</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Real-time Status Checking</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SubdomainFinder;