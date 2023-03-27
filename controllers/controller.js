const User = require('../models/user');

exports.addUser = (async (req, res) => {

    const { firstname, lastname, password, email, role } = req.body;

    if (!email || !password || !firstname || !lastname) {
        res.status(200).json({ success: false, Message: "Email Password Firstname Lastname required" })
    }
    else {
        try {
            const user = await User.create({
                firstname, lastname, password, email, role
            })
            if (user) {
                res.status(201).json({success: true, Message: "User created successfully", user})
            }
            else {
                res.status(200).json({success: failed, Message: "Request Failed",errorCode: 1})
            }
        }
        catch (err) {
            console.error('An error occurred:', err.message);
            res.status(200).json({success: false,Message: err.message})
        }
    }
})

exports.getRole = (async (req, res) => {
    const { uuid } = req.query;
    if (!uuid) {
        res.status(200).json({ success: false, Message: "uuid required" })
    }
    else {
        try {
            const role = await User.findOne({ uuid }).select('role')
            if (role) {
                res.status(200).json({success: true, Message: "Request Successful", role})
            }
            else {
                res.status(200).json({success: false, Message: "uuid not found", role})
            }
        }
        catch (err) {
            console.error('An error occurred:', err.message);
            res.status(200).json({success: false,Message: err.message})
        }
    }
})

exports.changeRole = (async (req, res) => {
    const { uuid, role } = req.body;
    if (!uuid || !role) {
        res.status(200).json({ success: false, Message: "uuid and role required" })
    }
    else {
        try {
            const user = await User.findOne({ uuid })
            if (user) {
                user.role = role
                await user.save()
                res.status(200).json({success: true, Message: "Role changed", user})
            }
            else {
                res.status(200).json({success: false, Message: "uuid invalid"})
            }
        }
        catch (err) {
            console.error('An error occurred:', err.message);
            res.status(200).json({success: false,Message: err.message})
        }
    }
})

exports.updateUser = (async (req, res) => {
    const { firstname, lastname, email, role, uuid } = req.body;

    if (!uuid) {
        res.status(200).json({ success: false, Message: "uuid required" })
    }
    else {
        try {
            const user = await User.findOne({ uuid })
            if (user) {
                const updatedUser = await User.findByIdAndUpdate(user._id,{firstname, lastname, email, role},{ new: true, runValidators: true, useFindAndModify: false })
                //const updatedUser = await User.findAndUpdate(uuid,{firstname, lastname, email, role},{ new: true, runValidators: true, useFindAndModify: false })
                if (updatedUser) {
                    res.status(200).json({success: true, Message: "User updated successfully", updatedUser})
                }
                else {
                    res.status(200).json({success: false, Message: "User update failed"})
                }    
            }
            else {
                res.status(200).json({success: false, Message: "uuid not found"})
            }
        }
        catch (err) {
            console.error('An error occurred:', err.message);
            res.status(200).json({success: false,Message: err.message})
        }
    }
})

exports.deleteUser = (async (req, res) => {
    const { uuid } = req.body;
    if (!uuid) {
        res.status(200).json({ success: false, Message: "uuid required" })
    }
    else {
        try {
            const user = await User.findOne({ uuid })
            if (user) {
                const response = await user.remove();
                res.status(200).json({success: true, Message: "Deleted Successful", response})
            }
            else {
                res.status(200).json({success: false, Message: "uuid not found"})
            }
        }
        catch (err) {
            console.error('An error occurred:', err.message);
            res.status(200).json({success: false,Message: err.message})
        }
    }
})
