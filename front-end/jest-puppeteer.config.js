module.exports = {
    launch: {
        args: ["--no-sandbox"],
        headless: false
    },
    server: {
        command: "serve -s build",
        launchTimeout: 10000,
        debug: true
    }
};