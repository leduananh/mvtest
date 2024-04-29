import log from "loglevel";

const logLevel = import.meta.env.VITE_LOG_LEVEL || "warn";

log.setLevel(logLevel);

export default log;
