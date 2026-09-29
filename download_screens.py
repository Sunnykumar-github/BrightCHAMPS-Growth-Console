import json
import urllib.request
import os

with open(r'C:/Users/onepl/.gemini/antigravity/brain/a0a8a27b-97c7-4590-a256-850097dd1cd6/.system_generated/steps/7/output.txt', 'r') as f:
    data = json.load(f)

os.makedirs('stitch-screens', exist_ok=True)

for screen in data['screens']:
    title = screen['title'].replace(' ', '_')
    url = screen['htmlCode']['downloadUrl']
    print(f"Downloading {title} from {url}...")
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            html = response.read().decode('utf-8')
            with open(os.path.join('stitch-screens', f'{title}.html'), 'w', encoding='utf-8') as out:
                out.write(html)
        print(f"Saved {title}.html")
    except Exception as e:
        print(f"Failed to download {title}: {e}")
