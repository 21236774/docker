# database.py
from databases import Database
from sqlalchemy import create_engine, Column, Integer, String, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import time

DATABASE_URL = "postgresql://root:ai123456@postgres:5432/fastapi_db"

database = Database(DATABASE_URL)
Base = declarative_base()

engine = create_engine(DATABASE_URL)

max_retries = 10
for i in range(max_retries):
    try:
        with engine.connect() as connection:
            print("数据库成功连接")
            break
    except Exception as e:
        print(f"数据库失败: {e}，重试 {i+1}/{max_retries}")
        time.sleep(2)
else:
    print("数据库连接失败，已重试10次，程序退出")
    raise Exception("数据库连接失败")

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
