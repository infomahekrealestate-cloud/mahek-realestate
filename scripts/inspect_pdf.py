import pymupdf

doc = pymupdf.open('Mahek Group Profile.pdf')
for i, page in enumerate(doc):
    imgs = page.get_images()
    for img_info in imgs:
        xref = img_info[0]
        try:
            base_img = doc.extract_image(xref)
            print(f"Page {i+1} xref {xref}: format {base_img['ext']} size {len(base_img['image'])} bytes, {base_img['width']}x{base_img['height']}")
        except Exception as e:
            print(f"Page {i+1} xref {xref} error: {e}")
