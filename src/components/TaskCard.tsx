import React from 'react';
import { useTaskStore } from '../store/taskStore';
import { Trash2, Edit2, Calendar } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  due_date?: string;
  tags?: string[];
}

interface TaskCardProps {
  task: Task;
  viewMode: 'grid' | 'list';
}

export default function TaskCard({ task, viewMode }: TaskCardProps) {
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const updateTask = useTaskStore((state) => state.updateTask);

  const priorityColors = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800'
  };

  const statusColors = {
    todo: 'bg-gray-100 text-gray-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    done: 'bg-green-100 text-green-800'
  };

  const cardClass = viewMode === 'grid' 
    ? 'bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition'
    : 'bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition flex items-center justify-between';

  return (
    <div className={cardClass}>
      <div className={viewMode === 'grid' ? '' : 'flex-1'}>
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => updateTask(task.id, { status: task.status === 'done' ? 'todo' : 'done' })}
              className="text-gray-400 hover:text-gray-600"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-gray-400 hover:text-red-600"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {viewMode === 'grid' && task.description && (
          <p className="text-gray-600 mb-4">{task.description}</p>
        )}
        
        <div className="flex flex-wrap gap-2">
          <span className={`px-2 py-1 rounded text-sm ${priorityColors[task.priority]}`}>
            {task.priority}
          </span>
          <span className={`px-2 py-1 rounded text-sm ${statusColors[task.status]}`}>
            {task.status}
          </span>
          {task.due_date && (
            <span className="flex items-center text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-1" />
              {new Date(task.due_date).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}