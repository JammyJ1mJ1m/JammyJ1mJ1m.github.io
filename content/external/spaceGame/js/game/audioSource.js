class AudioSource {
    constructor(pAudioPath) {
        this.mAudio = new Audio(pAudioPath);
    }

    play() {
        this.mAudio.play();
    }

    stop() {
        this.mAudio.pause();
    }

    setVolume(pVolume) {
        this.mAudio.volume = pVolume;
    }

    getVolume() {
        return this.mAudio.volume;
    }

    reload() {
        this.mAudio.load();
    }
}