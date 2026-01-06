import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { banners } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const AdminBanners: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [localBanners, setLocalBanners] = useState(banners);

  const toggleBannerStatus = (bannerId: string) => {
    setLocalBanners((prev) =>
      prev.map((banner) =>
        banner.id === bannerId ? { ...banner, isActive: !banner.isActive } : banner
      )
    );
    toast({
      title: 'Banner Updated',
      description: 'Banner status has been updated.',
    });
  };

  const handleDelete = (bannerId: string) => {
    toast({
      title: 'Banner Deleted',
      description: 'This is a UI demo. No actual deletion occurred.',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl mb-2">Homepage Banners</h2>
          <p className="text-muted-foreground">Manage hero banners and promotional content</p>
        </div>

        <Button onClick={() => setShowAddModal(true)}>
          <Plus size={16} />
          Add Banner
        </Button>
      </div>

      {/* Banners List */}
      <div className="grid gap-6">
        {localBanners.map((banner) => (
          <div key={banner.id} className="admin-card p-0 overflow-hidden">
            <div className="grid md:grid-cols-3">
              {/* Preview */}
              <div className="aspect-video md:aspect-auto bg-muted flex items-center justify-center">
                <div className="text-center p-8">
                  <p className="text-muted-foreground text-sm mb-2">Banner Preview</p>
                  <p className="font-display text-2xl">{banner.title}</p>
                  <p className="text-sm text-muted-foreground mt-1">{banner.subtitle}</p>
                </div>
              </div>

              {/* Details */}
              <div className="md:col-span-2 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium text-lg">{banner.title}</h3>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-sm ${
                          banner.isActive
                            ? 'bg-brand-olive/10 text-brand-olive'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {banner.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{banner.subtitle}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                  <div>
                    <p className="text-muted-foreground">Link</p>
                    <p className="font-medium">{banner.link}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Image Type</p>
                    <p className="font-medium capitalize">{banner.image}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" size="sm">
                    <Edit size={14} />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleBannerStatus(banner.id)}
                  >
                    {banner.isActive ? <EyeOff size={14} /> : <Eye size={14} />}
                    {banner.isActive ? 'Deactivate' : 'Activate'}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => handleDelete(banner.id)}
                  >
                    <Trash2 size={14} />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Banner Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-primary/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background w-full max-w-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-xl">Add New Banner</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-muted-foreground hover:text-foreground text-2xl"
              >
                ×
              </button>
            </div>

            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                toast({ title: 'Banner Added', description: 'UI demo - no actual banner created.' });
                setShowAddModal(false);
              }}
            >
              <div>
                <label className="block text-sm font-medium mb-2">Banner Title</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g., New Season Arrivals"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Subtitle</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g., Discover the latest collection"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Link URL</label>
                <input type="text" className="form-input" placeholder="/shop" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Banner Image URL</label>
                <input type="url" className="form-input" placeholder="https://..." />
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="isActive" className="w-4 h-4" defaultChecked />
                <label htmlFor="isActive" className="text-sm">
                  Set as active banner
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1">
                  Add Banner
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBanners;
