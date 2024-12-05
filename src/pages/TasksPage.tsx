import React, { useState, useEffect } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import { Task } from '../types/task';
import { TaskCard } from '../components/TaskCard';
import { AddTaskModal } from '../components/AddTaskModal';
import { useFirebase } from '../contexts/FirebaseContext';
import { getTasks, createTask, updateTask } from '../lib/firebase/tasks';

export function TasksPage() {
  const { user, loading: authLoading } = useFirebase();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTasks() {
      if (!user) return;
      
      try {
        setLoading(true);
        setError(null);
        const fetchedTasks = await getTasks(user.uid);
        setTasks(fetchedTasks);
      } catch (err) {
        setError('Failed to load tasks. Please try again.');
        console.error('Error loading tasks:', err);
      } finally {
        setLoading(false);
      }
    }

    if (!authLoading) {
      loadTasks();
    }
  }, [user, authLoading]);

  const handleUpdateTask = async (updatedTask: Task) => {
    if (!user) return;

    try {
      setError(null);
      await updateTask(updatedTask.id, {
        ...updatedTask,
        updatedAt: new Date().toISOString()
      });
      
      // Update local state
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
    } catch (err) {
      setError('Failed to update task. Please try again.');
      console.error('Error updating task:', err);
    }
  };

  const handleAddTask = async (newTask: Omit<Task, 'id' | 'userId'>) => {
    if (!user) return;

    try {
      setError(null);
      const taskWithMetadata = {
        ...newTask,
        userId: user.uid,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      await createTask(taskWithMetadata);
      
      // Reload tasks to get the new one
      const updatedTasks = await getTasks(user.uid);
      setTasks(updatedTasks);
      setShowAddModal(false);
    } catch (err) {
      setError('Failed to add task. Please try again.');
      console.error('Error adding task:', err);
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-600">Please sign in to view your tasks.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Task
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : tasks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">No tasks found.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onUpdateTask={handleUpdateTask}
            />
          ))}
        </div>
      )}

      <AddTaskModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAddTask={handleAddTask}
      />
    </div>
  );
}