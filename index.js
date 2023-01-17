const fillData = require("./books");
const mongoData = require("./dataMongo");
const rotues = require("./api");
fillData(false);
mongoData(false);

rotues();
