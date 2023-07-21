import mongoose from "mongoose";

const URI = 'mongodb://localhost:27018/mio-tasks';

mongoose.connect(URI)
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(`The connection has failed -> ${error}`));

export default mongoose;

