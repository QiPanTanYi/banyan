import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Loading } from '../components/ui/Loading';
import { useAuthStore } from '../stores/authStore';
import { authService } from '../services/authService';
import { User } from '../types/auth';

export const Profile: React.FC = () => {
  const { user: authUser, updateUser } = useAuthStore();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: ''
  });

  // 获取用户详细信息
  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      console.debug('[Profile] 开始获取用户资料');
      
      const userProfile = await authService.getProfile();
      console.debug('[Profile] 用户资料获取成功:', userProfile);
      
      // 验证用户数据的完整性
      if (!userProfile) {
        throw new Error('用户资料为空');
      }
      
      setUser(userProfile);
      setFormData({
        username: userProfile.username || '',
        email: userProfile.email || '',
        phone: userProfile.phone || ''
      });
    } catch (err: any) {
      console.error('[Profile] 获取用户信息失败:', err);
      const errorMessage = err?.message || '获取用户信息失败，请稍后重试';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      // 这里可以添加更新用户信息的API调用
      // await authService.updateProfile(formData);
      
      // 暂时只更新本地状态
      if (user) {
        const updatedUser = { ...user, ...formData };
        setUser(updatedUser);
        updateUser(updatedUser);
      }
      
      setEditing(false);
    } catch (err) {
      console.error('更新用户信息失败:', err);
      setError('更新用户信息失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        phone: user.phone || ''
      });
    }
    setEditing(false);
  };

  if (loading && !user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loading />
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">个人中心</h1>
          <p className="mt-2 text-gray-600">管理您的个人信息</p>
        </div>
        <Card>
          <CardContent className="text-center py-8">
            <div className="text-red-500 mb-4">
              <svg className="h-12 w-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={fetchUserProfile}>重试</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">个人中心</h1>
        <p className="mt-2 text-gray-600">管理您的个人信息</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 用户头像和基本信息 */}
        <Card>
          <CardHeader>
            <CardTitle>用户头像</CardTitle>
            <CardDescription>您的个人头像</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {user?.username?.charAt(0)?.toUpperCase() || authUser?.username?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
            <h3 className="font-semibold text-lg">{user?.username || authUser?.username}</h3>
            <p className="text-gray-500 text-sm">{user?.email || authUser?.email}</p>
            <Button variant="outline" size="sm" className="mt-3">
              更换头像
            </Button>
          </CardContent>
        </Card>

        {/* 个人信息 */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>个人信息</CardTitle>
              <CardDescription>管理您的账户信息</CardDescription>
            </div>
            <div className="flex space-x-2">
              {editing ? (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCancel}
                    disabled={loading}
                  >
                    取消
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSave}
                    loading={loading}
                    disabled={loading}
                  >
                    保存
                  </Button>
                </>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditing(true)}
                >
                  编辑
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <div className="flex">
                  <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="ml-3">
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  label="用户名"
                  type="text"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  disabled={!editing}
                  placeholder="请输入用户名"
                />
              </div>
              <div>
                <Input
                  label="邮箱"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  disabled={!editing}
                  placeholder="请输入邮箱"
                />
              </div>
              <div>
                <Input
                  label="手机号码"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  disabled={!editing}
                  placeholder="请输入手机号码"
                />
              </div>
              <div>
                <Input
                  label="用户ID"
                  type="text"
                  value={user?.id?.toString() || authUser?.id?.toString() || ''}
                  disabled={true}
                  placeholder="系统生成"
                />
              </div>
            </div>

            {user?.created_at && (
              <div className="pt-4 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">注册时间：</span>
                    {new Date(user.created_at).toLocaleString('zh-CN')}
                  </div>
                  {user.last_login && (
                    <div>
                      <span className="font-medium">最后登录：</span>
                      {new Date(user.last_login).toLocaleString('zh-CN')}
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* 账户统计 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>账户状态</CardTitle>
            <CardDescription>当前账户状态</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-green-600 font-medium">正常</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>用户角色</CardTitle>
            <CardDescription>您的系统角色</CardDescription>
          </CardHeader>
          <CardContent>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {authUser?.role || '普通用户'}
            </span>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>安全设置</CardTitle>
            <CardDescription>账户安全管理</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" size="sm" className="w-full">
              修改密码
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};