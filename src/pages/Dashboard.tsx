import React, { useState, useEffect } from 'react';
import { useTaskStore } from '../store/taskStore';
import { PlusCircle, LayoutGrid, List } from 'lucide-react';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import { Link, useLocation } from 'react-router-dom';

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const tasks = useTaskStore((state) => state.tasks);
  const fetchTasks = useTaskStore((state) => state.fetchTasks);
  const location = useLocation();

  useEffect(() => {
    fetchTasks(); // Fetch tasks from Supabase on component mount
  }, [fetchTasks]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('addTask') === 'true') {
      setIsModalOpen(true);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="text-xl font-bold text-blue-500">Task Tracker</Link>
            <div className="flex space-x-4">
              <Link to="/" className="text-gray-600 hover:text-gray-800">Home</Link>
              <Link to="/dashboard" className="text-blue-600 hover:text-blue-800">Dashboard</Link>
              <Link to="/get-started" className="text-gray-600 hover:text-gray-800">Get Started</Link>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              Add Task
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search tasks..."
            className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-xs"
          />
          <div className="flex space-x-4">
            <select className="border border-gray-300 rounded-lg px-4 py-2">
              <option>All Tasks</option>
              <option>Personal</option>
              <option>Work</option>
            </select>
            <select className="border border-gray-300 rounded-lg px-4 py-2">
              <option>Newest First</option>
              <option>Oldest First</option>
            </select>
          </div>
        </div>

        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          : "space-y-4"
        }>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} viewMode={viewMode} />
          ))}
        </div>
      </main>

      {isModalOpen && (
        <TaskForm onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}