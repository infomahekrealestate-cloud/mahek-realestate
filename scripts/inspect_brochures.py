import pymupdf

for name in ['the-mahek-park-1', 'orange-mahek-park', 'mahek-it-park', 'the-am-park', 'anthems-mahek-park', 'mahek-residency']:
    doc = pymupdf.open(f'public/brochures/{name}.pdf')
    print(f"=== {name} ({len(doc)} pages) ===")
    for i, p in enumerate(doc):
        imgs = p.get_images()
        sizes = [doc.extract_image(x[0])['width'] for x in imgs]
        print(f"  P{i+1}: rect={p.rect}, img_widths={sizes}")
