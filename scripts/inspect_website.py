import re
import urllib.request
import json

path = r'C:\Users\User 1\.gemini\antigravity-ide\brain\2dc5e7fb-b566-423c-af01-23beaf68ee6c\.system_generated\steps\431\content.md'
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

urls = set(re.findall(r'https?://[^\s"\'<>]+', text))
print("Found URLs in content.md:")
for u in sorted(urls):
    if any(ext in u.lower() for ext in ['.jpg', '.png', '.webp', '.svg', 'imagekit']):
        print(u)

# Also let's check for any partner logos or carousel in the raw HTML
# Look for img tags
imgs = re.findall(r'<img[^>]+src=["\']([^"\']+)["\'][^>]*>', text)
print("\nAll IMG src attributes:")
for img in set(imgs):
    print(img)
