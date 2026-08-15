import { useEffect, useState, useMemo } from 'react';
import { 
  collection, query, where, onSnapshot, addDoc, 
  updateDoc, deleteDoc, doc 
} from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

/**
 * Custom hook for task management
 * - Fetches tasks in real-time from Firestore
 * - Provides CRUD operations (add, update, delete)
 * - Returns tasks with optional filtering and sorting applied
 */
export function useTasks() {
  const { user } = useAuth();
  const [rawTasks, setRawTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortBy, setSortBy] = useState('dueDate');
  const [sortOrder, setSortOrder] = useState('asc');

  // Fetch tasks from Firestore (real-time)
  useEffect(() => {
    if (!user) {
      setRawTasks([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'tasks'),
      where('userId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const tasksData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRawTasks(tasksData);
        setLoading(false);
        setError(null);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [user]);

  // Filter and sort tasks using useMemo for performance
  const tasks = useMemo(() => {
    let result = [...rawTasks];

    // Filter by status
    if (filterStatus !== 'All') {
      result = result.filter((task) => task.status === filterStatus);
    }

    // Sort tasks
    result.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      // Handle date fields
      if (sortBy === 'dueDate' || sortBy === 'createdAt') {
        if (!aValue && !bValue) return 0;
        if (!aValue) return 1;
        if (!bValue) return -1;
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      // Handle title (case-insensitive)
      if (sortBy === 'title') {
        aValue = aValue?.toLowerCase() || '';
        bValue = bValue?.toLowerCase() || '';
      }

      // Compare values
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [rawTasks, filterStatus, sortBy, sortOrder]);

  // ➕ Add Task
  const addTask = async (taskData) => {
    if (!user) throw new Error('You must be logged in to add a task');

    const newTask = {
      title: taskData.title.trim(),
      description: taskData.description?.trim() || '',
      status: taskData.status || 'To Do',
      dueDate: taskData.dueDate || null,
      userId: user.uid,
      createdAt: new Date().toISOString(),
    };

    await addDoc(collection(db, 'tasks'), newTask);
  };

  //  Update Task
  const updateTask = async (taskId, updates) => {
    if (!user) throw new Error('You must be logged in');
    const taskRef = doc(db, 'tasks', taskId);
    await updateDoc(taskRef, updates);
  };

  // Delete Task
  const deleteTask = async (taskId) => {
    if (!user) throw new Error('You must be logged in');
    const taskRef = doc(db, 'tasks', taskId);
    await deleteDoc(taskRef);
  };

  return {
    tasks,
    loading,
    error,
    addTask,
    updateTask,
    deleteTask,
    // Filtering & sorting controls
    filterStatus,
    setFilterStatus,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
  };
}