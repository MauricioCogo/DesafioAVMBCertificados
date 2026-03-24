export default {
    dialect: 'postgres',
    host: 'localhost',
    username : 'postgres',
    password : 'postgres',
    database : 'student_control',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
        paranoid: true,
    },
}