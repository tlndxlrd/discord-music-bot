module.exports = client => {
    try {
        const stringlength = 69;
        console.log("\n")
        console.log(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.brightGreen)
        console.log(`     ┃ `.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightGreen)
        console.log(`     ┃ `.bold.brightGreen + `                     Discord Bot is online!`.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length - `                     Discord Bot is online!`.length) + "┃".bold.brightGreen)
        console.log(`     ┃ `.bold.brightGreen + `                  /--/ ${client.user.tag} /--/ `.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length - `                  /--/ ${client.user.tag} /--/ `.length) + "┃".bold.brightGreen)
        console.log(`     ┃ `.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightGreen)
        console.log(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.brightGreen)
    } catch (e) {
        console.log(e)
    }
    try {
        function PingStatus(){
            const stringlength = 69;
            console.log("\n")
            console.log(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.brightGreen)
            console.log(`     ┃ `.bold.brightGreen + `       Ping:${client.ws.ping}ms`.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length - `                                               Ping:${client.ws.ping}ms`.length) + "┃".bold.brightGreen)
            console.log(`     ┃ `.bold.brightGreen + `  ${client.user.tag}`.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length - `                                          ${client.user.tag}`.length) + "┃".bold.brightGreen)
            console.log(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.brightGreen)
        }
        setInterval(PingStatus, 10000)
    } catch (e) {
        console.log(String(e.stack).red);
    }
    try {
        client.user.setActivity(client.user.username, { type: "PLAYING" });
    } catch (e) {
        console.log(String(e.stack).red);
    }

    setInterval(() => {
        try {
            client.user.setActivity(client.user.username, { type: "PLAYING" });
        } catch (e) {
            console.log(String(e.stack).red);
        }
    }, 10 * 60 * 1000)
}

