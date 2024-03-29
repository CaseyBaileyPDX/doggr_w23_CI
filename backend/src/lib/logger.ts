/** @module Logger */
import fs from "fs";

const logDir = import.meta.env.VITE_LOGS_DIR;

/**
 * Set logger options such that dev logs are pretty,
 * and prod logs are warn level saved to file
 */
const logger = import.meta.env.DEV
	? {
		transport: {

			target: "pino-pretty",
			options: {
				translateTime: "HH:MM:ss.l",
				ignore: "pid,hostname",
			},
		},
		//file: logDir + "/dev-logs.log",
		test: false,
	}
	: {
		transport: {

			target: "pino-pretty",
			options: {
				translateTime: "HH:MM:ss.l",
				ignore: "pid,hostname",
			},
		},
		//file: logDir + "/dev-logs.log",
		test: false
	};

export default logger;
