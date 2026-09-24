"""Simple command-line currency converter using sample mid-market rates."""

from __future__ import annotations

import argparse
from decimal import Decimal, InvalidOperation


RATES_TO_USD = {
    "USD": Decimal("1"),
    "EUR": Decimal("0.921"),
    "GBP": Decimal("0.774"),
    "JPY": Decimal("148.7"),
    "CAD": Decimal("1.359"),
    "AUD": Decimal("1.511"),
    "INR": Decimal("83.12"),
    "CHF": Decimal("0.897"),
}


def convert(amount: Decimal, from_currency: str, to_currency: str) -> Decimal:
    """Convert an amount between supported currencies."""
    from_currency = from_currency.upper()
    to_currency = to_currency.upper()

    if from_currency not in RATES_TO_USD or to_currency not in RATES_TO_USD:
        supported = ", ".join(sorted(RATES_TO_USD))
        raise ValueError(f"Currency must be one of: {supported}")
    if amount < 0:
        raise ValueError("Amount must be 0 or greater")

    return amount * RATES_TO_USD[to_currency] / RATES_TO_USD[from_currency]


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Convert between common currencies.")
    parser.add_argument("--amount", required=True, help="Amount to convert")
    parser.add_argument("--from", dest="from_currency", required=True, help="Source currency code")
    parser.add_argument("--to", dest="to_currency", required=True, help="Target currency code")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    try:
        amount = Decimal(args.amount)
        converted = convert(amount, args.from_currency, args.to_currency)
    except InvalidOperation:
        raise SystemExit("Amount must be a valid number")
    except ValueError as error:
        raise SystemExit(str(error))

    from_currency = args.from_currency.upper()
    to_currency = args.to_currency.upper()
    rate = RATES_TO_USD[to_currency] / RATES_TO_USD[from_currency]
    print(f"{amount:,.2f} {from_currency} = {converted:,.2f} {to_currency}")
    print(f"1 {from_currency} = {rate:,.4f} {to_currency}")


if __name__ == "__main__":
    main()
