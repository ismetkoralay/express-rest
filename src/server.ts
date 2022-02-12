import { app } from "./app";

const port = 4000;

const startApp = async () => {

    app.listen(port, () => {
        console.log("Listening on port 4000");
    });
}

startApp();