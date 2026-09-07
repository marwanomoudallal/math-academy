"""Ringside Rivalry: extensible Pygame boxing game and career mode."""
from __future__ import annotations
import json, math, random, sys
import pygame
from audio import Audio
from settings import *
from player import Player
from enemy import Enemy
from ui import UI


class Game:
    def __init__(self):
        pygame.init(); pygame.joystick.init()
        pygame.display.set_caption(TITLE)
        # Keep a stable 1280x720 canvas and let Pygame scale it to the monitor.
        display_flags = pygame.FULLSCREEN | pygame.SCALED if FULLSCREEN else 0
        self.screen = pygame.display.set_mode((WIDTH, HEIGHT), display_flags)
        self.clock, self.ui, self.audio = pygame.time.Clock(), UI(), Audio()
        self.progress = self.load_progress()
        self.state = "menu"; self.menu_index = 0; self.difficulty = "NORMAL"
        self.arena_index = 0; self.opponent_index = 0; self.training = False
        self.particles = []; self.damage_numbers = []; self.flash = 0; self.result_note = ""; self.message = ""
        self.round, self.time_left, self.countdown = 1, ROUND_SECONDS, 0
        self.player = Player(self.progress["haymaker_unlocked"]); self.enemy = Enemy()
        self.audio.start_music()

    def load_progress(self):
        default = {"haymaker_unlocked": False, "wins": 0, "losses": 0, "kos": 0,
                   "best_streak": 0, "streak": 0, "arena_wins": 0}
        try:
            with open("progress.json", encoding="utf-8") as f: default.update(json.load(f))
        except (OSError, ValueError): pass
        return default

    def save_progress(self):
        with open("progress.json", "w", encoding="utf-8") as f: json.dump(self.progress, f, indent=2)

    def new_match(self, training=False):
        self.training = training
        profile = OPPONENTS[self.opponent_index]
        self.player = Player(self.progress["haymaker_unlocked"])
        self.enemy = Enemy(profile, DIFFICULTIES[self.difficulty])
        self.enemy.name = "MATH ROBOT"
        self.player.x, self.enemy.x = 520, 760
        self.math_input, self.math_feedback, self.pending_math_hit = "", "Type the answer and press ENTER", None
        self.new_math_question()
        if training: self.enemy.health = self.enemy.max_health = 9999
        self.round, self.time_left, self.countdown = 1, (9999 if training else ROUND_SECONDS), 3.2
        self.state, self.result_note = "fight", ""; self.audio.play("bell")

    def new_math_question(self):
        level = {"EASY": 10, "NORMAL": 20, "HARD": 50}[self.difficulty]
        operation = random.choice(("+", "-", "x"))
        if operation == "x":
            a, b = random.randint(2, min(12, level)), random.randint(2, 10)
            answer = a * b
        else:
            a, b = random.randint(2, level), random.randint(1, level)
            if operation == "-" and b > a: a, b = b, a
            answer = a + b if operation == "+" else a - b
        self.math_question, self.math_answer = f"{a} {operation} {b} = ?", answer

    def submit_math_answer(self):
        if not self.math_input or self.pending_math_hit: return
        try: answer = int(self.math_input)
        except ValueError: return
        self.math_input = ""
        if answer == self.math_answer:
            attack = random.choice(("jab", "cross", "uppercut"))
            self.player.facing, self.enemy.facing = 1, -1
            self.player.x, self.enemy.x = 620, 710
            self.player.start_attack(attack)
            self.pending_math_hit = [self.player, self.enemy, attack, .16]
            self.math_feedback = "CORRECT! You punch the robot!"
        else:
            attack = random.choice(("jab", "cross"))
            self.player.facing, self.enemy.facing = 1, -1
            self.player.x, self.enemy.x = 570, 660
            self.enemy.start_attack(attack)
            self.pending_math_hit = [self.enemy, self.player, attack, .16]
            self.math_feedback = f"Wrong! The answer was {self.math_answer}. Robot punches!"

    def update_math_hit(self, dt):
        if not self.pending_math_hit: return
        self.pending_math_hit[3] -= dt
        if self.pending_math_hit[3] > 0: return
        attacker, defender, attack, _ = self.pending_math_hit
        landed, damage = defender.take_hit(attack, attacker.x)
        if landed:
            self.add_impact(defender)
            self.damage_numbers.append([defender.x, defender.y - 165, f"-{int(damage)}", RED, .8])
            attacker.points += ATTACKS[attack]["points"]
            self.audio.play(attack if attack in self.audio.sounds else "cross")
        self.pending_math_hit = None
        self.new_math_question()

    def ring_background(self):
        arena = ARENAS[self.arena_index]
        self.screen.fill(arena["bg"])
        # Deterministic crowd avoids flickering while retaining a lively stadium look.
        for x in range(0, WIDTH, 32):
            h = 55 + int(25 * math.sin(x * .17))
            pygame.draw.circle(self.screen, (49 + (x % 3) * 8, 53, 73), (x + 12, 200 - h // 5), 8)
        for x in (130, 1150): pygame.draw.circle(self.screen, GOLD, (x, 75), 20)
        rx, ry, rw, rh = RING
        pygame.draw.rect(self.screen, (35, 41, 54), (rx - 20, ry - 24, rw + 40, rh + 48), border_radius=12)
        pygame.draw.rect(self.screen, arena["floor"], RING, border_radius=8)
        for y, c in [(ry + 27, RED), (ry + 78, CREAM), (ry + rh - 78, CREAM), (ry + rh - 27, BLUE)]:
            pygame.draw.line(self.screen, c, (rx, y), (rx + rw, y), 5)
        pygame.draw.rect(self.screen, (82, 92, 111), RING, 5, border_radius=8)
        self.ui.text(self.screen, arena["name"], (WIDTH // 2, 425), pygame.font.Font(None, 55), (130, 136, 145))

    def add_impact(self, target, blocked=False):
        for _ in range(14 if not blocked else 7):
            a = random.random() * math.tau
            self.particles.append([target.x, target.y - 105, math.cos(a)*random.randint(90,220), math.sin(a)*random.randint(70,190), .38, blocked])
        self.flash = .07

    def player_attack(self, event):
        previous = self.player.attack_name
        if self.player.key_attack(event) and self.player.attack_name != previous:
            self.audio.play(self.player.attack_name if self.player.attack_name in self.audio.sounds else "cross")

    def resolve_hit(self, attacker, defender):
        if not attacker.hitbox_reaches(defender): return
        attacker.hit_targets.add(defender)
        was_blocking = defender.blocking
        landed, damage = defender.take_hit(attacker.attack_name, attacker.x)
        if not landed: return
        attack = ATTACKS[attacker.attack_name]
        if not was_blocking: attacker.points += attack["points"]
        self.add_impact(defender, was_blocking)
        # Floating combat text makes every hit and its exact damage unmistakable.
        label = "BLOCKED" if was_blocking else f"-{math.ceil(damage)}"
        colour = CREAM if was_blocking else GOLD
        self.damage_numbers.append([defender.x, defender.y - 155, label, colour, .72])
        self.audio.play("block" if was_blocking else attacker.attack_name)
        # A fast jab -> cross sequence is a scored combo, rewarding timing.
        if attacker is self.player and not was_blocking:
            now = pygame.time.get_ticks()
            if attacker.attack_name == "cross" and getattr(self, "last_landed", "") == "jab" and now - self.last_landed_time < 1050:
                attacker.points += 3; self.result_note = "COMBO! +3 POINTS"
            self.last_landed, self.last_landed_time = attacker.attack_name, now

    def finish(self, won, ko=False):
        self.state = "result"; self.message = "YOU WIN" if won else "YOU LOSE"
        if won:
            self.progress["wins"] += 1; self.progress["streak"] += 1; self.progress["arena_wins"] += 1
            self.progress["best_streak"] = max(self.progress["best_streak"], self.progress["streak"])
            if ko: self.progress["kos"] += 1
            if not self.progress["haymaker_unlocked"]:
                self.progress["haymaker_unlocked"] = True; self.result_note = "POWER UNLOCKED: HAYMAKER (I)"
            else: self.result_note = "Career win recorded"
            self.audio.play("cheer")
        else:
            self.progress["losses"] += 1; self.progress["streak"] = 0
        self.save_progress()

    def update_fight(self, dt):
        keys = pygame.key.get_pressed()
        controller_direction = 0; controller_block = controller_dodge = False
        if pygame.joystick.get_count():
            pad = pygame.joystick.Joystick(0); axis = pad.get_axis(0)
            controller_direction = 1 if axis > .35 else -1 if axis < -.35 else 0
            controller_block = pad.get_button(4) or (pad.get_button(5) if pad.get_numbuttons() > 5 else False)
            controller_dodge = pad.get_axis(5) > .45 if pad.get_numaxes() > 5 else False
        if self.countdown > 0:
            self.countdown -= dt; return
        self.time_left -= dt
        self.update_math_hit(dt)
        self.player.update_common(dt); self.enemy.update_common(dt)
        for p in self.particles[:]:
            p[0] += p[2]*dt; p[1] += p[3]*dt; p[4] -= dt
            if p[4] <= 0: self.particles.remove(p)
        for number in self.damage_numbers[:]:
            number[1] -= 42 * dt; number[4] -= dt
            if number[4] <= 0: self.damage_numbers.remove(number)
        self.flash = max(0, self.flash - dt)
        if self.training and self.player.health < 30: self.player.health = 100
        if not self.player.alive: self.state, self.message, self.ko_time = "ko", "K.O.!", 2.2
        elif not self.enemy.alive and not self.training: self.state, self.message, self.ko_time = "ko", "K.O.!", 2.2
        elif self.time_left <= 0 and not self.training:
            if self.round < ROUNDS:
                self.round += 1; self.time_left = ROUND_SECONDS; self.countdown = 3.2
                self.player.reset_round(350, 1); self.enemy.reset_round(930, -1); self.audio.play("bell")
            else: self.finish(self.player.points >= self.enemy.points)

    def update(self, dt):
        if self.state == "fight": self.update_fight(dt)
        elif self.state == "ko":
            self.player.update_common(dt); self.enemy.update_common(dt); self.ko_time -= dt
            if self.ko_time <= 0: self.finish(self.enemy.health <= 0, True)

    def draw(self):
        self.ring_background()
        if self.state in ("fight", "ko", "pause", "result"):
            self.player.draw(self.screen); self.enemy.draw(self.screen)
            for x,y,_,_,life,blocked in self.particles:
                pygame.draw.circle(self.screen, CREAM if blocked else GOLD, (int(x),int(y)), max(2,int(life*13)))
            for x, y, label, colour, _ in self.damage_numbers:
                self.ui.text(self.screen, label, (x, y), self.ui.font, colour)
            if self.flash:
                overlay=pygame.Surface((WIDTH,HEIGHT), pygame.SRCALPHA); overlay.fill((255,255,255,45)); self.screen.blit(overlay,(0,0))
            self.ui.hud(self.screen, self.player, self.enemy, self.round, max(0,self.time_left))
            if self.state == "fight" and self.countdown <= 0:
                pygame.draw.rect(self.screen, (16,20,31), (305,595,670,105), border_radius=18)
                pygame.draw.rect(self.screen, GOLD, (305,595,670,105), 3, border_radius=18)
                self.ui.text(self.screen, self.math_question, (WIDTH//2, 620), self.ui.font, GOLD)
                pygame.draw.rect(self.screen, CREAM, (510,642,260,34), border_radius=8)
                self.ui.text(self.screen, self.math_input or "Type answer", (640,659), self.ui.font, INK)
                self.ui.text(self.screen, self.math_feedback, (WIDTH//2,688), self.ui.small, CREAM)
            if self.training: self.ui.text(self.screen, "TRAINING: JAB -> CROSS FOR A COMBO", (WIDTH//2, 112), self.ui.small, GOLD)
            if self.countdown > 0 and self.state == "fight": self.ui.center_message(self.screen, "FIGHT!" if self.countdown < .65 else str(math.ceil(self.countdown)), "ROUND " + str(self.round))
            if self.state == "ko": self.ui.center_message(self.screen, "K.O.!")
            if self.state == "pause": self.ui.panel(self.screen,"PAUSED",["Resume","Main Menu"],self.menu_index)
            if self.state == "result": self.ui.panel(self.screen,self.message,["Play Again","Main Menu"],self.menu_index,self.result_note or f"Points: {self.player.points} - {self.enemy.points}")
        elif self.state == "menu":
            self.ui.panel(self.screen,"RINGSIDE RIVALRY",["Play Match","Career","Training","Arenas","Controls","Settings","Quit"],self.menu_index,"Win fights, unlock power moves, and rule the ring")
        elif self.state == "career":
            self.ui.panel(self.screen,"CAREER",[f"Opponent: {OPPONENTS[self.opponent_index]['name']}",f"Difficulty: {self.difficulty}","Start Career Fight","Back"],self.menu_index,f"Record {self.progress['wins']}W-{self.progress['losses']}L | KOs {self.progress['kos']} | Streak {self.progress['best_streak']}")
        elif self.state == "arenas":
            choices=[a['name'] + ("" if self.progress['arena_wins'] >= a['unlock'] else f" (WIN {a['unlock']} TO UNLOCK)") for a in ARENAS]+["Back"]
            self.ui.panel(self.screen,"ARENAS",choices,self.menu_index,"Choose an unlocked arena")
        elif self.state == "controls":
            power="I / controller Y  Haymaker" if self.progress['haymaker_unlocked'] else "Win to unlock Haymaker"
            self.ui.panel(self.screen,"CONTROLS",["TYPE NUMBERS  Enter your answer","ENTER  Submit answer","CORRECT  You punch the robot","WRONG  Robot punches you","ESC  Pause or go back"],99)
        elif self.state == "settings": self.ui.panel(self.screen,"SETTINGS",[f"Sound: {'ON' if self.audio.enabled else 'OFF'}","Back"],self.menu_index)
        pygame.display.flip()

    def select(self):
        if self.state == "menu":
            actions=[lambda:self.new_match(),lambda:setattr(self,'state','career'),lambda:self.new_match(True),lambda:setattr(self,'state','arenas'),lambda:setattr(self,'state','controls'),lambda:setattr(self,'state','settings'),self.quit]
            actions[self.menu_index % len(actions)](); return
        if self.state == "career":
            i=self.menu_index%4
            if i==0: self.opponent_index=(self.opponent_index+1)%len(OPPONENTS)
            elif i==1: self.difficulty=list(DIFFICULTIES)[(list(DIFFICULTIES).index(self.difficulty)+1)%3]
            elif i==2: self.new_match()
            else: self.state="menu"; self.menu_index=0
        elif self.state == "arenas":
            i=self.menu_index%(len(ARENAS)+1)
            if i==len(ARENAS): self.state="menu"; self.menu_index=0
            elif self.progress['arena_wins'] >= ARENAS[i]['unlock']: self.arena_index=i
        elif self.state == "settings":
            if self.menu_index%2==0: self.audio.enabled=not self.audio.enabled
            else: self.state="menu"; self.menu_index=0
        elif self.state in ("pause","result"):
            if self.menu_index%2==0:
                if self.state=="pause": self.state="fight"
                else: self.new_match()
            else: self.state="menu"; self.menu_index=0

    def event(self,event):
        if event.type == pygame.JOYBUTTONDOWN and self.state=="fight":
            keys={0:pygame.K_j,1:pygame.K_k,2:pygame.K_l,3:pygame.K_i}
            if event.button in keys: self.player_attack(type("E",(),{"key":keys[event.button]})())
        if event.type != pygame.KEYDOWN: return
        if self.state=="fight":
            if event.key==pygame.K_ESCAPE: self.state="pause"; self.menu_index=0
            elif self.countdown<=0 and event.key==pygame.K_RETURN: self.submit_math_answer()
            elif self.countdown<=0 and event.key==pygame.K_BACKSPACE: self.math_input=self.math_input[:-1]
            elif self.countdown<=0 and event.unicode.isdigit() and len(self.math_input)<5: self.math_input+=event.unicode
            return
        if event.key==pygame.K_ESCAPE:
            if self.state in ("controls","settings","career","arenas"): self.state="menu"; self.menu_index=0
            elif self.state=="pause": self.state="fight"
            return
        if event.key in (pygame.K_UP,pygame.K_w): self.menu_index=max(0,self.menu_index-1)
        elif event.key in (pygame.K_DOWN,pygame.K_s): self.menu_index+=1
        elif event.key in (pygame.K_RETURN,pygame.K_SPACE): self.select()

    def quit(self): pygame.quit(); sys.exit()
    def run(self):
        while True:
            dt=min(.05,self.clock.tick(FPS)/1000)
            for event in pygame.event.get():
                if event.type==pygame.QUIT: self.quit()
                self.event(event)
            self.update(dt); self.draw()

if __name__ == "__main__": Game().run()
