const { Message, TextChannel } = require("discord.js");
const courseinfo = require("./courseinfo.js");

module.exports = {
    name: "course",
    description: "Provides info on a course",
    /**
     * 
     * @param {Message} message 
     * @param {string[]} args 
     */
    async execute(message, args) {
        let dept, code;
        if (!args.length) {
            if (!(message.channel instanceof TextChannel))
                return null;
            
            const split = message.channel.name.split("-");
            dept = split[0], code = split[1];

        } else {
            if (args.length === 1 && args[0].includes("-")) {
                const split = args[0].split("-");
                dept = split[0], code = split[1];
                
            } else if (args.length === 1 && args[0].length === 8) {
                dept = args[0].substring(0, 4), code = args[0].substring(4);
                
            } else if (args.length === 2 && (args[0].length === 4 && args[1].length === 4)) {
                dept = args[0], code = args[1];

            } else {
                return null
            }
        }

        const embed = await courseinfo(dept.toUpperCase(), code);
        const errorMsg = "Couldn't find any results for " + dept + " " + code + ".";
        return embed?.setFooter("Run s.course dept-#### to see information on a course!");

    }
}
