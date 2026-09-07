"""Shared configuration for Ringside Rivalry."""

WIDTH, HEIGHT = 1280, 720
FPS = 60
TITLE = "Ringside Rivalry"
FULLSCREEN = True

RING = (130, 275, 1020, 390)
ROUND_SECONDS = 120
ROUNDS = 3

DIFFICULTIES = {"EASY": .72, "NORMAL": 1.0, "HARD": 1.28}
OPPONENTS = [
    {"name": "ROOKIE REX", "colour": (220, 67, 69), "speed": 275, "health": 90, "aggression": .50},
    {"name": "IRON IVY", "colour": (164, 75, 188), "speed": 315, "health": 108, "aggression": .64},
    {"name": "VOLT VARGAS", "colour": (238, 139, 40), "speed": 355, "health": 98, "aggression": .74},
]
ARENAS = [
    {"name": "CITY GYM", "floor": (192, 199, 206), "bg": (18, 28, 46), "unlock": 0},
    {"name": "GRAND STADIUM", "floor": (197, 182, 148), "bg": (44, 25, 48), "unlock": 2},
    {"name": "ROOFTOP RING", "floor": (121, 153, 172), "bg": (11, 35, 57), "unlock": 4},
    {"name": "UNDERGROUND", "floor": (104, 108, 106), "bg": (27, 24, 29), "unlock": 7},
]

# Colours are deliberately centralized so new arenas can supply their own palette.
INK = (16, 20, 31)
CREAM = (245, 239, 220)
GOLD = (246, 191, 61)
RED = (220, 67, 69)
BLUE = (51, 133, 218)
GREEN = (78, 195, 125)
MUTED = (120, 132, 154)

ATTACKS = {
    "jab": {"windup": 5, "active": 4, "recovery": 9, "damage": 7, "stamina": 9,
            "range": 94, "knockback": 5.5, "points": 1, "label": "JAB"},
    "cross": {"windup": 9, "active": 5, "recovery": 14, "damage": 12, "stamina": 16,
              "range": 105, "knockback": 8, "points": 2, "label": "CROSS"},
    "uppercut": {"windup": 16, "active": 6, "recovery": 20, "damage": 21, "stamina": 26,
                 "range": 82, "knockback": 12, "points": 3, "label": "UPPERCUT"},
    # Earned after the first match victory. Kept in this catalogue like every other attack.
    "haymaker": {"windup": 23, "active": 7, "recovery": 25, "damage": 34, "stamina": 42,
                 "range": 120, "knockback": 18, "points": 5, "label": "HAYMAKER"},
}
