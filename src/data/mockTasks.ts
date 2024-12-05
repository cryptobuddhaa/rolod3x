import { Task } from '../types/task';

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Follow up with Alex Johnson',
    description: 'Send project proposal and timeline',
    dueDate: '2024-03-25',
    priority: 'High',
    status: 'To Do',
    assignedTo: 'Alex Johnson'
  },
  {
    id: '2',
    title: 'Schedule meeting with Sarah Chen',
    description: 'Discuss Q2 marketing strategy',
    dueDate: '2024-03-23',
    priority: 'Medium',
    status: 'In Progress',
    assignedTo: 'Sarah Chen'
  },
  {
    id: '3',
    title: 'Review contract with Marcus',
    description: 'Go through legal terms and conditions',
    dueDate: '2024-03-28',
    priority: 'High',
    status: 'To Do',
    assignedTo: 'Marcus Schmidt'
  },
  {
    id: '4',
    title: 'Send welcome package to Yuki',
    description: 'Prepare and send onboarding materials',
    dueDate: '2024-03-22',
    priority: 'Low',
    status: 'Completed',
    assignedTo: 'Yuki Tanaka'
  }
];