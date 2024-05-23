import os
from datetime import datetime, timedelta
import json
from azure.identity import DefaultAzureCredential
from azure.mgmt.costmanagement import CostManagementClient

# 環境変数から必要な情報を取得
date_from = os.getenv('DATE_FROM')
credentials_jsonstr = os.getenv('AZURE_CREDENTIALS')
credentials = json.loads(credentials_jsonstr)
subscription_id = credentials['subscriptionId']

# 固定のドル円レート
usd_to_jpy_rate = 155

# 日付の範囲を計算
start_date = datetime.strptime(date_from, '%Y-%m-%d')
end_date = datetime.utcnow()

# Azureの認証
credential = DefaultAzureCredential()
client = CostManagementClient(credential)

# 費用情報を取得
cost_data = client.query.usage(
    scope=f'/subscriptions/{subscription_id}',
    parameters={
        'timeframe': 'Custom',
        'timePeriod': {
            'from': start_date.strftime('%Y-%m-%dT%H:%M:%SZ'),
            'to': end_date.strftime('%Y-%m-%dT%H:%M:%SZ')
        },
        'dataset': {
            'granularity': 'Daily'
        }
    }
)

# 結果を日本円に変換し、JSONフォーマットで出力
results = []
for entry in cost_data.rows:
    date = entry[0]
    amount_usd = entry[1]
    amount_jpy = amount_usd * usd_to_jpy_rate

    results.append({
        "Date": date.split('T')[0],
        "Amount": amount_jpy,
        "Unit": "JPY"
    })

# JSONファイルに書き出し
with open('costs.json', 'w') as f:
    json.dump(results, f, indent=2)

print("Cost data written to costs.json")
