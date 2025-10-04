import React, { useEffect, useRef } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { Loading } from '../ui/Loading';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading, checkAuth } = useAuthStore();
  const location = useLocation();
  const hasCheckedAuth = useRef(false);
  const lastPath = useRef(location.pathname);

  useEffect(() => {
    // 只在路径变化或首次加载时检查认证状态
    if (location.pathname !== lastPath.current || !hasCheckedAuth.current) {
      console.debug('🛡️ ProtectedRoute: 检查认证状态', { 
        path: location.pathname, 
        isAuthenticated, 
        loading,
        hasCheckedAuth: hasCheckedAuth.current
      });
      
      lastPath.current = location.pathname;
      hasCheckedAuth.current = true;
      
      // 只有在未认证时才执行认证检查
      if (!isAuthenticated && !loading) {
        checkAuth();
      }
    }
  }, [location.pathname, checkAuth]);

  // 如果正在加载，显示加载状态
  if (loading) {
    console.debug('🛡️ ProtectedRoute: 显示加载状态');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  // 如果未认证，重定向到登录页面，并保存当前路径
  if (!isAuthenticated) {
    console.debug('🛡️ ProtectedRoute: 未认证，重定向到登录页', { 
      from: location.pathname 
    });
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 如果已认证，渲染子组件
  console.debug('🛡️ ProtectedRoute: 已认证，渲染受保护内容');
  return <>{children}</>;
};