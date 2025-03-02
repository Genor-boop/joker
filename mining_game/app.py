from flask import Flask, render_template, request, jsonify
import json

app = Flask(__name__)

# Глобальные переменные для майнинга
coins = 0
mining_speed = 1
efficiency = 1

@app.route('/mining')
def mining():
    return render_template('mining.html', coins=coins, mining_speed=mining_speed)

@app.route('/mine', methods=['POST'])
def mine():
    global coins
    coins += mining_speed * efficiency
    return jsonify({'coins': coins})

@app.route('/upgrade', methods=['POST'])
def upgrade():
    global coins, mining_speed, efficiency
    data = request.json
    if data['type'] == 'speed' and coins >= 10:
        mining_speed += 1
        coins -= 10
        return jsonify({'success': True, 'mining_speed': mining_speed, 'coins': coins})
    elif data['type'] == 'efficiency' and coins >= 20:
        efficiency *= 1.05
        coins -= 20
        return jsonify({'success': True, 'efficiency': efficiency, 'coins': coins})
    return jsonify({'success': False, 'message': 'Недостаточно монет'})

@app.route('/leaderboard', methods=['GET'])
def leaderboard():
    # Пример данных для лидерборда
    leaderboard_data = [
        {'username': 'Player1', 'coins': 100},
        {'username': 'Player2', 'coins': 80},
        {'username': 'Player3', 'coins': 60}
    ]
    return jsonify(leaderboard_data)

if __name__ == '__main__':
    app.run(debug=True)