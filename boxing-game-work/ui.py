"""UI rendering helpers kept separate from match simulation."""
import pygame
from settings import CREAM, GOLD, GREEN, INK, MUTED, RED, BLUE, WIDTH


class UI:
    def __init__(self):
        self.font = pygame.font.Font(None, 30)
        self.small = pygame.font.Font(None, 22)
        self.title = pygame.font.Font(None, 74)
        self.big = pygame.font.Font(None, 112)

    def text(self, surface, message, pos, font=None, colour=CREAM, center=True):
        img = (font or self.font).render(str(message), True, colour)
        rect = img.get_rect(center=pos) if center else img.get_rect(topleft=pos)
        surface.blit(img, rect)
        return rect

    def bar(self, surface, rect, value, maximum, colour, label, left=True):
        pygame.draw.rect(surface, (35, 40, 55), rect, border_radius=6)
        amount = max(0, min(1, value / maximum))
        fill = int(rect.width * amount)
        fill_rect = pygame.Rect(rect.right - fill if not left else rect.left, rect.top, fill, rect.height)
        pygame.draw.rect(surface, colour, fill_rect, border_radius=6)
        pygame.draw.rect(surface, CREAM, rect, 2, border_radius=6)
        self.text(surface, label, (rect.centerx, rect.centery), self.small)

    def hud(self, surface, player, enemy, round_no, seconds):
        self.bar(surface, pygame.Rect(52, 36, 390, 24), player.health, 100, BLUE, "YOU", True)
        self.bar(surface, pygame.Rect(52, 66, 390, 12), player.stamina, 100, GREEN, "STAMINA", True)
        self.bar(surface, pygame.Rect(838, 36, 390, 24), enemy.health, 100, RED, "RIVAL", False)
        self.bar(surface, pygame.Rect(838, 66, 390, 12), enemy.stamina, 100, GREEN, "STAMINA", False)
        m, s = int(seconds) // 60, int(seconds) % 60
        self.text(surface, f"ROUND {round_no}  •  {m}:{s:02d}", (WIDTH // 2, 52), self.font, GOLD)
        self.text(surface, f"POINTS  {player.points}  —  {enemy.points}", (WIDTH // 2, 82), self.small, CREAM)

    def panel(self, surface, title, items, selected=0, subtitle=None):
        overlay = pygame.Surface(surface.get_size(), pygame.SRCALPHA)
        overlay.fill((7, 10, 18, 178)); surface.blit(overlay, (0, 0))
        self.text(surface, title, (WIDTH // 2, 185), self.title, GOLD)
        if subtitle: self.text(surface, subtitle, (WIDTH // 2, 245), self.font, CREAM)
        for i, item in enumerate(items):
            colour = GOLD if i == selected else CREAM
            prefix = "› " if i == selected else "  "
            self.text(surface, prefix + item, (WIDTH // 2, 330 + i * 52), self.font, colour)

    def center_message(self, surface, message, sub=""):
        shade = pygame.Surface(surface.get_size(), pygame.SRCALPHA); shade.fill((0, 0, 0, 130)); surface.blit(shade, (0, 0))
        self.text(surface, message, (WIDTH // 2, 320), self.big, GOLD)
        if sub: self.text(surface, sub, (WIDTH // 2, 395), self.font, CREAM)
