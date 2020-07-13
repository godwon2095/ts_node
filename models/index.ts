import Sequelize from 'sequelize';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

dotenv.config(); //LOAD CONFIG

const sequelize = new Sequelize( process.env.DATABASE,
process.env.DB_USER, process.env.DB_PASSWORD,{
    host: process.env.DB_HOST,
    dialect: 'mysql',
    timezone: '+09:00', //한국 시간 셋팅
    // operatorsAliases: Sequelize.Op,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

let db: any = [];

fs.readdirSync(__dirname)
    .filter(file => {
        return file.indexOf('.ts')&& file !== 'index.ts'
    })
    .forEach(file => {
        var model = sequelize.import(path.join(__dirname,
            file));
            db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if("associate" in db[modelName]){
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;