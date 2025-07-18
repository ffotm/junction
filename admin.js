import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

export default function(app, db, isAuthenticated) {
    const router = express.Router();

    // Attach DB instance to requests
    router.use((req, res, next) => {
        req.db = db;
        next();
    });

    // Admin-only middleware
    const isAdmin = (req, res, next) => {
        if (req.isAuthenticated() && req.user.role === 'admin') {
            return next();
        }
        res.status(403).send("Access denied. Admins only.");
    };

    // Admin dashboard data route
    router.get("/admin/dashboard/data", isAdmin, async(req, res) => {
        try {
            const statsQuery = `
                SELECT 
                    (SELECT COUNT(*) FROM users WHERE role = 'client') AS clients_count,
                    (SELECT COUNT(*) FROM ponds) AS ponds_count,
                    (SELECT COUNT(*) FROM sensors) AS sensors_count,
                    (SELECT COUNT(*) FROM sensors WHERE status = 'critical') AS critical_status,
                    (SELECT COUNT(*) FROM sensors WHERE status = 'warning') AS warning_status,
                    (SELECT COUNT(*) FROM sensors WHERE status = 'healthy') AS healthy_status,
                    (SELECT COUNT(*) FROM users WHERE role = 'client' AND created_at >= NOW() - INTERVAL '1 month') AS new_users_monthly,
                    (SELECT COUNT(*) FROM ponds WHERE created_at >= NOW() - INTERVAL '1 month') AS new_ponds_monthly,
                    (SELECT COUNT(*) FROM reports WHERE status = 'Pending') AS pending_reports
            `;

            const result = await req.db.query(statsQuery);
            const stats = result.rows[0];

            // Compute percentages
            const totalSensors = stats.sensors_count || 1;
            const criticalPercent = (stats.critical_status / totalSensors) * 100;
            const warningPercent = (stats.warning_status / totalSensors) * 100;
            const healthyPercent = (stats.healthy_status / totalSensors) * 100;

            res.json({
                userCount: stats.clients_count,
                pondCount: stats.ponds_count,
                sensors: {
                    critical: criticalPercent.toFixed(1),
                    warning: warningPercent.toFixed(1),
                    healthy: healthyPercent.toFixed(1),
                    total: stats.sensors_count
                },
                growthMetrics: {
                    newUsersMonthly: stats.new_users_monthly,
                    newPondsMonthly: stats.new_ponds_monthly
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

    // Admin dashboard UI page
    router.get("/admin/dashboard", isAdmin, (req, res) => {
        res.sendFile(path.join(__dirname, "dashboard.html"));
    });

    // Register router in app
    app.use(router);
}