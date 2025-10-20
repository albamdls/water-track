from flask import Flask, render_template, request, jsonify
import requests
import os

app = Flask(__name__)

# Configuración
DAILY_GOAL = 2000  # ml
FEEDBACK_SERVICE_URL = os.getenv("FEEDBACK_SERVICE_URL", "http://localhost:5001/feedback")

# Estado temporal (reinicia al reiniciar el servidor)
user_progress = {"total": 0}

@app.route('/')
def index():
    progress = user_progress["total"]
    percentage = int((progress / DAILY_GOAL) * 100)
    return render_template('index.html', progress=progress, percentage=percentage, goal=DAILY_GOAL)

@app.route('/drink', methods=['POST'])
def drink():
    amount = int(request.json.get("amount", 0))
    user_progress["total"] += amount
    progress = user_progress["total"]

    goalReached = False
    if progress >= DAILY_GOAL:
        message = "¡Felicidades! 🎉 Has alcanzado tu objetivo diario de hidratación 💧"
        goalReached = True
    else:
        try:
            response = requests.get(FEEDBACK_SERVICE_URL)
            message = response.json().get("message", "¡Sigue así!")
        except Exception:
            message = "Error al obtener mensaje motivacional."

    percentage = min(int((progress / DAILY_GOAL) * 100), 100)
    return jsonify({
        "progress": progress,
        "percentage": percentage,
        "message": message,
        "goalReached": goalReached
    })


@app.route('/reset', methods=['POST'])
def reset():
    user_progress["total"] = 0
    return jsonify({
        "progress": 0,
        "percentage": 0,
        "message": "Contador reiniciado. ¡A hidratarse de nuevo! 💧"
    })


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
