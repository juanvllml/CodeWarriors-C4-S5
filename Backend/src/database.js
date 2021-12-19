import mongoose from "mongoose";

mongoose.connect('mongodb+srv://gestionproyectos-user:xgKQMdztsKQFFnJbKcMu@cluster0.waqdo.mongodb.net/gestionproyectosDB', {
        useNewUrlParser: true,
        useUnifiedTopology: true
})
.then(db => console.log('>>> DB is connected'))
.catch(err => console.log ('Something goes wrong!', err))