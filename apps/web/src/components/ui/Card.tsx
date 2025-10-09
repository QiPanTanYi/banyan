import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Card组件的属性接口
 * @public
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 卡片内容
   * @remarks 可以包含任何React节点，通常包含CardHeader、CardContent、CardFooter等子组件
   */
  children: React.ReactNode;
}

/**
 * 卡片容器组件
 * 
 * @remarks
 * 提供一个带有圆角、边框和阴影的容器，用于组织和展示相关内容。
 * 通常与CardHeader、CardContent、CardFooter等子组件配合使用。
 * 
 * @example
 * 基本用法:
 * ```tsx
 * <Card>
 *   <CardHeader>
 *     <CardTitle>卡片标题</CardTitle>
 *     <CardDescription>卡片描述</CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     <p>卡片内容</p>
 *   </CardContent>
 *   <CardFooter>
 *     <Button>操作按钮</Button>
 *   </CardFooter>
 * </Card>
 * ```
 * 
 * @param props - 卡片组件的属性
 * @returns 渲染的卡片容器元素
 * 
 * @public
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-lg border border-gray-200 bg-white text-gray-950 shadow-sm',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
Card.displayName = 'Card';

/**
 * 卡片头部组件
 * 
 * @remarks
 * 用于显示卡片的标题和描述信息，通常包含CardTitle和CardDescription组件。
 * 提供垂直布局和适当的内边距。
 * 
 * @example
 * ```tsx
 * <CardHeader>
 *   <CardTitle>用户信息</CardTitle>
 *   <CardDescription>查看和编辑用户详细信息</CardDescription>
 * </CardHeader>
 * ```
 * 
 * @param props - 标准的HTML div属性
 * @returns 渲染的卡片头部元素
 * 
 * @public
 */
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

/**
 * 卡片标题组件
 * 
 * @remarks
 * 显示卡片的主标题，使用h3标签和大号字体。
 * 通常放置在CardHeader组件内部。
 * 
 * @example
 * ```tsx
 * <CardTitle>产品详情</CardTitle>
 * ```
 * 
 * @param props - 标准的HTML heading属性
 * @returns 渲染的卡片标题元素
 * 
 * @public
 */
const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-2xl font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

/**
 * 卡片描述组件
 * 
 * @remarks
 * 显示卡片的描述文本，使用较小的字体和灰色文字。
 * 通常放置在CardTitle下方，提供额外的上下文信息。
 * 
 * @example
 * ```tsx
 * <CardDescription>这里显示产品的详细描述信息</CardDescription>
 * ```
 * 
 * @param props - 标准的HTML paragraph属性
 * @returns 渲染的卡片描述元素
 * 
 * @public
 */
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-gray-500', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

/**
 * 卡片内容组件
 * 
 * @remarks
 * 用于显示卡片的主要内容区域，提供适当的内边距。
 * 顶部内边距为0，以便与CardHeader无缝连接。
 * 
 * @example
 * ```tsx
 * <CardContent>
 *   <div className="space-y-4">
 *     <p>这里是卡片的主要内容</p>
 *     <ul>
 *       <li>列表项1</li>
 *       <li>列表项2</li>
 *     </ul>
 *   </div>
 * </CardContent>
 * ```
 * 
 * @param props - 标准的HTML div属性
 * @returns 渲染的卡片内容元素
 * 
 * @public
 */
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

/**
 * 卡片底部组件
 * 
 * @remarks
 * 用于显示卡片底部的操作按钮或其他元素。
 * 提供水平布局和居中对齐，顶部内边距为0。
 * 
 * @example
 * ```tsx
 * <CardFooter>
 *   <Button variant="outline">取消</Button>
 *   <Button>确认</Button>
 * </CardFooter>
 * ```
 * 
 * @param props - 标准的HTML div属性
 * @returns 渲染的卡片底部元素
 * 
 * @public
 */
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };