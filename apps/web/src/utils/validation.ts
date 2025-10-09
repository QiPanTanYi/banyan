/**
 * 表单验证工具函数模块
 * 
 * @remarks
 * 提供完整的表单验证解决方案，包括字段验证、表单验证、实时验证等功能。
 * 支持常见的验证规则如必填、长度限制、正则匹配和自定义验证。
 * 
 * @packageDocumentation
 */

/**
 * 单个字段的验证规则接口
 * 
 * @public
 */
export interface ValidationRule {
  /**
   * 是否为必填字段
   * @defaultValue false
   */
  required?: boolean;
  
  /**
   * 最小字符长度
   * @remarks 仅在字段有值时进行验证
   */
  minLength?: number;
  
  /**
   * 最大字符长度
   * @remarks 仅在字段有值时进行验证
   */
  maxLength?: number;
  
  /**
   * 正则表达式验证模式
   * @remarks 仅在字段有值时进行验证
   */
  pattern?: RegExp;
  
  /**
   * 自定义验证函数
   * @param value - 当前字段值
   * @param formData - 完整表单数据（可选，用于跨字段验证）
   * @returns 验证错误信息，无错误时返回null
   */
  custom?: (value: string, formData?: Record<string, any>) => string | null;
}

/**
 * 表单验证规则集合接口
 * 
 * @remarks
 * 键为字段名，值为对应的验证规则
 * 
 * @public
 */
export interface ValidationRules {
  [key: string]: ValidationRule;
}

/**
 * 验证错误信息集合接口
 * 
 * @remarks
 * 键为字段名，值为对应的错误信息
 * 
 * @public
 */
export interface ValidationErrors {
  [key: string]: string;
}

/**
 * 邮箱地址验证正则表达式
 * 
 * @remarks
 * 验证基本的邮箱格式：用户名@域名.后缀
 * 不允许空格和多个@符号
 * 
 * @example
 * ```ts
 * EMAIL_REGEX.test('user@example.com') // true
 * EMAIL_REGEX.test('invalid.email') // false
 * ```
 * 
 * @public
 */
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * 密码强度验证正则表达式
 * 
 * @remarks
 * 要求密码至少包含一个字母和一个数字，长度至少6位。
 * 允许的特殊字符：@$!%*#?&
 * 
 * @example
 * ```ts
 * PASSWORD_STRENGTH_REGEX.test('abc123') // true
 * PASSWORD_STRENGTH_REGEX.test('123456') // false (缺少字母)
 * PASSWORD_STRENGTH_REGEX.test('abcdef') // false (缺少数字)
 * ```
 * 
 * @public
 */
export const PASSWORD_STRENGTH_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/;

/**
 * 用户名验证正则表达式
 * 
 * @remarks
 * 用户名只能包含字母、数字和下划线，长度3-20位
 * 
 * @example
 * ```ts
 * USERNAME_REGEX.test('user_123') // true
 * USERNAME_REGEX.test('us') // false (长度不足)
 * USERNAME_REGEX.test('user-name') // false (包含连字符)
 * ```
 * 
 * @public
 */
export const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,20}$/;

/**
 * 验证单个字段值
 * 
 * @remarks
 * 按照指定的验证规则验证单个字段的值。
 * 验证顺序：必填 → 长度 → 正则 → 自定义验证
 * 
 * @example
 * ```ts
 * const rule: ValidationRule = {
 *   required: true,
 *   minLength: 3,
 *   pattern: /^[a-zA-Z]+$/
 * };
 * 
 * validateField('', rule); // '此字段为必填项'
 * validateField('ab', rule); // '最少需要3个字符'
 * validateField('123', rule); // '格式不正确'
 * validateField('abc', rule); // null (验证通过)
 * ```
 * 
 * @param value - 要验证的字段值
 * @param rule - 验证规则
 * @returns 验证错误信息，验证通过时返回null
 * 
 * @public
 */
export const validateField = (value: string, rule: ValidationRule): string | null => {
  // 必填验证
  if (rule.required && !value.trim()) {
    return '此字段为必填项';
  }

  // 如果字段为空且不是必填，跳过其他验证
  if (!value.trim() && !rule.required) {
    return null;
  }

  // 最小长度验证
  if (rule.minLength && value.length < rule.minLength) {
    return `最少需要${rule.minLength}个字符`;
  }

  // 最大长度验证
  if (rule.maxLength && value.length > rule.maxLength) {
    return `最多允许${rule.maxLength}个字符`;
  }

  // 正则验证
  if (rule.pattern && !rule.pattern.test(value)) {
    return '格式不正确';
  }

  // 自定义验证
  if (rule.custom) {
    return rule.custom(value);
  }

  return null;
};

/**
 * 验证整个表单数据
 * 
 * @remarks
 * 根据验证规则验证整个表单的所有字段。
 * 对于需要跨字段验证的情况（如确认密码），会传递完整的表单数据。
 * 
 * @example
 * ```ts
 * const formData = {
 *   username: 'john',
 *   email: 'john@example.com',
 *   password: 'abc123',
 *   confirmPassword: 'abc123'
 * };
 * 
 * const rules = {
 *   username: { required: true, minLength: 3 },
 *   email: { required: true, pattern: EMAIL_REGEX },
 *   password: { required: true, minLength: 6 },
 *   confirmPassword: {
 *     required: true,
 *     custom: (value, data) => value !== data?.password ? '密码不一致' : null
 *   }
 * };
 * 
 * const errors = validateForm(formData, rules);
 * // errors: {} (无错误) 或 { fieldName: 'error message' }
 * ```
 * 
 * @param data - 表单数据对象
 * @param rules - 验证规则集合
 * @returns 验证错误信息对象，无错误时返回空对象
 * 
 * @public
 */
export const validateForm = (data: Record<string, any>, rules: ValidationRules): ValidationErrors => {
  const errors: ValidationErrors = {};

  Object.keys(rules).forEach(field => {
    const value = data[field] || '';
    const rule = rules[field];
    
    // 对于有自定义验证且需要表单数据的字段（如确认密码）
    if (rule.custom && field === 'confirmPassword') {
      const error = rule.custom(value, data);
      if (error) {
        errors[field] = error;
      }
    } else {
      const error = validateField(value, rule);
      if (error) {
        errors[field] = error;
      }
    }
  });

  return errors;
};

/**
 * 登录表单的预定义验证规则
 * 
 * @remarks
 * 包含用户名/邮箱和密码的验证规则。
 * 用户名字段支持用户名或邮箱格式。
 * 
 * @example
 * ```ts
 * const loginData = {
 *   username: 'user@example.com', // 或 'username123'
 *   password: 'mypassword'
 * };
 * 
 * const errors = validateForm(loginData, loginValidationRules);
 * ```
 * 
 * @public
 */
export const loginValidationRules: ValidationRules = {
  username: {
    required: true,
    minLength: 3,
    custom: (value: string) => {
      if (value.includes('@')) {
        // 邮箱格式验证
        if (!EMAIL_REGEX.test(value)) {
          return '请输入有效的邮箱地址';
        }
      } else {
        // 用户名格式验证
        if (!USERNAME_REGEX.test(value)) {
          return '用户名只能包含字母、数字和下划线，长度3-20位';
        }
      }
      return null;
    }
  },
  password: {
    required: true,
    minLength: 6,
    maxLength: 50
  }
};

/**
 * 注册表单的预定义验证规则
 * 
 * @remarks
 * 包含用户名、邮箱、密码和确认密码的完整验证规则。
 * 密码要求包含字母和数字，确认密码必须与密码一致。
 * 
 * @example
 * ```ts
 * const registerData = {
 *   username: 'john_doe',
 *   email: 'john@example.com',
 *   password: 'abc123',
 *   confirmPassword: 'abc123'
 * };
 * 
 * const errors = validateForm(registerData, registerValidationRules);
 * ```
 * 
 * @public
 */
export const registerValidationRules: ValidationRules = {
  username: {
    required: true,
    minLength: 3,
    maxLength: 20,
    pattern: USERNAME_REGEX,
    custom: (value: string) => {
      if (!USERNAME_REGEX.test(value)) {
        return '用户名只能包含字母、数字和下划线，长度3-20位';
      }
      return null;
    }
  },
  email: {
    required: true,
    pattern: EMAIL_REGEX,
    custom: (value: string) => {
      if (!EMAIL_REGEX.test(value)) {
        return '请输入有效的邮箱地址';
      }
      return null;
    }
  },
  password: {
    required: true,
    minLength: 6,
    maxLength: 50,
    custom: (value: string) => {
      if (!PASSWORD_STRENGTH_REGEX.test(value)) {
        return '密码必须包含至少一个字母和一个数字，长度6-50位';
      }
      return null;
    }
  },
  confirmPassword: {
    required: true,
    custom: (value: string, formData?: Record<string, any>) => {
      if (formData && value !== formData.password) {
        return '两次输入的密码不一致';
      }
      return null;
    }
  }
};

/**
 * 实时字段验证函数
 * 
 * @remarks
 * 用于在用户输入时提供即时的验证反馈。
 * 特别处理需要跨字段验证的情况（如确认密码）。
 * 
 * @example
 * ```ts
 * // 在React组件中使用
 * const handleInputChange = (field: string, value: string) => {
 *   const error = validateFieldRealtime(field, value, registerValidationRules, formData);
 *   setFieldError(field, error);
 * };
 * 
 * // 确认密码的实时验证
 * const confirmPasswordError = validateFieldRealtime(
 *   'confirmPassword',
 *   'abc123',
 *   registerValidationRules,
 *   { password: 'abc123' }
 * ); // null (验证通过)
 * ```
 * 
 * @param field - 字段名
 * @param value - 字段值
 * @param rules - 验证规则集合
 * @param formData - 完整表单数据（用于跨字段验证）
 * @returns 验证错误信息，验证通过时返回null
 * 
 * @public
 */
export const validateFieldRealtime = (field: string, value: string, rules: ValidationRules, formData?: Record<string, any>): string | null => {
  const rule = rules[field];
  if (!rule) return null;

  // 对于确认密码字段，需要传入整个表单数据
  if (field === 'confirmPassword' && rule.custom) {
    return rule.custom(value, formData);
  }

  return validateField(value, rule);
};