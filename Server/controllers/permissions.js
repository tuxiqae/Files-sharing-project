const { serverLogger } = require('../logger');


module.exports.getPermissionsList = (req, res, next) => {
    sql = "SELECT name FROM permissions"
    db.query(sql, (error, results) => {
        if (error) {
            serverLogger.error(error)
            return res.status(500).send("An error occurred");
        }
        return res.status(200).json(results)
    })
}


module.exports.createAndUpdateAccess = (req, res, next) => {
    sql = "REPLACE INTO access (user_id, project_id, roll) VALUES ((select id from users where email =?),?,?);"
    const { id, accessinfo } = req.body
    for (let { roll, email } of accessinfo) {
        db.query(sql, [email, id, roll], (error, results) => {
            if (error) { serverLogger.error(error) }
            // else { serverLogger.info(`update user ${email} to roll ${roll}`) }
        });
    }
    next()
}

module.exports.removeAccess = (req, res, next) => {
    sql = "DELETE FROM access where project_id=? and user_id not in (select id from users where email in (?));"
    const { id, accessinfo } = req.body
    const emails = accessinfo.map(access => access.email)
    db.query(sql, [id, emails], (error, results) => {
        if (error) { serverLogger.error(error) }
    });
    next()
}


module.exports.confirmPermissions = permissions => (req, res, next) => {
    sql = "SELECT * FROM `secure-collaboration`.permissions where name in (SELECT roll FROM access where user_id=3 and project_id=4)"
}