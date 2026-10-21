import pymupdf
import os
from PIL import Image

os.makedirs('public/projects_pdf', exist_ok=True)
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
    image_bytes = img_data['image']
    ext = img_data['ext']
    
    # Save raw jpeg
    out_jpeg = f'public/projects_pdf/page_{page_num}.jpeg'
    with open(out_jpeg, 'wb') as f:
        f.write(image_bytes)
        
    # Save as high-res PNG for cropping
    img = Image.open(out_jpeg)
    out_png = f'public/projects_pdf/page_{page_num}.png'
    img.save(out_png, format='PNG')
    print(f"Extracted Page {page_num}: {img.size} ({out_png})")
