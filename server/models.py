from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from config import db, bcrypt


# ============= User =============
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, unique=True, nullable=False)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    _password_hash = db.Column(db.String)

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed.')
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

    # Relationships:

    # Serialization:
    serialize_rules = ['-_password_hash']

    # Validations
    @validates('email')
    def validate_email(self, key, new_email):
        existing_user = User.query.filter(User.email == new_email).first()

        if existing_user:
            raise ValueError('There is already an account with this email.')
        return new_email

    def __repr__(self) -> str:
        return f"<User {self.email}, id: {self.id}"
