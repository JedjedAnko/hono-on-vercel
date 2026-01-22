import  Color  from "colors";

function logger_color(...args: any) {
    args = args;
    return logger_color; // Return the function itself
}

logger_color.info = function (o: any, ...n: any) {
    if (typeof o === 'object') {
        let text = "";
        Object.keys(o).forEach(key => {
            text += ` ${Color.cyan.bold(key)}: ${Color.green.italic(o[key])} `;
        });
        console.log(Color.green.bold("INFO -"), text, ` MESSAGE: ${Color.green.bold(n.toString())}`);
    }
    if (typeof o === 'string') {
        console.log(Color.green.bold("INFO -"), ` MESSAGE: ${Color.green.italic(o)}`);
    }
};

logger_color.error = function (o: any, ...n: any) {
    let trace = "";
    if (n.length > 0) {
        trace = n[0]?.toString().red.bold;
    }

    console.log(Color.red.bold("ERROR -"), `TRACE: ${trace}`, ` MESSAGE: ${Color.red.bold(o.toString())}`);
};

logger_color.db = function (o: any, ...n: any) {
    console.log(Color.green.bold("DB -"),` STATUS: ${Color.green.italic(o)}`); 
};

logger_color.route = function (o: any, ...n: any) {
    console.log(Color.yellow.bold("ROUTES -"),` STATUS: ${Color.yellow.italic(o)}`); 
};

logger_color.connect = function (o: any, ...n: any) {
    console.log(Color.cyan.bold("SERVE -"),` STATUS: ${Color.cyan.italic(o)}`); 
};

export { logger_color };