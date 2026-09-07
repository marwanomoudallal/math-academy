"""Computer-controlled boxer. Behaviour is isolated from the shared Fighter model."""
import random
from player import Fighter
from settings import RED


class Enemy(Fighter):
    def __init__(self, profile=None, difficulty=1.0):
        profile = profile or {"name": "RIVAL", "colour": RED, "speed": 250, "health": 100, "aggression": .48}
        super().__init__(930, profile["name"], profile["colour"], -1)
        self.max_health = self.health = profile["health"]
        self.speed, self.base_aggression = profile["speed"] * difficulty, profile["aggression"] * difficulty
        self.decision_time = 0

    def think(self, player, dt):
        if not self.alive or self.busy:
            return
        self.decision_time -= dt
        distance = abs(player.x - self.x)
        self.facing = 1 if player.x > self.x else -1
        aggression = min(.9, self.base_aggression + (.25 if self.health < self.max_health * .35 else 0))
        self.blocking = False
        self.dodging = False
        if self.decision_time <= 0:
            # Shorter decision window keeps the opponent active and responsive.
            self.decision_time = random.uniform(.11, .26)
            # Reactive defence makes attacks readable but not entirely free.
            if player.attack_name and random.random() < .27:
                self.blocking = True
                return
            if player.attack_name and random.random() < .10:
                self.dodging = True
                return
            if distance < 108 and random.random() < aggression:
                choice = random.choices(["jab", "cross", "uppercut"], [55, 33, 12])[0]
                self.start_attack(choice)
        if distance > 78:
            self.move(self.facing, dt)
