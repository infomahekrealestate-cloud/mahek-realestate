import pymupdf
import os
from PIL import Image

os.makedirs('temp_master_raw', exist_ok=True)
doc = pymupdf.open('MASTER CATALOUGE.pdf')

xrefs = [
    (1, 14),
    (2, 22),
    (3, 28),
    (4, 34),
    (5, 40),
    (6, 46),
    (7, 52),
    (8, 58),
    (9, 64),
    (10, 70),
    (11, 76),
    (12, 82)
]

for page_num, xref in xrefs:
    img_data = doc.extract_image(xref)
    out_path = f'temp_master_raw/page_{page_num}.jpeg'
    with open(out_path, 'wb') as f:
        f.write(img_data['image'])
    img = Image.open(out_path)
    print(f"Page {page_num}: {img.size}")
