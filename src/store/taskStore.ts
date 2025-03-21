import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  due_date?: string;
  tags?: string[];
}

interface TaskState {
  tasks: Task[];
  fetchTasks: () => Promise<void>;
  addTask: (task: Omit<Task, 'id'>) => Promise<void>;
  updateTask: (id: string, task: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],

  // Fetch tasks from Supabase
  fetchTasks: async () => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching tasks:', error);
      return;
    }

    set({ tasks: data || [] });
  },

  // Add a new task to Supabase
  addTask: async (task) => {
    const { data, error } = await supabase
      .from('tasks')
      .insert(task)
      .select();

    if (error) {
      console.error('Error adding task:', error);
      throw error;
    }

    set((state) => ({
      tasks: [data[0], ...state.tasks],
    }));
  },

  // Update an existing task in Supabase
  updateTask: async (id, updatedTask) => {
    const { data, error } = await supabase
      .from('tasks')
      .update(updatedTask)
      .eq('id', id)
      .select();

    if (error) {
      console.error('Error updating task:', error);
      throw error;
    }

    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, ...data[0] } : task
      ),
    }));
  },

  // Delete a task from Supabase
  deleteTask: async (id) => {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting task:', error);
      throw error;
    }

    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    }));
  },
}));