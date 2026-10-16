import dotenv from "dotenv";
dotenv.config();

export const config = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: Number(process.env.PORT ?? 4000),
  corsOrigins: (process.env.CORS_ORIGINS ?? "http://localhost:5173").split(","),
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  databaseUrl: process.env.DATABASE_URL,

  googlePlacesApiKey: process.env.GOOGLE_PLACES_API_KEY,

  aiProvider: process.env.AI_PROVIDER,
  aiApiKey: process.env.AI_API_KEY,
  aiModel: process.env.AI_MODEL,

  integrationsDisabled: process.env.INTEGRATIONS_DISABLED === "true",
  jwtSecret: process.env.JWT_SECRET ?? "change-me-in-production",
};
