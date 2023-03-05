const moment = require("moment/moment")

export const formatDate = (date) => {
    return moment(date).format('lll')
}