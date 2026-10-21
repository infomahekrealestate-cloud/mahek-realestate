import numpy as np
from PIL import Image

for p in [1, 2, 3, 11, 12]:
    old_img = Image.open(f'public/projects_pdf/page_{p}.png').convert('RGB')
    new_img = Image.open(f'temp_master_raw/page_{p}.jpeg').convert('RGB')
    new_resized = new_img.resize(old_img.size, Image.Resampling.LANCZOS)
    
    # Absolute difference
    diff = Image.fromarray(np.uint8(np.abs(np.array(old_img, dtype=np.int16) - np.array(new_resized, dtype=np.int16))))
    diff.save(f'temp_pages/diff_p{p}.png')
    print(f"Saved diff for page {p}")
