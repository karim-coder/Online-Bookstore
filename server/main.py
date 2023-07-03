from fastapi import FastAPI
# from app.api import auth, conversations
# from app.core.middleware import CustomMiddleware
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

# app.include_router(auth.router)
# app.include_router(conversations.router)

# app.middleware("http")(CustomMiddleware())

@app.get("/")
def read_root():
    return {"Hello": "World"}