// let dt = require("luxon").DateTime


const luxon = dv.luxon
const dt = luxon.DateTime
const { GameTimeResolver } = customJS

let now = dt.now()
let name = input.name

let show_text = "123"
// dv.span(a)
dv.span(GameTimeResolver.getNextSettlementTime(luxon, "bh3"))

dv.header(1, name)
dv.paragraph(show_text)