import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import multer from "multer";
import fs from "fs";
import { report } from "process";

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

export default function(app, db, isAuthenticated, __dirname) {
    const router = express.Router();


    router.use((req, res, next) => {
        req.db = db; // Now req.db.query() will work
        next();
    });
    const isAdmin = (req, res, next) => {
        if (req.isAuthenticated() && req.user.role === 'admin') {
            return next();
        }
        res.status(403).send("Access denied. Admins only.");
    };

    router.get("/admin/dashboard/data", isAdmin, async(req, res) => {
        try {
            const statsQuery = `
            SELECT 
                (SELECT COUNT(*) FROM users WHERE role = 'clients') AS clients_count,
                (SELECT COUNT(*) FROM ponds) AS ponds_count,
(SELECT COUNT(*) FROM sensors) AS sensors_count,
        (SELECT COUNT(*) FROM sensors WHERE status= 'critical') AS critical_status,
        (SELECT COUNT(*) FROM sensors WHERE status = 'warning') AS warning_status,
        (SELECT COUNT(*) FROM sensors WHERE status = 'healthy') AS healthy_status,
        (SELECT COUNT(*) FROM users 
         WHERE role = 'client' 
         AND created_at >= NOW() - INTERVAL '1 month') AS new_users_monthly,
         
        (SELECT COUNT(*) FROM ponds 
         WHERE created_at >= NOW() - INTERVAL '1 month') AS new_ponds_monthly

                (SELECT COUNT(*) FROM reports WHERE status = 'Pending') AS pending_reports

        `;

            const statsResult = await req.db.query(statsQuery);
            const stats = statsResult.rows[0];

            res.json({
                userCount: stats.user_count,
                pondCount: stats.pond_count,
                activeSensors: stats.active_sensors,
                growthMetrics: {
                    newUsersMonthly: stats.new_users_monthly,
                    newPondsMonthly: stats.new_ponds_monthly
                },
                sensors: {
                    critical: criticalPercent.toFixed(1),
                    warning: warningPercent.toFixed(1),
                    healthy: healthyPercent.toFixed(1),
                    total: stats.total_reports
                },
                reports: {
                    pending: stats.pending_reports
                }
            });
        } catch (err) {
            console.error("Error fetching dashboard stats:", err);
            res.status(500).json({ error: "Failed to fetch dashboard statistics" });
        }
    });
    router.get("/admin/dashboard", isAdmin, (req, res) => {
        res.sendFile(path.join(__dirname, "dashboard.html"));
    });
}