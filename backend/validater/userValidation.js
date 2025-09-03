const { z } = require("zod");
const userSchema = z.object({
  username: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must include at least one special character"
    ),
});
module.exports = userSchema;
