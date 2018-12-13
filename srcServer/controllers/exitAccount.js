const postExit = (req, res) => {
    delete req.user;
    return res.json({
        message: "successfull"
    })
}

module.exports = {
    postExit
}