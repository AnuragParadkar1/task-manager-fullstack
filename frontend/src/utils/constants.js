export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

export const TASK_STATUS = {
  TODO: 'todo',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed'
};

export const TASK_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high'
};

export const STATUS_OPTIONS = [
  { value: 'todo', label: 'To Do' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' }
];

export const PRIORITY_OPTIONS = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' }
];

export const STATUS_COLORS = {
  todo: 'bg-gray-100 text-gray-800 border border-gray-300',
  in_progress: 'bg-blue-100 text-blue-800 border border-blue-300',
  completed: 'bg-green-100 text-green-800 border border-green-300'
};

export const PRIORITY_COLORS = {
  low: 'bg-green-100 text-green-800 border border-green-300',
  medium: 'bg-yellow-100 text-yellow-800 border border-yellow-300',
  high: 'bg-red-100 text-red-800 border border-red-300'
};