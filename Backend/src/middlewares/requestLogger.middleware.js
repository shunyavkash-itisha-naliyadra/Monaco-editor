import fs from "fs";
import path from "path";

const logFilePath = path.join(process.cwd(), "app.log");
const requestLogger = (options = {}) => {
  const {
    logIncoming = true,
    logStatusCode = true,
    logDuration = true,
    logMethod = true,
    logPath = true,
    trackLogInLogFile = true,
    logIP = false,
    logUserAgent = false,
  } = options;

  return (req, res, next) => {
    const start = Date.now();

    // Function to determine the IP address
    const getClientIP = (req) => {
      const forwarded = req.headers["x-forwarded-for"];
      return forwarded
        ? forwarded.split(",")[0].trim()
        : req.connection?.remoteAddress ||
            req.socket?.remoteAddress ||
            "Unknown IP";
    };

    // Log incoming request details
    if (logIncoming) {
      let logMessage = "";

      if (logMethod) {
        logMessage += `${getMethodColor(req.method)}${req.method}\x1b[0m `;
      }

      if (logPath) {
        logMessage += `${getPathColor(req.originalUrl)}${
          req.originalUrl
        }\x1b[0m `;
      }

      if (logIP) {
        logMessage += `from ${getClientIP(req)} `;
      }

      if (logUserAgent) {
        logMessage += `(User-Agent: ${req.headers["user-agent"]}) `;
      }

      logMessage += "- Incoming request";
      console.log(logMessage);

      if (trackLogInLogFile) {
        const fileLogMsg = `${req.method} ${req.originalUrl} - Incoming request\n`;
        fs.appendFile(logFilePath, fileLogMsg, (err) => {
          if (err) {
            console.error(`[ERROR] Failed to write to log file:`, err);
          }
        });
      }
    }

    // Log status and duration on response finish
    res.on("finish", () => {
      const duration = Date.now() - start;
      let logMessage = "";

      if (logMethod) {
        logMessage += `${getMethodColor(req.method)}${req.method}\x1b[0m `;
      }

      if (logPath) {
        logMessage += `${getPathColor(req.originalUrl)}${
          req.originalUrl
        }\x1b[0m `;
      }

      if (logStatusCode) {
        const statusColor = getStatusColor(res.statusCode);
        logMessage += `- Status: ${statusColor}${res.statusCode}\x1b[0m `;
      }

      if (logDuration) {
        logMessage += `- Took: \x1b[33m${(duration / 1000).toFixed(
          3
        )} seconds\x1b[0m `;
      }

      console.log(logMessage);

      if (trackLogInLogFile) {
        const fileLogMsg = `${req.method} ${req.originalUrl} - Status: ${
          res.statusCode
        } - Took: ${(duration / 1000).toFixed(3)} seconds\n`;
        fs.appendFile(logFilePath, fileLogMsg, (err) => {
          if (err) {
            console.error(`[ERROR] Failed to write to log file:`, err);
          }
        });
      }
    });

    next();
  };
};

// Helper: Assign color for HTTP methods
function getMethodColor(method) {
  switch (method) {
    case "GET":
      return "\x1b[38;2;128;255;128m";
    case "HEAD":
      return "\x1b[38;2;128;255;128m";
    case "POST":
      return "\x1b[38;2;255;255;128m";
    case "PUT":
      return "\x1b[38;2;128;128;255m";
    case "PATCH":
      return "\x1b[38;2;128;255;255m";
    case "DELETE":
      return "\x1b[1;38;2;255;128;128m";
    case "OPTIONS":
      return "\x1b[38;2;255;128;255m";
    default:
      return "\x1b[38;2;255;255;255m";
  }
}

// Helper: Assign color for status codes
function getStatusColor(statusCode) {
  if (statusCode >= 200 && statusCode < 300) return "\x1b[1;38;2;128;255;128m";
  if (statusCode >= 300 && statusCode < 400) return "\x1b[1;38;2;128;128;255m";
  if (statusCode >= 400 && statusCode < 500) return "\x1b[1;38;2;255;128;128m";
  if (statusCode >= 500) return "\x1b[48;2;255;128;128m";
  return "\x1b[38;2;255;255;255m";
}

// Helper: Assign color for paths
function getPathColor() {
  return "\x1b[38;2;255;255;255m";
}

export default requestLogger;
