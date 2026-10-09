import json
import math
import os

with open('scripts/inputs_raw.txt', 'r') as f:
    input_text = f.read()

with open('scripts/outputs_raw.txt', 'r') as f:
    output_text = f.read()

# Tokenize inputs (numbers separated by whitespace)
input_tokens = [float(t) for t in input_text.split() if t]
# Tokenize outputs
output_tokens = [float(t) for t in output_text.split() if t]

print(f"Total input tokens: {len(input_tokens)}")
print(f"Expected input samples (len / 8): {len(input_tokens) / 8}")
print(f"Total output tokens: {len(output_tokens)}")

assert len(input_tokens) % 8 == 0, "Input tokens must be divisible by 8"
total_samples = len(input_tokens) // 8

assert total_samples == len(output_tokens), f"Mismatch: {total_samples} inputs vs {len(output_tokens)} outputs"

samples = []
csv_lines = ["id,cement,slag,flyAsh,water,superplasticizer,coarseAggregate,fineAggregate,age,strength,wcRatio"]

for i in range(total_samples):
    base_idx = i * 8
    cement = input_tokens[base_idx]
    slag = input_tokens[base_idx + 1]
    fly_ash = input_tokens[base_idx + 2]
    water = input_tokens[base_idx + 3]
    superplasticizer = input_tokens[base_idx + 4]
    coarse_agg = input_tokens[base_idx + 5]
    fine_agg = input_tokens[base_idx + 6]
    age = int(input_tokens[base_idx + 7])
    strength = output_tokens[i]
    
    total_binder = cement + slag + fly_ash
    wc_ratio = round(water / total_binder, 2) if total_binder > 0 else 0.0

    sample = {
        "id": i + 1,
        "cement": cement,
        "slag": slag,
        "flyAsh": fly_ash,
        "water": water,
        "superplasticizer": superplasticizer,
        "coarseAggregate": coarse_agg,
        "fineAggregate": fine_agg,
        "age": age,
        "strength": strength,
        "wcRatio": wc_ratio
    }
    samples.append(sample)
    csv_lines.append(f"{i+1},{cement},{slag},{fly_ash},{water},{superplasticizer},{coarse_agg},{fine_agg},{age},{strength},{wc_ratio}")

# Write to Concrete_Data_2.json in src/data
os.makedirs('src/data', exist_ok=True)

with open('src/data/Concrete_Data_2.json', 'w') as f:
    json.dump(samples, f, indent=2)

with open('src/data/Concrete_Data_2.csv', 'w') as f:
    f.write('\n'.join(csv_lines))

with open('Concrete_Data_2.csv', 'w') as f:
    f.write('\n'.join(csv_lines))

print(f"Successfully generated dataset with {len(samples)} samples!")

# Compute summary statistics
strengths = [s["strength"] for s in samples]
cements = [s["cement"] for s in samples]
wc_ratios = [s["wcRatio"] for s in samples]

mean_strength = sum(strengths) / len(strengths)
min_strength = min(strengths)
max_strength = max(strengths)
std_strength = math.sqrt(sum((x - mean_strength) ** 2 for x in strengths) / len(strengths))
mean_wc = sum(wc_ratios) / len(wc_ratios)
mean_cement = sum(cements) / len(cements)

print(f"Mean Strength: {mean_strength:.2f}")
print(f"Min Strength: {min_strength:.2f}")
print(f"Max Strength: {max_strength:.2f}")
print(f"Std Strength: {std_strength:.2f}")
print(f"Mean W/C: {mean_wc:.2f}")
print(f"Mean Cement: {mean_cement:.2f}")

# Compute Pearson correlation matrix
variables = ['cement', 'slag', 'flyAsh', 'water', 'superplasticizer', 'coarseAggregate', 'fineAggregate', 'age', 'strength']
n = len(samples)

def pearson(x, y):
    mx = sum(x) / n
    my = sum(y) / n
    cov = sum((xi - mx) * (yi - my) for xi, yi in zip(x, y))
    std_x = math.sqrt(sum((xi - mx) ** 2 for xi in x))
    std_y = math.sqrt(sum((yi - my) ** 2 for yi in y))
    if std_x == 0 or std_y == 0:
        return 0.0
    return cov / (std_x * std_y)

matrix_data = []
for var1 in variables:
    row = []
    x = [s[var1] for s in samples]
    for var2 in variables:
        y = [s[var2] for s in samples]
        r = round(pearson(x, y), 2)
        row.append(r)
    matrix_data.append(row)

print("Correlation matrix computed:")
for r in matrix_data:
    print(r)
