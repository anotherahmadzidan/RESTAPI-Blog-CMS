const logger = (req, res, next) => {
    const start = Date.now();

    res.on("finish", () => {
        const duration = Date.now() - start;
        const log = {
            time: new Date().toISOString(),
            method: req.method,
            url: req.originalUrl,
            status: res.statusCode,
            ip: req.ip,
            duration: `${duration}ms`
        };

        console.log(
            `[${log.time}] ${log.method} ${log.url} ${log.status} - ${log.duration}`
        );
    });

    next();
};

module.exports = logger;
