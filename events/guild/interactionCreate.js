const { MessageEmbed, Message } = require("discord.js")

module.exports = async (client, interaction )=> {
    async function handleCommand() {
        
        let slashcmd = client.slashcommands.get(interaction.commandName)
        if (!slashcmd) {
            await interaction.reply("Not a valid slash command")
        }
        
        slashcmd.run(client, interaction)
    }
    if(interaction.isCommand()) handleCommand()
    if(interaction.isButton()) {
        const queue = client.player.getQueue(interaction.guildId)
        let embed = new MessageEmbed()
        if(interaction.customId === 'stop') {
    
            embed
                .setTitle('❌ |Ошибка')
                .setDescription('В настоящее время трек не воспроизводится')
    
            if (!queue) return interaction.reply({embeds: [embed], ephemeral: true})
    
            await queue.clear()
            
            await queue.destroy()
    
            embed
                .setTitle('✅ |Выполнено')
                .setDescription('Бот остановлен')
    
            await interaction.reply({embeds: [embed], ephemeral: true})

            await interaction.message.delete()
        }
        if(interaction.customId === 'resume') {
            embed
			.setTitle('❌ |Ошибка')
			.setDescription('В очереди нет треков')

		if (!queue) return await interaction.reply({embeds: [embed], ephemeral: true})

		await queue.setPaused(false)

		embed
			.setTitle('✅ |Выполнено')
			.setDescription('Возобновлено воиспроизведение трека!')

        await interaction.reply({embeds: [embed], ephemeral: true})
        }

        if(interaction.customId === 'skip') {

            embed
			.setTitle('❌ |Ошибка')
			.setDescription('В настоящее время трек не воспроизводится')

		if (!queue) return await interaction.reply({embeds: [embed], ephemeral: true})

        const currentSong = queue.current

		await queue.skip()
		
		embed
			.setTitle('✅ |Выполнено')
			.setDescription(`🎶 |${currentSong.author} - ${currentSong.title} был пропущен!`)
			.setThumbnail(currentSong.thumbnail)

        await interaction.reply({
            embeds: [embed], ephemeral: true
        })
        await interaction.message.delete()
        }

        if(interaction.customId === 'pause') {
                   
            embed
                .setTitle('❌ |Ошибка')
                .setDescription('В настоящее время трек не воспроизводится')
    
            if (!queue) return await interaction.reply({embeds: [embed], ephemeral: true})
    
            embed
                .setTitle('✅ |Выполнено')
                .setDescription('Трек поставлен ​​на паузу!')
    
            queue.setPaused(true)
            await interaction.reply({embeds: [embed], ephemeral: true})
        }
    }
}

