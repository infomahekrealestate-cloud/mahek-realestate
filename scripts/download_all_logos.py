import urllib.request
import os
from PIL import Image

urls = [
    "https://ik.imagekit.io/1y9isszjm/pages/1_9WZYulCF9.png",
    "https://ik.imagekit.io/1y9isszjm/pages/1_Aueuey8TA.png",
    "https://ik.imagekit.io/1y9isszjm/pages/2_Aw63x2EXy.png",
    "https://ik.imagekit.io/1y9isszjm/pages/2_Z_VGicil1.png",
    "https://ik.imagekit.io/1y9isszjm/pages/3_7ikdr9SY4.png",
    "https://ik.imagekit.io/1y9isszjm/pages/3_LlKDrRzwn.png",
    "https://ik.imagekit.io/1y9isszjm/pages/4_Y2VwnSNgPZ.png",
    "https://ik.imagekit.io/1y9isszjm/pages/4_mKUkST1u5.png",
    "https://ik.imagekit.io/1y9isszjm/pages/mahekgroup_logo_jiBJMOJWU.jpg"
]

os.makedirs("scripts/downloaded_logos", exist_ok=True)

headers = {'User-Agent': 'Mozilla/5.0'}

for u in urls:
    filename = u.split('/')[-1]
    filepath = os.path.join("scripts/downloaded_logos", filename)
    req = urllib.request.Request(u, headers=headers)
    try:
        with urllib.request.urlopen(req) as resp, open(filepath, 'wb') as f:
            f.write(resp.read())
        img = Image.open(filepath)
        print(f"{filename}: size={img.size}, mode={img.mode}")
    except Exception as e:
        print(f"Error {filename}: {e}")
