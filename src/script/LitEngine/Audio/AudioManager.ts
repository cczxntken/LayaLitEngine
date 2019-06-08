export module Audio {
    export class AudioManager {
        protected static sInstance: AudioManager = null;
        public static get Instance()  {
            if (AudioManager.sInstance == null) {
                AudioManager.sInstance = new AudioManager();
            }
            return AudioManager.sInstance;
        }

        protected _volume: number = 1;
        protected _onMixerVolume: number = 0.3;
        protected _curVolume = 1;
        protected _musicVolume: number = 1;
        protected _soundVolume: number = 1;
        protected constructor() {
            Laya.stage.frameLoop(1, this, this.Update);
        }

        protected OnChangeMusicVolume() {
            let a = this;
            Laya.SoundManager.musicVolume = a._volume * a._musicVolume * a._curVolume;
        }

        protected OnChangeSoundVolume() {
            let a = this;
            Laya.SoundManager.soundVolume = a._volume * a._soundVolume;
        }

        public static get OnMixerVolume() {
            return AudioManager.Instance._onMixerVolume;
        }

        public static set OnMixerVolume(value) {
            let a = AudioManager.Instance;
            a._onMixerVolume = Math.max(Math.min(value, 1), 0);
            a.OnChangeSoundVolume();
        }

        public static get SoundVolume() {
            return AudioManager.Instance._soundVolume;
        }

        public static set SoundVolume(value) {
            let a = AudioManager.Instance;
            a._soundVolume = Math.max(Math.min(value, 1), 0);
            a.OnChangeSoundVolume();
        }

        public static get MusicVolume() {
            return AudioManager.Instance._musicVolume;
        }

        public static set MusicVolume(value) {
            let a = AudioManager.Instance;
            a._musicVolume = Math.max(Math.min(value, 1), 0);
            a.OnChangeMusicVolume();
        }

        public static get Volume() {
            return AudioManager.Instance._volume;
        }

        public static set volume(value) {
            let a = AudioManager.Instance;
            a._volume = Math.max(Math.min(value, 1), 0);
            a.OnChangeMusicVolume();
            a.OnChangeSoundVolume();
        }

        public static StopMusic()  {
            Laya.SoundManager.stopMusic();
        }

        public static StopAllSound()  {
            Laya.SoundManager.stopAllSound();
            AudioManager.Instance._mixerSoundPlay = 0;
        }

        public static StopAll()  {
            AudioManager.StopMusic();
            AudioManager.StopAllSound();
        }

        public static PlayMusic(url: string, loops?: number, complete?: Laya.Handler, startTime?: number): Laya.SoundChannel  {
            let ret = Laya.SoundManager.playMusic(url, loops, complete, startTime);
            return ret;
        }

        public static PlaySound(url: string, loops?: number, complete?: Laya.Handler, soundClass?: any, startTime?: number): Laya.SoundChannel  {
            let ret = Laya.SoundManager.playSound(url, loops, complete, soundClass, startTime);
            return ret;
        }

        public static PlayMixerSound(url: string)  {
            let ret = AudioManager.PlaySound(url, 1, Laya.Handler.create(AudioManager.Instance, AudioManager.Instance.MixerSoundComplete));
            AudioManager.Instance._mixerSoundPlay++;
        }
        protected _mixerSoundPlay: number = 0;
        protected MixerSoundComplete()  {
            this._mixerSoundPlay = Math.max(this._mixerSoundPlay - 1, 0);
        }

        protected Update()  {
            let a = this;
            let dt = Math.min(Laya.timer.delta * 0.001, 0.1);
            let tcurvolume = a._curVolume;
            let tmixmolume = a._onMixerVolume;
            if (a._mixerSoundPlay > 0) {
                if (tcurvolume > tmixmolume) {
                    a._curVolume = Math.max(tcurvolume - dt,tmixmolume);
                    a.OnChangeMusicVolume();
                }
            }
            else {
                if (tcurvolume < 1) {
                    a._curVolume = Math.min(tcurvolume + dt,1);
                    a.OnChangeMusicVolume();
                }
            }
        }
    }
}