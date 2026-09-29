import os
import glob

for filename in glob.glob('src/**/*.tsx', recursive=True):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # The Stitch template generated onClick={() => {applyPreset('best')}} which conflicts with my
    # injected MAGIC_PRESET_BEST -> onClick={() => applyPreset("best")}
    # Remove the explicitly nested ones!
    content = content.replace(" onClick={() => {applyPreset('best')}}", "")
    content = content.replace(" onClick={() => {applyPreset('base')}}", "")
    content = content.replace(" onClick={() => {applyPreset('worst')}}", "")
    content = content.replace(' onClick={() => {applyPreset("best")}}', "")
    content = content.replace(' onClick={() => {applyPreset("base")}}', "")
    content = content.replace(' onClick={() => {applyPreset("worst")}}', "")

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

print("Duplicates removed explicitly!")
