import { Router } from "express";
import { config } from "../config";

export const healthRoutes = Router();

healthRoutes.get("/", async (_req, res) => {
  const integrations = {
    googlePlaces: config.googlePlacesApiKey ? "configured" : "pending",
    ai: config.aiApiKey ? "configured" : "pending",
    supabase: config.supabaseUrl ? "configured" : "pending",
  };
  res.json({
    status: "ok",
    integrations,
    config: {
      nodeEnv: config.nodeEnv,
      port: config.port,
      integrationsDisabled: config.integrationsDisabled,
    },
  });
});
