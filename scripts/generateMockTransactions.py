import random
from datetime import date, timedelta
import csv

paymentMethods = [
    "cash", "shopee", "tng", "grab", "credit card", "wise"
]
paymentMethodsRarity = [
    100, 30, 150, 15, 200, 30
]

categories = {
    "food": {
        "items": ["mcd", "kfc", "pepper lunch", "chicken rice", "mamak", "dai chao", "porridge", "noodle", "taco bell", "dominos", "mee tarik", "sarawak mee", "cili pan mee", "char siew rice", "zap fan", "fruits", "fried rice", "ramen", "sushi", "bananabro", "pizza hut", "steamboat", "fish ball noodles", "porridge"],
        "range": [10, 30],
        "rarity": 50
    },
    "transport": {
        "items": ["petrol", "parking", "rapidkl", "toll", "ktm"],
        "range": [5, 40],
        "rarity": 10
    },
    "groceries": {
        "items": ["jaya grocer", "kk mart", "daiso", "99 speedmart", "mercato", "aeon"],
        "range": [30, 80],
        "rarity": 6
    },
    "leisure": {
        "items": ["karaoke", "climbing", "go kart", "cinema", "arcade", "baseball"],
        "range": [30, 80],
        "rarity": 6
    },
    "clothing": {
        "items": ["uniqlo", "uniqlo", "decathlon", "love bonito"],
        "range": [60, 150],
        "rarity": 2
    },
    "gift": {
        "items": ["birthday", "anniversary", "celebration", "souvenir"],
        "range": [30, 80],
        "rarity": 1
    },
    "utilities": {
        "items": ["tnb", "car park", "internet", "daiso", "mr diy", "watsons", "ikea", "guardian", "BIG pharmacy", "maintenance", "car bill", "insurance"],
        "range": [50, 150],
        "rarity": 5
    },
}

genAmount = 500

rarityArray = []
for key in categories.keys():
    rarityArray.append(categories[key]["rarity"])

randomizedCategories = random.choices(
    list(categories.keys()), weights=rarityArray, k=genAmount)

start_date = date(2024, 1, 1)
end_date = date(2024, 3, 31)

delta = timedelta(days=1)
dates = []

while start_date <= end_date:
    dates.append(start_date.isoformat())
    start_date += delta

transactions = []
for category in randomizedCategories:
    items = categories[category]["items"]
    lo, hi = categories[category]["range"]
    item = items[random.randint(0, len(items) - 1)]
    amount = random.randint(lo, hi)
    [paymentMethod] = random.choices(
        paymentMethods, weights=paymentMethodsRarity)
    transactionDate = dates[random.randint(0, len(dates) - 1)]
    necessityScale = random.randint(0, 2)  # max can be customised
    # % of transactions to exclude from budget
    excludeFromBudget = random.randint(0, 99) > 95
    transactions.append(
        [amount, item, category, paymentMethod, transactionDate, necessityScale, excludeFromBudget])

with open('mockTransactions.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(["amount", "item", "category",
                    "paymentMethod", "transactionDate", "necessityScale", "excludeFromBudget"])
    for transaction in transactions:
        writer.writerow(transaction)
