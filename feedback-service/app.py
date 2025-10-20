from flask import Flask, jsonify
import random
import json

app = Flask(__name__)

@app.route('/feedback')
def get_feedback():
    with open('feedback.json', 'r', encoding='utf-8') as f:
        feedback_list = json.load(f)
    phrase = random.choice(feedback_list)
    return jsonify({"message":phrase})

if __name__ == '__main__':
    print("🚀 feedback-service iniciado en http://localhost:5001")
    app.run(host='0.0.0.0', port=5001, debug=True)
