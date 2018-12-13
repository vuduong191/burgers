var register = function (Handlebars) {
    var helpers = {
        format_time: function (time) {
            var d1 = new Date(time);
            return d1.getHours()+":"+d1.getMinutes();
        }
    };

    if (Handlebars && typeof Handlebars.registerHelper === "function") {
        for (var prop in helpers) {
            Handlebars.registerHelper(prop, helpers[prop]);
        }
    } else {
        return helpers;
    }

};

module.exports.register = register;