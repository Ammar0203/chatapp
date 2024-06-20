const createError = require('http-errors');

exports.profile = async (req, res, next) => {
    const user = req.user;
    user.name = req.body.name;
    user.about = req.body.about;
    user.avatar = req.file ? req.file.filename : user.avatar;
    try {
        await user.save()
        await sendUpdateUser(user)
        res.json()
    } catch (error) {
        console.log(error);
    }
 };

const sendUpdateUser = async (user) => {
    io.emit('update_user', await user.getData());
};

exports.password = (req, res, next) => {
    const { password, newPassword} = req.body;
    let user = req.user;
    if (!user.checkPassword(password)){
        return res.status(401).json({message: 'كلمة المرور خاطئة'})
    }
    user.password = newPassword;
    user.save().then(updated => res.json())
    .catch(next);
};
 
