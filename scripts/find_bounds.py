import numpy as np
from PIL import Image

def find_content_bounds(page_num, x_start_ratio, x_end_ratio):
    img = Image.open(f'public/projects_pdf/page_{page_num}.png').convert('RGB')
    arr = np.array(img)
    h, w, _ = arr.shape
    x1, x2 = int(x_start_ratio * w), int(x_end_ratio * w)
    sub = arr[:, x1:x2]
    
    # Calculate row variance or darkness compared to pure white/background
    # Also find where the dark bottom bar starts
    is_dark = np.mean(sub, axis=(1, 2)) < 100
    print(f"Page {page_num} (w={w}, h={h}):")
    dark_rows = np.where(is_dark)[0]
    if len(dark_rows) > 0:
        print(f"  Dark bottom bar begins around row {dark_rows[0]} (ratio {dark_rows[0]/h:.3f})")

find_content_bounds(2, 0.50, 1.0)
find_content_bounds(10, 0.0, 0.50)
find_content_bounds(11, 0.0, 0.50)
