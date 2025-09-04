'use client';

import { useEffect, useState, useCallback, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import api from '@/lib/api';
import { Todo } from '@/types/todo';
import { TodoForm } from '@/components/TodoForm';
import { TodoList } from '@/components/TodoList';
import { LoginForm } from '@/components/LoginForm';

function HomeContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const router = useRouter();
  const [redirectTo, setRedirectTo] = useState('/');

  const checkAuth = useCallback(async () => {
    try {
      const response = await api.get('/auth/me');
      setUser(response.data.user);
      
      // Only redirect if we're coming from login and have a destination
      if (redirectTo && redirectTo !== '/login') {
        router.push(redirectTo);
      }
      return true;
    } catch (error) {
      console.error('Authentication check failed:', error);
      // If not authenticated, redirect to login
      const loginUrl = new URL('/login', window.location.origin);
      loginUrl.searchParams.set('from', redirectTo);
      window.location.href = loginUrl.toString();
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [redirectTo, router]);

  useEffect(() => {
    // Get search params client-side
    const params = new URLSearchParams(window.location.search);
    const from = params.get('from') || '/';
    setRedirectTo(from);
    checkAuth();
  }, [checkAuth]);

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear any client-side state
      setUser(null);
      setTodos([]);
      // Force a full page reload to clear all state
      window.location.href = '/login';
    }
  };

  const fetchTodos = useCallback(async () => {
    if (!user) return;
    
    try {
      const response = await api.get('/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
      // If we get an auth error, force a re-check of auth status
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        checkAuth();
      }
    }
  }, [user, checkAuth]);

  // Only fetch todos when user is authenticated and todos array is empty
  useEffect(() => {
    if (user && todos.length === 0) {
      fetchTodos();
    }
  }, [user, todos.length, fetchTodos]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">🎯 Todo App</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>
      <TodoForm onAdd={fetchTodos} />
      <TodoList todos={todos} onTodoChange={fetchTodos} />
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}