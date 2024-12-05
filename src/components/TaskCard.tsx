import React, { useState } from 'react';
import { Calendar, Edit2, Save, X, User } from 'lucide-react';
import { Task } from '../types/task';
import { formatDate } from '../lib/utils';
import { ContactSearchField } from './ContactSearchField';
import { mockContacts } from '../data/mockContacts';
import { ensureValidImageUrl } from '../lib/utils';

interface TaskCardProps {
  task: Task;
  onUpdateTask: (updatedTask: Task) => void;
}

export function TaskCard({ task, onUpdateTask }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleSave = () => {
    onUpdateTask(editedTask);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTask(task);
    setIsEditing(false);
  };

  const priorityColors = {
    High: 'bg-red-100 text-red-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Low: 'bg-green-100 text-green-800'
  };

  const statusColors = {
    'To Do': 'bg-gray-100 text-gray-800',
    'In Progress': 'bg-blue-100 text-blue-800',
    'Completed': 'bg-green-100 text-green-800'
  };

  const associatedContact = mockContacts.find(contact => contact.name === task.assignedTo);
  const avatarUrl = associatedContact ? ensureValidImageUrl(associatedContact.avatar) : null;

  if (isEditing) {
    return (
      <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm">
        <div className="space-y-3 sm:space-y-4">
          <input
            type="text"
            value={editedTask.title}
            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            placeholder="Task title"
          />

          <textarea
            value={editedTask.description}
            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            placeholder="Task description"
            rows={2}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs sm:text-sm text-gray-600 mb-1">Priority</label>
              <select
                value={editedTask.priority}
                onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value as Task['priority'] })}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div>
              <label className="block text-xs sm:text-sm text-gray-600 mb-1">Status</label>
              <select
                value={editedTask.status}
                onChange={(e) => setEditedTask({ ...editedTask, status: e.target.value as Task['status'] })}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-xs sm:text-sm text-gray-600 mb-1">Due Date</label>
              <input
                type="date"
                value={editedTask.dueDate}
                onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm text-gray-600 mb-1">Associated With</label>
              <ContactSearchField
                value={editedTask.assignedTo}
                onChange={(contactName) => setEditedTask({ ...editedTask, assignedTo: contactName })}
                placeholder="Search contacts..."
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={handleCancel}
              className="p-1.5 sm:p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save className="w-4 h-4 sm:w-5 sm:h-5" />
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm">
      <div className="flex items-start justify-between mb-2 sm:mb-3">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1 sm:mb-2">
            <h3 className="font-semibold text-sm sm:text-base">{task.title}</h3>
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 sm:p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Edit2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500" />
            </button>
          </div>
          <p className="text-gray-600 text-xs sm:text-sm">{task.description}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-1 sm:gap-2">
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500" />
            <span className="text-xs sm:text-sm text-gray-500">{formatDate(new Date(task.dueDate))}</span>
          </div>
          {task.assignedTo && (
            <div className="flex items-center gap-1 sm:gap-2">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={task.assignedTo}
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-full"
                />
              ) : (
                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500" />
              )}
              <span className="text-xs sm:text-sm text-gray-500">{task.assignedTo}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <span className={`px-2 py-0.5 text-xs rounded-full ${priorityColors[task.priority]}`}>
            {task.priority}
          </span>
          <span className={`px-2 py-0.5 text-xs rounded-full ${statusColors[task.status]}`}>
            {task.status}
          </span>
        </div>
      </div>
    </div>
  );
}