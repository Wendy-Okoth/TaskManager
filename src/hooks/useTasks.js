import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

export function useTasks() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If no user is logged in, clear tasks and stop loading
    if (!user) {
      setTasks([]);
      setLoading(false);
      return;
    }

    // Build the query: get all tasks where userId equals the current user's UID
    const q = query(
      collection(db, 'tasks'),
      where('userId', '==', user.uid)
    );

    // Subscribe to real‑time updates
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

    // Cleanup subscription on unmount or when user changes
    return unsubscribe;
  }, [user]);

  return { tasks, loading, error };
}