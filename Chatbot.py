from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_msg = data['message']
    bot_reply = f"You said: {user_msg}"  # Replace with AI logic if needed
    return jsonify({"reply": bot_reply})

if __name__ == "__main__":
    app.run(debug=True)
