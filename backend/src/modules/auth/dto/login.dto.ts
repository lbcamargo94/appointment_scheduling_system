import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ error: "Email é obrigatório e deve ser uma string" })
    .email("Email deve ser um endereço de email válido"),

  password: z
    .string({ error: "Senha é obrigatória e deve ser uma string" })
    .min(1, "Senha não pode ser vazia")
    .max(100, "Senha deve ter no máximo 100 caracteres")
    .refine(
      (val) => {
        const hasUpperCase = /[A-Z]/.test(val);
        const hasLowerCase = /[a-z]/.test(val);
        const hasNumber = /[0-9]/.test(val);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(val);
        return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
      },
      {
        message:
          "Senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial",
      },
    ),
});

export type LoginDto = z.infer<typeof loginSchema>;
