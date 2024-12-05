import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface LabelManagerProps {
  title: string;
  labels: string[];
  maxLabels: number;
  onUpdateLabels: (newLabels: string[]) => void;
}

export function LabelManager({ title, labels, maxLabels, onUpdateLabels }: LabelManagerProps) {
  const [newLabel, setNewLabel] = useState('');

  const handleAddLabel = () => {
    if (newLabel.trim() && labels.length < maxLabels) {
      onUpdateLabels([...labels, newLabel.trim()]);
      setNewLabel('');
    }
  };

  const handleRemoveLabel = (labelToRemove: string) => {
    onUpdateLabels(labels.filter(label => label !== labelToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddLabel();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-medium text-gray-700">{title}</label>
        <span className="text-xs text-gray-500">
          {labels.length}/{maxLabels} labels
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex gap-2">
          <input
            type="text"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add new label..."
            className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={labels.length >= maxLabels}
          />
          <button
            onClick={handleAddLabel}
            disabled={!newLabel.trim() || labels.length >= maxLabels}
            className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {labels.map((label) => (
            <div
              key={label}
              className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-lg"
            >
              <span className="text-sm">{label}</span>
              <button
                onClick={() => handleRemoveLabel(label)}
                className="p-0.5 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}