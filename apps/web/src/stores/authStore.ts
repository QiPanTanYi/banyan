import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthState, LoginRequest, RegisterRequest } from '../types/auth';
import { authService } from '../services/authService';

interface AuthStore extends AuthState {
  // Actions
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => void;
  setUser: (user: AuthState['user']) => void;
  updateUser: (user: AuthState['user']) => void;
  setToken: (token: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  refreshToken: () => Promise<void>;
  checkAuth: () => Promise<void>;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial state
      isAuthenticated: false,
      user: null,
      token: null,
      loading: false,
      error: null,

      // Actions
      login: async (credentials: LoginRequest) => {
        set({ loading: true, error: null });
        try {
          const response = await authService.login(credentials);
          console.debug('[AuthStore] Login response:', response);
          
          // 验证响应数据的基本结构
          if (response && response.access_token && response.user && response.user.id) {
            set({
              isAuthenticated: true,
              user: response.user,
              token: response.access_token,
              loading: false,
              error: null
            });
            console.debug('[AuthStore] Login successful, user:', response.user);
          } else {
            console.error('[AuthStore] 登录响应数据不完整:', response);
            throw new Error('登录响应数据格式错误：缺少必要字段');
          }
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || error.message || '登录失败';
          set({
            loading: false,
            error: errorMessage,
            isAuthenticated: false,
            user: null,
            token: null
          });
          throw error;
        }
      },

      register: async (userData: RegisterRequest) => {
        set({ loading: true, error: null });
        try {
          await authService.register(userData);
          set({ loading: false, error: null });
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || error.message || '注册失败';
          set({
            loading: false,
            error: errorMessage
          });
          throw error;
        }
      },

      logout: () => {
        const { token } = get();
        
        // 调用后端登出API（可选）
        if (token) {
          authService.logout().catch(console.error);
        }
        
        set({
          isAuthenticated: false,
          user: null,
          token: null,
          error: null
        });
        
        // 清除本地存储
        localStorage.removeItem('auth-storage');
      },

      setUser: (user) => set({ user }),
      
      updateUser: (user) => set({ user }),
      
      setToken: (token) => set({ token, isAuthenticated: !!token }),
      
      setLoading: (loading) => set({ loading }),
      
      setError: (error) => set({ error }),
      
      clearError: () => set({ error: null }),

      refreshToken: async () => {
        const { token } = get();
        if (!token) {
          get().logout();
          return;
        }

        try {
          set({ loading: true });
          const response = await authService.refreshToken({ refresh_token: token });
          set({ 
            token: response.access_token, 
            loading: false,
            isAuthenticated: true
          });
        } catch (error) {
          console.error('Token refresh failed:', error);
          set({ loading: false });
          get().logout();
        }
      },

      checkAuth: async () => {
        const { token, isAuthenticated, loading } = get();
        
        // 如果没有token，直接登出
        if (!token) {
          get().logout();
          return;
        }

        // 如果已经在加载中，避免重复请求
        if (loading) {
          return;
        }

        // 如果已经认证且有用户信息，跳过检查
        if (isAuthenticated && get().user) {
          return;
        }

        try {
          set({ loading: true });
          const user = await authService.getProfile();
          set({ 
            user,
            loading: false,
            isAuthenticated: true
          });
        } catch (error: any) {
          console.error('Auth check failed:', error);
          set({ loading: false });
          
          // 如果是401错误，尝试刷新token
          if (error.response?.status === 401) {
            try {
              await get().refreshToken();
            } catch (refreshError) {
              get().logout();
            }
          } else {
            get().logout();
          }
        }
      },

      initializeAuth: async () => {
        const { token } = get();
        if (token) {
          await get().checkAuth();
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        token: state.token
      }),
      onRehydrateStorage: () => (state) => {
        // 在应用启动时检查认证状态
        if (state?.token) {
          state.initializeAuth?.();
        }
      }
    }
  )
);