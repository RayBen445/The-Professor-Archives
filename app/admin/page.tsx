'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  FileText,
  BarChart,
  Users,
  Settings,
  Home
} from 'lucide-react';
import Link from 'next/link';
import { sampleArticles, Article } from '@/lib/data';
import { CONTACT_INFO } from '@/lib/constants';

type TabType = 'overview' | 'articles' | 'settings';

export default function AdminDashboard() {
  const [articles, setArticles] = useState<Article[]>(sampleArticles);
  const [isEditing, setIsEditing] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<Partial<Article>>({});
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const handleEdit = (article: Article) => {
    setCurrentArticle(article);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this article?')) {
      setArticles(articles.filter(a => a.id !== id));
    }
  };

  const handleSave = () => {
    if (currentArticle.id) {
      // Update existing article
      setArticles(articles.map(a => 
        a.id === currentArticle.id ? currentArticle as Article : a
      ));
    } else {
      // Create new article
      const newArticle = {
        ...currentArticle,
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
      } as Article;
      setArticles([newArticle, ...articles]);
    }
    setIsEditing(false);
    setCurrentArticle({});
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCurrentArticle({});
  };

  const stats = [
    { label: 'Total Articles', value: articles.length, icon: FileText, color: 'bg-blue-500' },
    { label: 'Published', value: articles.length, icon: BarChart, color: 'bg-green-500' },
    { label: 'Categories', value: 5, icon: Users, color: 'bg-purple-500' },
  ];

  return (
    <div className="min-h-screen bg-vintage-beige">
      {/* Header */}
      <header className="bg-vintage-charcoal text-vintage-cream shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="font-baby text-2xl md:text-3xl font-bold">Admin Dashboard</h1>
              <Link href="/" className="flex items-center gap-2 text-vintage-cream/80 hover:text-vintage-gold transition-colors text-sm">
                <Home size={16} />
                <span className="hidden md:inline">Back to Site</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-vintage-cream/80">{CONTACT_INFO.name}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8 border-b border-vintage-charcoal/20">
          {[
            { id: 'overview' as TabType, label: 'Overview', icon: BarChart },
            { id: 'articles' as TabType, label: 'Articles', icon: FileText },
            { id: 'settings' as TabType, label: 'Settings', icon: Settings },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 font-medium transition-all ${
                activeTab === tab.id
                  ? 'text-vintage-charcoal border-b-2 border-vintage-charcoal'
                  : 'text-vintage-charcoal/60 hover:text-vintage-charcoal'
              }`}
            >
              <tab.icon size={18} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <div className="flex items-center gap-4">
                    <div className={`${stat.color} p-3 rounded-lg text-white`}>
                      <stat.icon size={24} />
                    </div>
                    <div>
                      <p className="text-vintage-charcoal/60 text-sm">{stat.label}</p>
                      <p className="font-baby text-2xl font-bold text-vintage-charcoal">{stat.value}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="font-baby text-xl font-bold text-vintage-charcoal mb-4">
                Welcome to The Professor's Archives Admin
              </h2>
              <p className="text-vintage-charcoal/70 mb-4">
                This dashboard allows you to manage your historical articles and content. 
                Use the tabs above to navigate between different sections.
              </p>
              <ul className="space-y-2 text-vintage-charcoal/70">
                <li>• <strong>Overview:</strong> View statistics and quick insights</li>
                <li>• <strong>Articles:</strong> Create, edit, and manage your articles</li>
                <li>• <strong>Settings:</strong> Configure site settings and preferences</li>
              </ul>
            </div>
          </motion.div>
        )}

        {/* Articles Tab */}
        {activeTab === 'articles' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Create/Edit Form */}
            {isEditing && (
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-baby text-2xl font-bold text-vintage-charcoal">
                    {currentArticle.id ? 'Edit Article' : 'Create New Article'}
                  </h2>
                  <button
                    onClick={handleCancel}
                    className="text-vintage-charcoal/60 hover:text-vintage-charcoal"
                  >
                    <X size={24} />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-vintage-charcoal mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={currentArticle.title || ''}
                      onChange={(e) => setCurrentArticle({ ...currentArticle, title: e.target.value })}
                      className="w-full px-4 py-2 border border-vintage-charcoal/20 rounded focus:outline-none focus:ring-2 focus:ring-vintage-charcoal"
                      placeholder="Article title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-vintage-charcoal mb-2">
                      Category
                    </label>
                    <select
                      value={currentArticle.category || ''}
                      onChange={(e) => setCurrentArticle({ ...currentArticle, category: e.target.value })}
                      className="w-full px-4 py-2 border border-vintage-charcoal/20 rounded focus:outline-none focus:ring-2 focus:ring-vintage-charcoal"
                    >
                      <option value="">Select category</option>
                      <option value="WWI">WWI</option>
                      <option value="WWII">WWII</option>
                      <option value="League of Nations">League of Nations</option>
                      <option value="Independence">Independence</option>
                      <option value="The Commonwealth">The Commonwealth</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-vintage-charcoal mb-2">
                      Excerpt
                    </label>
                    <textarea
                      value={currentArticle.excerpt || ''}
                      onChange={(e) => setCurrentArticle({ ...currentArticle, excerpt: e.target.value })}
                      className="w-full px-4 py-2 border border-vintage-charcoal/20 rounded focus:outline-none focus:ring-2 focus:ring-vintage-charcoal h-24"
                      placeholder="Brief excerpt or summary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-vintage-charcoal mb-2">
                      Author
                    </label>
                    <input
                      type="text"
                      value={currentArticle.author || 'The Professor'}
                      onChange={(e) => setCurrentArticle({ ...currentArticle, author: e.target.value })}
                      className="w-full px-4 py-2 border border-vintage-charcoal/20 rounded focus:outline-none focus:ring-2 focus:ring-vintage-charcoal"
                      placeholder="Author name"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={currentArticle.featured || false}
                      onChange={(e) => setCurrentArticle({ ...currentArticle, featured: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <label className="text-sm font-medium text-vintage-charcoal">
                      Feature this article
                    </label>
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 px-6 py-2 bg-vintage-charcoal text-vintage-cream rounded hover:bg-vintage-darkBrown transition-colors"
                    >
                      <Save size={18} />
                      Save Article
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-6 py-2 border border-vintage-charcoal/20 text-vintage-charcoal rounded hover:bg-vintage-charcoal/5 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Create Button */}
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-6 py-3 bg-vintage-charcoal text-vintage-cream rounded-lg hover:bg-vintage-darkBrown transition-colors mb-6 shadow-md"
              >
                <Plus size={20} />
                Create New Article
              </button>
            )}

            {/* Articles List */}
            <div className="space-y-4">
              {articles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 text-xs font-semibold text-vintage-cream bg-vintage-charcoal rounded-full">
                          {article.category}
                        </span>
                        {article.featured && (
                          <span className="px-3 py-1 text-xs font-semibold text-vintage-charcoal bg-vintage-gold rounded-full">
                            Featured
                          </span>
                        )}
                      </div>
                      <h3 className="font-baby text-xl font-bold text-vintage-charcoal mb-2">
                        {article.title}
                      </h3>
                      <p className="text-vintage-charcoal/70 text-sm mb-2">
                        {article.excerpt}
                      </p>
                      <p className="text-vintage-charcoal/50 text-xs">
                        By {article.author} • {new Date(article.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleEdit(article)}
                        className="p-2 text-vintage-charcoal hover:bg-vintage-charcoal/5 rounded transition-colors"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(article.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h2 className="font-baby text-2xl font-bold text-vintage-charcoal mb-6">
              Settings
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-vintage-charcoal mb-3">Site Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-vintage-charcoal mb-2">
                      Site Title
                    </label>
                    <input
                      type="text"
                      defaultValue="The Professor's Archives"
                      className="w-full px-4 py-2 border border-vintage-charcoal/20 rounded focus:outline-none focus:ring-2 focus:ring-vintage-charcoal"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-vintage-charcoal mb-2">
                      Site Description
                    </label>
                    <textarea
                      defaultValue="Global events. African perspectives. Explained vividly."
                      className="w-full px-4 py-2 border border-vintage-charcoal/20 rounded focus:outline-none focus:ring-2 focus:ring-vintage-charcoal h-24"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-vintage-charcoal mb-3">Contact Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-vintage-charcoal mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      defaultValue={CONTACT_INFO.email}
                      className="w-full px-4 py-2 border border-vintage-charcoal/20 rounded focus:outline-none focus:ring-2 focus:ring-vintage-charcoal"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-vintage-charcoal mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      defaultValue={CONTACT_INFO.phoneDisplay}
                      className="w-full px-4 py-2 border border-vintage-charcoal/20 rounded focus:outline-none focus:ring-2 focus:ring-vintage-charcoal"
                    />
                  </div>
                </div>
              </div>

              <button className="px-6 py-3 bg-vintage-charcoal text-vintage-cream rounded-lg hover:bg-vintage-darkBrown transition-colors">
                Save Settings
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
