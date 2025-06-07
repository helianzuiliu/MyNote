// let dt = require("luxon").DateTime
import {getNextSettlementTime} from "./game/game_data.js"
let dt = dv.luxon.DateTime
let now = dt.now()
let name = input.name
let finish_time = input.finish_time.minus({ seconds: 1 })
let diff_time

let show_text = "123"



dv.header(1, name)
// dv.span(diff_time)
dv.paragraph(show_text)