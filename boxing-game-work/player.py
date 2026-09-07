"""Fighter model and player input controller."""
from __future__ import annotations
import math
import pygame
from settings import ATTACKS, BLUE, CREAM, RING


class Fighter:
    """Reusable boxer actor. New fighter types can subclass this and change stats/colours."""
    def __init__(self, x, name, colour, facing=1):
        self.x, self.y = float(x), 570.0
        self.name, self.colour, self.facing = name, colour, facing
        self.max_health = self.health = 100.0
        self.max_stamina = self.stamina = 100.0
        self.speed = 250.0
        self.attack_name = None
        self.attack_frame = 0
        self.hit_targets = set()
        self.blocking = self.dodging = False
        self.hurt_timer = self.ko_timer = 0
        self.flash_timer = 0
        self.points = 0
        self.last_hit = ""

    @property
    def alive(self):
        return self.health > 0

    @property
    def busy(self):
        return self.attack_name is not None or self.hurt_timer > 0

    def reset_round(self, x, facing):
        self.x, self.y, self.facing = float(x), 570.0, facing
        self.stamina = min(100, self.stamina + 30)
        self.attack_name = None
        self.hurt_timer = 0
        self.blocking = self.dodging = False
        self.hit_targets.clear()

    def start_attack(self, name):
        if self.busy or self.blocking or self.dodging:
            return False
        data = ATTACKS[name]
        if self.stamina < data["stamina"]:
            return False
        self.stamina -= data["stamina"]
        self.attack_name, self.attack_frame = name, 0
        self.hit_targets.clear()
        return True

    def attack_data(self):
        return ATTACKS.get(self.attack_name) if self.attack_name else None

    def attack_active(self):
        d = self.attack_data()
        return bool(d and d["windup"] <= self.attack_frame < d["windup"] + d["active"])

    def attack_finished(self):
        d = self.attack_data()
        return d and self.attack_frame >= d["windup"] + d["active"] + d["recovery"]

    def update_common(self, dt):
        self.stamina = min(self.max_stamina, self.stamina + (18 if not self.blocking else 10) * dt)
        self.hurt_timer = max(0, self.hurt_timer - dt * 60)
        self.flash_timer = max(0, self.flash_timer - dt)
        if self.attack_name:
            self.attack_frame += 1
            if self.attack_finished():
                self.attack_name = None
        if not self.alive:
            self.ko_timer += dt

    def move(self, direction, dt):
        if self.busy or self.blocking or self.dodging or not self.alive:
            return
        self.x += direction * self.speed * dt
        self.x = max(RING[0] + 45, min(RING[0] + RING[2] - 45, self.x))
        if direction:
            self.facing = 1 if direction > 0 else -1

    def take_hit(self, attack, source_x):
        if not self.alive:
            return False, 0
        data = ATTACKS[attack]
        if self.dodging:
            return False, 0
        damage = data["damage"] * (0.23 if self.blocking else 1)
        self.health = max(0, self.health - damage)
        self.stamina = max(0, self.stamina - damage * .45)
        self.x += (1 if self.x > source_x else -1) * data["knockback"] * (0.35 if self.blocking else 1)
        self.x = max(RING[0] + 40, min(RING[0] + RING[2] - 40, self.x))
        self.hurt_timer, self.flash_timer = (4 if not self.blocking else 1), .16
        self.last_hit = "BLOCK" if self.blocking else data["label"]
        return True, damage

    def hitbox_reaches(self, opponent):
        if not self.attack_active() or opponent in self.hit_targets:
            return False
        d = self.attack_data()
        # Must be in front and inside the current attack's reach.
        distance = (opponent.x - self.x) * self.facing
        return 0 < distance < d["range"]

    def draw(self, screen):
        """Draw an intentionally stylised, articulated boxer using simple primitives."""
        x, base = int(self.x), int(self.y)
        knock = min(30, self.ko_timer * 45) if not self.alive else 0
        bob = int(math.sin(pygame.time.get_ticks() * .008 + x) * 3) if self.alive else 0
        base += int(knock)
        body = pygame.Rect(x - 25, base - 104 + bob, 50, 60)
        skin = (122, 74, 48) if self.colour == BLUE else (224, 174, 120)
        # legs, shorts and torso
        pygame.draw.line(screen, (25, 30, 43), (x - 13, base - 45), (x - 22, base), 15)
        pygame.draw.line(screen, (25, 30, 43), (x + 13, base - 45), (x + 22, base), 15)
        pygame.draw.rect(screen, (245, 245, 240), (x - 29, base - 67, 58, 25), border_radius=6)
        pygame.draw.rect(screen, self.colour, body, border_radius=13)
        pygame.draw.circle(screen, skin, (x, base - 126 + bob), 25)
        # gloves have pose changes during an attack.
        reach = 0
        if self.attack_name:
            d = self.attack_data()
            progress = min(1, self.attack_frame / max(1, d["windup"]))
            if self.attack_active(): progress = 1
            reach = int(55 * progress * self.facing)
        guard_y = base - 94 + bob
        if self.blocking: guard_y -= 23
        # Jab/uppercut and cross/haymaker use opposite gloves.
        left_reach = reach if self.attack_name in ("jab", "uppercut") else 0
        right_reach = reach if self.attack_name in ("cross", "haymaker") else 0
        pygame.draw.line(screen, skin, (x - 17, base - 95 + bob), (x - 38 * self.facing + left_reach, guard_y), 12)
        pygame.draw.circle(screen, self.colour, (x - 40 * self.facing + left_reach, guard_y), 16)
        pygame.draw.line(screen, skin, (x + 17, base - 96 + bob), (x + 25 * self.facing + right_reach, base - 72 + bob), 12)
        pygame.draw.circle(screen, self.colour, (x + 27 * self.facing + right_reach, base - 70 + bob), 15)
        if self.flash_timer:
            pygame.draw.circle(screen, CREAM, (x, base - 111), 36, 2)


class Player(Fighter):
    def __init__(self, power_unlocked=False):
        super().__init__(350, "YOU", BLUE, 1)
        self.power_unlocked = power_unlocked

    def handle_input(self, keys, dt, controller_direction=0, controller_block=False, controller_dodge=False):
        direction = (keys[pygame.K_d] or keys[pygame.K_RIGHT]) - (keys[pygame.K_a] or keys[pygame.K_LEFT])
        if controller_direction: direction = controller_direction
        self.blocking = (keys[pygame.K_SPACE] or controller_block) and not self.busy
        self.dodging = (keys[pygame.K_LSHIFT] or controller_dodge) and not self.busy and self.stamina > 2
        if self.dodging:
            self.stamina = max(0, self.stamina - 25 * dt)
            self.move(-self.facing * .7, dt)
        else:
            self.move(direction, dt)

    def key_attack(self, event):
        if event.key == pygame.K_j: return self.start_attack("jab")
        if event.key == pygame.K_k: return self.start_attack("cross")
        if event.key == pygame.K_l: return self.start_attack("uppercut")
        if event.key == pygame.K_i and self.power_unlocked: return self.start_attack("haymaker")
        return False
