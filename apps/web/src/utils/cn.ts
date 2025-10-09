import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 智能CSS类名合并工具函数
 * 
 * @remarks
 * 这个函数结合了clsx和tailwind-merge的功能，用于智能地合并CSS类名。
 * 它不仅能处理条件类名，还能解决Tailwind CSS类名冲突问题。
 * 
 * 功能特点：
 * - 支持条件类名（通过clsx）
 * - 自动解决Tailwind CSS类名冲突（通过tailwind-merge）
 * - 移除重复的类名
 * - 确保后面的类名覆盖前面的冲突类名
 * 
 * @example
 * 基本用法:
 * ```ts
 * cn('px-2 py-1', 'px-4') // 结果: 'py-1 px-4'
 * ```
 * 
 * @example
 * 条件类名:
 * ```ts
 * cn('base-class', {
 *   'active-class': isActive,
 *   'disabled-class': isDisabled
 * })
 * ```
 * 
 * @example
 * 在React组件中使用:
 * ```tsx
 * <div className={cn(
 *   'rounded-lg border',
 *   'bg-white text-gray-900',
 *   {
 *     'bg-blue-50 border-blue-200': variant === 'primary',
 *     'bg-red-50 border-red-200': variant === 'danger'
 *   },
 *   className
 * )}>
 *   内容
 * </div>
 * ```
 * 
 * @param inputs - 要合并的CSS类名，支持字符串、对象、数组等多种格式
 * @returns 合并后的CSS类名字符串
 * 
 * @public
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}