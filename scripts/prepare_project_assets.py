import os
from PIL import Image

BASE_DIR = 'public/projects'

def crop_and_save(src_page, crop_box, dest_path):
    img = Image.open(f'public/projects_pdf/page_{src_page}.png')
    w, h = img.size
    box = (int(crop_box[0] * w), int(crop_box[1] * h), int(crop_box[2] * w), int(crop_box[3] * h))
    cropped = img.crop(box)
    os.makedirs(os.path.dirname(dest_path), exist_ok=True)
    cropped.save(dest_path, quality=95)
    print(f"Saved {dest_path}: {cropped.size}")

# Project 1: The Mahek Park-1
p1_dir = f"{BASE_DIR}/the-mahek-park-1"
# Front poster/cover
crop_and_save(2, (0.0, 0.0, 0.50, 1.0), f"{p1_dir}/brochure_cover.png")
# Right half poster
crop_and_save(2, (0.50, 0.0, 1.0, 1.0), f"{p1_dir}/brochure_feature.png")
# Clean industrial 3D hero
crop_and_save(2, (0.55, 0.15, 0.95, 0.70), f"{p1_dir}/hero.png")
# Complete layout plan
crop_and_save(3, (0.01, 0.02, 0.77, 0.98), f"{p1_dir}/layout_plan.png")
# Amenities section
crop_and_save(3, (0.77, 0.05, 0.99, 0.95), f"{p1_dir}/amenities.png")

# Project 2: Orange Mahek Park
p2_dir = f"{BASE_DIR}/orange-mahek-park"
# Front poster
crop_and_save(4, (0.0, 0.0, 0.50, 1.0), f"{p2_dir}/brochure_cover.png")
# Right poster
crop_and_save(4, (0.50, 0.0, 1.0, 1.0), f"{p2_dir}/brochure_feature.png")
# Hero (gears & industry graphic)
crop_and_save(4, (0.52, 0.12, 0.98, 0.75), f"{p2_dir}/hero.png")
# Layout plan
crop_and_save(5, (0.01, 0.25, 0.99, 0.70), f"{p2_dir}/layout_plan.png")
# Full page 5 layout
crop_and_save(5, (0.0, 0.0, 1.0, 1.0), f"{p2_dir}/layout_full.png")
# Amenities row
crop_and_save(5, (0.15, 0.80, 0.75, 0.98), f"{p2_dir}/amenities.png")

# Project 3: Mahek I.T. Park
p3_dir = f"{BASE_DIR}/mahek-it-park"
# Left side specs & icons
crop_and_save(6, (0.0, 0.0, 0.50, 1.0), f"{p3_dir}/brochure_specs.png")
# 3D building render
crop_and_save(6, (0.50, 0.05, 1.0, 0.98), f"{p3_dir}/hero.png")
# Full 3 to 6 floor plan
crop_and_save(7, (0.02, 0.02, 0.98, 0.50), f"{p3_dir}/floor_3_to_6.png")
# Full 8th floor plan
crop_and_save(7, (0.02, 0.50, 0.98, 0.98), f"{p3_dir}/floor_8.png")
# Full Page 7
crop_and_save(7, (0.0, 0.0, 1.0, 1.0), f"{p3_dir}/layout_full.png")

# Project 4: The AM Park
p4_dir = f"{BASE_DIR}/the-am-park"
# Full page 8
crop_and_save(8, (0.0, 0.0, 1.0, 1.0), f"{p4_dir}/brochure_full.png")
# Left side callout
crop_and_save(8, (0.0, 0.0, 0.40, 1.0), f"{p4_dir}/brochure_specs.png")
# Building elevation (wide angle)
crop_and_save(8, (0.05, 0.42, 0.95, 0.98), f"{p4_dir}/hero.png")
# Crop of building facade without person
crop_and_save(8, (0.05, 0.43, 0.85, 0.88), f"{p4_dir}/facade.png")
# All 4 floor plans from page 9
crop_and_save(9, (0.0, 0.0, 1.0, 1.0), f"{p4_dir}/layout_full.png")
crop_and_save(9, (0.02, 0.02, 0.25, 0.98), f"{p4_dir}/ground_floor.png")
crop_and_save(9, (0.25, 0.02, 0.49, 0.98), f"{p4_dir}/first_floor.png")
crop_and_save(9, (0.49, 0.02, 0.73, 0.98), f"{p4_dir}/second_floor.png")
crop_and_save(9, (0.73, 0.02, 0.98, 0.98), f"{p4_dir}/basement_floor.png")

# Project 5: Anthems Mahek Park
p5_dir = f"{BASE_DIR}/anthems-mahek-park"
crop_and_save(10, (0.0, 0.0, 1.0, 1.0), f"{p5_dir}/brochure_full.png")
crop_and_save(10, (0.0, 0.0, 0.50, 1.0), f"{p5_dir}/brochure_specs.png")
crop_and_save(10, (0.05, 0.45, 0.45, 0.85), f"{p5_dir}/hero.png")
crop_and_save(10, (0.50, 0.04, 0.98, 0.98), f"{p5_dir}/layout_plan.png")

# Project 6: Mahek Residency
p6_dir = f"{BASE_DIR}/mahek-residency"
crop_and_save(11, (0.0, 0.0, 1.0, 1.0), f"{p6_dir}/brochure_full.png")
crop_and_save(11, (0.0, 0.35, 0.50, 0.88), f"{p6_dir}/hero.png")
crop_and_save(11, (0.52, 0.04, 0.98, 0.22), f"{p6_dir}/villa_elevation.png")
crop_and_save(11, (0.50, 0.22, 0.98, 0.96), f"{p6_dir}/layout_plan.png")

print("Cropped assets updated successfully!")
