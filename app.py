from flask import Flask, request, jsonify
import mariadb

app = Flask(__name__)


def connect_db():
    return mariadb.connect(
        user="gulfades",
        password="sterktpassord",
        host="10.2.3.167",
        port=3306,
        database="gulfades"
    )

@app.route("/")
def index():
    return "Welcome to Gulfades Booking API"

@app.route("/ping")
def ping():
    try:
        conn = connect_db()
        conn.close()
        return "pong", 200
    except mariadb.Error:
        return "Database connection error", 500
    
@app.route("/api/bookings", methods=["GET"])
def get_bookings():
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute(
        "SELECT customer_name, customer_phone, status FROM bookings;",
    )
    conn.close()
    times = cursor.fetchall()
    return jsonify(times)

# Book time
@app.route("/api/bookings", methods=["POST"])
def book_time():
    data = request.json
    conn = connect_db()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT * FROM bookings WHERE date=? AND time=? AND barber=?",
        (data["date"], data["time"], data["barber"])
    )

    if cursor.fetchone():
        return jsonify({"message": "Denne timen er allerede tatt"}), 400

    cursor.execute(
        """INSERT INTO bookings
        (name, phone, service, barber, date, time)
        VALUES (?, ?, ?, ?, ?, ?)""",
        (
            data["name"],
            data["phone"],
            data["service"],
            data["barber"],
            data["date"],
            data["time"]
        )
    )
    conn.commit()

    return jsonify({"message": "Time bestilt!"}), 200




if __name__ == "__main__":
    app.run(debug=True)
