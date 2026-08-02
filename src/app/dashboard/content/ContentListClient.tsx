"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, AlertTriangle, X } from "lucide-react";
import { ContentType } from "@/app/actions/content";

interface CMSItem {
  id: string;
  title: string;
  slug: string;
  type: 'BLOG' | 'PAGE';
  published: boolean;
  publishAt: string | null;
  createdAt: string;
}

interface ContentListClientProps {
  initialItems: CMSItem[];
}

export default function ContentListClient({ initialItems }: ContentListClientProps) {
  const router = useRouter();
  const [items, setItems] = useState<CMSItem[]>(initialItems);
  const [selected, setSelected] = useState<{ id: string; type: ContentType }[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Custom Confirmation Modal States
  const [deleteConfirmItem, setDeleteConfirmItem] = useState<{ id: string; title: string; type: ContentType } | null>(null);
  const [showBulkDeleteConfirm, setShowBulkDeleteConfirm] = useState(false);

  // Sync state if initialItems changes
  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelected(items.map(item => ({ id: item.id, type: item.type })));
    } else {
      setSelected([]);
    }
  };

  const handleSelectItem = (id: string, type: ContentType, checked: boolean) => {
    if (checked) {
      setSelected(prev => [...prev, { id, type }]);
    } else {
      setSelected(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleBulkDeleteTrigger = () => {
    if (selected.length === 0) return;
    setShowBulkDeleteConfirm(true);
  };

  const handleIndividualDeleteTrigger = (item: CMSItem) => {
    setDeleteConfirmItem({ id: item.id, title: item.title, type: item.type });
  };

  const confirmBulkDelete = async () => {
    if (selected.length === 0) return;
    
    setIsDeleting(true);
    setShowBulkDeleteConfirm(false);
    try {
      const response = await fetch("/api/content/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: selected }),
      });
      const res = await response.json();
      if (res.error) {
        alert(res.error);
      } else {
        // Filter out deleted items locally instantly
        const deletedIds = selected.map(s => s.id);
        setItems(prev => prev.filter(item => !deletedIds.includes(item.id)));
        setSelected([]);
        router.refresh();
      }
    } catch (err: any) {
      alert("Failed to delete selected items: " + err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const confirmIndividualDelete = async () => {
    if (!deleteConfirmItem) return;
    const { id, type } = deleteConfirmItem;

    setIsDeleting(true);
    setDeleteConfirmItem(null);
    try {
      const response = await fetch("/api/content/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, type }),
      });
      const res = await response.json();
      if (res.error) {
        alert(res.error);
      } else {
        // Remove item locally instantly
        setItems(prev => prev.filter(item => item.id !== id));
        setSelected(prev => prev.filter(item => item.id !== id));
        router.refresh();
      }
    } catch (err: any) {
      alert("Failed to delete item: " + err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const isAllSelected = items.length > 0 && selected.length === items.length;

  return (
    <div className="space-y-4">
      {/* Bulk actions bar */}
      {selected.length > 0 && (
        <div className="flex items-center justify-between bg-primary/5 border border-primary/20 p-4 rounded-xl shadow-sm transition-all duration-300 animate-in fade-in slide-in-from-top-4">
          <span className="text-sm font-semibold text-primary">
            {selected.length} {selected.length === 1 ? 'item' : 'items'} selected
          </span>
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={handleBulkDeleteTrigger}
            disabled={isDeleting}
            className="gap-2 shadow-lg shadow-destructive/10 cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            {isDeleting ? "Deleting..." : "Delete Selected"}
          </Button>
        </div>
      )}

      <div className="bg-card border border-border/40 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground bg-secondary/20 uppercase border-b border-border/40">
              <tr>
                <th className="px-6 py-4 w-12">
                  <input 
                    type="checkbox" 
                    checked={isAllSelected}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="w-4 h-4 rounded border-border text-primary focus:ring-primary/25 cursor-pointer accent-primary"
                  />
                </th>
                <th className="px-6 py-4 font-medium">Title</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {items.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                    No content found. Create your first post or page!
                  </td>
                </tr>
              ) : (
                items.map((item) => {
                  const isChecked = selected.some(s => s.id === item.id);
                  return (
                    <tr key={`${item.type}-${item.id}`} className={`hover:bg-secondary/10 transition-colors group ${isChecked ? 'bg-primary/5 hover:bg-primary/10' : ''}`}>
                      <td className="px-6 py-4 w-12">
                        <input 
                          type="checkbox" 
                          checked={isChecked}
                          onChange={(e) => handleSelectItem(item.id, item.type, e.target.checked)}
                          className="w-4 h-4 rounded border-border text-primary focus:ring-primary/25 cursor-pointer accent-primary"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold truncate max-w-sm" title={item.title}>
                          {item.title}
                        </div>
                        <div className="text-muted-foreground text-xs mt-1 truncate max-w-sm">
                          {item.type === 'BLOG' ? `/blog/${item.slug}` : `/${item.slug}`}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${item.type === 'BLOG' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' : 'bg-fuchsia-500/10 text-fuchsia-500 border border-fuchsia-500/20'}`}>
                          {item.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          {item.published ? (
                            <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-1 rounded-full w-fit">
                              PUBLISHED
                            </span>
                          ) : (
                            <span className="text-xs font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-1 rounded-full w-fit">
                              DRAFT
                            </span>
                          )}
                          {item.publishAt && (
                            <span className="text-[10px] text-muted-foreground font-medium">
                              {new Date(item.publishAt) > new Date() ? 'Scheduled: ' : 'Published: '} 
                              {format(new Date(item.publishAt), "MMM d, HH:mm")}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground text-xs whitespace-nowrap">
                        {format(new Date(item.createdAt), "MMM d, yyyy")}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/dashboard/content/${item.id}?type=${item.type}`} className="cursor-pointer">
                            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary cursor-pointer">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleIndividualDeleteTrigger(item)}
                            disabled={isDeleting}
                            className="text-muted-foreground hover:text-destructive cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Individual Delete Custom HTML Confirmation Modal */}
      {deleteConfirmItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md transition-opacity duration-300 animate-in fade-in">
          <div className="bg-[#0b0f19]/95 border border-red-500/30 rounded-2xl p-6 max-w-md w-full mx-4 shadow-[0_0_50px_rgba(239,68,68,0.15)] animate-in zoom-in-95 duration-200 relative">
            <button 
              onClick={() => setDeleteConfirmItem(null)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="space-y-2 flex-1">
                <h3 className="text-lg font-bold text-foreground tracking-tight">Confirm Deletion</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Are you sure you want to delete <strong className="text-foreground">"{deleteConfirmItem.title}"</strong> ({deleteConfirmItem.type.toLowerCase()})? This action is permanent and cannot be undone.
                </p>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <Button 
                variant="outline" 
                onClick={() => setDeleteConfirmItem(null)}
                className="cursor-pointer border-border hover:bg-secondary/40"
              >
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={confirmIndividualDelete}
                className="cursor-pointer shadow-lg shadow-destructive/20 hover:scale-[1.02] transition-transform active:scale-[0.98]"
              >
                Delete Permanently
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Delete Custom HTML Confirmation Modal */}
      {showBulkDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md transition-opacity duration-300 animate-in fade-in">
          <div className="bg-[#0b0f19]/95 border border-red-500/30 rounded-2xl p-6 max-w-md w-full mx-4 shadow-[0_0_50px_rgba(239,68,68,0.15)] animate-in zoom-in-95 duration-200 relative">
            <button 
              onClick={() => setShowBulkDeleteConfirm(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="space-y-2 flex-1">
                <h3 className="text-lg font-bold text-foreground tracking-tight">Confirm Bulk Deletion</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Are you sure you want to delete <strong className="text-foreground">{selected.length} selected items</strong>? This action is permanent and all selected blogs and pages will be deleted forever.
                </p>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <Button 
                variant="outline" 
                onClick={() => setShowBulkDeleteConfirm(false)}
                className="cursor-pointer border-border hover:bg-secondary/40"
              >
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={confirmBulkDelete}
                className="cursor-pointer shadow-lg shadow-destructive/20 hover:scale-[1.02] transition-transform active:scale-[0.98]"
              >
                Delete Selected Permanently
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
