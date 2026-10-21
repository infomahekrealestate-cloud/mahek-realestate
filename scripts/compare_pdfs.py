import pymupdf

doc_old = pymupdf.open('Mahek Group Profile.pdf')
print("OLD PDF:")
for i in range(len(doc_old)):
    imgs = doc_old[i].get_images()
    for x in imgs:
        info = doc_old.extract_image(x[0])
        print(f"Old P{i+1}: xref {x[0]}, ext={info['ext']}, size={info['width']}x{info['height']}, bytes={len(info['image'])}")

doc_new = pymupdf.open('MASTER CATALOUGE.pdf')
print("\nNEW PDF:")
for i in range(len(doc_new)):
    imgs = doc_new[i].get_images()
    for x in imgs:
        info = doc_new.extract_image(x[0])
        print(f"New P{i+1}: xref {x[0]}, ext={info['ext']}, size={info['width']}x{info['height']}, bytes={len(info['image'])}")
