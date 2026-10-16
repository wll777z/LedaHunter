import http from "node:http";
import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { config } from "./config";
import { connectDB } from "./db";
import { authMiddleware } from "./middleware";
import { healthRoutes } from "./routes/health";
import { meRoutes } from "./routes/me";
import { authRoutes } from "./routes/auth";
import { leadsRoutes } from "./routes/leads";
import { searchesRoutes } from "./routes/searches";
import { plansRoutes } from "./routes/plans";

const app: Express = express();

app.use(helmet());
app.use(
  cors({
    origin: config.corsOrigins,
    credentials: true,
  })
);
app.use(express.json({ limit: "100kb" }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api", limiter);

// Health
app.use("/api/health", healthRoutes);

// Public safe endpoints
app.use("/api/auth", authRoutes);
app.use("/api/me", meRoutes);

// Protected
app.use(authMiddleware);
app.use("/api/leads", leadsRoutes);
app.use("/api/searches", searchesRoutes);
app.use("/api/plans", plansRoutes);

// Unknown route
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

app.use((err: any, _req: Request, res: Response) => {
  console.error("Request error:", err);
  const status = err.status ?? 500;
  res.status(status).json({ error: status === 500 ? "Erro interno" : err.message });
});

const server = http.createServer(app);

server.listen(config.port, () => {
  console.log(`LeadHunter AI API http://localhost:${config.port}`);
});

connectDB().catch((err: unknown) => {
  console.error("Failed to start:", err);
  process.exit(1);
});
