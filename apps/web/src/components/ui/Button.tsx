import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Button组件的属性接口
 * @public
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 按钮的视觉样式变体
   * @defaultValue 'default'
   * @remarks
   * - `default`: 主要按钮样式，蓝色背景
   * - `destructive`: 危险操作按钮，红色背景
   * - `outline`: 边框按钮，透明背景带边框
   * - `secondary`: 次要按钮，灰色背景
   * - `ghost`: 幽灵按钮，悬停时显示背景
   * - `link`: 链接样式按钮，带下划线
   */
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  
  /**
   * 按钮的尺寸大小
   * @defaultValue 'default'
   * @remarks
   * - `default`: 标准尺寸 (h-10 px-4 py-2)
   * - `sm`: 小尺寸 (h-9 px-3)
   * - `lg`: 大尺寸 (h-11 px-8)
   * - `icon`: 图标按钮 (h-10 w-10)
   */
  size?: 'default' | 'sm' | 'lg' | 'icon';
  
  /**
   * 是否显示加载状态
   * @defaultValue false
   * @remarks 当为true时，按钮会显示旋转的加载图标并禁用点击
   */
  loading?: boolean;
}

/**
 * 通用按钮组件
 * 
 * @remarks
 * 这是一个高度可定制的按钮组件，支持多种视觉样式、尺寸和状态。
 * 基于Tailwind CSS构建，提供一致的设计系统。
 * 
 * @example
 * 基本用法:
 * ```tsx
 * <Button onClick={() => console.log('clicked')}>点击我</Button>
 * ```
 * 
 * @example
 * 不同样式的按钮:
 * ```tsx
 * <Button variant="default">主要按钮</Button>
 * <Button variant="destructive">删除按钮</Button>
 * <Button variant="outline">边框按钮</Button>
 * <Button variant="secondary">次要按钮</Button>
 * <Button variant="ghost">幽灵按钮</Button>
 * <Button variant="link">链接按钮</Button>
 * ```
 * 
 * @example
 * 不同尺寸的按钮:
 * ```tsx
 * <Button size="sm">小按钮</Button>
 * <Button size="default">标准按钮</Button>
 * <Button size="lg">大按钮</Button>
 * <Button size="icon"><Icon /></Button>
 * ```
 * 
 * @example
 * 加载状态:
 * ```tsx
 * <Button loading={true}>加载中...</Button>
 * ```
 * 
 * @param props - 按钮组件的属性
 * @returns 渲染的按钮元素
 * 
 * @public
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', loading = false, disabled, children, ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-blue-600 text-white hover:bg-blue-700': variant === 'default',
            'bg-red-600 text-white hover:bg-red-700': variant === 'destructive',
            'border border-gray-300 bg-white hover:bg-gray-50 hover:text-gray-900': variant === 'outline',
            'bg-gray-100 text-gray-900 hover:bg-gray-200': variant === 'secondary',
            'hover:bg-gray-100 hover:text-gray-900': variant === 'ghost',
            'text-blue-600 underline-offset-4 hover:underline': variant === 'link',
          },
          {
            'h-10 px-4 py-2': size === 'default',
            'h-9 rounded-md px-3': size === 'sm',
            'h-11 rounded-md px-8': size === 'lg',
            'h-10 w-10': size === 'icon',
          },
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {children}
      </button>
    );
  }
);

/**
 * 设置组件的显示名称，用于React开发工具调试
 */
Button.displayName = 'Button';

export { Button };