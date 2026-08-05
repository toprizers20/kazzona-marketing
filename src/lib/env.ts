// Environment variable validation at startup
// Validates required environment variables before the app starts

const requiredEnvVars = [
  "DATABASE_URL",
  "JWT_SECRET",
] as const;

const optionalEnvVars = [
  "NEXT_PUBLIC_SITE_URL",
  "NEXT_PUBLIC_GA_ID",
  "NEXT_PUBLIC_GTM_ID",
  "NEXT_PUBLIC_GSC_VERIFICATION",
  "ADMIN_EMAIL",
  "ADMIN_PASSWORD",
  "CRON_SECRET",
] as const;

type EnvVar = (typeof requiredEnvVars)[number] | (typeof optionalEnvVars)[number];

export function validateEnv(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      errors.push(`Missing required environment variable: ${envVar}`);
    }
  }

  // Validate DATABASE_URL format
  if (process.env.DATABASE_URL) {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl.startsWith("mysql://") && !dbUrl.startsWith("postgresql://")) {
      errors.push("DATABASE_URL must start with mysql:// or postgresql://");
    }
  }

  // Validate JWT_SECRET length
  if (process.env.JWT_SECRET && process.env.JWT_SECRET.length < 32) {
    errors.push("JWT_SECRET must be at least 32 characters long");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

// Run validation on import
const result = validateEnv();
if (!result.valid) {
  console.error("❌ Environment validation failed:");
  result.errors.forEach((err) => console.error(`  - ${err}`));
  // Don't exit in development, just warn
  if (process.env.NODE_ENV === "production") {
    process.exit(1);
  }
}
