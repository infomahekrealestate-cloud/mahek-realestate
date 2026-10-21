import numpy as np
from PIL import Image

for i in range(1, 13):
    old_img = Image.open(f'public/projects_pdf/page_{i}.png').convert('RGB')
    new_img = Image.open(f'temp_master_raw/page_{i}.jpeg').convert('RGB')
    
    # Resize new to old size to compare
    new_resized = new_img.resize(old_img.size, Image.Resampling.LANCZOS)
    
    diff = np.abs(np.array(old_img, dtype=np.int16) - np.array(new_resized, dtype=np.int16))
    mean_diff = np.mean(diff)
    max_diff = np.max(diff)
    print(f"Page {i}: mean diff = {mean_diff:.2f}, max diff = {max_diff}")
