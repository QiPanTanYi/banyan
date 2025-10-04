// 表单验证工具函数

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string, formData?: Record<string, any>) => string | null;
}

export interface ValidationRules {
  [key: string]: ValidationRule;
}

export interface ValidationErrors {
  [key: string]: string;
}

// 邮箱验证正则
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 密码强度验证正则（至少包含字母和数字）
export const PASSWORD_STRENGTH_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/;

// 用户名验证正则（字母、数字、下划线，3-20位）
export const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,20}$/;

/**
 * 验证单个字段
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
 * 验证整个表单
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
 * 登录表单验证规则
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
 * 注册表单验证规则
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
 * 实时验证（用于输入时的即时反馈）
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