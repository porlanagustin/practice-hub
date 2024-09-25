from bank import BankApp
from DatabaseConfig import DatabaseConfig

db_config = DatabaseConfig()
db_config.createTable()

app = BankApp()