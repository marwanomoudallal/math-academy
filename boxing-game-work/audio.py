"""Small procedural soundscape; external files can replace these later."""
import io, math, struct, wave
import pygame


class Audio:
    def __init__(self):
        self.enabled = True
        self.sounds = {}
        try:
            pygame.mixer.init()
            self.sounds = {"jab": self.tone(160, .07), "cross": self.tone(110, .09),
                           "uppercut": self.tone(75, .13), "block": self.tone(540, .05),
                           "bell": self.tone(880, .22), "cheer": self.tone(240, .18)}
            self.music = self.tone(62, 1.2)
        except pygame.error:
            self.enabled = False

    def tone(self, freq, duration):
        rate, count = 22050, int(22050 * duration)
        raw = bytearray()
        for i in range(count):
            envelope = 1 - i / count
            sample = int(25000 * envelope * math.sin(math.tau * freq * i / rate))
            raw.extend(struct.pack("<h", sample))
        stream = io.BytesIO()
        with wave.open(stream, "wb") as wav:
            wav.setnchannels(1); wav.setsampwidth(2); wav.setframerate(rate); wav.writeframes(raw)
        stream.seek(0)
        return pygame.mixer.Sound(file=stream)

    def play(self, name):
        if self.enabled and name in self.sounds: self.sounds[name].play()

    def start_music(self):
        if self.enabled: self.music.play(loops=-1)
