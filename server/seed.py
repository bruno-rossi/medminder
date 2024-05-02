from app import app
from models import db, User

if __name__ == '__main__':
    with app.app_context():
        print("Clearing db...")
       
        User.query.delete()

        db.session.commit()

        print("Seeding...")

        print("Seeding users...")

        user1 = User(email="brunogabrielrossi@gmail.com", first_name="Bruno", last_name="Rossi")
        user1.password_hash = "test"

        users = [
            user1
        ]

        db.session.add_all(users)
        db.session.commit()

        print("Done seeding!")