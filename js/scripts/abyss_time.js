// let dt = require("luxon").DateTime

const { GameTimeResolver } = customJS
let dt = dv.luxon.DateTime
let now = dt.now()
let name = input.name

let show_text = "123"
// dv.span(a)
dv.span(GameTimeResolver.getNextSettlementTime(dv,"bh3"))

dv.header(1, name)
// // dv.span(diff_time)
dv.paragraph(show_text)