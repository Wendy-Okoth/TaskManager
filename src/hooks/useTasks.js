import { useEffect, useState } from 'react';
import { 
  collection, query, where, onSnapshot, addDoc, 
  updateDoc, deleteDoc, doc // ← add these imports
} from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

export function useTasks() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tasks (real‑time)
  useEffect(() => {
    if (!user) {
      setTasks([]);
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
        setTasks(tasksData);
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

  // ✏️ Update Task
  const updateTask = async (taskId, updates) => {
    if (!user) throw new Error('You must be logged in');
    const taskRef = doc(db, 'tasks', taskId);
    await updateDoc(taskRef, updates);
  };

  // 🗑️ Delete Task
  const deleteTask = async (taskId) => {
    if (!user) throw new Error('You must be logged in');
    const taskRef = doc(db, 'tasks', taskId);
    await deleteDoc(taskRef);
  };

  return { tasks, loading, error, addTask, updateTask, deleteTask };
}