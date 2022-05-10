class Listener {
    constructor(playlistsSongService, mailSender) {
        this._playlistsSongService = playlistsSongService;
        this._mailSender = mailSender;

        this.listen = this.listen.bind(this);
    }

    async listen(message) {
        try {
            const {
                playlistId,
                targetEmail,
            } = JSON.parse(message.content.toString());

            const playlistsSong = await this._playlistsSongService.getPlaylistsSong(playlistId);
            const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(playlistsSong));
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = Listener;