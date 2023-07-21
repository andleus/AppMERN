import  express  from "express";
import morgan from "morgan";
import router from "./routes/task.routes.js";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import mongoose from "./database.js";

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


app.set('port', process.env.PORT || port);


app.use(morgan('dev'));
app.use(express.json());



app.use('/api/tasks',router);
// app.use('/add', router);



app.use(express.static(path.join(__dirname, 'public')));


app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
})