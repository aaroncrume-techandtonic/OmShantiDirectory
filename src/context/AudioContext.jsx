import { createContext, useState, useRef, useEffect, useContext } from 'react';

const AudioContext = createContext(undefined);
const DEFAULT_TRACK = '/audio/Still_Point_DEFAULT_MusicGPT.mp3';
const AUDIO_VOLUME_KEY = 'omShantiAudioVolume';
const AUDIO_MUTED_KEY = 'omShantiAudioMuted';
const AUDIO_TRACK_KEY = 'omShantiAudioTrack';
const AUDIO_PLAYING_KEY = 'omShantiAudioWasPlaying';
const AUDIO_POSITION_MAP_KEY = 'omShantiAudioPositions';

export function AudioProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(() => {
    if (typeof window === 'undefined') {
      return DEFAULT_TRACK;
    }

    return window.localStorage.getItem(AUDIO_TRACK_KEY) || DEFAULT_TRACK;
  });
  const [volume, setVolume] = useState(() => {
    if (typeof window === 'undefined') {
      return 0.65;
    }

    const stored = Number(window.localStorage.getItem(AUDIO_VOLUME_KEY));
    if (!Number.isFinite(stored)) {
      return 0.65;
    }

    return Math.min(Math.max(stored, 0), 1);
  });
  const [isMuted, setIsMuted] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    return window.localStorage.getItem(AUDIO_MUTED_KEY) === 'true';
  });
  const audioRef = useRef(null);
  const shouldResumeOnLoadRef = useRef(true);
  const lastSavedSecondRef = useRef(-1);

  const setVolumeLevel = (nextVolume) => {
    const normalized = Math.min(Math.max(nextVolume, 0), 1);
    setVolume(normalized);
    if (normalized > 0 && isMuted) {
      setIsMuted(false);
    }
    if (normalized === 0 && !isMuted) {
      setIsMuted(true);
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const togglePlay = () => {
    if (!audioRef.current) {
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
      return;
    }

    audioRef.current.play().catch((error) => {
      console.error('Audio playback failed:', error);
    });
  };

  const getStoredPositionMap = () => {
    if (typeof window === 'undefined') {
      return {};
    }

    const raw = window.localStorage.getItem(AUDIO_POSITION_MAP_KEY);
    if (!raw) {
      return {};
    }

    try {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        return parsed;
      }
    } catch {
      // Ignore malformed storage and continue with defaults.
    }

    return {};
  };

  const persistTrackPosition = (trackUrl, timeInSeconds) => {
    if (typeof window === 'undefined') {
      return;
    }

    const sanitizedTime = Number.isFinite(timeInSeconds) ? Math.max(timeInSeconds, 0) : 0;
    const positions = getStoredPositionMap();
    positions[trackUrl] = sanitizedTime;
    window.localStorage.setItem(AUDIO_POSITION_MAP_KEY, JSON.stringify(positions));
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    const handlePlay = () => {
      setIsPlaying(true);
      window.localStorage.setItem(AUDIO_PLAYING_KEY, 'true');
    };
    const handlePause = () => {
      setIsPlaying(false);
      window.localStorage.setItem(AUDIO_PLAYING_KEY, 'false');
    };
    const handleEnded = () => {
      audio.currentTime = 0;
      persistTrackPosition(currentTrack, 0);
      audio.play().catch((error) => {
        console.error('Audio restart failed:', error);
      });
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    const restoreTrackPosition = () => {
      const positions = getStoredPositionMap();
      const storedTime = Number(positions[currentTrack]);
      if (!Number.isFinite(storedTime) || storedTime <= 0) {
        return;
      }

      const maxTime = Number.isFinite(audio.duration) && audio.duration > 0
        ? Math.max(audio.duration - 0.25, 0)
        : storedTime;
      audio.currentTime = Math.min(storedTime, maxTime);
      lastSavedSecondRef.current = Math.floor(audio.currentTime);
    };

    if (audio.readyState >= 1) {
      restoreTrackPosition();
    }

    audio.addEventListener('loadedmetadata', restoreTrackPosition);
    return () => {
      audio.removeEventListener('loadedmetadata', restoreTrackPosition);
    };
  }, [currentTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    const handleTimeUpdate = () => {
      const currentSecond = Math.floor(audio.currentTime);
      if (currentSecond === lastSavedSecondRef.current) {
        return;
      }

      lastSavedSecondRef.current = currentSecond;
      persistTrackPosition(currentTrack, audio.currentTime);
    };

    const handlePauseSave = () => {
      persistTrackPosition(currentTrack, audio.currentTime);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('pause', handlePauseSave);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('pause', handlePauseSave);
    };
  }, [currentTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !shouldResumeOnLoadRef.current) {
      return;
    }

    if (isMuted) {
      setIsMuted(false);
    }

    if (volume <= 0) {
      setVolume(0.65);
    }

    const tryResume = () => {
      audio.play().then(() => {
        shouldResumeOnLoadRef.current = false;
      }).catch(() => {
        // Ignore autoplay errors and retry after first user interaction.
      });
    };

    tryResume();

    const resumeOnInteraction = () => {
      tryResume();
    };

    window.addEventListener('pointerdown', resumeOnInteraction, { once: true });
    return () => {
      window.removeEventListener('pointerdown', resumeOnInteraction);
    };
  }, [isMuted, volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    // Explicitly reload the audio element so the browser picks up the new src.
    audio.load();

    if (isPlaying) {
      audio.play().catch((error) => {
        console.error('Track swap playback failed:', error);
      });
    }
  }, [currentTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    audio.volume = volume;
  }, [volume]);

  useEffect(() => {
    window.localStorage.setItem(AUDIO_VOLUME_KEY, String(volume));
  }, [volume]);

  useEffect(() => {
    window.localStorage.setItem(AUDIO_TRACK_KEY, currentTrack);
  }, [currentTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    audio.muted = isMuted;
  }, [isMuted]);

  useEffect(() => {
    window.localStorage.setItem(AUDIO_MUTED_KEY, String(isMuted));
  }, [isMuted]);

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        togglePlay,
        currentTrack,
        setCurrentTrack,
        volume,
        setVolumeLevel,
        isMuted,
        toggleMute,
        audioRef,
      }}
    >
      <audio ref={audioRef} src={currentTrack} preload="auto" />
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
