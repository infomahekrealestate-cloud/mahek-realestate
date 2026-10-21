import pymupdf
import shutil

src_pdf = 'MASTER CATALOUGE.pdf'

# Helper to crop page 1 and page 12 of a document to portrait
def crop_cover_pages(doc):
    # Page 1
    doc[0].set_cropbox(pymupdf.Rect(297.44, 0, 892.71, 849.61))
    # Last page (Page 12)
    doc[-1].set_cropbox(pymupdf.Rect(297.47, 0, 892.75, 849.61))

def generate_brochures():
    master_doc = pymupdf.open(src_pdf)
    
    # 1. Master Catalogue (Clean 12 pages with portrait cover and back cover)
    cat_doc = pymupdf.open()
    cat_doc.insert_pdf(master_doc)
    cat_doc[0].set_cropbox(pymupdf.Rect(297.44, 0, 892.71, 849.61))
    cat_doc[11].set_cropbox(pymupdf.Rect(297.47, 0, 892.75, 849.61))
    
    cat_doc.save('public/brochures/master-catalogue.pdf', deflate=True)
    cat_doc.save('public/brochures/mahek-group-profile.pdf', deflate=True)
    cat_doc.save('public/MASTER-CATALOUGE.pdf', deflate=True)
    cat_doc.save('public/MASTER CATALOUGE.pdf', deflate=True)
    cat_doc.save('public/Mahek-Group-Profile.pdf', deflate=True)
    cat_doc.save('public/Mahek Group Profile.pdf', deflate=True)
    print("Master Catalogue variants saved successfully!")
    
    # 2. Individual Project Brochures
    # Front cover is page 0 (index 0)
    # Back cover is page 11 (index 11)
    project_pages = {
        'the-mahek-park-1': [1, 2],       # Pages 2, 3
        'orange-mahek-park': [3, 4],      # Pages 4, 5
        'mahek-it-park': [5, 6],          # Pages 6, 7
        'the-am-park': [7, 8],            # Pages 8, 9
        'anthems-mahek-park': [9],        # Page 10
        'mahek-residency': [10]           # Page 11
    }
    
    for slug, pages in project_pages.items():
        proj_doc = pymupdf.open()
        
        # Insert Front Cover (page 0)
        proj_doc.insert_pdf(master_doc, from_page=0, to_page=0)
        proj_doc[0].set_cropbox(pymupdf.Rect(297.44, 0, 892.71, 849.61))
        
        # Insert Project Pages
        for p in pages:
            proj_doc.insert_pdf(master_doc, from_page=p, to_page=p)
            
        # Insert Back Cover (page 11)
        proj_doc.insert_pdf(master_doc, from_page=11, to_page=11)
        proj_doc[-1].set_cropbox(pymupdf.Rect(297.47, 0, 892.75, 849.61))
        
        out_path = f'public/brochures/{slug}.pdf'
        proj_doc.save(out_path, deflate=True)
        print(f"Generated {out_path} ({len(proj_doc)} pages)")

generate_brochures()
