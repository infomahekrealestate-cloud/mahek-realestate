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
crop_and_save(2, (0.0, 0.0, 0.50, 1.0), f"{p1_dir}/brochure_cover.png")
crop_and_save(2, (0.50, 0.0, 1.0, 1.0), f"{p1_dir}/brochure_feature.png")
# Clean crop of the hero industrial island with hands and title
crop_and_save(2, (0.53, 0.165, 0.97, 0.815), f"{p1_dir}/hero.png")
crop_and_save(3, (0.01, 0.02, 0.76, 0.88), f"{p1_dir}/layout_plan.png")
crop_and_save(3, (0.02, 0.89, 0.98, 0.98), f"{p1_dir}/amenities.png")
crop_and_save(3, (0.75, 0.08, 0.98, 0.70), f"{p1_dir}/ready_badge.png")
crop_and_save(3, (0.0, 0.0, 1.0, 1.0), f"{p1_dir}/layout_full.png")

# Project 2: Orange Mahek Park
p2_dir = f"{BASE_DIR}/orange-mahek-park"
crop_and_save(4, (0.0, 0.0, 0.50, 1.0), f"{p2_dir}/brochure_cover.png")
crop_and_save(4, (0.50, 0.0, 1.0, 1.0), f"{p2_dir}/brochure_feature.png")
crop_and_save(4, (0.51, 0.04, 0.99, 0.815), f"{p2_dir}/hero.png")
crop_and_save(5, (0.01, 0.25, 0.99, 0.72), f"{p2_dir}/layout_plan.png")
crop_and_save(5, (0.0, 0.0, 1.0, 1.0), f"{p2_dir}/layout_full.png")
crop_and_save(5, (0.15, 0.80, 0.75, 0.98), f"{p2_dir}/amenities.png")

# Project 3: Mahek I.T. Park
p3_dir = f"{BASE_DIR}/mahek-it-park"
crop_and_save(6, (0.0, 0.0, 0.50, 1.0), f"{p3_dir}/brochure_specs.png")
crop_and_save(6, (0.49, 0.03, 1.0, 0.99), f"{p3_dir}/hero.png")
crop_and_save(7, (0.02, 0.02, 0.98, 0.50), f"{p3_dir}/floor_3_to_6.png")
crop_and_save(7, (0.02, 0.50, 0.98, 0.98), f"{p3_dir}/floor_8.png")
crop_and_save(7, (0.0, 0.0, 1.0, 1.0), f"{p3_dir}/layout_full.png")

# Project 4: The AM Park
p4_dir = f"{BASE_DIR}/the-am-park"
crop_and_save(8, (0.0, 0.0, 1.0, 1.0), f"{p4_dir}/brochure_full.png")
crop_and_save(8, (0.0, 0.0, 0.45, 1.0), f"{p4_dir}/brochure_specs.png")
crop_and_save(8, (0.03, 0.08, 0.99, 0.99), f"{p4_dir}/hero.png")
crop_and_save(8, (0.05, 0.43, 0.85, 0.88), f"{p4_dir}/facade.png")
crop_and_save(9, (0.0, 0.0, 1.0, 1.0), f"{p4_dir}/layout_full.png")
crop_and_save(9, (0.02, 0.02, 0.25, 0.98), f"{p4_dir}/ground_floor.png")
crop_and_save(9, (0.25, 0.02, 0.49, 0.98), f"{p4_dir}/first_floor.png")
crop_and_save(9, (0.49, 0.02, 0.73, 0.98), f"{p4_dir}/second_floor.png")
crop_and_save(9, (0.73, 0.02, 0.98, 0.98), f"{p4_dir}/basement_floor.png")

# Project 5: Anthems Mahek Park
p5_dir = f"{BASE_DIR}/anthems-mahek-park"
crop_and_save(10, (0.0, 0.0, 1.0, 1.0), f"{p5_dir}/brochure_full.png")
crop_and_save(10, (0.0, 0.0, 0.50, 1.0), f"{p5_dir}/brochure_specs.png")
crop_and_save(10, (0.04, 0.22, 0.48, 0.815), f"{p5_dir}/hero.png")
crop_and_save(10, (0.50, 0.04, 0.98, 0.98), f"{p5_dir}/layout_plan.png")

# Project 6: Mahek Residency
p6_dir = f"{BASE_DIR}/mahek-residency"
crop_and_save(11, (0.0, 0.0, 1.0, 1.0), f"{p6_dir}/brochure_full.png")
crop_and_save(11, (0.0, 0.44, 0.50, 0.815), f"{p6_dir}/hero.png")
crop_and_save(11, (0.52, 0.03, 0.98, 0.22), f"{p6_dir}/villa_elevation.png")
crop_and_save(11, (0.50, 0.22, 0.98, 0.96), f"{p6_dir}/layout_plan.png")

print("Fine-tuned crops regenerated successfully!")
