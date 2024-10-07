import { displayDateTabs, addGameCardClickListener} from "./utils.js";

$(document).ready(function () {
    displayDateTabs();
    addGameCardClickListener('.games-container', '.game-card', '/games');

});