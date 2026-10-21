import numpy as np
from PIL import Image

for p, x1, x2 in [(2, 0.55, 0.95), (10, 0.05, 0.45), (11, 0.02, 0.48)]:
    img = Image.open(f'public/projects_pdf/page_{p}.png').convert('RGB')
    arr = np.array(img)
    h, w, _ = arr.shape
    cols = arr[:, int(x1*w):int(x2*w)]
    means = np.mean(cols, axis=(1, 2))
    
    print(f"\nPage {p}:")
    for r in range(int(0.65*h), int(0.95*h), 20):
        print(f"  row {r} (ratio {r/h:.3f}): mean RGB={means[r]:.1f}")
