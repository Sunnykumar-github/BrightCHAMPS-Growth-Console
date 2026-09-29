import os
import glob
import pandas as pd

target_dir = r"Q:\BrightChamps Console\public"
files = glob.glob(os.path.join(target_dir, "*BrightChamps_FDA_Case_Dataset*"))

if not files:
    print("Dataset not found automatically. Searching manually...")
    all_files = glob.glob(os.path.join(target_dir, "*"))
    print("Public files:", all_files)
else:
    for f in files:
        print(f"Loading {f}")
        try:
            if f.endswith('.csv'):
                df = pd.read_csv(f)
            else:
                df = pd.read_excel(f)
                
            print("\n----- COLUMNS -----")
            print(df.columns.tolist())
            print("\n----- HEAD(5) -----")
            print(df.head(5).to_string())
        except Exception as e:
            print("Failed to read dataframe:", e)
