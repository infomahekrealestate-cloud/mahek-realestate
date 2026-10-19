import pymupdf
import os
from PIL import Image
import io

os.makedirs('public/projects_pdf', exist_ok=True)
doc = pymupdf.open('Mahek Group Profile.pdf')

jpeg_xrefs = [
    (1, 78),
    (2, 4),
    (3, 9),
    (4, 14),
    (5, 19),
    (6, 24),
    (7, 29),
    (8, 34),
    (9, 39),
    (10, 44),
    (11, 49),
    (12, 54)
]

for page_num, xref in jpeg_xrefs:
    img_data = doc.extract_image(xref)
    image_bytes = img_data['image']
    ext = img_data['ext']
    out_file = f'public/projects_pdf/page_{page_num}.{ext}'
    with open(out_file, 'wb') as f:
        f.write(image_bytes)
    
    # Verify with PIL
    img = Image.open(out_file)
    print(f"Successfully extracted Page {page_num}: {out_file} ({img.size[0]}x{img.size[1]}, mode={img.mode})")
