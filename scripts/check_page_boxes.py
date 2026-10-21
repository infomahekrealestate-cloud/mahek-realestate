import pymupdf

doc = pymupdf.open('MASTER CATALOUGE.pdf')
for i in [0, 1, 2, 11]:
    p = doc[i]
    print(f"Page {i+1}:")
    print(f"  rect: {p.rect}")
    print(f"  mediabox: {p.mediabox}")
    print(f"  cropbox: {p.cropbox}")
    imgs = p.get_images()
    for img in imgs:
        print(f"  img {img[0]}: {p.get_image_rects(img[0])}")
