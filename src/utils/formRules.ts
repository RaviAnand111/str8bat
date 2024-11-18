import { Rule } from "antd/es/form";

export const nameRules: Rule[] = [
  { required: true, message: "Please enter your name" },
];
export const emailRules: Rule[] = [
  { required: true, message: "Please enter your email" },
  { type: "email", message: "Please enter a valid email" },
];

export const passwordRules = [
  {
    required: true,
    message: "Password is required!",
  },
  {
    min: 8,
    message: "Password must be at least 8 characters long.",
  },
  {
    pattern: /[A-Z]/,
    message: "Password must include at least one uppercase letter.",
  },
  {
    pattern: /[a-z]/,
    message: "Password must include at least one lowercase letter.",
  },
  {
    pattern: /[0-9]/,
    message: "Password must include at least one number.",
  },
  {
    pattern: /[!@#$%^&*(),.?":{}|<>]/,
    message: "Password must include at least one special character.",
  },
];
