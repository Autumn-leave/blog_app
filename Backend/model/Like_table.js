module.exports = (sequelize,DataTypes) => {
    const LikeRecord = sequelize.define("LikeRecord",{
        Blog_ID: {
            type: DataTypes.INTEGER
        },
        User_ID: {
            type: DataTypes.INTEGER
        },
        Like_Record: {
            type : DataTypes.BOOLEAN
        }
    });
    return LikeRecord;
};