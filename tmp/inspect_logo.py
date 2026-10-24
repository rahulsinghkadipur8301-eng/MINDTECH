import base64
import re
from PIL import Image
import io

with open("public/mindtech_logo_transparent-1.svg", "r") as f:
    data = f.read()
match = re.search(r'href="data:image/png;base64,([^"]+)"', data)
if match:
    img_data = base64.b64decode(match.group(1))
    img = Image.open(io.BytesIO(img_data))
    print("Mode:", img.mode, "Size:", img.size)
    bbox = img.getbbox()
    print("Alpha Bounding box (left, upper, right, lower):", bbox)
    img.save("public/extracted_logo.png")
