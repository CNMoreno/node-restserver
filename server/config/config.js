//PUERTO

process.env.PORT = process.env.PORT || 3000;

//ENTORNO

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//BASE DE DATOS

let urlDB

if (process.env.NODE_ENV === 'dev') {

    urlDB = 'mongodb://localhost:27017/cafe';

} else {

    urlDB = process.env.MONGO_URI;
}

// VENCIMIENTO DEL TOKEN
// 60 SEG
// 60 MIN
// 24 HORAS
// 30 DIAS

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;


// SEED DE AUTENTICACION

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

process.env.URLDB = urlDB;

//GOOGLE CLIENT ID

process.env.CLIENT_ID = process.env.CLIENT_ID || '424448538000-0q1s3pkd2q5i28sio8edlnvkhfqgef1r.apps.googleusercontent.com';