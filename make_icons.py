from PIL import Image, ImageDraw

def ghost_polygon(w, h, ox, oy, scale):
    # Classic ghost shape (matches the in-game "shape-0" classic silhouette),
    # defined as fractions of a unit box, then mapped to pixel coords.
    pts_frac = [
        (0.00, 1.00), (0.00, 0.28), (0.07, 0.13), (0.22, 0.03),
        (0.50, 0.00), (0.78, 0.03), (0.93, 0.13), (1.00, 0.28),
        (1.00, 1.00), (0.82, 0.82), (0.66, 1.00), (0.50, 0.82),
        (0.34, 1.00), (0.18, 0.82),
    ]
    return [(ox + fx * scale, oy + fy * scale) for fx, fy in pts_frac]

def make_icon(size, path, maskable=False, bg_purple=True):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    # Background: rounded dark-purple square (or full bleed for maskable safe zone)
    if maskable:
        # Maskable icons get cropped to a circle/rounded-square by the OS,
        # so keep all important content inside the ~80% "safe zone".
        d.rectangle([0, 0, size, size], fill=(17, 16, 29, 255))
        pad = size * 0.20
        ghost_scale = size * 0.46
        ox = (size - ghost_scale) / 2
        oy = pad + (size - pad*2 - ghost_scale) / 2 + size*0.02
    else:
        corner = int(size * 0.22)
        d.rounded_rectangle([0, 0, size-1, size-1], radius=corner, fill=(17, 16, 29, 255))
        ghost_scale = size * 0.62
        ox = (size - ghost_scale) / 2
        oy = (size - ghost_scale) / 2 + size*0.03

    # subtle purple glow behind ghost
    glow = Image.new("RGBA", (size, size), (0,0,0,0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse([size*0.12, size*0.10, size*0.88, size*0.86], fill=(106, 13, 173, 90))
    glow = glow.filter(__import__("PIL.ImageFilter", fromlist=["ImageFilter"]).GaussianBlur(size*0.06))
    img = Image.alpha_composite(img, glow)
    d = ImageDraw.Draw(img)

    pts = ghost_polygon(size, size, ox, oy, ghost_scale)
    d.polygon(pts, fill=(255, 255, 255, 255))

    # face
    eye_w = ghost_scale * 0.12
    eye_h = ghost_scale * 0.17
    eye_y = oy + ghost_scale * 0.30
    left_x = ox + ghost_scale * 0.30
    right_x = ox + ghost_scale * 0.30 + ghost_scale*0.17*1.0 + ghost_scale*0.17
    # recompute using same box logic as CSS (left at ~30%, offset 17% box-shadow)
    left_x = ox + ghost_scale * 0.30
    right_x = left_x + ghost_scale * 0.17 + eye_w
    d.ellipse([left_x, eye_y, left_x+eye_w, eye_y+eye_h], fill=(16,16,24,255))
    d.ellipse([right_x, eye_y, right_x+eye_w, eye_y+eye_h], fill=(16,16,24,255))

    mouth_w = ghost_scale * 0.22
    mouth_h = ghost_scale * 0.18
    mouth_x = ox + ghost_scale*0.39
    mouth_y = oy + ghost_scale*0.54
    d.ellipse([mouth_x, mouth_y, mouth_x+mouth_w, mouth_y+mouth_h], fill=(16,16,24,255))

    img.save(path)
    print("wrote", path, size)

make_icon(192, "/home/claude/ghost-match/icons/icon-192.png", maskable=False)
make_icon(512, "/home/claude/ghost-match/icons/icon-512.png", maskable=False)
make_icon(512, "/home/claude/ghost-match/icons/icon-512-maskable.png", maskable=True)
# extras useful for favicon / apple-touch-icon / store listings
make_icon(180, "/home/claude/ghost-match/icons/apple-touch-icon.png", maskable=False)
make_icon(32, "/home/claude/ghost-match/icons/favicon-32.png", maskable=False)
make_icon(1024, "/home/claude/ghost-match/icons/icon-1024.png", maskable=False)
