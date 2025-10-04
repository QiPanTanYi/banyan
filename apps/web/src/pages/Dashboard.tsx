import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">仪表板</h1>
        <p className="mt-2 text-gray-600">欢迎使用榕树ERP系统</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>销售概览</CardTitle>
            <CardDescription>本月销售数据统计</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">¥125,430</div>
            <p className="text-sm text-gray-500 mt-1">较上月增长 12%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>订单数量</CardTitle>
            <CardDescription>本月订单统计</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">1,234</div>
            <p className="text-sm text-gray-500 mt-1">较上月增长 8%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>库存状态</CardTitle>
            <CardDescription>当前库存概览</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">567</div>
            <p className="text-sm text-gray-500 mt-1">种商品在库</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>快速操作</CardTitle>
            <CardDescription>常用功能入口</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <a href="/profile" className="block text-blue-600 hover:text-blue-800 text-sm">
                个人中心
              </a>
              <a href="/products" className="block text-blue-600 hover:text-blue-800 text-sm">
                商品管理
              </a>
              <a href="/orders" className="block text-blue-600 hover:text-blue-800 text-sm">
                订单管理
              </a>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>最近订单</CardTitle>
            <CardDescription>最新的订单信息</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">订单 #{item}001</p>
                    <p className="text-sm text-gray-500">客户: 张三{item}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">¥1,{item}99</p>
                    <p className="text-sm text-gray-500">待处理</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>库存预警</CardTitle>
            <CardDescription>需要关注的库存商品</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div>
                    <p className="font-medium">商品 A{item}</p>
                    <p className="text-sm text-gray-500">SKU: A{item}001</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-red-600">{item * 5} 件</p>
                    <p className="text-sm text-red-500">库存不足</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};